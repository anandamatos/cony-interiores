import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Typography from "../../components/atoms/Typography";
import api from "../../services/api";
import { createService } from "../../services/serviceService";
import { getSeamstresses } from "../../services/seamstressService";

const NewService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente: "",
    costureira: "",
    produto: "",
    quantidade: 1,
    complexidade: "media",
    dataEnvio: "",
    prazoEntrega: "",
    valor: "",
    observacoes: "",
  });
  const [seamstresses, setSeamstresses] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar dados para os selects
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [seamstressData, clientsResponse, productsResponse] = await Promise.all([
          getSeamstresses(),
          api.get("/clientes/"),
          api.get("/produtos/"),
        ]);

        setSeamstresses(seamstressData || []);
        setClients(clientsResponse.data || []);
        setProducts(productsResponse.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados do formulário:", error);
      }
    };

    loadFormData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const clienteId = parseInt(formData.cliente);
      const costureiraId = parseInt(formData.costureira);
      const produtoId = parseInt(formData.produto);
      const quantidade = parseInt(formData.quantidade);
      const valor = parseFloat(formData.valor);

      if (isNaN(clienteId) || clienteId <= 0) {
        alert("Selecione um cliente válido");
        setLoading(false);
        return;
      }
      if (isNaN(costureiraId) || costureiraId <= 0) {
        alert("Selecione uma costureira válida");
        setLoading(false);
        return;
      }
      if (isNaN(produtoId) || produtoId <= 0) {
        alert("Selecione um produto válido");
        setLoading(false);
        return;
      }
      if (isNaN(quantidade) || quantidade <= 0) {
        alert("Quantidade deve ser maior que 0");
        setLoading(false);
        return;
      }
      if (isNaN(valor) || valor <= 0) {
        alert("Valor deve ser maior que 0");
        setLoading(false);
        return;
      }
      if (!formData.dataEnvio) {
        alert("Selecione a data de envio");
        setLoading(false);
        return;
      }
      if (!formData.prazoEntrega) {
        alert("Selecione o prazo de entrega");
        setLoading(false);
        return;
      }

      const serviceData = {
        cliente: clienteId,
        costureira: costureiraId,
        produto: [produtoId],
        quantidade: quantidade,
        complexidade:
          formData.complexidade === "pequena"
            ? 1
            : formData.complexidade === "media"
              ? 2
              : formData.complexidade === "grande"
                ? 3
                : 4,
        data_envio: formData.dataEnvio,
        prazo_entrega: formData.prazoEntrega,
        valor: valor,
        observacoes: formData.observacoes || "",
      };

      console.log("Enviando serviço:", serviceData);
      await createService(serviceData);
      navigate("/services", { state: { reload: Date.now() } });
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      console.log("Detalhes:", error.response?.data);
      const errorMsg =
        error.response?.data?.cliente?.[0] ||
        error.response?.data?.costureira?.[0] ||
        error.response?.data?.produto?.[0] ||
        "Erro ao criar serviço. Tente novamente.";
      alert(`Erro: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Opções para os selects
  const costureiraOptions = seamstresses.map((s) => ({
    value: s.id,
    label: s.nome,
  }));

  const clienteOptions = [
    { value: "", label: "Selecione um cliente" },
    ...clients.map((client) => ({
      value: String(client.id),
      label: client.nome,
    })),
  ];

  const produtoOptions = [
    { value: "", label: "Selecione um produto" },
    ...products.map((product) => ({
      value: String(product.id),
      label: product.nome,
    })),
  ];

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <Typography variant="h1">Novo Serviço</Typography>
          <Typography variant="body1" className="mt-1">
            Cadastre um novo serviço e distribua para a equipe.
          </Typography>
        </div>

        <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
              options={clienteOptions}
            />

            <Select
              label="Costureira"
              name="costureira"
              value={formData.costureira}
              onChange={handleChange}
              required
              options={costureiraOptions}
            />

            <Select
              label="Produto"
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              required
              options={produtoOptions}
            />

            <Select
              label="Complexidade"
              name="complexidade"
              value={formData.complexidade}
              onChange={handleChange}
              options={[
                { value: "pequena", label: "Pequena" },
                { value: "media", label: "Média" },
                { value: "grande", label: "Grande" },
                { value: "especial", label: "Especial" },
              ]}
            />

            <Input
              label="Quantidade"
              name="quantidade"
              type="number"
              value={formData.quantidade}
              onChange={handleChange}
              required
              min={1}
            />

            <Input
              label="Data de Envio"
              name="dataEnvio"
              type="date"
              value={formData.dataEnvio}
              onChange={handleChange}
              required
            />

            <Input
              label="Prazo de Entrega"
              name="prazoEntrega"
              type="date"
              value={formData.prazoEntrega}
              onChange={handleChange}
              required
            />

            <Input
              label="Valor (R$)"
              name="valor"
              type="number"
              value={formData.valor}
              onChange={handleChange}
              required
              placeholder="0.00"
              step="0.01"
            />

            <div className="md:col-span-2">
              <Input
                label="Observações"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                placeholder="Observações adicionais..."
                multiline
                rows={3}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button type="submit" variant="primary" loading={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Serviço"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/services")}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>
        </form>
        </Card>
      </div>
    </main>
  );
};

export default NewService;
