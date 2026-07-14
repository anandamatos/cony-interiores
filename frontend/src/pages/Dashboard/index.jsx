import { useState, useEffect } from 'react';
import {
  ClipboardList,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  Plus,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle,
  Pin,
} from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';

// ============================================
// DADOS MOCKADOS (mais realistas)
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
    { label: 'Cortinas', value: 45, color: '#D9C7B1' },
    { label: 'Almofadas', value: 25, color: '#8D9ABA' },
    { label: 'Tapetes', value: 15, color: '#C9A86A' },
    { label: 'Outros', value: 15, color: '#B56A4A' },
  ],
  workload: [
    { name: 'Sirlene', services: 4, percentage: 80, color: 'primary' },
    { name: 'Mariana', services: 3, percentage: 60, color: 'gold' },
    { name: 'Joana', services: 2, percentage: 40, color: 'sage' },
    { name: 'Ana Paula', services: 1, percentage: 20, color: 'terracota' },
  ],
  alerts: [
    {
      id: 1,
      title: 'Serviço em atraso',
      description: 'Cortina Ilhós - João Silva (Prazo: 25/06) • +2 dias',
      time: 'Hoje',
      type: 'danger',
      icon: Clock,
    },
    {
      id: 2,
      title: 'Próximo do prazo',
      description: 'Almofadas - Maria Oliveira (Prazo: 28/06) • 3 dias',
      time: 'Hoje',
      type: 'warning',
      icon: AlertCircle,
    },
    {
      id: 3,
      title: 'Serviço concluído',
      description: 'Tapete - Ana Costa (Entregue em 20/06)',
      time: 'Ontem',
      type: 'success',
      icon: CheckCircle,
    },
    {
      id: 4,
      title: 'Novo serviço aguardando aprovação',
      description: 'Cortina Romana - Pedro Santos',
      time: 'Ontem',
      type: 'info',
      icon: Pin,
    },
  ],
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

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

  if (error) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <span className="text-4xl block mb-4">⚠️</span>
            <Typography variant="h2" className="text-danger mb-2">
              Ops! Algo deu errado
            </Typography>
            <Typography variant="body1" className="text-taupe">
              {error}
            </Typography>
            <button
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  const { weeklyActivity, distribution, workload, alerts } = stats;
  const maxBarValue = Math.max(...weeklyActivity.map((item) => item.value));

  const statCardConfig = [
    {
      key: 'activeServices',
      title: 'Serviços Ativos',
      value: stats.activeServices,
      icon: ClipboardList,
      color: 'border-l-gold',
      shadow: 'stat-primary',
      badge: { label: '3 novos esta semana', trend: 'up' },
    },
    {
      key: 'seamstresses',
      title: 'Costureiras',
      value: stats.seamstresses,
      icon: Users,
      color: 'border-l-sage',
      shadow: 'stat-sage',
      badge: { label: '1 nova contratada', trend: 'up' },
    },
    {
      key: 'pendingPayments',
      title: 'Pagamentos Pendentes',
      value: stats.pendingPayments,
      icon: DollarSign,
      color: 'border-l-gold',
      shadow: 'stat-gold',
      badge: { label: '2 em atraso', trend: 'down' },
    },
    {
      key: 'upcomingDeliveries',
      title: 'Entregas Previstas',
      value: stats.upcomingDeliveries,
      icon: Package,
      color: 'border-l-terracota',
      shadow: 'stat-terracota',
      badge: { label: 'Esta semana', trend: 'up' },
    },
  ];

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10" role="main">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1" className="text-[32px] font-bold tracking-[-0.8px]">
            Bem-vinda, Ana 🌿
          </Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Aqui está o resumo da sua operação hoje.
          </Typography>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm">
            <BarChart3 className="w-4 h-4" />
            Relatórios
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            Novo Serviço
          </Button>
        </div>
      </div>

      {/* Stats Cards com glassmorphism e espaçamentos ajustados */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8" aria-label="Estatísticas">
        {statCardConfig.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.badge.trend === 'up' ? TrendingUp : TrendingDown;
          const badgeVariant = card.badge.trend === 'up' ? 'success' : 'danger';

          return (
            <Card
              key={card.key}
              hover
              variant="default"
              shadow={card.shadow}
              className={`p-6 border-l-4 ${card.color}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Typography variant="caption" className="uppercase text-taupe text-xs tracking-wider">
                    {card.title}
                  </Typography>
                  <Typography variant="h1" className="text-3xl mt-2 font-bold tracking-[-0.5px]">
                    {card.value}
                  </Typography>
                </div>
                <div className="w-11 h-11 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-taupe">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <Badge variant={badgeVariant} size="sm" className="mt-4">
                <TrendIcon className="w-3 h-3 mr-1" />
                {card.badge.label}
              </Badge>
            </Card>
          );
        })}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Typography variant="h3" className="text-[18px] font-semibold">
                Atividade Semanal
              </Typography>
              <Typography variant="body2" className="text-taupe text-sm">
                Serviços finalizados por dia
              </Typography>
            </div>
            <Typography variant="caption" className="text-xs text-gray-400">
              Últimos 7 dias
            </Typography>
          </div>

          <div className="flex items-end justify-between h-40 gap-2 pt-4">
            {weeklyActivity.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full max-w-10 rounded-t transition-all duration-500 ease-spring cursor-pointer"
                  style={{
                    height: `${(item.value / maxBarValue) * 100}%`,
                    minHeight: '16px',
                    background:
                      hoveredBar === item.day
                        ? 'var(--gradient-primary)'
                        : item.day === 'Qui'
                        ? 'var(--gradient-primary)'
                        : item.day === 'Sáb'
                        ? 'var(--color-sage)'
                        : item.day === 'Dom'
                        ? 'var(--color-gray)'
                        : 'var(--gradient-gold)',
                    transform: hoveredBar === item.day ? 'scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: 'bottom',
                  }}
                  onMouseEnter={() => setHoveredBar(item.day)}
                  onMouseLeave={() => setHoveredBar(null)}
                  role="img"
                  aria-label={`${item.day}: ${item.value} serviços`}
                />
                <Typography variant="caption" className="text-xs text-taupe">
                  {item.day}
                </Typography>
              </div>
            ))}
          </div>
        </Card>

        {/* Donut Chart */}
        <Card className="p-6">
          <div className="mb-4">
            <Typography variant="h3" className="text-[18px] font-semibold">
              Distribuição
            </Typography>
            <Typography variant="body2" className="text-taupe text-sm">
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
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur rounded-full flex flex-col items-center justify-center shadow-sm">
                <Typography variant="h2" className="text-xl font-bold">
                  {stats.activeServices}
                </Typography>
                <Typography variant="caption" className="text-xs text-taupe">
                  Total
                </Typography>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {distribution.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-primary">{item.label}</span>
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
            <Typography variant="h3" className="text-[18px] font-semibold">
              Carga de Trabalho
            </Typography>
            <Typography variant="caption" className="text-xs text-gray-400">
              Costureiras
            </Typography>
          </div>

          {workload.map((item) => {
            const colorMap = {
              primary: 'bg-gradient-primary',
              gold: 'bg-gradient-gold',
              sage: 'bg-sage',
              terracota: 'bg-terracota',
            };

            return (
              <div key={item.name} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-primary">{item.name}</span>
                  <span className="text-taupe">
                    {item.services} serviços ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colorMap[item.color]} transition-all duration-700 ease-spring`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3" className="text-[18px] font-semibold">
              Últimas Atividades
            </Typography>
            <Typography variant="caption" className="text-xs text-gray-400">
              Hoje
            </Typography>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Novo serviço adicionado</span>
                  <span className="text-taupe text-xs">10:30</span>
                </div>
                <Typography variant="body2" className="text-taupe text-sm mt-0.5">
                  Cortina Ilhós - Cliente: João Silva
                </Typography>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Status atualizado</span>
                  <span className="text-taupe text-xs">09:15</span>
                </div>
                <Typography variant="body2" className="text-taupe text-sm mt-0.5">
                  Almofadas - Concluído
                </Typography>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Nova costureira</span>
                  <span className="text-taupe text-xs">08:00</span>
                </div>
                <Typography variant="body2" className="text-taupe text-sm mt-0.5">
                  Ana Paula foi adicionada ao time 🎉
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Alerts */}
      <section aria-label="Alertas e avisos">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3" className="text-[18px] font-semibold">
              Alertas e Avisos
            </Typography>
            <Badge variant="neutral" size="sm">
              {alerts.length} itens
            </Badge>
          </div>

          {alerts.map((alert) => {
            const Icon = alert.icon;
            const typeClasses = {
              danger: 'bg-danger/10 text-danger',
              warning: 'bg-warning/10 text-warning',
              success: 'bg-success/10 text-success',
              info: 'bg-info/10 text-info',
            };

            return (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 -mx-1 rounded-lg hover:bg-offWhite transition-colors cursor-pointer border-b border-[rgba(75,58,46,0.06)] last:border-b-0"
                role="button"
                tabIndex={0}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeClasses[alert.type]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <Typography variant="h4" className="text-sm font-semibold">
                    {alert.title}
                  </Typography>
                  <Typography variant="body2" className="text-taupe text-sm">
                    {alert.description}
                  </Typography>
                </div>
                <Typography variant="caption" className="text-gray-400 whitespace-nowrap text-xs">
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