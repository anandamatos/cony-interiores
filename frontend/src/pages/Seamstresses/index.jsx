import { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import SearchBar from '../../components/molecules/SearchBar';
import StatusFilter from '../../components/molecules/StatusFilter';

const Seamstresses = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const mockSeamstresses = [
    { id: 1, name: 'Sirlene', specialty: 'Costura Geral', status: 'active', orders: 4 },
    { id: 2, name: 'Mariana', specialty: 'Bordado', status: 'active', orders: 3 },
    { id: 3, name: 'Joana', specialty: 'Modelagem', status: 'inactive', orders: 2 },
    { id: 4, name: 'Ana Paula', specialty: 'Acabamento', status: 'active', orders: 1 },
  ];

  const filterOptions = [
    { value: 'all', label: 'Todos', variant: 'all' },
    { value: 'active', label: 'Ativos', variant: 'active' },
    { value: 'inactive', label: 'Inativos', variant: 'inactive' },
  ];

  const filteredSeamstresses = mockSeamstresses.filter((s) => {
    const matchesFilter = filter === 'all' || s.status === filter;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const variants = {
      active: { label: 'Ativo', variant: 'success' },
      inactive: { label: 'Inativo', variant: 'neutral' },
    };
    return variants[status] || { label: status, variant: 'neutral' };
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Costureiras</Typography>
          <Typography variant="body1" className="mt-1">
            Gerencie sua equipe de costureiras.
          </Typography>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4" />
          Nova Costureira
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar
          placeholder="Buscar costureiras..."
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

      {/* Seamstresses Grid */}
      {filteredSeamstresses.length === 0 ? (
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-taupe">
            Nenhuma costureira encontrada
          </Typography>
          <Typography variant="body2" className="text-taupe mt-1">
            Tente ajustar os filtros ou adicione uma nova costureira.
          </Typography>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSeamstresses.map((seamstress) => {
            const status = getStatusBadge(seamstress.status);
            return (
              <Card key={seamstress.id} hover className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {seamstress.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography variant="h4" className="truncate">
                      {seamstress.name}
                    </Typography>
                    <Typography variant="body2" className="text-taupe">
                      {seamstress.specialty}
                    </Typography>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant={status.variant} size="sm">
                        {status.label}
                      </Badge>
                      <Typography variant="caption" className="text-gray-400">
                        {seamstress.orders} pedidos
                      </Typography>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Seamstresses;