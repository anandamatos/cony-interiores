import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/atoms/Card';

const NewService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente: '',
    produto: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Serviço cadastrado!');
    navigate('/services');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Novo Serviço</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cliente</label>
            <input
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Produto</label>
            <select
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="">Selecione...</option>
              <option value="cortina-ilhos">Cortina Efeito Ilhós</option>
              <option value="forro">Forro</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewService;