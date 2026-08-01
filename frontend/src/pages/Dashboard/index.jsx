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
import { serviceService } from '../../services/serviceService';
import { seamstressService } from '../../services/seamstressService';
import { productService } from '../../services/productService';
import { fetchPaymentsForecast } from '../../services/financialUxService';
import { buildOperationalCapacityContext } from '../../utils/operationalCapacity';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';

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

const activityTypeIcon = {
  created: CirclePlus,
  due: Clock3,
  payment: DollarSign,
  completed: CheckCircle2,
  staffing: UserPlus,
};

const statAccentMap = {
  gold: 'before:bg-gradient-gold',
  sage: 'before:bg-sage',
  terracota: 'before:bg-terracota',
};

const WEEKDAY_ORDER = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const WEEKDAY_LABEL = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const DISTRIBUTION_STYLES = [
  { color: '#D9C7B1', swatch: 'bg-secondary' },
  { color: '#8D9ABA', swatch: 'bg-sage' },
  { color: '#C9A86A', swatch: 'bg-gold' },
  { color: '#B56A4A', swatch: 'bg-terracota' },
];

const normalizeDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

const startOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const formatDate = (value) => {
  const date = normalizeDate(value);
  if (!date) return '-';
  return date.toLocaleDateString('pt-BR');
};

const formatTimeLabel = (date) => {
  if (!date) return '-';
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoje';
  if (diff === -1) return 'Ontem';
  if (diff > 0 && diff <= 7) return `${diff}d`;
  if (diff < 0 && diff >= -7) return `${Math.abs(diff)}d atrás`;
  return date.toLocaleDateString('pt-BR');
};

const buildRecentActivities = (servicesList, paymentsList, seamstressesList, productsById) => {
  const entries = [];

  servicesList.forEach((service) => {
    const dueDate = normalizeDate(service?.prazo_entrega);
    const sentDate = normalizeDate(service?.data_envio);
    const productIds = Array.isArray(service?.produto) ? service.produto : [];
    const productLabel = productIds.length > 0
      ? productIds.map((id) => productsById[id] || `Produto #${id}`).join(', ')
      : 'Sem produto';
    const clientLabel = service?.cliente_nome || 'Sem cliente';

    if (sentDate) {
      entries.push({
        id: `svc-sent-${service.id}`,
        sortDate: sentDate,
        type: 'created',
        title: 'Serviço em produção',
        description: `${productLabel} - Cliente: ${clientLabel}`,
        time: formatTimeLabel(sentDate),
      });
    }

    if (dueDate) {
      entries.push({
        id: `svc-due-${service.id}`,
        sortDate: dueDate,
        type: 'due',
        title: 'Prazo de entrega mapeado',
        description: `${productLabel} - Entrega em ${formatDate(dueDate)}`,
        time: formatTimeLabel(dueDate),
      });
    }
  });

  paymentsList.forEach((payment) => {
    const dueDate = normalizeDate(payment?.dueDate);
    entries.push({
      id: `pay-${payment.paymentId || payment.serviceId}`,
      sortDate: dueDate,
      type: 'payment',
      title: 'Previsão financeira atualizada',
      description: `Serviço #${payment.serviceId || '-'} • ${payment.status || 'pendente'} • R$ ${Number(payment.amount || 0).toFixed(2)}`,
      time: formatTimeLabel(dueDate),
    });
  });

  if (seamstressesList.length > 0) {
    entries.push({
      id: 'staffing-summary',
      sortDate: new Date(),
      type: 'staffing',
      title: 'Base de costureiras sincronizada',
      description: `${seamstressesList.filter((item) => item?.ativa !== false).length} costureiras ativas na operação.`,
      time: 'Hoje',
    });
  }

  return entries
    .filter((item) => item.sortDate)
    .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime())
    .slice(0, 4);
};

