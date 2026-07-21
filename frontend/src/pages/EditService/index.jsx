import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceService } from '../../services/serviceService';
import { seamstressService } from '../../services/seamstressService';
import { productService } from '../../services/productService';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Alert from '../../components/atoms/Alert';

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [seamstresses, setSeamstresses] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    cliente: '',
    costureira: '',
    produto: '',
    quantidade: 1,
    complexidade: 'media',
    data_envio: '',
    prazo_entrega: '',
    valor: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [svc, seamstrs, prods] = await Promise.all([
          serviceService.getById(id),
          seamstressService.getAll(),
          productService.getAll(),
        ]);

        setService(svc);
        setSeamstresses(seamstrs);
        setProducts(prods);

        // Prefill form
        setFormData({
          cliente: svc.cliente || '',
          costureira: svc.costureira || '',
          produto: svc.produto?.[0] || '',
          quantidade: svc.quantidade || 1,
          complexidade: svc.complexidade || 'media',
          data_envio: svc.data_envio || '',
          prazo_entrega: svc.prazo_entrega || '',
          valor: svc.valor || '',
        });
      } catch (error) {
        console.error('Erro ao carregar serviço:', error);
        setFeedback({
          type: 'error',
          message: 'Não foi possível carregar o serviço.',
        });
        setTimeout(() => navigate('/services'), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const validateField = (name, value) => {
    let error = '';

    if (name === 'cliente' && !value) {
      error = 'Selecione um cliente';
    } else if (name === 'costureira' && !value) {
      error = 'Selecione uma costureira';
    } else if (name === 'produto' && !value) {
      error = 'Selecione um produto';
    } else if (name === 'quantidade' && (!value || parseInt(value) < 1)) {
      error = 'Quantidade deve ser maior que 0';
    } else if (name === 'valor' && (!value || parseFloat(value) <= 0)) {
      error = 'Valor deve ser maior que 0';
    } else if (name === 'data_envio' && !value) {
      error = 'Data de envio é obrigatória';
    } else if (name === 'prazo_entrega' && !value) {
      error = 'Prazo de entrega é obrigatório';
    } else if (name === 'prazo_entrega' && formData.data_envio) {
      const envio = new Date(formData.data_envio);
      const prazo = new Date(value);
      if (prazo <= envio) {
        error = 'Prazo deve ser posterior à data de envio';
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await serviceService.update(id, {
        ...formData,
        produto: formData.produto,
        quantidade: parseInt(formData.quantidade),
        valor: parseFloat(formData.valor),
      });

      setFeedback({
        type: 'success',
        message: 'Serviço atualizado com sucesso!',
      });

      setTimeout(() => navigate('/services'), 1500);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      setFeedback({
        type: 'error',
        message: error?.message || 'Não foi possível atualizar o serviço.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toIsoDate = (date) => {
    if (!date) return '';
    return date.split('T')[0]; // Remove time part
  };

  if (isLoading) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-taupe">
            Carregando serviço...
          </Typography>
        </Card>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-danger">
            Serviço não encontrado.
          </Typography>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="mb-6">
        <Typography variant="h1">Editar Serviço</Typography>
        <Typography variant="body1" className="mt-1 text-taupe">
          Atualize os detalhes do serviço.
        </Typography>
      </div>

      {feedback && (
        <Alert
          type={feedback.type}
          message={feedback.message}
          onClose={() => setFeedback(null)}
          className="mb-6"
        />
      )}

      <Card className="p-6 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Cliente */}
            <div>
              <label htmlFor="cliente" className="block text-sm font-medium mb-1">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                id="cliente"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.cliente ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um cliente</option>
                {/* Options would be populated from API */}
              </select>
              {errors.cliente && (
                <span className="text-red-500 text-sm mt-1">{errors.cliente}</span>
              )}
            </div>

            {/* Costureira */}
            <div>
              <label htmlFor="costureira" className="block text-sm font-medium mb-1">
                Costureira <span className="text-red-500">*</span>
              </label>
              <select
                id="costureira"
                name="costureira"
                value={formData.costureira}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.costureira ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione uma costureira</option>
                {seamstresses.map(s => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
              </select>
              {errors.costureira && (
                <span className="text-red-500 text-sm mt-1">{errors.costureira}</span>
              )}
            </div>

            {/* Produto */}
            <div>
              <label htmlFor="produto" className="block text-sm font-medium mb-1">
                Produto <span className="text-red-500">*</span>
              </label>
              <select
                id="produto"
                name="produto"
                value={formData.produto}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.produto ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um produto</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
              {errors.produto && (
                <span className="text-red-500 text-sm mt-1">{errors.produto}</span>
              )}
            </div>

            {/* Quantidade */}
            <div>
              <label htmlFor="quantidade" className="block text-sm font-medium mb-1">
                Quantidade <span className="text-red-500">*</span>
              </label>
              <Input
                id="quantidade"
                name="quantidade"
                type="number"
                min="1"
                value={formData.quantidade}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.quantidade}
              />
            </div>

            {/* Complexidade */}
            <div>
              <label htmlFor="complexidade" className="block text-sm font-medium mb-1">
                Complexidade
              </label>
              <select
                id="complexidade"
                name="complexidade"
                value={formData.complexidade}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            {/* Data de Envio */}
            <div>
              <label htmlFor="data_envio" className="block text-sm font-medium mb-1">
                Data de Envio <span className="text-red-500">*</span>
              </label>
              <Input
                id="data_envio"
                name="data_envio"
                type="date"
                value={toIsoDate(formData.data_envio)}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.data_envio}
              />
            </div>

            {/* Prazo de Entrega */}
            <div>
              <label htmlFor="prazo_entrega" className="block text-sm font-medium mb-1">
                Prazo de Entrega <span className="text-red-500">*</span>
              </label>
              <Input
                id="prazo_entrega"
                name="prazo_entrega"
                type="date"
                value={toIsoDate(formData.prazo_entrega)}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.prazo_entrega}
              />
            </div>

            {/* Valor */}
            <div>
              <label htmlFor="valor" className="block text-sm font-medium mb-1">
                Valor (R$) <span className="text-red-500">*</span>
              </label>
              <Input
                id="valor"
                name="valor"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.valor}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.valor}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/services')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
};

export default EditService;
