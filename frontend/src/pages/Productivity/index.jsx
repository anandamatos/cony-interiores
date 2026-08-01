import { useMemo, useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import Card from "../../components/atoms/Card";
import Typography from "../../components/atoms/Typography";
import StatusFilter from "../../components/molecules/StatusFilter";
import Alert from "../../components/atoms/Alert";
import productivityService from "../../services/productivityService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const BAR_COLORS = [
  "#C9A86A",
  "#8D9ABA",
  "#B56A4A",
  "#D9C7B1",
  "#7A4E2D",
  "#9AAA7A",
  "#D3AF37",
];

const Productivity = () => {
  const [period, setPeriod] = useState("week");
  const [productivityData, setProductivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [seamstressFilter, setSeamstressFilter] = useState("todas");
  const [search, setSearch] = useState("");

  const periodOptions = [
    { value: "week", label: "Semanal", variant: "all" },
    { value: "month", label: "Mensal", variant: "active" },
  ];

  const statAccentMap = {
    gold: "before:bg-gradient-gold",
    sage: "before:bg-sage",
    terracota: "before:bg-terracota",
  };

  const statCards = [
    {
      key: "completed",
      label: "Serviços Concluídos",
      icon: CheckCircle,
      trendIcon: ArrowUpRight,
      trendText: "12 esta semana",
      badgeVariant: "success",
      accent: "gold",
    },
    {
      key: "inProgress",
      label: "Em Andamento",
      icon: Clock,
      trendIcon: ArrowUpRight,
      trendText: "5 iniciados hoje",
      badgeVariant: "success",
      accent: "sage",
    },
    {
      key: "seamstresses",
      label: "Costureiras Ativas",
      icon: Users,
      trendIcon: ArrowUpRight,
      trendText: "9 trabalhando",
      badgeVariant: "success",
      accent: "terracota",
    },
    {
      key: "efficiency",
      label: "Eficiência",
      icon: TrendingUp,
      trendIcon: ArrowUpRight,
      trendText: "Meta atingida",
      badgeVariant: "success",
      accent: "gold",
    },
  ];

  useEffect(() => {
    const loadProductivity = async () => {
      try {
        setIsLoading(true);
        setLoadError("");
        const data = await productivityService.fetchProductivityData(period);
        setProductivityData(data);
      } catch (error) {
        console.error("Erro ao carregar produtividade:", error);
        setLoadError("Não foi possível carregar as métricas de produtividade.");
        setProductivityData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProductivity();
  }, [period]);

  const servicesInProduction = useMemo(() => {
    return Array.isArray(productivityData?.servicesInProduction)
      ? productivityData.servicesInProduction
      : [];
  }, [productivityData]);

  const seamstressOptions = useMemo(
    () => [
      { value: "todas", label: "Todas as costureiras" },
      ...Array.from(new Set(servicesInProduction.map((item) => item.costureiraNome))).map((name) => ({
        value: name,
        label: name,
      })),
    ],
    [servicesInProduction]
  );

  const filteredServices = useMemo(() => {
    return servicesInProduction.filter((item) => {
      const matchStatus = statusFilter === "todos" || item.status === statusFilter;
      const matchSeamstress = seamstressFilter === "todas" || item.costureiraNome === seamstressFilter;
      const query = search.trim().toLowerCase();
      const matchQuery = query.length === 0
        || item.clienteNome.toLowerCase().includes(query)
        || item.produtos.toLowerCase().includes(query)
        || item.costureiraNome.toLowerCase().includes(query);

      return matchStatus && matchSeamstress && matchQuery;
    });
  }, [servicesInProduction, statusFilter, seamstressFilter, search]);

  const filteredRhythm = useMemo(() => {
    const bucket = {
      atrasado: 0,
      urgente: 0,
      estavel: 0,
      planejado: 0,
    };

    filteredServices.forEach((item) => {
      if (bucket[item.status] !== undefined) bucket[item.status] += 1;
    });

    return [
      { key: "atrasado", label: "Atrasado", value: bucket.atrasado, color: "#B56A4A" },
      { key: "urgente", label: "Urgente (0-2d)", value: bucket.urgente, color: "#C9A86A" },
      { key: "estavel", label: "Estável (3-7d)", value: bucket.estavel, color: "#8D9ABA" },
      { key: "planejado", label: "Planejado", value: bucket.planejado, color: "#4A7C59" },
    ];
  }, [filteredServices]);

  if (isLoading) {
    return (
      <main className="flex-1 p-10">
        <Typography variant="body1">
          Carregando...
        </Typography>
      </main>
    );
  }

  if (loadError || !productivityData) {
    return (
      <main className="flex-1 p-10">
        <Alert
          type="error"
          title="Erro"
          message={loadError || "Não foi possível carregar os dados de produtividade."}
        />
      </main>
    );
  }

  const stats = {
    completed: productivityData.completed,
    inProgress: filteredServices.length,
    seamstresses: productivityData.seamstresses,
    efficiency: `${productivityData.efficiency}%`,
  };

  const chartData = {
    labels: productivityData.activities.map((item) => item.day),
    datasets: [
      {
        label: "Serviços concluídos",
        data: productivityData.activities.map((item) => item.value),
        backgroundColor: productivityData.activities.map((_, index) => BAR_COLORS[index % BAR_COLORS.length]),
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const doughnutData = {
    labels: filteredRhythm.map((item) => item.label),
    datasets: [
      {
        data: filteredRhythm.map((item) => item.value),
        backgroundColor: filteredRhythm.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: '62%',
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">
            Dashboard de Produtividade
          </Typography>

          <Typography variant="body1" className="mt-1">
            Acompanhe os principais indicadores da produção.
          </Typography>
        </div>

        <StatusFilter
          options={periodOptions}
          value={period}
          onChange={setPeriod}
        />
      </div>
            <section
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
        aria-label="Estatísticas"
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trendIcon;
          const accentClass =
            statAccentMap[card.accent] || "before:bg-gradient-gold";
          const isUp = card.badgeVariant === "success";

          return (
            <article
              key={card.key}
              className={`group relative overflow-hidden cursor-pointer rounded-md border border-border bg-white/80 backdrop-blur-sm px-6 py-5 transition-all duration-normal ease-spring hover:-translate-y-1 hover:scale-[1.01] hover:border-gold hover:shadow-md before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:transition-all before:duration-normal before:ease-spring hover:before:w-1.5 ${accentClass}`}
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-sm bg-offWhite text-taupe">
                <Icon className="w-5 h-5" />
              </div>

              <div className="text-[13px] font-secondary uppercase tracking-[0.5px] text-taupe">
                {card.label}
              </div>

              <div className="mt-1 text-[32px] font-primary font-bold text-primary">
                {stats[card.key]}
              </div>

              <span
                className={`mt-2 inline-flex items-center gap-1 rounded-[12px] px-2.5 py-[2px] text-[12px] font-secondary font-semibold ${
                  isUp
                    ? "bg-success/15 text-success"
                    : "bg-danger/15 text-danger"
                }`}
              >
                <TrendIcon className="w-3.5 h-3.5" />
                {card.key === "completed" && `${productivityData.completed} no período`}
                {card.key === "inProgress" && `${filteredServices.length} em produção`}
                {card.key === "seamstresses" && `${productivityData.seamstresses} com carga`}
                {card.key === "efficiency" && `${productivityData.efficiency >= 90 ? "Meta atingida" : "Atenção"}`}
              </span>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2">
          <Typography variant="h3">
            Atividades Semanais
          </Typography>

          <Typography
            variant="body2"
            className="mt-1 text-taupe"
          >
            Quantidade de serviços concluídos por dia/semana.
          </Typography>

          <div
            style={{
              height: "350px",
              marginTop: "24px",
            }}
          >
            <Bar
              data={chartData}
              options={chartOptions}
            />
          </div>
        </Card>

        <Card className="p-6">
          <Typography variant="h3">Distribuição de Ritmo</Typography>
          <Typography variant="body2" className="mt-1 text-taupe">
            Leitura por prazo de entrega com base nos serviços em produção.
          </Typography>
          <div style={{ height: "260px", marginTop: "18px" }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </Card>
      </section>

      <Card className="p-6 mt-6">
        <div className="flex flex-col gap-4 mb-5">
          <div>
            <Typography variant="h3">Serviços em Produção</Typography>
            <Typography variant="body2" className="text-taupe mt-1">
              Lista operacional conectada ao mesmo contexto de capacidade e carga do dashboard.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              className="rounded-md border border-border bg-white px-3 py-2"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="todos">Todos os status</option>
              <option value="atrasado">Atrasado</option>
              <option value="urgente">Urgente (0-2d)</option>
              <option value="estavel">Estável (3-7d)</option>
              <option value="planejado">Planejado</option>
            </select>

            <select
              className="rounded-md border border-border bg-white px-3 py-2"
              value={seamstressFilter}
              onChange={(event) => setSeamstressFilter(event.target.value)}
            >
              {seamstressOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <input
              className="rounded-md border border-border bg-white px-3 py-2 md:col-span-2"
              placeholder="Buscar por cliente, produto ou costureira"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-offWhite border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-primary">Cliente</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Produtos</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Costureira</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Prazo</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((item) => (
                <tr key={item.id} className="border-b border-border/60 last:border-b-0">
                  <td className="px-4 py-3">{item.clienteNome}</td>
                  <td className="px-4 py-3">{item.produtos}</td>
                  <td className="px-4 py-3">{item.costureiraNome}</td>
                  <td className="px-4 py-3">{item.prazoEntrega || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      item.status === "atrasado" ? "bg-danger/15 text-danger" :
                      item.status === "urgente" ? "bg-warning/15 text-warning" :
                      item.status === "estavel" ? "bg-sage/20 text-sage" : "bg-info/15 text-info"
                    }`}>
                      {item.status === "atrasado" && "Atrasado"}
                      {item.status === "urgente" && "Urgente"}
                      {item.status === "estavel" && "Estável"}
                      {item.status === "planejado" && "Planejado"}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-taupe">
                    Nenhum serviço encontrado com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
};

export default Productivity;