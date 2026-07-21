import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import Alert from '../../components/atoms/Alert';
import SearchBar from '../../components/molecules/SearchBar';
import StatusFilter from '../../components/molecules/StatusFilter';
import { serviceService } from '../../services/serviceService';

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [feedback, setFeedback] = useState(null);

  const showError = (message) => {
    setFeedback({ type: 'error', message, title: 'Erro' });
    setTimeout(() => setFeedback(null), 5000);
  };

  const clearFeedback = () => setFeedback(null);

  const deriveStatus = (service) => {
    if (!service?.prazo_entrega) return 'active';

    const parsedDate = new Date(service.prazo_entrega);
    if (Number.isNaN(parsedDate.getTime())) return 'active';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    parsedDate.setHours(0, 0, 0, 0);

    return parsedDate < today ? 'pending' : 'active';
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return '-';
    const parsed = new Date(rawDate);
    if (Number.isNaN(parsed.getTime())) return String(rawDate);
    return parsed.toLocaleDateString('pt-BR');
  };

  const loadServices = async () => {
    try {
      setIsLoading(true);
      setLoadError('');
      const data = await serviceService.getAll();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      setLoadError('Não foi possível carregar os serviços.');
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadServices();
    };
    fetchData();
  }, [location.key]);

  const toIsoDate = (date) => date.toISOString().split('T')[0];

  const handleSetPending = async (serviceId) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    try {
      await serviceService.update(serviceId, { prazo_entrega: toIsoDate(yesterday) });
      await loadServices();
    } catch (error) {
      showError('Não foi possível atualizar o status do serviço.');
    }
  };

  const handleSetActive = async (serviceId) => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    try {
      await serviceService.update(serviceId, { prazo_entrega: toIsoDate(nextWeek) });
      await loadServices();
    } catch (error) {
      showError('Não foi possível atualizar o status do serviço.');
    }
  };

  const handleDelete = async (service) => {
    const confirmed = window.confirm(`Excluir serviço de ${service.client}?`);
    if (!confirmed) return;

    try {
      await serviceService.delete(service.id);
      await loadServices();
    } catch (error) {
      showError('Não foi possível excluir o serviço.');
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Todos', variant: 'all' },
    { value: 'active', label: 'Ativos', variant: 'active' },
    { value: 'pending', label: 'Pendentes', variant: 'pending' },
  ];

  const mappedServices = useMemo(() => {
    return services.map((service) => {
      const firstProduct = Array.isArray(service.produto) && service.produto.length > 0
        ? `Produto #${service.produto[0]}`
        : 'Produto não informado';

      return {
        id: service.id,
        client: service.cliente_nome || `Cliente #${service.cliente}`,
        type: firstProduct,
        status: deriveStatus(service),
        date: formatDate(service.prazo_entrega || service.data_envio),
      };
    });
  }, [services]);

  const filteredServices = mappedServices.filter((service) => {
    const matchesFilter = filter === 'all' || service.status === filter;
    const matchesSearch = service.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const variants = {
      active: { label: 'Ativo', variant: 'success' },
      pending: { label: 'Pendente', variant: 'warning' },
    };
    return variants[status] || { label: status, variant: 'neutral' };
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {feedback && (
        <Alert
          type={feedback.type}
          title={feedback.title}
          message={feedback.message}
          onClose={clearFeedback}
          className="mb-6"
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Serviços</Typography>
          <Typography variant="body1" className="mt-1">
            Gerencie todos os serviços da sua operação.
          </Typography>
        </div>
        <Button variant="primary" onClick={() => navigate('/services/new')}>
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
        {isLoading && (
          <Card className="p-8 text-center">
            <Typography variant="body1" className="text-taupe">
              Carregando serviços...
            </Typography>
          </Card>
        )}

        {!isLoading && loadError && (
          <Card className="p-8 text-center">
            <Typography variant="body1" className="text-danger">
              {loadError}
            </Typography>
          </Card>
        )}

        {!isLoading && !loadError && filteredServices.length === 0 ? (
          <Card className="p-12 text-center">
            <Typography variant="body1" className="text-taupe">
              Nenhum serviço encontrado
            </Typography>
            <Typography variant="body2" className="text-taupe mt-1">
              Tente ajustar os filtros ou adicione um novo serviço.
            </Typography>
          </Card>
        ) : !isLoading && !loadError ? (
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
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!p-2"
                        onClick={() => navigate(`/services/${service.id}/edit`)}
                        aria-label={`Editar serviço de ${service.client}`}
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!p-2 text-danger hover:text-danger/80"
                        onClick={() => handleDelete(service)}
                        aria-label={`Deletar serviço de ${service.client}`}
                        title="Deletar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        ) : null}
      </div>
    </main>
  );
};

export default Services;