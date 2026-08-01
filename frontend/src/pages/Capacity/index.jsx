import { useEffect, useMemo, useState } from 'react';
import { Users, Package, Calendar } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Badge from '../../components/atoms/Badge';
import StatusFilter from '../../components/molecules/StatusFilter';
import Alert from '../../components/atoms/Alert';
import { fetchCapacityByPeriod } from '../../services/capacityService';
import { serviceService } from '../../services/serviceService';
import { seamstressService } from '../../services/seamstressService';
import {
  buildOperationalCapacityContext,
  normalizeDate,
  startOfDay,
  endOfDay,
  getOperationalWindow,
} from '../../utils/operationalCapacity';

const WEEK_ORDER = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const WEEKDAY_LABEL = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_WEEKS = ['1ª Sem', '2ª Sem', '3ª Sem', '4ª Sem', '5ª Sem'];

const percentToTone = (percentage) => {
  if (percentage < 70) return { text: 'Boa', className: 'text-success bg-success/10', bar: 'bg-sage' };
  if (percentage < 85) return { text: 'Média', className: 'text-warning bg-warning/10', bar: 'bg-gold' };
  return { text: 'Crítica', className: 'text-danger bg-danger/10', bar: 'bg-terracota' };
};

const Capacity = () => {
  const [period, setPeriod] = useState('week');
  const [capacityRows, setCapacityRows] = useState([]);
  const [seamstresses, setSeamstresses] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const periodOptions = [
    { value: 'week', label: 'Semanal', variant: 'all' },
    { value: 'month', label: 'Mensal', variant: 'active' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError('');

        const [capacityResponse, servicesResponse, seamstressesResponse] = await Promise.all([
          fetchCapacityByPeriod(period),
          serviceService.getAll(),
          seamstressService.getAll(),
        ]);

        setCapacityRows(Array.isArray(capacityResponse) ? capacityResponse : []);
        setServices(Array.isArray(servicesResponse) ? servicesResponse : []);
        setSeamstresses(Array.isArray(seamstressesResponse) ? seamstressesResponse : []);
      } catch (loadErr) {
        console.error('Erro ao carregar capacidade:', loadErr);
        setError('Não foi possível carregar os dados de capacidade.');
        setCapacityRows([]);
        setServices([]);
        setSeamstresses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [period]);

  const capacityData = useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const nextWeekEnd = endOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));
    const operationalContext = buildOperationalCapacityContext(services, seamstresses, { days: 7 });
    const technicalById = {};
    capacityRows.forEach((row) => {
      technicalById[row.costureira_id] = row;
    });

    const totalCapacity = capacityRows.reduce((acc, row) => acc + Number(row.capacidade_base_semanal || 0), 0);
    const totalLoad = capacityRows.reduce((acc, row) => acc + Number(row.carga_atual || 0), 0);
    const currentLoad = totalCapacity > 0 ? Math.min(999, Math.round((totalLoad / totalCapacity) * 100)) : 0;
    const available = Math.max(0, 100 - Math.min(100, currentLoad));

    const servicesInProgress = services.filter((service) => {
      const sent = normalizeDate(service?.data_envio);
      const due = normalizeDate(service?.prazo_entrega);
      if (!sent || !due) return false;
      return sent <= todayEnd && due >= todayStart;
    }).length;

    const upcoming = services.filter((service) => {
      const due = normalizeDate(service?.prazo_entrega);
      if (!due) return false;
      return due >= todayStart && due <= nextWeekEnd;
    }).length;

    const weeklyCounts = { Seg: 0, Ter: 0, Qua: 0, Qui: 0, Sex: 0, Sáb: 0, Dom: 0 };
    const weekWindow = getOperationalWindow(7);

    operationalContext.upcomingServices.forEach((service) => {
      const sent = normalizeDate(service?.prazo_entrega);
      if (!sent || sent < weekWindow.start || sent > weekWindow.end) return;
      const label = WEEKDAY_LABEL[sent.getDay()];
      if (weeklyCounts[label] !== undefined) weeklyCounts[label] += 1;
    });

    const monthlyCounts = [0, 0, 0, 0, 0];
    const monthStart = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
    const monthEnd = endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0));

    services.forEach((service) => {
      const sent = normalizeDate(service?.prazo_entrega);
      if (!sent || sent < monthStart || sent > monthEnd) return;
      const index = Math.min(4, Math.floor((sent.getDate() - 1) / 7));
      monthlyCounts[index] += 1;
    });

    const weeklyDenominator = Math.max(1, operationalContext.operationalCapacity);
    const monthlyDenominator = Math.max(1, operationalContext.operationalCapacity * 4);

    const weeklyData = WEEK_ORDER.map((day) => ({
      day,
      load: Math.round((weeklyCounts[day] / weeklyDenominator) * 100),
      volume: weeklyCounts[day],
    }));

    const monthlyData = MONTH_WEEKS.map((week, index) => ({
      day: week,
      load: Math.round((monthlyCounts[index] / monthlyDenominator) * 100),
      volume: monthlyCounts[index],
    }));

    return {
      totalCapacity,
      currentLoad,
      available,
      servicesInProgress,
      seamstresses: operationalContext.activeSeamstresses.length,
      upcoming,
      weeklyData,
      monthlyData,
      operationalWeeklyCapacity: operationalContext.weeklyCapacity,
      operationalCapacity: operationalContext.operationalCapacity,
      operationalUtilization: operationalContext.utilization,
      operationalAssignedServices: operationalContext.assignedServices,
      seamstressLoad: operationalContext.workload.map((row) => ({
        id: row.id,
        nome: row.name,
        services: row.services,
        cargaSemanal: row.percentage,
        cargaTecnica: Math.round(Number(technicalById[row.id]?.carga_percentual_semanal || 0)),
        diasLivres: Number(technicalById[row.id]?.dias_livres || 0),
      })),
    };
  }, [capacityRows, services, seamstresses]);

  const periodLoadSeries = period === 'month' ? capacityData.monthlyData : capacityData.weeklyData;
  const maxLoad = Math.max(...(periodLoadSeries.map((d) => d.load) || [0]));

  if (isLoading) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Typography variant="body1">Carregando capacidade...</Typography>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Alert type="error" title="Erro" message={error} />
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Capacidade</Typography>
          <Typography variant="body1" className="mt-1">
            Visualize a carga de trabalho da sua operação.
          </Typography>
        </div>
        <StatusFilter options={periodOptions} value={period} onChange={setPeriod} />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Carga Atual
              </Typography>
              <Typography variant="h1" className="text-3xl mt-1">
                {capacityData.currentLoad}%
              </Typography>
            </div>
            <Badge variant="neutral" size="sm" className={percentToTone(capacityData.currentLoad).className}>
              {percentToTone(capacityData.currentLoad).text}
            </Badge>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-md mt-3 overflow-hidden">
            <div
              className={`h-full rounded-md transition-all duration-500 ${percentToTone(capacityData.currentLoad).bar}`}
              style={{ width: `${Math.min(capacityData.currentLoad, 100)}%` }}
            />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Uso Operacional (7 dias)
              </Typography>
              <Typography variant="h1" className="text-3xl mt-1">
                {capacityData.operationalUtilization}%
              </Typography>
            </div>
            <div className="w-10 h-10 rounded-md bg-offWhite flex items-center justify-center text-taupe">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Serviços em Andamento
              </Typography>
              <Typography variant="h1" className="text-3xl mt-1">
                {capacityData.servicesInProgress}
              </Typography>
            </div>
            <div className="w-10 h-10 rounded-md bg-offWhite flex items-center justify-center text-taupe">
              <Package className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Próximos Serviços
              </Typography>
              <Typography variant="h1" className="text-3xl mt-1">
                {capacityData.upcoming}
              </Typography>
            </div>
            <div className="w-10 h-10 rounded-md bg-offWhite flex items-center justify-center text-taupe">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </section>

      <Card className="p-6">
        <div className="mb-6">
          <Typography variant="h3">Carga Temporal</Typography>
          <Typography variant="body2" className="text-taupe">
            Distribuição de entregas previstas por {period === 'month' ? 'semana do mês' : 'dia da semana'},
            com referência à capacidade operacional de {capacityData.operationalCapacity} serviços.
          </Typography>
        </div>

        <div className="flex items-end justify-between h-48 gap-3 pt-4">
          {periodLoadSeries.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full max-w-12 h-32 flex items-end bg-offWhite rounded-t">
                <div
                  className="w-full rounded-t transition-all duration-500 ease-spring"
                  style={{
                    height: `${maxLoad > 0 ? Math.max(12, (item.load / maxLoad) * 100) : 12}%`,
                    backgroundColor: item.load > 85
                      ? '#B56A4A'
                      : item.load > 70
                      ? '#C9A86A'
                      : '#4A7C59',
                  }}
                />
              </div>
              <div className="text-center">
                <Typography variant="caption" className="text-xs font-medium">
                  {item.load}% ({item.volume})
                </Typography>
                <Typography variant="caption" className="text-xs text-taupe block">
                  {item.day}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mt-8">
        <div className="mb-4">
          <Typography variant="h3">Carga por Costureira</Typography>
          <Typography variant="body2" className="text-taupe">
            Carga operacional (dashboard) e carga técnica (core) lado a lado.
          </Typography>
        </div>

        <div className="mb-4 rounded-md border border-border bg-offWhite px-4 py-3">
          <Typography variant="body2" className="text-taupe">
            Capacidade base ativa: {capacityData.operationalWeeklyCapacity} serviços/costureira. Planejado: {capacityData.operationalAssignedServices} de {capacityData.operationalCapacity} serviços nos próximos 7 dias.
          </Typography>
        </div>

        <div className="space-y-3">
          {capacityData.seamstressLoad.map((item) => (
            <div key={item.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between mb-2">
                <Typography variant="h4">{item.nome}</Typography>
                <Typography variant="caption" className="text-taupe">
                  {item.diasLivres.toFixed(1)} dias livres
                </Typography>
              </div>
              <div className="w-full h-2 bg-offWhite rounded-md overflow-hidden">
                <div
                  className={`h-full rounded-md ${percentToTone(item.cargaSemanal).bar}`}
                  style={{ width: `${Math.min(item.cargaSemanal, 100)}%` }}
                />
              </div>
              <Typography variant="caption" className="text-xs text-taupe mt-1 block">
                Operacional: {item.services} serviços ({item.cargaSemanal}%) | Técnica core: {item.cargaTecnica}%
              </Typography>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
};

export default Capacity;
