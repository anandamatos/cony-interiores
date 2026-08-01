import api from "./api";
import { buildOperationalCapacityContext, normalizeDate, startOfDay } from "../utils/operationalCapacity";

// Mock enquanto não há API
const weeklyMockData = {
  completed: 128,
  inProgress: 14,
  seamstresses: 9,
  efficiency: 92,

  activities: [
    { day: "Seg", value: 8 },
    { day: "Ter", value: 12 },
    { day: "Qua", value: 10 },
    { day: "Qui", value: 15 },
    { day: "Sex", value: 11 },
    { day: "Sáb", value: 6 },
    { day: "Dom", value: 4 },
  ],
};

const monthlyMockData = {
  completed: 486,
  inProgress: 31,
  seamstresses: 12,
  efficiency: 95,

  activities: [
    { day: "1ª Sem", value: 110 },
    { day: "2ª Sem", value: 126 },
    { day: "3ª Sem", value: 118 },
    { day: "4ª Sem", value: 132 },
  ],
};

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true" || false;

const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const parseMetricPercentage = (rawValue) => {
  if (rawValue == null) return null;
  const numeric = Number.parseFloat(String(rawValue).replace("%", "").trim());
  if (Number.isNaN(numeric)) return null;
  return Math.max(0, Math.min(100, numeric));
};

const getServiceDate = (service) => normalizeDate(service?.data_envio || service?.prazo_entrega);

const endOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
};

const getPeriodRange = (period) => {
  const today = new Date();

  if (period === "month") {
    const start = startOfDay(new Date(today.getFullYear(), today.getMonth(), 1));
    const end = endOfDay(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    return { start, end };
  }

  const end = endOfDay(today);
  const start = startOfDay(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6));
  return { start, end };
};

const isInRange = (date, start, end) => date && date >= start && date <= end;

