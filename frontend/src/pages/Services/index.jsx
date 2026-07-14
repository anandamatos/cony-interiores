import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../../services/serviceService";
import Typography from "../../components/atoms/Typography";
import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const statusColors = {
    "Em produção": "warning",
    Aguardando: "neutral",
    Pronto: "success",
    Entregue: "info",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <Typography variant="body" className="mt-4">
            Carregando serviços...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Typography variant="h2">Serviços</Typography>
        <Link to="/services/new" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto">
            + Novo Serviço
          </Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <Typography variant="body" className="text-text-secondary">
              Nenhum serviço cadastrado ainda.
            </Typography>
            <Link to="/services/new">
              <Button variant="primary" className="mt-4">
                Cadastrar primeiro serviço
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="p-0 sm:p-6 overflow-hidden">
          {/* Versão Desktop: Tabela */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Produto
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Costureira
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Prazo
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-border/50 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 text-sm font-medium">
                      {service.cliente_nome || service.cliente}
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">Produto</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">
                      {service.costureira_nome || service.costureira}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="neutral">Em andamento</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">
                      {service.prazo_entrega}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">R$ {service.valor}</td>
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
                  <span className="font-medium">{service.cliente_nome || service.cliente}</span>
                  <Badge variant="neutral">Em andamento</Badge>
                </div>
                <p className="text-sm text-text-secondary">
                  Costureira: {service.costureira_nome || service.costureira}
                </p>
                <p className="text-sm text-text-secondary">Prazo: {service.prazo_entrega}</p>
                <p className="text-sm font-medium">Valor: R$ {service.valor}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Services;
