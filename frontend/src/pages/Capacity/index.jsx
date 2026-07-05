import { useState } from 'react';
import Typography from '../../components/atoms/Typography';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Select from '../../components/atoms/Select';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dados mockados (enquanto a API não está pronta)
const mockData = [
  { id: 1, nome: 'Sirlene Santos', carga: 8, capacidade: 10, complexidade: 3, especialidade: 'Cortinas' },
  { id: 2, nome: 'Maria Oliveira', carga: 6, capacidade: 10, complexidade: 2, especialidade: 'Forros' },
  { id: 3, nome: 'Joana Silva', carga: 4, capacidade: 10, complexidade: 1, especialidade: 'Reformas' },
  { id: 4, nome: 'Ana Paula', carga: 9, capacidade: 10, complexidade: 4, especialidade: 'Cortinas' },
];

const periodOptions = [
  { value: 'semana', label: 'Esta Semana' },
  { value: 'mes', label: 'Este Mês' },
];

const Capacity = () => {
  const [data, setData] = useState(mockData);
  const [period, setPeriod] = useState('semana');
  const [loading, setLoading] = useState(false);

  // Configuração do gráfico
  const chartData = {
    labels: data.map(item => item.nome),
    datasets: [
      {
        label: 'Carga Atual',
        data: data.map(item => item.carga),
        backgroundColor: 'rgba(46, 125, 50, 0.7)',
        borderColor: 'rgba(46, 125, 50, 1)',
        borderWidth: 1,
      },
      {
        label: 'Capacidade Máxima',
        data: data.map(item => item.capacidade),
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Carga de Trabalho por Costureira',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  // Calcular estatísticas
  const totalSeamstresses = data.length;
  const averageLoad = (data.reduce((acc, curr) => acc + curr.carga, 0) / totalSeamstresses).toFixed(1);
  const maxLoad = data.reduce((a, b) => a.carga > b.carga ? a : b);
  const minLoad = data.reduce((a, b) => a.carga < b.carga ? a : b);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Typography variant="h2">Capacidade de Produção</Typography>
        <div className="flex flex-wrap gap-2">
          <Select
            label="Período"
            name="period"
            options={periodOptions}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-36"
          />
          <Button variant="secondary" className="sm:w-auto">
            Atualizar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <Typography variant="caption">Total de Costureiras</Typography>
          <Typography variant="h2" className="mt-1">{totalSeamstresses}</Typography>
        </Card>
        <Card>
          <Typography variant="caption">Carga Média</Typography>
          <Typography variant="h2" className="mt-1">{averageLoad}</Typography>
        </Card>
        <Card>
          <Typography variant="caption">Maior Carga</Typography>
          <Typography variant="h2" className="mt-1 truncate">{maxLoad.nome}</Typography>
          <Typography variant="caption">{maxLoad.carga}/10 serviços</Typography>
        </Card>
        <Card>
          <Typography variant="caption">Menor Carga</Typography>
          <Typography variant="h2" className="mt-1 truncate">{minLoad.nome}</Typography>
          <Typography variant="caption">{minLoad.carga}/10 serviços</Typography>
        </Card>
      </div>

      {/* Gráfico */}
      <Card className="mb-6">
        <div className="h-72 w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Card>

      {/* Detalhamento por Costureira */}
      <Typography variant="h3" className="mb-4">Detalhamento por Costureira</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <Card key={item.id} hover className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                {item.nome.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="h4" className="text-base sm:text-lg truncate">
                  {item.nome}
                </Typography>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-sm text-text-secondary flex-shrink-0">Carga:</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300" 
                      style={{ width: `${(item.carga / item.capacidade) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium flex-shrink-0">{item.carga}/{item.capacidade}</span>
                </div>
                <div className="mt-1 text-sm text-text-secondary">
                  Complexidade: {item.complexidade} | Especialidade: {item.especialidade}
                </div>
                <div className="mt-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.carga > 8 ? 'bg-error/10 text-error' :
                    item.carga > 5 ? 'bg-warning/10 text-warning-dark' :
                    'bg-success/10 text-success'
                  }`}>
                    {item.carga > 8 ? '🔴 Sobrecarregada' :
                     item.carga > 5 ? '🟡 Carga Média' :
                     '🟢 Disponível'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Capacity;