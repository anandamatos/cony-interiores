import { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import SearchBar from '../../components/molecules/SearchBar';
import StatusFilter from '../../components/molecules/StatusFilter';

const Services = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const mockServices = [
    { id: 1, client: 'João Silva', type: 'Cortina Ilhós', status: 'active', date: '25/06/2026' },
    { id: 2, client: 'Maria Oliveira', type: 'Almofadas', status: 'pending', date: '28/06/2026' },
    { id: 3, client: 'Ana Costa', type: 'Tapete', status: 'completed', date: '20/06/2026' },
    { id: 4, client: 'Pedro Santos', type: 'Cortina Romana', status: 'pending', date: '30/06/2026' },
    { id: 5, client: 'Carla Souza', type: 'Capa de Poltrona', status: 'active', date: '22/06/2026' },
  ];

  const filterOptions = [
    { value: 'all', label: 'Todos', variant: 'all' },
    { value: 'active', label: 'Ativos', variant: 'active' },
    { value: 'pending', label: 'Pendentes', variant: 'pending' },
    { value: 'completed', label: 'Concluídos', variant: 'completed' },
  ];

  const filteredServices = mockServices.filter((service) => {
    const matchesFilter = filter === 'all' || service.status === filter;
    const matchesSearch = service.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const variants = {
      active: { label: 'Ativo', variant: 'success' },
      pending: { label: 'Pendente', variant: 'warning' },
      completed: { label: 'Concluído', variant: 'info' },
    };
    return variants[status] || { label: status, variant: 'neutral' };
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Serviços</Typography>
          <Typography variant="body1" className="mt-1">
            Gerencie todos os serviços da sua operação.
          </Typography>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4" />
          Novo Serviço
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar
          placeholder="Buscar serviços..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="max-w-md"
        />
        <StatusFilter
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filteredServices.length === 0 ? (
          <Card className="p-12 text-center">
            <Typography variant="body1" className="text-taupe">
              Nenhum serviço encontrado
            </Typography>
            <Typography variant="body2" className="text-taupe mt-1">
              Tente ajustar os filtros ou adicione um novo serviço.
            </Typography>
          </Card>
        ) : (
          filteredServices.map((service) => {
            const status = getStatusBadge(service.status);
            return (
              <Card key={service.id} hover className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <Typography variant="h4">{service.client}</Typography>
                    <Typography variant="body2" className="text-taupe">
                      {service.type}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant={status.variant} size="sm">
                      {status.label}
                    </Badge>
                    <Typography variant="caption" className="text-gray-400">
                      {service.date}
                    </Typography>
                    <Button variant="ghost" size="sm" className="!p-2">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </main>
  );
};

export default Services;