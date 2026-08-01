import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, CreditCard, DollarSign, Wallet } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Badge from '../../components/atoms/Badge';
import Button from '../../components/atoms/Button';
import Alert from '../../components/atoms/Alert';
import { serviceService } from '../../services/serviceService';
import {
  fetchMonthlyPlanning,
  fetchPaymentsForecast,
  fetchWeeklyPlanning,
} from '../../services/financialUxService';

const Financial = () => {
  const [periodFilter, setPeriodFilter] = useState('week');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [weeklyPlanning, setWeeklyPlanning] = useState([]);
  const [monthlyPlanning, setMonthlyPlanning] = useState([]);
  const [forecastPayments, setForecastPayments] = useState([]);
  const [servicesById, setServicesById] = useState({});

  useEffect(() => {
    let isMounted = true;

    const loadFinancialData = async () => {
      try {
        setIsLoading(true);
        setLoadError('');

        const [weekData, monthData, forecastData, services] = await Promise.all([
          fetchWeeklyPlanning(),
          fetchMonthlyPlanning(),
          fetchPaymentsForecast(),
          serviceService.getAll(),
        ]);

        if (!isMounted) return;

        const mappedServices = {};
        (Array.isArray(services) ? services : []).forEach((item) => {
          mappedServices[item.id] = item;
        });

        setWeeklyPlanning(weekData);
        setMonthlyPlanning(monthData);
        setForecastPayments(forecastData);
        setServicesById(mappedServices);
      } catch (error) {
        console.error('Erro ao carregar dados financeiros:', error);
        if (!isMounted) return;
        setLoadError('Nao foi possivel carregar o resumo financeiro.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFinancialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0));

  const formatDate = (value) => {
    if (!value) return '-';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return String(value);
    return parsed.toLocaleDateString('pt-BR');
  };

  const paymentRows = useMemo(() => {
    return forecastPayments.map((payment) => {
      const service = servicesById[payment.serviceId] || {};
      return {
        ...payment,
        seamstressName: service.costureira_nome || `Costureira #${service.costureira || '-'}`,
        clientName: service.cliente_nome || `Cliente #${service.cliente || '-'}`,
      };
    });
  }, [forecastPayments, servicesById]);

  const filteredPayments = useMemo(() => {
    if (statusFilter === 'all') return paymentRows;
    return paymentRows.filter((item) => item.status === statusFilter);
  }, [paymentRows, statusFilter]);

  const planningData = periodFilter === 'month' ? monthlyPlanning : weeklyPlanning;

  const totalProjected = useMemo(
    () => planningData.reduce((acc, item) => acc + Number(item.total || 0), 0),
    [planningData]
  );

  const seamstressWeeklySummary = useMemo(() => {
    const grouped = {};

    filteredPayments.forEach((payment) => {
      const seamstressName = payment.seamstressName || 'Sem costureira';
      if (!grouped[seamstressName]) {
        grouped[seamstressName] = { seamstressName, amount: 0, quantity: 0 };
      }
      grouped[seamstressName].amount += Number(payment.amount || 0);
      grouped[seamstressName].quantity += 1;
    });

    return Object.values(grouped).sort((a, b) => b.amount - a.amount);
  }, [filteredPayments]);

  const statusConfig = {
    pago: { label: 'Pago', variant: 'success' },
    pendente: { label: 'Pendente', variant: 'warning' },
    atrasado: { label: 'Atrasado', variant: 'danger' },
    cancelado: { label: 'Cancelado', variant: 'neutral' },
  };

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'pendente', label: 'Pendente' },
    { value: 'atrasado', label: 'Atrasado' },
    { value: 'pago', label: 'Pago' },
  ];

  if (isLoading) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Typography variant="body1">Carregando resumo financeiro...</Typography>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Alert type="error" title="Erro" message={loadError} />
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Resumo Financeiro</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Visao consolidada de pagamentos por semana e por costureira.
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={periodFilter === 'week' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setPeriodFilter('week')}
          >
            Semana
          </Button>
          <Button
            variant={periodFilter === 'month' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setPeriodFilter('month')}
          >
            Mes
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">Total Previsto</Typography>
              <Typography variant="h3" className="mt-1">{formatCurrency(totalProjected)}</Typography>
            </div>
            <div className="w-10 h-10 rounded-md bg-gold/20 text-primary flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">Pagamentos Previstos</Typography>
              <Typography variant="h3" className="mt-1">{paymentRows.length}</Typography>
            </div>
            <div className="w-10 h-10 rounded-md bg-info/10 text-info flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">Costureiras no Periodo</Typography>
              <Typography variant="h3" className="mt-1">{seamstressWeeklySummary.length}</Typography>
            </div>
            <div className="w-10 h-10 rounded-md bg-success/10 text-success flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">Filtrados por Status</Typography>
              <Typography variant="h3" className="mt-1">{filteredPayments.length}</Typography>
            </div>
            <div className="w-10 h-10 rounded-md bg-warning/10 text-warning flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <Typography variant="h2">Planejamento {periodFilter === 'week' ? 'Semanal' : 'Mensal'}</Typography>
          <Typography variant="body2" className="mt-1 text-taupe">
            Valores consolidados para apoiar a visao rapida da operacao financeira.
          </Typography>
        </div>

        <div className="space-y-3">
          {planningData.map((item) => (
            <Card key={item.period} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Typography variant="caption" className="uppercase text-taupe">Periodo</Typography>
                  <Typography variant="h4" className="mt-1">{item.period}</Typography>
                </div>
                <Typography variant="h3">{formatCurrency(item.total)}</Typography>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <Typography variant="h2">Valores por Costureira</Typography>
          <Typography variant="body2" className="mt-1 text-taupe">
            Resumo semanal simplificado para tomada de decisao manual.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seamstressWeeklySummary.map((item) => (
            <Card key={item.seamstressName} className="p-5">
              <Typography variant="h4">{item.seamstressName}</Typography>
              <Typography variant="body2" className="text-taupe mt-1">
                {item.quantity} pagamento{item.quantity === 1 ? '' : 's'}
              </Typography>
              <Typography variant="h3" className="mt-3">
                {formatCurrency(item.amount)}
              </Typography>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Typography variant="h2">Pagamentos</Typography>
            <Typography variant="body2" className="mt-1 text-taupe">
              Lista organizada com indicadores visuais por status.
            </Typography>
          </div>

          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                size="sm"
                variant={statusFilter === option.value ? 'primary' : 'secondary'}
                onClick={() => setStatusFilter(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-2">
            {filteredPayments.map((payment) => {
              const status = statusConfig[payment.status] || {
                label: payment.status,
                variant: 'neutral',
              };

              return (
                <div
                  key={payment.paymentId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-md border-b border-gray/40 last:border-b-0"
                >
                  <div>
                    <Typography variant="h4">{payment.seamstressName}</Typography>
                    <Typography variant="body2" className="text-taupe">
                      {payment.clientName} • Entrega: {formatDate(payment.dueDate)}
                    </Typography>
                  </div>

                  <div className="flex items-center gap-3">
                    <Typography variant="h4" className="font-semibold">
                      {formatCurrency(payment.amount)}
                    </Typography>
                    <Badge variant={status.variant} size="sm">{status.label}</Badge>
                  </div>
                </div>
              );
            })}

            {filteredPayments.length === 0 && (
              <div className="py-8 text-center">
                <Typography variant="body1" className="text-taupe">
                  Nenhum pagamento encontrado para o filtro selecionado.
                </Typography>
              </div>
            )}
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Financial;