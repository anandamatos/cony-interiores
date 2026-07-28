import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useEffect, useMemo, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import Alert from '../../components/atoms/Alert';
import SearchBar from '../../components/molecules/SearchBar';
import StatusFilter from '../../components/molecules/StatusFilter';
import { serviceService } from '../../services/serviceService';


const filterOptions = [
  { value: 'all', label: 'Todos', variant: 'all' },
  { value: 'active', label: 'Ativos', variant: 'active' },
  { value: 'pending', label: 'Pendentes', variant: 'pending' },
];

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

const getStatusBadge = (status) => {
  const variants = {
    active: { label: 'Ativo', variant: 'success' },
    pending: { label: 'Pendente', variant: 'warning' },
  };
  return variants[status] || { label: status, variant: 'neutral' };
};

const Reports = () => {

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        setLoadError('');
        const data = await serviceService.getAll();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao carregar dados de relatórios:', error);
        setLoadError('Não foi possível carregar os dados do relatório.');
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

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
        rawDate: service.prazo_entrega || service.data_envio || null,
        date: formatDate(service.prazo_entrega || service.data_envio),
      };
    });
  }, [services]);

  const filteredServices = useMemo(() => {
    return mappedServices.filter((service) => {
      const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
      const matchesSearch =
        service.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.type.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesPeriod = true;
      if (service.rawDate && (startDate || endDate)) {
        const serviceDate = new Date(service.rawDate);
        if (startDate) {
          matchesPeriod = matchesPeriod && serviceDate >= new Date(startDate);
        }
        if (endDate) {
          matchesPeriod = matchesPeriod && serviceDate <= new Date(endDate);
        }
      }

      return matchesStatus && matchesSearch && matchesPeriod;
    });
  }, [mappedServices, searchTerm, statusFilter, startDate, endDate]);

    const chartData = useMemo(() => {
  const counts = filteredServices.reduce((acc, service) => {
    const label = getStatusBadge(service.status).label;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([status, total]) => ({ status, total }));
}, [filteredServices]);

  const handleExport = () => {
    const headers = ['Cliente', 'Tipo', 'Status', 'Data'];
    const rows = filteredServices.map((s) => [s.client, s.type, s.status, s.date]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'relatorio-servicos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
    
 const handleExportPdf = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Relatório de Serviços', 14, 16);
  doc.setFontSize(10);
  doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);

  autoTable(doc, {
    startY: 28,
    head: [['Cliente', 'Tipo', 'Status', 'Data']],
    body: filteredServices.map((s) => [
      s.client,
      s.type,
      getStatusBadge(s.status).label,
      s.date,
    ]),
  });

  doc.save('relatorio-servicos.pdf');
};

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setStartDate('');
    setEndDate('');
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Relatórios</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Acompanhe e exporte os dados da sua operação.
          </Typography>
        </div>
       <div className="flex gap-2">
  <Button variant="secondary" size="sm" onClick={handleExport} disabled={filteredServices.length === 0}>
    <Download className="w-4 h-4" />
    CSV
  </Button>
  <Button variant="primary" size="sm" onClick={handleExportPdf} disabled={filteredServices.length === 0}>
    <Download className="w-4 h-4" />
    PDF
  </Button>
</div>
      </div>

      <Card className="p-5 mb-6">
        <Typography variant="h4" className="mb-4">Filtros</Typography>
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <SearchBar
            placeholder="Buscar por cliente ou produto..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="max-w-md"
          />
          <div className="flex flex-col sm:flex-row gap-4">
           <div>
             <label htmlFor="report-start-date" className="block text-xs font-medium text-taupe mb-1">De</label>
             <input
              id="report-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 rounded-md border border-border text-sm"
          />
        </div>
       <div>
        <label htmlFor="report-end-date" className="block text-xs font-medium text-taupe mb-1">Até</label>
        <input
          id="report-end-date"
         type="date"
         value={endDate}
         onChange={(e) => setEndDate(e.target.value)}
         className="px-3 py-2 rounded-md border border-border text-sm"
        />
    </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
        <div className="mt-4">
          <StatusFilter
            options={filterOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </Card>

      <div className="space-y-3">
        {isLoading && (
          <Card className="p-8 text-center">
            <Typography variant="body1" className="text-taupe">
              Carregando relatório...
            </Typography>
          </Card>
        )}
        
        {!isLoading && !loadError && filteredServices.length > 0 && (
  <Card className="p-5 mb-6">
    <Typography variant="h4" className="mb-4">Serviços por Status</Typography>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="total" fill="#4B3A2E" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
)}
        {!isLoading && loadError && (
          <Alert type="error" title="Erro" message={loadError} />
        )}

        {!isLoading && !loadError && filteredServices.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="w-8 h-8 mx-auto mb-3 text-taupe" />
            <Typography variant="body1" className="text-taupe">
              Nenhum resultado encontrado
            </Typography>
            <Typography variant="body2" className="text-taupe mt-1">
              Ajuste os filtros para ver outros dados.
            </Typography>
          </Card>
        )}

        {!isLoading && !loadError && filteredServices.length > 0 && (
          <>
            <Typography variant="caption" className="text-taupe">
              {filteredServices.length} resultado(s)
            </Typography>
            {filteredServices.map((service) => {
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
                    </div>
                  </div>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
};

export default Reports;