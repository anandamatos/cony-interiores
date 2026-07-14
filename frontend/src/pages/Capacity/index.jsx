import { useState, useEffect } from 'react';
import { Users, Package, Calendar, Filter } from 'lucide-react';
import Typography from '../../components/atoms/Typography';
import Card from '../../components/atoms/Card';
import Badge from '../../components/atoms/Badge';

const Capacity = () => {
  const [capacityData, setCapacityData] = useState(null);
  const [period, setPeriod] = useState('week');

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

  useEffect(() => {
    setCapacityData(mockData);
  }, []);

  const getLoadColor = (percentage) => {
    if (percentage < 70) return 'text-success bg-success/10';
    if (percentage < 85) return 'text-warning bg-warning/10';
    return 'text-danger bg-danger/10';
  };

  if (!capacityData) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Typography variant="h1">Capacidade</Typography>
        <Typography variant="body1" className="mt-1">Carregando dados...</Typography>
      </main>
    );
  }

  const maxLoad = Math.max(...capacityData.weeklyData.map(d => d.load));

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Capacidade</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Visualize a carga de trabalho da sua operação.
          </Typography>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('week')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-spring ${
              period === 'week'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white/70 backdrop-blur-sm text-primary hover:bg-offWhite'
            }`}
          >
            Semanal
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-spring ${
              period === 'month'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white/70 backdrop-blur-sm text-primary hover:bg-offWhite'
            }`}
          >
            Mensal
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card glass className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe text-xs tracking-wider">
                Carga Atual
              </Typography>
              <Typography variant="h1" className="text-3xl mt-2 font-bold">
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
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                capacityData.currentLoad < 70 ? 'bg-success' :
                capacityData.currentLoad < 85 ? 'bg-warning' : 'bg-danger'
              }`}
              style={{ width: `${capacityData.currentLoad}%` }}
            />
          </div>
        </Card>

        <Card glass className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe text-xs tracking-wider">
                Capacidade Disponível
              </Typography>
              <Typography variant="h1" className="text-3xl mt-2 font-bold">
                {capacityData.available}%
              </Typography>
            </div>
            <div className="w-11 h-11 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-taupe">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card glass className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe text-xs tracking-wider">
                Serviços em Andamento
              </Typography>
              <Typography variant="h1" className="text-3xl mt-2 font-bold">
                {capacityData.servicesInProgress}
              </Typography>
            </div>
            <div className="w-11 h-11 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-taupe">
              <Package className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card glass className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe text-xs tracking-wider">
                Próximos Serviços
              </Typography>
              <Typography variant="h1" className="text-3xl mt-2 font-bold">
                {capacityData.upcoming}
              </Typography>
            </div>
            <div className="w-11 h-11 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-taupe">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </section>

      {/* Weekly Chart */}
      <Card glass className="p-6">
        <div className="mb-6">
          <Typography variant="h3" className="text-[18px] font-semibold">
            Carga Semanal
          </Typography>
          <Typography variant="body2" className="text-taupe text-sm">
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