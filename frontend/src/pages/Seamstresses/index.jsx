import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Plus } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import SearchBar from '../../components/molecules/SearchBar';
import StatusFilter from '../../components/molecules/StatusFilter';
import { deleteSeamstress, getSeamstresses, updateSeamstress } from '../../services/seamstressService';

const Seamstresses = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [seamstresses, setSeamstresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionMenuOpenId, setActionMenuOpenId] = useState(null);

  const filterOptions = [
    { value: 'all', label: 'Todos', variant: 'all' },
    { value: 'active', label: 'Ativos', variant: 'active' },
    { value: 'inactive', label: 'Inativos', variant: 'inactive' },
  ];

  const loadSeamstresses = async () => {
    try {
      setIsLoading(true);
      setLoadError('');
      const data = await getSeamstresses();
      setSeamstresses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar costureiras:', error);
      setLoadError('Não foi possível carregar as costureiras.');
      setSeamstresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadSeamstresses();
    };
    fetchData();
  }, []);

  const normalizedSeamstresses = useMemo(() => {
    return seamstresses.map((item) => ({
      id: item.id,
      name: item.nome,
      specialty: item.especialidade || 'Especialidade não informada',
      status: item.ativa ? 'active' : 'inactive',
      orders: item.capacidadeBaseSemanal || 0,
    }));
  }, [seamstresses]);

  const filteredSeamstresses = normalizedSeamstresses.filter((s) => {
    const matchesFilter = filter === 'all' || s.status === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleToggleStatus = async (seamstress) => {
    try {
      await updateSeamstress(seamstress.id, { ativa: seamstress.status !== 'active' });
      setActionMenuOpenId(null);
      await loadSeamstresses();
    } catch (error) {
      alert(error?.message || 'Não foi possível atualizar o status.');
    }
  };

  const handleDelete = async (seamstress) => {
    const confirmed = window.confirm(`Excluir costureira ${seamstress.name}?`);
    if (!confirmed) return;

    try {
      await deleteSeamstress(seamstress.id);
      setActionMenuOpenId(null);
      await loadSeamstresses();
    } catch (error) {
      alert('Não foi possível excluir a costureira.');
    }
  };

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
        <Button variant="primary" onClick={() => navigate('/seamstresses/new')}>
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
      {isLoading && (
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-taupe">
            Carregando costureiras...
          </Typography>
        </Card>
      )}

      {!isLoading && loadError && (
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-danger">
            {loadError}
          </Typography>
        </Card>
      )}

      {!isLoading && !loadError && filteredSeamstresses.length === 0 ? (
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-taupe">
            Nenhuma costureira encontrada
          </Typography>
          <Typography variant="body2" className="text-taupe mt-1">
            Tente ajustar os filtros ou adicione uma nova costureira.
          </Typography>
        </Card>
      ) : !isLoading && !loadError ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSeamstresses.map((seamstress) => {
            const status = getStatusBadge(seamstress.status);
            return (
              <Card key={seamstress.id} hover className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {seamstress.name.charAt(0)}
                  </div>
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => navigate(`/seamstresses/${seamstress.id}/edit`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        navigate(`/seamstresses/${seamstress.id}/edit`);
                      }
                    }}
                  >
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
                        Capacidade: {seamstress.orders}
                      </Typography>
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="!p-2"
                      onClick={() =>
                        setActionMenuOpenId((currentId) =>
                          currentId === seamstress.id ? null : seamstress.id
                        )
                      }
                      aria-label={`Abrir ações para ${seamstress.name}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>

                    {actionMenuOpenId === seamstress.id && (
                      <div className="absolute right-0 mt-2 w-44 rounded-md border border-gray/30 bg-white shadow-dropdown z-20">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-offWhite"
                          onClick={() => navigate(`/seamstresses/${seamstress.id}/edit`)}
                        >
                          Editar costureira
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-offWhite"
                          onClick={() => handleToggleStatus(seamstress)}
                        >
                          {seamstress.status === 'active' ? 'Marcar como inativa' : 'Marcar como ativa'}
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-offWhite"
                          onClick={() => handleDelete(seamstress)}
                        >
                          Excluir costureira
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : null}
    </main>
  );
};

export default Seamstresses;