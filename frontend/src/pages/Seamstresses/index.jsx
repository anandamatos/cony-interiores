import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSeamstresses } from "../../services/seamstressService";
import Typography from "../../components/atoms/Typography";
import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";

const Seamstresses = () => {
  const [seamstresses, setSeamstresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSeamstresses = async () => {
    setLoading(true);
    try {
      const data = await getSeamstresses();
      setSeamstresses(data);
    } catch (error) {
      console.error("Erro ao carregar costureiras:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSeamstresses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <Typography variant="body" className="mt-4">
            Carregando costureiras...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Typography variant="h2">Costureiras</Typography>
        <Link to="/seamstresses/new">
          <Button variant="primary" className="w-full sm:w-auto">
            + Nova Costureira
          </Button>
        </Link>
      </div>

      {seamstresses.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <Typography variant="body" className="text-text-secondary">
              Nenhuma costureira cadastrada ainda.
            </Typography>
            <Link to="/seamstresses/new">
              <Button variant="primary" className="mt-4">
                Cadastrar primeira costureira
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {seamstresses.map((seamstress) => (
            <Card key={seamstress.id} hover className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-base sm:text-lg flex-shrink-0">
                  {seamstress.nome?.charAt(0) || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Typography variant="h4" className="text-base sm:text-lg truncate">
                      {seamstress.nome}
                    </Typography>
                    <Badge variant={seamstress.ativo ? "success" : "neutral"}>
                      {seamstress.ativo ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                  <Typography
                    variant="caption"
                    className="block mt-0.5 text-xs sm:text-sm truncate"
                  >
                    {seamstress.contato}
                  </Typography>
                  <Typography variant="caption" className="block mt-1 text-xs sm:text-sm">
                    Especialidade: {seamstress.tipo_servico_preferido || "Geral"}
                  </Typography>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Seamstresses;
