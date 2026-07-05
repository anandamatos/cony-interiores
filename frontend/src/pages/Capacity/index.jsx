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

  // Cores personalizadas por costureira
  const colors = [
    'rgba(46, 125, 50, 0.8)',
    'rgba(245, 124, 0, 0.8)',
    'rgba(33, 150, 243, 0.8)',
    'rgba(156, 39, 176, 0.8)',
  ];

  const borderColors = [
    'rgba(46, 125, 50, 1)',
    'rgba(245, 124, 0, 1)',
    'rgba(33, 150, 243, 1)',
    'rgba(156, 39, 176, 1)',
  ];

  // Configuração do gráfico
  const chartData = {
    labels: data.map(item => item.nome),
    datasets: [
      {
        label: 'Carga Atual',
        data: data.map(item => item.carga),
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        borderColor: data.map((_, index) => borderColors[index % borderColors.length]),
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Capacidade Máxima',
        data: data.map(item => item.capacidade),
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
        borderColor: 'rgba(200, 200, 200, 0.8)',
        borderWidth: 2,
        borderRadius: 4,
        borderDash: [5, 5],
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
          font: { size: 12 },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: 'Carga de Trabalho por Costureira',
        font: { size: 16, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#212121',
        bodyColor: '#757575',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            if (label === 'Capacidade Máxima') {
              return `${label}: ${value}`;
            }
            const percentage = ((value / 10) * 100).toFixed(0);
            return `${label}: ${value}/10 (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return value + '/10';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  // Calcular estatísticas
  const totalSeamstresses = data.length;
  const averageLoad = (data.reduce((acc, curr) => acc + curr.carga, 0) / totalSeamstresses).toFixed(1);
  const maxLoad = data.reduce((a, b) => a.carga > b.carga ? a : b);
  const minLoad = data.reduce((a, b) => a.carga < b.carga ? a : b);

  // Função para determinar status baseado na carga
  const getStatus = (carga) => {
    if (carga > 8) {
      return { bg: 'bg-error/10', text: 'text-error', bar: 'bg-error', label: '🔴 Sobrecarregada' };
    }
    if (carga > 5) {
      return { bg: 'bg-warning/10', text: 'text-warning-dark', bar: 'bg-warning', label: '🟡 Carga Média' };
    }
    return { bg: 'bg-success/10', text: 'text-success', bar: 'bg-success', label: '🟢 Disponível' };
  };

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
        {data.map((item) => {
          const percent = (item.carga / item.capacidade) * 100;
          const status = getStatus(item.carga);

          return (
            <Card key={item.id} hover className="p-4 transition-all duration-200 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                  {item.nome.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Typography variant="h4" className="text-base sm:text-lg truncate">
                      {item.nome}
                    </Typography>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Barra de progresso com animação */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">Carga</span>
                      <span className="font-medium">{item.carga}/{item.capacidade}</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${status.bar} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Informações adicionais */}
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-text-secondary">
                      <span className="font-medium">Complexidade:</span>
                      <span>{item.complexidade}/5</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-secondary">
                      <span className="font-medium">Especialidade:</span>
                      <span className="truncate">{item.especialidade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Capacity;