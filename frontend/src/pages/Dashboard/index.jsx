import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import { ClipboardList, Users, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/hello/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Erro ao conectar:', error));
  }, []);

  const metrics = [
    { label: 'Serviços Ativos', value: '12', icon: ClipboardList, color: 'text-primary' },
    { label: 'Costureiras', value: '4', icon: Users, color: 'text-secondary' },
    { label: 'Pagamentos Pendentes', value: '3', icon: DollarSign, color: 'text-error' },
  ];

  return (
    <div>
      {/* Header da página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="body" className="mt-1 text-sm sm:text-base">
            Bem-vinda de volta, Ana! {message}
          </Typography>
        </div>
        <Link to="/services/new" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto">
            + Novo Serviço
          </Button>
        </Link>
      </div>

      {/* Metrics Cards - Grid responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="caption" className="text-xs sm:text-sm">
                  {metric.label}
                </Typography>
                <Typography variant="h2" className="mt-1 text-2xl sm:text-3xl">
                  {metric.value}
                </Typography>
              </div>
              <metric.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${metric.color} opacity-50`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Workload Section */}
      <Card className="mb-6 p-4 sm:p-6">
        <Typography variant="h3" className="mb-4 text-lg sm:text-xl">Carga de Trabalho</Typography>
        <div className="space-y-4">
          {['Sirlene', 'Maria', 'Joana', 'Ana'].map((name) => (
            <div key={name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{name}</span>
                <span className="text-text-secondary">8/10 serviços</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alerts Section */}
      <Card className="p-4 sm:p-6">
        <Typography variant="h3" className="mb-4 text-lg sm:text-xl">⚠️ Serviços em Atraso</Typography>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-error/5 rounded-lg border border-error/20 gap-2">
            <div>
              <span className="font-medium">Cliente: João Silva</span>
              <p className="text-sm text-text-secondary">Cortina Ilhós - Prazo: 25/06</p>
            </div>
            <span className="text-sm text-error font-medium self-start sm:self-auto">+2 dias</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-warning/5 rounded-lg border border-warning/20 gap-2">
            <div>
              <span className="font-medium">Cliente: Maria Souza</span>
              <p className="text-sm text-text-secondary">Forro - Prazo: 28/06</p>
            </div>
            <span className="text-sm text-warning font-medium self-start sm:self-auto">Atraso iminente</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;