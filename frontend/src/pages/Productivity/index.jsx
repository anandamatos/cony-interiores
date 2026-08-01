import { useState, useEffect } from "react";
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
    inProgress: productivityData.inProgress,
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

  const distributionBuckets = productivityData.activities.reduce(
    (acc, item) => {
      if (item.value >= 10) acc.peak += item.value;
      else if (item.value >= 6) acc.steady += item.value;
      else acc.low += item.value;
      return acc;
    },
    { peak: 0, steady: 0, low: 0 }
  );

  const doughnutData = {
    labels: ["Pico", "Ritmo", "Baixa"],
    datasets: [
      {
        data: [distributionBuckets.peak, distributionBuckets.steady, distributionBuckets.low],
        backgroundColor: ["#B56A4A", "#C9A86A", "#8D9ABA"],
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
                {card.trendText}
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
            Leitura colorida do volume de produção do período.
          </Typography>
          <div style={{ height: "260px", marginTop: "18px" }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Productivity;