import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  Plus,
  BarChart3,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  Pin,
  CirclePlus,
  UserPlus,
} from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';

// ============================================
// DADOS MOCKADOS
// ============================================
const mockStats = {
  activeServices: 12,
  seamstresses: 4,
  pendingPayments: 3,
  upcomingDeliveries: 8,
  weeklyActivity: [
    { day: 'Seg', value: 45 },
    { day: 'Ter', value: 75 },
    { day: 'Qua', value: 60 },
    { day: 'Qui', value: 95 },
    { day: 'Sex', value: 70 },
    { day: 'Sáb', value: 50 },
    { day: 'Dom', value: 30 },
  ],
  distribution: [
    { label: 'Cortinas', value: 45, color: '#D9C7B1', swatch: 'bg-secondary' },
    { label: 'Almofadas', value: 25, color: '#8D9ABA', swatch: 'bg-sage' },
    { label: 'Tapetes', value: 15, color: '#C9A86A', swatch: 'bg-gold' },
    { label: 'Outros', value: 15, color: '#B56A4A', swatch: 'bg-terracota' },
  ],
  workload: [
    { name: 'Sirlene', services: 4, percentage: 80 },
    { name: 'Mariana', services: 3, percentage: 60 },
    { name: 'Joana', services: 2, percentage: 40 },
    { name: 'Ana Paula', services: 1, percentage: 20 },
  ],
  alerts: [
    {
      id: 1,
      title: 'Serviço em atraso',
      description: 'Cortina Ilhós - João Silva (Prazo: 25/06) • +2 dias',
      time: 'Hoje',
      type: 'danger',
    },
    {
      id: 2,
      title: 'Próximo do prazo',
      description: 'Almofadas - Maria Oliveira (Prazo: 28/06) • 3 dias',
      time: 'Hoje',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Serviço concluído',
      description: 'Tapete - Ana Costa (Entregue em 20/06)',
      time: 'Ontem',
      type: 'success',
    },
    {
      id: 4,
      title: 'Novo serviço aguardando aprovação',
      description: 'Cortina Romana - Pedro Santos',
      time: 'Ontem',
      type: 'info',
    },
  ],
};

const statCards = [
  {
    key: 'activeServices',
    label: 'Serviços Ativos',
    icon: ClipboardList,
    accent: 'gold',
    badgeVariant: 'success',
    trendIcon: TrendingUp,
    trendText: '3 novos esta semana',
  },
  {
    key: 'seamstresses',
    label: 'Costureiras',
    icon: Users,
    accent: 'sage',
    badgeVariant: 'success',
    trendIcon: TrendingUp,
    trendText: '1 nova contratada',
  },
  {
    key: 'pendingPayments',
    label: 'Pagamentos Pendentes',
    icon: DollarSign,
    accent: 'gold',
    badgeVariant: 'danger',
    trendIcon: TrendingDown,
    trendText: '2 em atraso',
  },
  {
    key: 'upcomingDeliveries',
    label: 'Entregas Previstas',
    icon: Package,
    accent: 'terracota',
    badgeVariant: 'success',
    trendIcon: TrendingUp,
    trendText: 'Esta semana',
  },
];

const getWeeklyBarColor = (value, maxValue) => {
  const ratio = maxValue > 0 ? value / maxValue : 0;
  if (ratio >= 0.85) return '#4A7C59';
  if (ratio >= 0.7) return '#8D9ABA';
  if (ratio >= 0.5) return '#C9A86A';
  return '#B56A4A';
};

const getWorkloadGradient = (percentage) => {
  if (percentage >= 80) {
    return 'linear-gradient(90deg, #B56A4A 0%, #8B4A30 100%)';
  }
  if (percentage >= 60) {
    return 'linear-gradient(90deg, #C9A86A 0%, #B56A4A 100%)';
  }
  if (percentage >= 40) {
    return 'linear-gradient(90deg, #8D9ABA 0%, #4A7C59 100%)';
  }
  return 'linear-gradient(90deg, #4A7C59 0%, #8D9ABA 100%)';
};

const alertTypeIcon = {
  danger: AlertTriangle,
  warning: Clock3,
  success: CheckCircle2,
  info: Pin,
};

const statAccentMap = {
  gold: 'before:bg-gradient-gold',
  sage: 'before:bg-sage',
  terracota: 'before:bg-terracota',
};

