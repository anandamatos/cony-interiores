import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '../../components/atoms/Typography';
import Input from '../../components/atoms/Input';
import Select from '../../components/atoms/Select';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';

const productOptions = [
  { value: 'cortina-ilhos', label: 'Cortina Efeito Ilhós' },
  { value: 'cortina-ilhos-simples', label: 'Cortina de Ilhós' },
  { value: 'cortina-prega', label: 'Cortina de Prega Macho' },
  { value: 'forro', label: 'Forro' },
  { value: 'blackout', label: 'Blackout' },
  { value: 'almofada', label: 'Almofada' },
  { value: 'reforma', label: 'Reforma' },
];

const complexityOptions = [
  { value: 'pequena', label: 'Pequena' },
  { value: 'media', label: 'Média' },
  { value: 'grande', label: 'Grande' },
  { value: 'especial', label: 'Especial' },
];

const seamstressOptions = [
  { value: 'sirlene', label: 'Sirlene Santos' },
  { value: 'maria', label: 'Maria Oliveira' },
  { value: 'joana', label: 'Joana Silva' },
];

const NewService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    produto: '',
    quantidade: 1,
    complexidade: '',
    data_envio: new Date().toISOString().split('T')[0],
    prazo: '',
    valor: '',
    costureira: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Dados do serviço:', formData);
    setTimeout(() => {
      alert('Serviço cadastrado com sucesso! (simulação)');
      setLoading(false);
      navigate('/services');
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h2">Novo Serviço</Typography>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid: 1 coluna em mobile, 2 em desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Cliente"
              name="cliente"
              placeholder="Nome do cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
            />

            <Select
              label="Produto"
              name="produto"
              options={productOptions}
              value={formData.produto}
              onChange={handleChange}
              required
            />

            <Input
              label="Quantidade"
              name="quantidade"
              type="number"
              min="1"
              value={formData.quantidade}
              onChange={handleChange}
              required
            />

            <Select
              label="Complexidade"
              name="complexidade"
              options={complexityOptions}
              value={formData.complexidade}
              onChange={handleChange}
              required
            />

            <Input
              label="Data de Envio"
              name="data_envio"
              type="date"
              value={formData.data_envio}
              onChange={handleChange}
              required
            />

            <Input
              label="Prazo de Entrega"
              name="prazo"
              type="date"
              value={formData.prazo}
              onChange={handleChange}
              required
            />

            <Input
              label="Valor (R$)"
              name="valor"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={formData.valor}
              onChange={handleChange}
              required
            />

            <Select
              label="Costureira"
              name="costureira"
              options={seamstressOptions}
              value={formData.costureira}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Observações"
            name="observacoes"
            placeholder="Observações adicionais (opcional)"
            value={formData.observacoes}
            onChange={handleChange}
          />

          {/* Botões: empilhados em mobile, lado a lado em desktop */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/services')}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" loading={loading} className="w-full sm:w-auto">
              Cadastrar Serviço
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewService;