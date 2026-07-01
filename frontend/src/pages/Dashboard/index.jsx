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
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="body" className="mt-1">
            Bem-vinda de volta, Ana! {message}
          </Typography>
        </div>
        <Link to="/services/new">
          <Button variant="primary">
            + Novo Serviço
          </Button>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="caption">{metric.label}</Typography>
                <Typography variant="h2" className="mt-1">{metric.value}</Typography>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color} opacity-50`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Workload Section */}
      <Card className="mb-6">
        <Typography variant="h3" className="mb-4">Carga de Trabalho</Typography>
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
      <Card>
        <Typography variant="h3" className="mb-4">⚠️ Serviços em Atraso</Typography>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-error/5 rounded-lg border border-error/20">
            <div>
              <span className="font-medium">Cliente: João Silva</span>
              <p className="text-sm text-text-secondary">Cortina Ilhós - Prazo: 25/06</p>
            </div>
            <span className="text-sm text-error font-medium">+2 dias</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div>
              <span className="font-medium">Cliente: Maria Souza</span>
              <p className="text-sm text-text-secondary">Forro - Prazo: 28/06</p>
            </div>
            <span className="text-sm text-warning font-medium">Atraso iminente</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;