const classifyProductionStatus = (service) => {
  const today = startOfDay(new Date());
  const due = normalizeDate(service?.prazo_entrega);
  const dueAt = due ? startOfDay(due) : null;

  if (!dueAt) return "sem_prazo";

  const diffDays = Math.round((dueAt - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "atrasado";
  if (diffDays <= 2) return "urgente";
  if (diffDays <= 7) return "estavel";
  return "planejado";
};

const buildProductionList = (services, productsMap) => {
  const list = services
    .map((service) => {
      const status = classifyProductionStatus(service);
      const productIds = Array.isArray(service?.produto) ? service.produto : [];
      const productNames = productIds.length > 0
        ? productIds.map((id) => productsMap[id] || `Produto #${id}`).join(", ")
        : "Sem produto";

      return {
        id: service.id,
        costureiraId: service?.costureira,
        costureiraNome: service?.costureira_nome || "Não definida",
        clienteNome: service?.cliente_nome || "Sem cliente",
        produtos: productNames,
        prazoEntrega: service?.prazo_entrega || null,
        dataEnvio: service?.data_envio || null,
        valor: Number(service?.valor || 0),
        status,
      };
    })
    .filter((item) => item.status !== "planejado" || item.prazoEntrega)
    .sort((a, b) => {
      const dateA = normalizeDate(a.prazoEntrega)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const dateB = normalizeDate(b.prazoEntrega)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return dateA - dateB;
    });

  return list;
};

const buildRhythmDistribution = (servicesInProduction) => {
  const bucket = {
    atrasado: 0,
    urgente: 0,
    estavel: 0,
    planejado: 0,
  };

  servicesInProduction.forEach((service) => {
    if (bucket[service.status] !== undefined) {
      bucket[service.status] += 1;
    }
  });

  return [
    { key: "atrasado", label: "Atrasado", value: bucket.atrasado, color: "#B56A4A" },
    { key: "urgente", label: "Urgente (0-2d)", value: bucket.urgente, color: "#C9A86A" },
    { key: "estavel", label: "Estável (3-7d)", value: bucket.estavel, color: "#8D9ABA" },
    { key: "planejado", label: "Planejado", value: bucket.planejado, color: "#4A7C59" },
  ];
};

const buildWeeklyActivities = (services, start, end) => {
  const counts = { Seg: 0, Ter: 0, Qua: 0, Qui: 0, Sex: 0, Sáb: 0, Dom: 0 };

  services.forEach((service) => {
    const date = getServiceDate(service);
    if (!isInRange(date, start, end)) return;

    const dayLabel = WEEKDAY_LABELS[date.getDay()];
    if (counts[dayLabel] !== undefined) {
      counts[dayLabel] += 1;
    }
  });

  return ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => ({
    day,
    value: counts[day],
  }));
};

const buildMonthlyActivities = (services, start, end) => {
  const counts = [0, 0, 0, 0, 0];

  services.forEach((service) => {
    const date = getServiceDate(service);
    if (!isInRange(date, start, end)) return;

    const weekIndex = Math.min(4, Math.floor((date.getDate() - 1) / 7));
    counts[weekIndex] += 1;
  });

  return counts.map((value, index) => ({
    day: `${index + 1}ª Sem`,
    value,
  }));
};

const buildFromApi = (services, seamstresses, products, efficiencyMetrics, period) => {
  const { start, end } = getPeriodRange(period);
  const today = startOfDay(new Date());

  const servicesInPeriod = services.filter((service) => isInRange(getServiceDate(service), start, end));
  const completed = servicesInPeriod.length;
  const inProgress = services.filter((service) => {
    const dueDate = normalizeDate(service?.prazo_entrega);
    if (!dueDate) return false;
    const dueAt = startOfDay(dueDate);
    return dueAt >= today && dueAt <= end;
  }).length;

  const seamstressesList = Array.isArray(seamstresses) ? seamstresses : [];
  const seamstressesActive = seamstressesList.filter((item) => item?.ativo !== false).length;

  const productsMap = {};
  (Array.isArray(products) ? products : []).forEach((item) => {
    productsMap[item.id] = item.nome;
  });

  const productionCandidates = services.filter((service) => {
    const dueDate = normalizeDate(service?.prazo_entrega);
    if (!dueDate) return false;
    const sentDate = normalizeDate(service?.data_envio);
    const dueAt = startOfDay(dueDate);
    return Boolean(sentDate && sentDate <= end) || dueAt >= today;
  });

  const servicesInProduction = buildProductionList(productionCandidates, productsMap);
  const rhythmDistribution = buildRhythmDistribution(servicesInProduction);
  const operationalContext = buildOperationalCapacityContext(services, seamstressesList, { days: 7 });

  const efficiencyFromApi = parseMetricPercentage(efficiencyMetrics?.taxa_eficiencia_porcentagem);
  const efficiency = efficiencyFromApi ?? (completed > 0 ? 100 : 0);

  const activities = period === "month"
    ? buildMonthlyActivities(services, start, end)
    : buildWeeklyActivities(services, start, end);

  return {
    completed,
    inProgress,
    seamstresses: seamstressesActive,
    efficiency: Math.round(efficiency),
    activities,
    rhythmDistribution,
    servicesInProduction,
    workload: operationalContext.workload,
    operationalWeeklyCapacity: operationalContext.weeklyCapacity,
    operationalUtilization: operationalContext.utilization,
  };
};

export const fetchProductivityData = async (period = "week") => {
  try {
    const [servicesResponse, seamstressesResponse, productsResponse, efficiencyResponse] = await Promise.all([
      api.get("/servicos/"),
      api.get("/costureiras/"),
      api.get("/produtos/"),
      api.get("/metricas/eficiencia/"),
    ]);

    const services = Array.isArray(servicesResponse.data) ? servicesResponse.data : [];
    const seamstresses = Array.isArray(seamstressesResponse.data) ? seamstressesResponse.data : [];
    const products = Array.isArray(productsResponse.data) ? productsResponse.data : [];
    const efficiencyMetrics = efficiencyResponse?.data ?? null;

    return buildFromApi(services, seamstresses, products, efficiencyMetrics, period);
  } catch (error) {
    if (!USE_MOCKS) {
      console.error("Erro ao buscar produtividade:", error);
      throw new Error("Erro ao carregar produtividade", {
        cause: error,
      });
    }

    console.warn(
      "API de produtividade não disponível, usando dados mockados:",
      error.message
    );

    return period === "month"
      ? monthlyMockData
      : weeklyMockData;
  }
};

export default {
  fetchProductivityData,
};