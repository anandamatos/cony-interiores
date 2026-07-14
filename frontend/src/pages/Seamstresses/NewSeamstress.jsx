import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Input from '../../components/atoms/Input';
import Select from '../../components/atoms/Select';

const NewSeamstress = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
    status: 'active',
  });

  const specialties = [
    { value: 'costura-geral', label: 'Costura Geral' },
    { value: 'bordado', label: 'Bordado' },
    { value: 'modelagem', label: 'Modelagem' },
    { value: 'acabamento', label: 'Acabamento' },
    { value: 'outro', label: 'Outro' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
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
    console.log('Dados da costureira:', formData);
    // TODO: Integrar com API
    navigate('/seamstresses');
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/seamstresses')}
          className="!p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <Typography variant="h1">Nova Costureira</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Preencha os dados para adicionar uma nova costureira.
          </Typography>
        </div>
      </div>

      {/* Form */}
      <Card glass className="max-w-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome Completo"
            name="name"
            placeholder="Nome da costureira"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Select
            label="Especialidade"
            name="specialty"
            options={specialties}
            value={formData.specialty}
            onChange={(value) => handleSelectChange('specialty', value)}
            placeholder="Selecione a especialidade"
            required
          />

          <Input
            label="Telefone"
            name="phone"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            value={formData.email}
            onChange={handleChange}
          />

          <Select
            label="Status"
            name="status"
            options={statusOptions}
            value={formData.status}
            onChange={(value) => handleSelectChange('status', value)}
          />

          <div className="flex gap-3 pt-4 border-t border-[rgba(75,58,46,0.08)]">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/seamstresses')}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4" />
              Salvar Costureira
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
};

export default NewSeamstress;