import api from "./api";

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

const normalizeDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

const getServiceDate = (service) => normalizeDate(service?.data_envio || service?.prazo_entrega);

const startOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

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

const buildFromApi = (services, seamstresses, efficiencyMetrics, period) => {
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
  };
};

export const fetchProductivityData = async (period = "week") => {
  try {
    const [servicesResponse, seamstressesResponse, efficiencyResponse] = await Promise.all([
      api.get("/servicos/"),
      api.get("/costureiras/"),
      api.get("/metricas/eficiencia/"),
    ]);

    const services = Array.isArray(servicesResponse.data) ? servicesResponse.data : [];
    const seamstresses = Array.isArray(seamstressesResponse.data) ? seamstressesResponse.data : [];
    const efficiencyMetrics = efficiencyResponse?.data ?? null;

    return buildFromApi(services, seamstresses, efficiencyMetrics, period);
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