const Dashboard = () => {
  const navigate = useNavigate();
  // ============================================
  // ESTADOS
  // ============================================
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  // ============================================
  // CARREGAR DADOS (simulação)
  // ============================================
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStats(mockStats);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // ============================================
  // RENDER: LOADING
  // ============================================
  if (isLoading) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-taupe">Carregando dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // RENDER: ERRO
  // ============================================
  if (error) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-md bg-danger/12 text-danger flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <Typography variant="h2" className="text-danger mb-2">
              Ops! Algo deu errado
            </Typography>
            <Typography variant="body1" className="text-taupe">
              {error}
            </Typography>
            <button
              className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // RENDER: DADOS
  // ============================================
  const { weeklyActivity, distribution, workload, alerts } = stats;
  const maxBarValue = Math.max(...weeklyActivity.map((item) => item.value));

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10" role="main">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Bem-vinda, Ana</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Aqui está o resumo da sua operação hoje.
          </Typography>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm">
            <BarChart3 className="w-4 h-4" />
            Relatórios
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/services/new')}>
            <Plus className="w-4 h-4" />
            Novo Serviço
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8" aria-label="Estatísticas">
        {statCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trendIcon;
          const accentClass = statAccentMap[card.accent] || 'before:bg-gradient-gold';
          const isUp = card.badgeVariant === 'success';

          return (
            <article
              key={card.key}
              className={`group relative overflow-hidden cursor-pointer rounded-md border border-border bg-white/80 backdrop-blur-sm px-6 py-5 transition-all duration-normal ease-spring hover:-translate-y-1 hover:scale-[1.01] hover:border-gold hover:shadow-md before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:transition-all before:duration-normal before:ease-spring hover:before:w-1.5 hover:before:bg-gradient-primary ${accentClass}`}
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-sm bg-offWhite text-taupe transition-all duration-normal ease-spring group-hover:scale-105 group-hover:-rotate-[4deg] group-hover:bg-secondary group-hover:text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-[13px] font-secondary font-normal uppercase tracking-[0.5px] text-taupe">
                {card.label}
              </div>
              <div className="mt-1 text-[32px] leading-none font-primary font-bold tracking-[-0.5px] text-primary">
                {stats[card.key]}
              </div>
              <span
                className={`mt-2 inline-flex items-center gap-1 rounded-[12px] px-2.5 py-[2px] text-[12px] font-secondary font-semibold ${
                  isUp ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
                }`}
              >
                <TrendIcon className="w-3.5 h-3.5" />
                {card.trendText}
              </span>
            </article>
          );
        })}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Typography variant="h3">Atividade Semanal</Typography>
              <Typography variant="body2" className="text-taupe">
                Serviços finalizados por dia
              </Typography>
            </div>
            <Typography variant="caption">Últimos 7 dias</Typography>
          </div>

          <div className="grid grid-cols-7 h-52 gap-2 pt-4 px-1 rounded-md bg-offWhite/60 border border-border/60">
            {weeklyActivity.map((item) => (
              <div key={item.day} className="flex flex-col items-center justify-end h-full gap-2">
                <Typography
                  variant="caption"
                  className={`text-[11px] transition-opacity duration-fast ${
                    hoveredBar === item.day ? 'opacity-100 text-primary' : 'opacity-0'
                  }`}
                >
                  {item.value}
                </Typography>
                <div
                  className="w-9 rounded-t-md transition-all duration-500 ease-spring cursor-pointer"
                  style={{
                    height: `${(item.value / maxBarValue) * 100}%`,
                    minHeight: '16px',
                    backgroundColor: getWeeklyBarColor(item.value, maxBarValue),
                    border: 'none',
                    boxShadow:
                      hoveredBar === item.day ? '0 10px 22px rgba(75, 58, 46, 0.18)' : '0 4px 12px rgba(75, 58, 46, 0.09)',
                    transform: hoveredBar === item.day ? 'translateY(-2px) scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: 'bottom',
                  }}
                  onMouseEnter={() => setHoveredBar(item.day)}
                  onMouseLeave={() => setHoveredBar(null)}
                  role="img"
                  aria-label={`${item.day}: ${item.value} serviços`}
                />
                <Typography variant="caption" className="text-xs">
                  {item.day}
                </Typography>
              </div>
            ))}
          </div>
        </Card>

        {/* Donut Chart */}
        <Card className="p-6">
          <div className="mb-4">
            <Typography variant="h3">Distribuição</Typography>
            <Typography variant="body2" className="text-taupe">
              Serviços por tipo
            </Typography>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
              <div
                className="w-full h-full rounded-full transition-transform duration-300 hover:scale-105"
                style={{
                  background: `conic-gradient(
                    ${distribution[0].color} 0% ${distribution[0].value}%,
                    ${distribution[1].color} ${distribution[0].value}% ${distribution[0].value + distribution[1].value}%,
                    ${distribution[2].color} ${distribution[0].value + distribution[1].value}% ${distribution[0].value + distribution[1].value + distribution[2].value}%,
                    ${distribution[3].color} ${distribution[0].value + distribution[1].value + distribution[2].value}% 100%
                  )`,
                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.65), 0 10px 28px rgba(75, 58, 46, 0.16)',
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur rounded-full flex flex-col items-center justify-center shadow-sm">
                <Typography variant="h2" className="text-xl">
                  {stats.activeServices}
                </Typography>
                <Typography variant="caption">Total</Typography>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {distribution.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className={`w-3 h-3 rounded ${item.swatch}`} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Workload Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Workload */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3">Carga de Trabalho</Typography>
            <Typography variant="caption">Costureiras</Typography>
          </div>

          {workload.map((item, index) => {
            const progressGradient = getWorkloadGradient(item.percentage);

            return (
              <div key={item.name} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-taupe">
                    {item.services} serviços ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md transition-all duration-700 ease-spring"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundImage: progressGradient,
                      boxShadow: '0 2px 10px rgba(75, 58, 46, 0.18)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3">Últimas Atividades</Typography>
            <Typography variant="caption">Hoje</Typography>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm gap-3">
                <span className="font-medium inline-flex items-center gap-2">
                  <CirclePlus className="w-4 h-4 text-success" />
                  Novo serviço adicionado
                </span>
                <span className="text-taupe">10:30</span>
              </div>
              <Typography variant="body2" className="text-taupe mt-1">
                Cortina Ilhós - Cliente: João Silva
              </Typography>
            </div>

            <div>
              <div className="flex justify-between text-sm gap-3">
                <span className="font-medium inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Status atualizado
                </span>
                <span className="text-taupe">09:15</span>
              </div>
              <Typography variant="body2" className="text-taupe mt-1">
                Almofadas - Concluído
              </Typography>
            </div>

            <div>
              <div className="flex justify-between text-sm gap-3">
                <span className="font-medium inline-flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-gold" />
                  Nova costureira
                </span>
                <span className="text-taupe">08:00</span>
              </div>
              <Typography variant="body2" className="text-taupe mt-1">
                Ana Paula foi adicionada ao time
              </Typography>
            </div>
          </div>
        </Card>
      </section>

      {/* Alerts */}
      <section aria-label="Alertas e avisos">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3">Alertas e Avisos</Typography>
            <Badge variant="neutral" size="sm">
              {alerts.length} itens
            </Badge>
          </div>

          {alerts.map((alert) => {
            const AlertIcon = alertTypeIcon[alert.type] || AlertTriangle;
            return (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-4 -mx-1 rounded-md hover:bg-offWhite transition-colors cursor-pointer border-b border-[rgba(75,58,46,0.06)] last:border-b-0"
              role="button"
              tabIndex={0}
            >
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center text-lg flex-shrink-0
                  ${alert.type === 'danger' ? 'bg-danger/10 text-danger' : ''}
                  ${alert.type === 'warning' ? 'bg-warning/10 text-warning' : ''}
                  ${alert.type === 'success' ? 'bg-success/10 text-success' : ''}
                  ${alert.type === 'info' ? 'bg-info/10 text-info' : ''}
                `}
              >
                <AlertIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Typography variant="h4" className="text-sm">
                  {alert.title}
                </Typography>
                <Typography variant="body2" className="text-taupe">
                  {alert.description}
                </Typography>
              </div>
              <Typography variant="caption" className="text-gray-400 whitespace-nowrap">
                {alert.time}
              </Typography>
            </div>
            );
          })}
        </Card>
      </section>
    </main>
  );
};

export default Dashboard;