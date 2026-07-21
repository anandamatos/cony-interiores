import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceService } from '../../services/serviceService';
import { seamstressService } from '../../services/seamstressService';
import { productService } from '../../services/productService';
import Alert from '../../components/atoms/Alert';

const NewService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
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
        if (value && formData.dataEnvio && value < formData.dataEnvio) {
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

  useEffect(() => {
    const loadData = async () => {
      showInfo('Carregando dados...', 'Aguarde');
      try {
        await Promise.all([
          fetchWithRetry(
            () => serviceService.getClientes ? serviceService.getClientes() : Promise.resolve([]),
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
      await Promise.all([
        fetchWithRetry(
          () => serviceService.getClientes ? serviceService.getClientes() : Promise.resolve([]),
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
      showSuccess('Dados recarregados com sucesso!', 'Concluído');
    } catch (error) {
      showError('Falha ao recarregar dados.', 'Erro');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setSubmitting(true);
    setErrors({});
    try {
      await serviceService.create(formData);
      showSuccess('Serviço criado com sucesso!', 'Concluído');
      setTimeout(() => {
        navigate('/services');
      }, 1500);
    } catch (err) {
      showError(err.message || 'Erro ao criar serviço. Tente novamente.', 'Erro');
      setSubmitting(false);
    }
  };

  const hasCriticalError = errorClientes || errorCostureiras || errorProdutos;
  const isLoading = loadingClientes || loadingCostureiras || loadingProdutos;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Novo Serviço</h1>

      {feedback && (
        <div className="mb-4">
          <Alert
            type={feedback.type}
            title={feedback.title}
            message={feedback.message}
            onClose={clearFeedback}
          />
        </div>
      )}

      {isLoading && !hasCriticalError && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-blue-700">Carregando dados...</span>
          </div>
        </div>
      )}

      {hasCriticalError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-red-700 font-medium">Erro ao carregar dados</span>
              <ul className="text-sm text-red-600 mt-1">
                {errorClientes && <li>• Clientes: {errorClientes}</li>}
                {errorCostureiras && <li>• Costureiras: {errorCostureiras}</li>}
                {errorProdutos && <li>• Produtos: {errorProdutos}</li>}
              </ul>
            </div>
            <button
              onClick={handleRetry}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
              disabled={isLoading}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
              Cliente *
            </label>
            <select
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.cliente ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loadingClientes || !!errorClientes}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome || cliente.razao_social}
                </option>
              ))}
            </select>
            {errors.cliente && <p className="text-sm text-red-600 mt-1">{errors.cliente}</p>}
          </div>

          <div>
            <label htmlFor="costureira" className="block text-sm font-medium text-gray-700 mb-1">
              Costureira *
            </label>
            <select
              id="costureira"
              name="costureira"
              value={formData.costureira}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.costureira ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loadingCostureiras || !!errorCostureiras}
            >
              <option value="">Selecione uma costureira</option>
              {costureiras.map(costureira => (
                <option key={costureira.id} value={costureira.id}>
                  {costureira.nome}
                </option>
              ))}
            </select>
            {errors.costureira && <p className="text-sm text-red-600 mt-1">{errors.costureira}</p>}
          </div>

          <div>
            <label htmlFor="produto" className="block text-sm font-medium text-gray-700 mb-1">
              Produto *
            </label>
            <select
              id="produto"
              name="produto"
              value={formData.produto}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.produto ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loadingProdutos || !!errorProdutos}
            >
              <option value="">Selecione um produto</option>
              {produtos.map(produto => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
            {errors.produto && <p className="text-sm text-red-600 mt-1">{errors.produto}</p>}
          </div>

          <div>
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade
            </label>
            <input
              type="number"
              id="quantidade"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.quantidade ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.quantidade && <p className="text-sm text-red-600 mt-1">{errors.quantidade}</p>}
          </div>

          <div>
            <label htmlFor="complexidade" className="block text-sm font-medium text-gray-700 mb-1">
              Complexidade
            </label>
            <select
              id="complexidade"
              name="complexidade"
              value={formData.complexidade}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pequena">Pequena</option>
              <option value="media">Média</option>
              <option value="grande">Grande</option>
              <option value="complexa">Complexa</option>
            </select>
          </div>

          <div>
            <label htmlFor="dataEnvio" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Envio *
            </label>
            <input
              type="date"
              id="dataEnvio"
              name="dataEnvio"
              value={formData.dataEnvio}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.dataEnvio ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dataEnvio && <p className="text-sm text-red-600 mt-1">{errors.dataEnvio}</p>}
          </div>

          <div>
            <label htmlFor="prazoEntrega" className="block text-sm font-medium text-gray-700 mb-1">
              Prazo de Entrega *
            </label>
            <input
              type="date"
              id="prazoEntrega"
              name="prazoEntrega"
              value={formData.prazoEntrega}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.prazoEntrega ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.prazoEntrega && <p className="text-sm text-red-600 mt-1">{errors.prazoEntrega}</p>}
          </div>

          <div>
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">
              Valor *
            </label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              onBlur={handleBlur}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.valor ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.valor && <p className="text-sm text-red-600 mt-1">{errors.valor}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting || isLoading || hasCriticalError}
          >
            {submitting ? 'Salvando...' : 'Criar Serviço'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewService;
