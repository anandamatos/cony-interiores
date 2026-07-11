import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Select from '../../components/atoms/Select';
import Typography from '../../components/atoms/Typography';

const NewService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente: '',
    produto: '',
    quantidade: 1,
    complexidade: 'media',
    dataEnvio: '',
    prazoEntrega: '',
    valor: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrar com API
    console.log('Dados do serviço:', formData);
    navigate('/services');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Typography variant="h1" className="mb-6">
        Novo Serviço
      </Typography>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
              placeholder="Nome do cliente"
            />

            <Select
              label="Produto"
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              required
              options={[
                { value: 'cortina', label: 'Cortina' },
                { value: 'forro', label: 'Forro' },
                { value: 'almofada', label: 'Almofada' },
                { value: 'outro', label: 'Outro' },
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

            <Select
              label="Complexidade"
              name="complexidade"
              value={formData.complexidade}
              onChange={handleChange}
              options={[
                { value: 'pequena', label: 'Pequena' },
                { value: 'media', label: 'Média' },
                { value: 'grande', label: 'Grande' },
                { value: 'especial', label: 'Especial' },
              ]}
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

          <div className="flex gap-4 pt-4">
            <Button type="submit" variant="primary">
              Cadastrar Serviço
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/services')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewService;