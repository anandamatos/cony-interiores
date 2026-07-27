import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './atoms/Input';
import Button from './atoms/Button';
import Card from './atoms/Card';
import Typography from './atoms/Typography';

const CostureiraForm = ({ initialData = {}, onSubmit, onCancel, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: initialData.nome || '',
    telefone: initialData.telefone || '',
    email: initialData.email || '',
    especialidade: initialData.especialidade || '',
    ativa: initialData.ativa !== undefined ? initialData.ativa : true,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Limpa o erro do campo ao digitar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      navigate('/seamstresses');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <Typography variant="h2" className="mb-6">
        {isEditing ? 'Editar Costureira' : 'Nova Costureira'}
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            error={errors.nome}
            placeholder="Nome completo"
            required
          />

          <Input
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            error={errors.telefone}
            placeholder="(00) 00000-0000"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="email@exemplo.com"
            required
          />

          <Input
            label="Especialidade"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            placeholder="Ex: Vestidos, Costura em geral"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ativa"
            checked={formData.ativa}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label htmlFor="ativa" className="text-sm text-gray-700">
            Ativa
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" variant="primary">
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel || (() => navigate('/seamstresses'))}>
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CostureiraForm;