const buildAlerts = (servicesList, paymentsList, productsById) => {
  const alerts = [];
  const today = startOfDay(new Date());

  servicesList.forEach((service) => {
    const dueDate = normalizeDate(service?.prazo_entrega);
    if (!dueDate) return;

    const sentDate = normalizeDate(service?.data_envio);
    const dueAt = startOfDay(dueDate);
    const diffDays = Math.round((dueAt - today) / (1000 * 60 * 60 * 24));
    const productIds = Array.isArray(service?.produto) ? service.produto : [];
    const productLabel = productIds.length > 0
      ? productIds.map((id) => productsById[id] || `Produto #${id}`).join(', ')
      : 'Sem produto';
    const clientLabel = service?.cliente_nome || 'Sem cliente';

    if (diffDays < 0 && (!sentDate || startOfDay(sentDate) > dueAt)) {
      alerts.push({
        id: `overdue-${service.id}`,
        type: 'danger',
        title: 'Serviço em atraso',
        description: `${productLabel} - ${clientLabel} (Prazo: ${formatDate(dueAt)}) • ${Math.abs(diffDays)} dia(s)`,
        time: 'Hoje',
        priority: 1,
      });
      return;
    }

    if (diffDays >= 0 && diffDays <= 2) {
      alerts.push({
        id: `urgent-${service.id}`,
        type: 'warning',
        title: 'Próximo do prazo',
        description: `${productLabel} - ${clientLabel} (Entrega: ${formatDate(dueAt)}) • ${diffDays} dia(s)`,
        time: formatTimeLabel(dueAt),
        priority: 2,
      });
    }
  });

  paymentsList.forEach((payment) => {
    if (!payment?.status || (payment.status !== 'atrasado' && payment.status !== 'pendente')) return;
    alerts.push({
      id: `payment-${payment.paymentId || payment.serviceId}`,
      type: payment.status === 'atrasado' ? 'danger' : 'info',
      title: payment.status === 'atrasado' ? 'Pagamento atrasado' : 'Pagamento pendente',
      description: `Serviço #${payment.serviceId || '-'} • Vencimento: ${formatDate(payment.dueDate)} • R$ ${Number(payment.amount || 0).toFixed(2)}`,
      time: formatTimeLabel(normalizeDate(payment.dueDate)),
      priority: payment.status === 'atrasado' ? 1 : 3,
    });
  });

  return alerts
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 6);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { query } = useSearch();
  // ============================================
  // ESTADOS
  // ============================================
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  // ============================================
  // CARREGAR DADOS
  // ============================================
  useEffect(() => {
    const getUpcomingDeliveries = (services) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      return services.filter((service) => {
        if (!service?.prazo_entrega) return false;
        const dueDate = new Date(service.prazo_entrega);
        if (Number.isNaN(dueDate.getTime())) return false;
        dueDate.setHours(0, 0, 0, 0);
        return dueDate >= today && dueDate <= nextWeek;
      }).length;
    };

    const loadData = async () => {
      try {
        setIsLoading(true);

        const [services, seamstresses, forecastPayments, products] = await Promise.all([
          serviceService.getAll(),
          seamstressService.getAll(),
          fetchPaymentsForecast(),
          productService.getAll(),
        ]);

        const servicesList = Array.isArray(services) ? services : [];
        const seamstressesList = Array.isArray(seamstresses) ? seamstresses : [];
        const paymentsList = Array.isArray(forecastPayments) ? forecastPayments : [];
        const productsList = Array.isArray(products) ? products : [];

        const weeklyCounts = { Seg: 0, Ter: 0, Qua: 0, Qui: 0, Sex: 0, Sáb: 0, Dom: 0 };
        const today = new Date();
        const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
        const start = new Date(end);
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);

        servicesList.forEach((service) => {
          const rawDate = service?.data_envio || service?.prazo_entrega;
          if (!rawDate) return;

          const serviceDate = new Date(rawDate);
          if (Number.isNaN(serviceDate.getTime())) return;

          if (serviceDate < start || serviceDate > end) return;

          const label = WEEKDAY_LABEL[serviceDate.getDay()];
          if (weeklyCounts[label] !== undefined) {
            weeklyCounts[label] += 1;
          }
        });

        const weeklyActivity = WEEKDAY_ORDER.map((day) => ({
          day,
          value: weeklyCounts[day],
        }));

        const productNamesById = {};
        productsList.forEach((product) => {
          productNamesById[product.id] = product.nome || `Produto #${product.id}`;
        });

        const serviceCountsByType = {};
        servicesList.forEach((service) => {
          const ids = Array.isArray(service?.produto) ? service.produto : [];

          if (ids.length === 0) {
            serviceCountsByType['Sem produto'] = (serviceCountsByType['Sem produto'] || 0) + 1;
            return;
          }

          ids.forEach((id) => {
            const name = productNamesById[id] || `Produto #${id}`;
            serviceCountsByType[name] = (serviceCountsByType[name] || 0) + 1;
          });
        });

        const totalDistributionCount = Object.values(serviceCountsByType).reduce(
          (acc, count) => acc + count,
          0
        );

        let distribution = mockStats.distribution;

        if (totalDistributionCount > 0) {
          const sortedTypes = Object.entries(serviceCountsByType).sort((a, b) => b[1] - a[1]);
          const top3 = sortedTypes.slice(0, 3);
          const top3Total = top3.reduce((acc, [, count]) => acc + count, 0);
          const otherCount = Math.max(0, totalDistributionCount - top3Total);

          const entries = [
            ...top3,
            ['Outros', otherCount],
          ];

          while (entries.length < 4) {
            entries.splice(entries.length - 1, 0, [`Categoria ${entries.length + 1}`, 0]);
          }

          const firstThreePercentages = entries
            .slice(0, 3)
            .map(([, count]) => Math.round((count / totalDistributionCount) * 100));

          const used = firstThreePercentages.reduce((acc, value) => acc + value, 0);
          const lastPercentage = Math.max(0, 100 - used);

          distribution = entries.map(([label], index) => {
            const style = DISTRIBUTION_STYLES[index] || DISTRIBUTION_STYLES[0];
            const value = index === 3 ? lastPercentage : firstThreePercentages[index];

            return {
              label,
              value,
              color: style.color,
              swatch: style.swatch,
            };
          });
        }

        const operationalContext = buildOperationalCapacityContext(servicesList, seamstressesList, { days: 7 });
        const workload = operationalContext.workload.slice(0, 4).map((item) => ({
          name: item.name,
          services: item.services,
          percentage: item.percentage,
        }));

        const activeServices = servicesList.length;
        const activeSeamstresses = seamstressesList.filter((item) => item?.ativa !== false).length;
        const pendingPayments = paymentsList.filter(
          (item) => item?.status === 'pendente' || item?.status === 'atrasado'
        ).length;
        const upcomingDeliveries = getUpcomingDeliveries(servicesList);

        const recentActivities = buildRecentActivities(
          servicesList,
          paymentsList,
          seamstressesList,
          productNamesById
        );
        const alerts = buildAlerts(servicesList, paymentsList, productNamesById);

        setStats({
          activeServices,
          seamstresses: activeSeamstresses,
          pendingPayments,
          upcomingDeliveries,
          weeklyActivity,
          distribution,
          workload,
          recentActivities,
          alerts,
          operationalWeeklyCapacity: operationalContext.weeklyCapacity,
          operationalUtilization: operationalContext.utilization,
          operationalCapacity: operationalContext.operationalCapacity,
        });
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
  const {
    weeklyActivity,
    distribution,
    workload,
    recentActivities,
    alerts,
    operationalWeeklyCapacity,
    operationalUtilization,
    operationalCapacity,
  } = stats;
  const maxBarValue = Math.max(...weeklyActivity.map((item) => item.value));
  const normalizedQuery = query.trim().toLowerCase();
  const filteredRecentActivities = normalizedQuery.length === 0
    ? recentActivities
    : recentActivities.filter((activity) => {
        const haystack = [activity.title, activity.description, activity.time, activity.type]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      });
  const filteredAlerts = normalizedQuery.length === 0
    ? alerts
    : alerts.filter((alert) => {
        const haystack = [alert.title, alert.description, alert.time, alert.type]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      });
  const displayName = user?.first_name || user?.full_name || 'Ananda';

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10" role="main">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Bem-vinda, {displayName}</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Aqui está o resumo da sua operação hoje.
          </Typography>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" onClick={() => navigate('/reports')}>
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
              <div className="font-display text-[11px] font-normal uppercase tracking-[0.15em] text-taupe">
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
                <button
                  type="button"
                  className="w-9 rounded-t-md transition-all duration-500 ease-spring cursor-pointer border-0 bg-transparent p-0"
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

          <Typography variant="body2" className="text-taupe mb-4">
            Base operacional: {operationalWeeklyCapacity} serviços por costureira ({operationalCapacity} no total / próximos 7 dias). Utilização atual: {operationalUtilization}%.
          </Typography>

          {workload.map((item) => {
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
            {filteredRecentActivities.map((activity) => {
              const ActivityIcon = activityTypeIcon[activity.type] || CirclePlus;
              return (
                <div key={activity.id}>
                  <div className="flex justify-between text-sm gap-3">
                    <span className="font-medium inline-flex items-center gap-2">
                      <ActivityIcon className="w-4 h-4 text-success" />
                      {activity.title}
                    </span>
                    <span className="text-taupe">{activity.time}</span>
                  </div>
                  <Typography variant="body2" className="text-taupe mt-1">
                    {activity.description}
                  </Typography>
                </div>
              );
            })}

            {filteredRecentActivities.length === 0 && (
              <Typography variant="body2" className="text-taupe">
                Sem atividades correspondentes à busca.
              </Typography>
            )}
          </div>
        </Card>
      </section>

      {/* Alerts */}
      <section aria-label="Alertas e avisos">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3">Alertas e Avisos</Typography>
            <Typography variant="caption">{filteredAlerts.length} itens</Typography>
          </div>

            {filteredAlerts.map((alert) => {
            const AlertIcon = alertTypeIcon[alert.type] || AlertTriangle;
            return (
            <button
              key={alert.id}
              type="button"
              className="flex w-full items-start gap-4 p-4 -mx-1 rounded-md hover:bg-offWhite transition-colors cursor-pointer border-b border-[rgba(75,58,46,0.06)] last:border-b-0 text-left"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0
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
              <Typography variant="caption" className="text-gray-400 whitespace-nowrap pl-3">
                {alert.time}
              </Typography>
            </button>
            );
          })}

          {filteredAlerts.length === 0 && (
            <Typography variant="body2" className="text-taupe">
              Nenhum alerta encontrado com o termo pesquisado.
            </Typography>
          )}
        </Card>
      </section>
    </main>
  );
};

export default Dashboard;