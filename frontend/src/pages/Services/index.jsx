import { Link } from 'react-router-dom';
import Typography from '../../components/atoms/Typography';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';

const Services = () => {
  const services = [
    { id: 1, cliente: 'João Silva', produto: 'Cortina Ilhós', costureira: 'Sirlene', status: 'Em produção', prazo: '30/06' },
    { id: 2, cliente: 'Maria Souza', produto: 'Forro', costureira: 'Maria', status: 'Aguardando', prazo: '02/07' },
    { id: 3, cliente: 'Carlos Santos', produto: 'Blackout', costureira: 'Joana', status: 'Pronto', prazo: '28/06' },
  ];

  const statusColors = {
    'Em produção': 'warning',
    'Aguardando': 'neutral',
    'Pronto': 'success',
    'Entregue': 'info',
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Typography variant="h2">Serviços</Typography>
        <Link to="/services/new" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto">+ Novo Serviço</Button>
        </Link>
      </div>

      <Card className="p-0 sm:p-6 overflow-hidden">
        {/* Versão Desktop: Tabela */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Produto</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Costureira</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Prazo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-border/50 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4 text-sm font-medium">{service.cliente}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{service.produto}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{service.costureira}</td>
                  <td className="py-3 px-4">
                    <Badge variant={statusColors[service.status] || 'neutral'}>
                      {service.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{service.prazo}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-primary hover:bg-primary/10 rounded transition-colors duration-200">
                        ✏️
                      </button>
                      <button className="p-1 text-error hover:bg-error/10 rounded transition-colors duration-200">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Versão Mobile: Cards */}
        <div className="md:hidden p-4 space-y-4">
          {services.map((service) => (
            <div key={service.id} className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-medium">{service.cliente}</span>
                <Badge variant={statusColors[service.status] || 'neutral'}>
                  {service.status}
                </Badge>
              </div>
              <p className="text-sm text-text-secondary">Produto: {service.produto}</p>
              <p className="text-sm text-text-secondary">Costureira: {service.costureira}</p>
              <p className="text-sm text-text-secondary">Prazo: {service.prazo}</p>
              <div className="flex gap-2 pt-2 border-t border-border/50">
                <button className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors duration-200 text-sm">
                  ✏️ Editar
                </button>
                <button className="p-1.5 text-error hover:bg-error/10 rounded transition-colors duration-200 text-sm">
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Services;