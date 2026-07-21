import { useState, useEffect } from 'react';
import { serviceService } from '../../../services/serviceService';
import { seamstressService } from '../../../services/seamstressService';
import { productService } from '../../../services/productService';
import Alert from '../../atoms/Alert';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';

const ServiceForm = ({
  initialData = null,
  isEditing = false,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialData || {
    cliente: '',
    costureira: '',
    produto: '',
    quantidade: 1,
    complexidade: 'media',
    dataEnvio: '',
    prazoEntrega: '',
    valor: '',
    observacoes: '',
  });

  // Estados de carregamento por endpoint
  const [clientes, setClientes] = useState([]);
  const [costureiras, setCostureiras] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [loadingCostureiras, setLoadingCostureiras] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [errorClientes, setErrorClientes] = useState(null);
  const [errorCostureiras, setErrorCostureiras] = useState(null);
  const [errorProdutos, setErrorProdutos] = useState(null);

  const showSuccess = (message, title) => {
    setFeedback({ type: 'success', message, title });
    setTimeout(() => setFeedback(null), 5000);
  };

  const showError = (message, title) => {
    setFeedback({ type: 'error', message, title });
    setTimeout(() => setFeedback(null), 5000);
  };

  const showInfo = (message, title) => {
    setFeedback({ type: 'info', message, title });
    setTimeout(() => setFeedback(null), 3000);
  };

  const clearFeedback = () => setFeedback(null);

  // Fetch com retry (reutilizável)
  const fetchWithRetry = async (fetchFn, setData, setLoading, setError, retries = 2) => {
    setLoading(true);
    setError(null);
    let attempt = 0;
    while (attempt <= retries) {
      try {
        const data = await fetchFn();
        setData(data);
        setLoading(false);
        return data;
      } catch (err) {
        attempt++;
        if (attempt > retries) {
          setError(err.message || 'Erro ao carregar dados');
          setLoading(false);
          throw err;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  // Carregar dados ao montar
  useEffect(() => {
    const loadData = async () => {
      showInfo('Carregando dados...', 'Aguarde');
      try {
        await Promise.all([
          fetchWithRetry(
            () => serviceService.getClientes?.() || Promise.resolve([]),
            setClientes,
            setLoadingClientes,
            setErrorClientes
          ),
          fetchWithRetry(
            seamstressService.getAll,
            setCostureiras,
            setLoadingCostureiras,
            setErrorCostureiras
          ),
          fetchWithRetry(
            productService.getAll,
            setProdutos,
            setLoadingProdutos,
            setErrorProdutos
          ),
        ]);
        clearFeedback();
      } catch (error) {
        showError('Falha ao carregar dados. Use o botão "Tentar novamente".', 'Erro de Carregamento');
      }
    };
    loadData();
  }, []);

  const handleRetry = async () => {
    showInfo('Recarregando dados...', 'Aguarde');
    try {
      const promises = [];
      if (errorClientes) {
        promises.push(
          fetchWithRetry(
            () => serviceService.getClientes?.() || Promise.resolve([]),
            setClientes,
            setLoadingClientes,
            setErrorClientes
          )
        );
      }
      if (errorCostureiras) {
        promises.push(
          fetchWithRetry(
            seamstressService.getAll,
            setCostureiras,
            setLoadingCostureiras,
            setErrorCostureiras
          )
        );
      }
      if (errorProdutos) {
        promises.push(
          fetchWithRetry(
            productService.getAll,
            setProdutos,
            setLoadingProdutos,
            setErrorProdutos
          )
        );
      }
      await Promise.all(promises);
      clearFeedback();
      showSuccess('Dados recarregados com sucesso!', 'Concluído');
    } catch (error) {
      showError('Falha ao recarregar dados.', 'Erro');
    }
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'cliente':
        if (!value) error = 'Selecione um cliente';
        break;
      case 'costureira':
        if (!value) error = 'Selecione uma costureira';
        break;
      case 'produto':
        if (!value) error = 'Selecione um produto';
        break;
      case 'valor':
        if (!value || Number(value) <= 0) error = 'Valor deve ser maior que zero';
        break;
      case 'dataEnvio':
        if (!value) error = 'Data de envio é obrigatória';
        break;
      case 'prazoEntrega':
        if (!value) error = 'Prazo de entrega é obrigatório';
        if (value && formData.dataEnvio && new Date(value) < new Date(formData.dataEnvio)) {
          error = 'Prazo de entrega deve ser após a data de envio';
        }
        break;
      case 'quantidade':
        if (!value || Number(value) < 1) error = 'Quantidade deve ser pelo menos 1';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validar todos os campos
    const formErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showError('Preencha todos os campos obrigatórios corretamente.', 'Validação');
      return;
    }

    setErrors({});

    try {
      await onSubmit(formData);
      showSuccess(
        isEditing ? 'Serviço atualizado com sucesso!' : 'Serviço criado com sucesso!',
        'Sucesso'
      );
    } catch (error) {
      showError(error?.message || 'Erro ao salvar serviço.', 'Erro');
    }
  };

  // Renderizar erro por endpoint
  const renderEndpointError = (endpoint, error, onRetry) => {
    if (!error) return null;
    return (
      <Card className="bg-red-50 border border-red-200 p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="body2" className="text-red-800">
              ❌ {endpoint}: {error}
            </Typography>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={onRetry}
          >
            Tentar novamente
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {feedback && (
        <Alert
          type={feedback.type}
          title={feedback.title}
          message={feedback.message}
          onClose={clearFeedback}
          className="mb-6"
        />
      )}

      {/* Erros por endpoint */}
      {renderEndpointError('Clientes', errorClientes, handleRetry)}
      {renderEndpointError('Costureiras', errorCostureiras, handleRetry)}
      {renderEndpointError('Produtos', errorProdutos, handleRetry)}

      <div className="grid grid-cols-1 gap-4 mb-6">
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
            disabled={loadingClientes}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.cliente ? 'border-red-500' : 'border-gray-300'
            } ${loadingClientes ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            <option value="">
              {loadingClientes ? 'Carregando...' : 'Selecione um cliente'}
            </option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
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
            disabled={loadingCostureiras}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.costureira ? 'border-red-500' : 'border-gray-300'
            } ${loadingCostureiras ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            <option value="">
              {loadingCostureiras ? 'Carregando...' : 'Selecione uma costureira'}
            </option>
            {costureiras.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
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
            disabled={loadingProdutos}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.produto ? 'border-red-500' : 'border-gray-300'
            } ${loadingProdutos ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            <option value="">
              {loadingProdutos ? 'Carregando...' : 'Selecione um produto'}
            </option>
            {produtos.map(p => (
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
          <label htmlFor="dataEnvio" className="block text-sm font-medium mb-1">
            Data de Envio <span className="text-red-500">*</span>
          </label>
          <Input
            id="dataEnvio"
            name="dataEnvio"
            type="date"
            value={formData.dataEnvio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.dataEnvio}
          />
        </div>

        {/* Prazo de Entrega */}
        <div>
          <label htmlFor="prazoEntrega" className="block text-sm font-medium mb-1">
            Prazo de Entrega <span className="text-red-500">*</span>
          </label>
          <Input
            id="prazoEntrega"
            name="prazoEntrega"
            type="date"
            value={formData.prazoEntrega}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.prazoEntrega}
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

        {/* Observações */}
        <div>
          <label htmlFor="observacoes" className="block text-sm font-medium mb-1">
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Adicione observações sobre o serviço..."
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Salvando...'
            : isEditing
            ? 'Salvar alterações'
            : 'Criar serviço'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
