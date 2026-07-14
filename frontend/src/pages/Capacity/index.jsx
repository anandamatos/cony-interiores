import { useState } from 'react';
import { Users, Package, Calendar } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Badge from '../../components/atoms/Badge';
import StatusFilter from '../../components/molecules/StatusFilter';

const Capacity = () => {
  const [period, setPeriod] = useState('week');

  // Mock data
  const mockData = {
    totalCapacity: 100,
    currentLoad: 72,
    available: 28,
    servicesInProgress: 12,
    seamstresses: 4,
    upcoming: 8,
    weeklyData: [
      { day: 'Seg', load: 65 },
      { day: 'Ter', load: 78 },
      { day: 'Qua', load: 82 },
      { day: 'Qui', load: 90 },
      { day: 'Sex', load: 75 },
      { day: 'Sáb', load: 55 },
      { day: 'Dom', load: 30 },
    ],
  };

  const periodOptions = [
    { value: 'week', label: 'Semanal', variant: 'all' },
    { value: 'month', label: 'Mensal', variant: 'active' },
  ];

  const capacityData = mockData;

  const getLoadColor = (percentage) => {
    if (percentage < 70) return 'text-success bg-success/10';
    if (percentage < 85) return 'text-warning bg-warning/10';
    return 'text-danger bg-danger/10';
  };

  const maxLoad = Math.max(...(capacityData?.weeklyData?.map(d => d.load) || [0]));

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Capacidade</Typography>
          <Typography variant="body1" className="mt-1">
            Visualize a carga de trabalho da sua operação.
          </Typography>
        </div>
        <StatusFilter
          options={periodOptions}
          value={period}
          onChange={setPeriod}
        />
      </div>

      {/* Stats Cards */}
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
            <Badge
              variant="neutral"
              size="sm"
              className={getLoadColor(capacityData.currentLoad)}
            >
              {capacityData.currentLoad < 70 ? 'Boa' : capacityData.currentLoad < 85 ? 'Média' : 'Crítica'}
            </Badge>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-md mt-3 overflow-hidden">
            <div
              className={`h-full rounded-md transition-all duration-500 ${
                capacityData.currentLoad < 70 ? 'bg-success' :
                capacityData.currentLoad < 85 ? 'bg-warning' : 'bg-danger'
              }`}
              style={{ width: `${capacityData.currentLoad}%` }}
            />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Capacidade Disponível
              </Typography>
              <Typography variant="h1" className="text-3xl mt-1">
                {capacityData.available}%
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

      {/* Weekly Chart */}
      <Card className="p-6">
        <div className="mb-6">
          <Typography variant="h3">Carga Semanal</Typography>
          <Typography variant="body2" className="text-taupe">
            Distribuição da carga de trabalho por dia
          </Typography>
        </div>

        <div className="flex items-end justify-between h-48 gap-3 pt-4">
          {capacityData.weeklyData.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-3">
              <div
                className="w-full max-w-12 rounded-t transition-all duration-500 ease-spring"
                style={{
                  height: `${(item.load / maxLoad) * 100}%`,
                  minHeight: '16px',
                  background: item.load > 85
                    ? 'var(--color-terracota)'
                    : item.load > 70
                    ? 'var(--color-gold)'
                    : 'var(--color-sage)',
                }}
              />
              <div className="text-center">
                <Typography variant="caption" className="text-xs font-medium">
                  {item.load}%
                </Typography>
                <Typography variant="caption" className="text-xs text-taupe block">
                  {item.day}
                </Typography>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-terracota" />
            <Typography variant="caption">Crítico (&gt;85%)</Typography>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gold" />
            <Typography variant="caption">Médio (70-85%)</Typography>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-sage" />
            <Typography variant="caption">Bom (&lt;70%)</Typography>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default Capacity;