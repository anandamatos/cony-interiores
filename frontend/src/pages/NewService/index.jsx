import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Input from '../../components/atoms/Input';
import Select from '../../components/atoms/Select';

const NewService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client: '',
    type: '',
    description: '',
    deadline: '',
    priority: 'medium',
  });

  const serviceTypes = [
    { value: 'cortina', label: 'Cortina' },
    { value: 'almofada', label: 'Almofada' },
    { value: 'tapete', label: 'Tapete' },
    { value: 'capa', label: 'Capa de Poltrona' },
    { value: 'outro', label: 'Outro' },
  ];

  const priorities = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do serviço:', formData);
    // TODO: Integrar com API
    navigate('/services');
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/services')}
          className="!p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <Typography variant="h1">Novo Serviço</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Preencha os dados para criar um novo serviço.
          </Typography>
        </div>
      </div>

      {/* Form */}
      <Card glass className="max-w-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Cliente"
            name="client"
            placeholder="Nome do cliente"
            value={formData.client}
            onChange={handleChange}
            required
          />

          <Select
            label="Tipo de Serviço"
            name="type"
            options={serviceTypes}
            value={formData.type}
            onChange={(value) => handleSelectChange('type', value)}
            placeholder="Selecione o tipo"
            required
          />

          <Input
            label="Descrição"
            name="description"
            placeholder="Descreva o serviço"
            value={formData.description}
            onChange={handleChange}
          />

          <Input
            label="Prazo"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            required
          />

          <Select
            label="Prioridade"
            name="priority"
            options={priorities}
            value={formData.priority}
            onChange={(value) => handleSelectChange('priority', value)}
          />

          <div className="flex gap-3 pt-4 border-t border-[rgba(75,58,46,0.08)]">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/services')}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4" />
              Salvar Serviço
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
};

export default NewService;