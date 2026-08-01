import { useState, useEffect } from 'react';
import { serviceService } from '../../../services/serviceService';
import { seamstressService } from '../../../services/seamstressService';
import { productService } from '../../../services/productService';
import QuickCreateModal from '../../organisms/QuickCreateModal';
import Alert from '../../atoms/Alert';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';

const TECHNICAL_PRODUCT_TYPES = [
  { value: '', label: 'Sem categoria técnica' },
  { value: 'ILHO', label: 'Cortina de Ilhó' },
  { value: 'PREGA_MACHO', label: 'Cortina de Prega Macho' },
  { value: 'FORRO', label: 'Forro' },
  { value: 'BLACKOUT', label: 'Blackout' },
  { value: 'ALMOFADA', label: 'Almofada' },
];

const SERVICE_COMPLEXITY_LEVELS = [
  { value: 'sem_definicao', label: 'Sem complexidade definida (peso 1)' },
  { value: 'baixa', label: 'Baixa (peso 1)' },
  { value: 'media', label: 'Média (peso 2)' },
  { value: 'alta', label: 'Alta (peso 3)' },
  { value: 'especial', label: 'Especial (peso 5)' },
];

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
    complexidade: 'sem_definicao',
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
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [errorClientes, setErrorClientes] = useState(null);
  const [errorCostureiras, setErrorCostureiras] = useState(null);
  const [errorProdutos, setErrorProdutos] = useState(null);
  const [errorGroups, setErrorGroups] = useState(null);
  const [groups, setGroups] = useState([]);

  const [quickModalType, setQuickModalType] = useState(null);
  const [quickModalErrors, setQuickModalErrors] = useState({});
  const [isQuickSaving, setIsQuickSaving] = useState(false);
  const [quickToast, setQuickToast] = useState(null);
  const [quickClientData, setQuickClientData] = useState({
    nome: '',
    contato: '',
    email: '',
    observacoes: '',
  });
  const [quickSeamstressData, setQuickSeamstressData] = useState({
    nome: '',
    contato: '',
    especialidade: '',
    ativa: true,
  });
  const [quickProductData, setQuickProductData] = useState({
    nome: '',
    valor_base: '',
    grupo: '',
    tipo_produto: '',
    descricao: '',
  });

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

  const showQuickToast = (type, title, message) => {
    setQuickToast({ type, title, message });
    setTimeout(() => setQuickToast(null), 3500);
  };

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
          fetchWithRetry(
            productService.getGroups,
            setGroups,
            setLoadingGroups,
            setErrorGroups
          ),
        ]);
        clearFeedback();
      } catch {
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
      if (errorGroups) {
        promises.push(
          fetchWithRetry(
            productService.getGroups,
            setGroups,
            setLoadingGroups,
            setErrorGroups
          )
        );
      }
      await Promise.all(promises);
      clearFeedback();
      showSuccess('Dados recarregados com sucesso!', 'Concluído');
    } catch {
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

  const openQuickModal = (type) => {
    if (type === 'cliente') {
      setQuickClientData({ nome: '', contato: '', email: '', observacoes: '' });
    }
    if (type === 'costureira') {
      setQuickSeamstressData({ nome: '', contato: '', especialidade: '', ativa: true });
    }
    if (type === 'produto') {
      setQuickProductData({ nome: '', valor_base: '', grupo: '', tipo_produto: '', descricao: '' });
    }
    setQuickModalType(type);
    setQuickModalErrors({});
  };

  const closeQuickModal = () => {
    setQuickModalType(null);
    setQuickModalErrors({});
  };

  const validateQuickModal = () => {
    const validationErrors = {};

    if (quickModalType === 'cliente') {
      if (!quickClientData.nome.trim()) validationErrors.nome = 'Nome é obrigatório';
      if (quickClientData.email && !/^\S+@\S+\.\S+$/.test(quickClientData.email)) {
        validationErrors.email = 'Informe um email válido';
      }
    }

    if (quickModalType === 'costureira') {
      if (!quickSeamstressData.nome.trim()) validationErrors.nome = 'Nome é obrigatório';
      if (!quickSeamstressData.contato.trim()) validationErrors.contato = 'Contato é obrigatório';
    }

    if (quickModalType === 'produto') {
      if (!quickProductData.nome.trim()) validationErrors.nome = 'Nome é obrigatório';
      if (quickProductData.valor_base && Number(quickProductData.valor_base) < 0) {
        validationErrors.valor_base = 'Valor não pode ser negativo';
      }
    }

    setQuickModalErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const submitQuickModal = async () => {
    if (!validateQuickModal()) return;

    try {
      setIsQuickSaving(true);

      if (quickModalType === 'cliente') {
        const created = await serviceService.createCliente({
          nome: quickClientData.nome.trim(),
          contato: quickClientData.contato.trim(),
          email: quickClientData.email.trim() || null,
          observacoes: quickClientData.observacoes.trim(),
        });

        setClientes((prev) => [...prev, created]);
        setFormData((prev) => ({ ...prev, cliente: String(created.id) }));
        closeQuickModal();
        showQuickToast('success', 'Cliente criado', 'Cliente cadastrado e selecionado no formulário.');
      }

      if (quickModalType === 'costureira') {
        const created = await seamstressService.create({
          nome: quickSeamstressData.nome.trim(),
          contato: quickSeamstressData.contato.trim(),
          especialidade: quickSeamstressData.especialidade.trim(),
          ativa: quickSeamstressData.ativa,
        });

        setCostureiras((prev) => [...prev, created]);
        setFormData((prev) => ({ ...prev, costureira: String(created.id) }));
        closeQuickModal();
        showQuickToast('success', 'Costureira criada', 'Costureira cadastrada e selecionada no formulário.');
      }

      if (quickModalType === 'produto') {
        const payload = {
          nome: quickProductData.nome.trim(),
          descricao: quickProductData.descricao.trim(),
          valor_base: quickProductData.valor_base ? Number(quickProductData.valor_base) : 0,
          tipo_produto: quickProductData.tipo_produto || '',
          grupo: quickProductData.grupo ? Number(quickProductData.grupo) : null,
        };

        const created = await productService.create(payload);
        setProdutos((prev) => [...prev, created]);
        setFormData((prev) => ({ ...prev, produto: String(created.id) }));
        closeQuickModal();
        showQuickToast('success', 'Produto criado', 'Produto cadastrado e selecionado no formulário.');
      }
    } catch {
      showQuickToast('error', 'Não foi possível salvar', 'Revise os dados e tente novamente.');
    } finally {
      setIsQuickSaving(false);
    }
  };

  const quickModalTitle =
    quickModalType === 'cliente'
      ? 'Cadastrar novo cliente'
      : quickModalType === 'costureira'
      ? 'Cadastrar nova costureira'
      : 'Cadastrar novo produto';

  const quickModalDescription =
    quickModalType === 'cliente'
      ? 'Crie o cliente sem sair do cadastro de serviço.'
      : quickModalType === 'costureira'
      ? 'Cadastre a costureira e siga com o serviço em andamento.'
      : 'Crie o produto e continue o preenchimento sem perder os dados.';

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

      {quickToast && (
        <div className="fixed right-5 top-5 z-[90] w-full max-w-sm">
          <Alert
            type={quickToast.type}
            title={quickToast.title}
            message={quickToast.message}
            onClose={() => setQuickToast(null)}
          />
        </div>
      )}

      {/* Erros por endpoint */}
      {renderEndpointError('Clientes', errorClientes, handleRetry)}
      {renderEndpointError('Costureiras', errorCostureiras, handleRetry)}
      {renderEndpointError('Produtos', errorProdutos, handleRetry)}
      {renderEndpointError('Grupos de produto', errorGroups, handleRetry)}

      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Cliente */}
        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <label htmlFor="cliente" className="block text-sm font-medium">
              Cliente <span className="text-red-500">*</span>
            </label>
            <Button type="button" variant="ghost" size="sm" className="!px-2 !py-1" onClick={() => openQuickModal('cliente')}>
              + Novo cliente
            </Button>
          </div>
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
          <div className="mb-1 flex items-center justify-between gap-2">
            <label htmlFor="costureira" className="block text-sm font-medium">
              Costureira <span className="text-red-500">*</span>
            </label>
            <Button type="button" variant="ghost" size="sm" className="!px-2 !py-1" onClick={() => openQuickModal('costureira')}>
              + Nova costureira
            </Button>
          </div>
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
          <div className="mb-1 flex items-center justify-between gap-2">
            <label htmlFor="produto" className="block text-sm font-medium">
              Produto <span className="text-red-500">*</span>
            </label>
            <Button type="button" variant="ghost" size="sm" className="!px-2 !py-1" onClick={() => openQuickModal('produto')}>
              + Novo produto
            </Button>
          </div>
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
            {SERVICE_COMPLEXITY_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
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

      <QuickCreateModal
        open={Boolean(quickModalType)}
        title={quickModalTitle}
        description={quickModalDescription}
        onClose={closeQuickModal}
        actions={(
          <>
            <Button type="button" variant="secondary" onClick={closeQuickModal} disabled={isQuickSaving}>
              Cancelar
            </Button>
            <Button type="button" onClick={submitQuickModal} loading={isQuickSaving}>
              Salvar e selecionar
            </Button>
          </>
        )}
      >
        {quickModalType === 'cliente' && (
          <div className="space-y-4">
            <Input
              label="Nome"
              value={quickClientData.nome}
              onChange={(event) => setQuickClientData((prev) => ({ ...prev, nome: event.target.value }))}
              error={quickModalErrors.nome}
              required
              placeholder="Ex: Maria Oliveira"
            />
            <Input
              label="Contato"
              value={quickClientData.contato}
              onChange={(event) => setQuickClientData((prev) => ({ ...prev, contato: event.target.value }))}
              placeholder="(11) 99999-9999"
            />
            <Input
              label="Email"
              type="email"
              value={quickClientData.email}
              onChange={(event) => setQuickClientData((prev) => ({ ...prev, email: event.target.value }))}
              error={quickModalErrors.email}
              placeholder="cliente@email.com"
            />
            <Input
              label="Observações"
              multiline
              rows={3}
              value={quickClientData.observacoes}
              onChange={(event) => setQuickClientData((prev) => ({ ...prev, observacoes: event.target.value }))}
              placeholder="Informações úteis para o cadastro"
            />
          </div>
        )}

        {quickModalType === 'costureira' && (
          <div className="space-y-4">
            <Input
              label="Nome"
              value={quickSeamstressData.nome}
              onChange={(event) => setQuickSeamstressData((prev) => ({ ...prev, nome: event.target.value }))}
              error={quickModalErrors.nome}
              required
              placeholder="Nome completo"
            />
            <Input
              label="Contato"
              value={quickSeamstressData.contato}
              onChange={(event) => setQuickSeamstressData((prev) => ({ ...prev, contato: event.target.value }))}
              error={quickModalErrors.contato}
              required
              placeholder="(00) 00000-0000"
            />
            <Input
              label="Especialidade"
              value={quickSeamstressData.especialidade}
              onChange={(event) => setQuickSeamstressData((prev) => ({ ...prev, especialidade: event.target.value }))}
              placeholder="Ex: Cortina, almofada..."
            />
            <label className="flex items-center gap-2 text-sm text-primary">
              <input
                type="checkbox"
                checked={quickSeamstressData.ativa}
                onChange={(event) => setQuickSeamstressData((prev) => ({ ...prev, ativa: event.target.checked }))}
              />
              Costureira ativa
            </label>
          </div>
        )}

        {quickModalType === 'produto' && (
          <div className="space-y-4">
            <Input
              label="Nome"
              value={quickProductData.nome}
              onChange={(event) => setQuickProductData((prev) => ({ ...prev, nome: event.target.value }))}
              error={quickModalErrors.nome}
              required
              placeholder="Ex: Cortina Linho"
            />
            <Input
              label="Valor base"
              type="number"
              min="0"
              step="0.01"
              value={quickProductData.valor_base}
              onChange={(event) => setQuickProductData((prev) => ({ ...prev, valor_base: event.target.value }))}
              error={quickModalErrors.valor_base}
              placeholder="0.00"
            />

            <div>
              <label htmlFor="quick-product-group" className="mb-1 block text-sm font-medium text-primary">Grupo comercial</label>
              <select
                id="quick-product-group"
                value={quickProductData.grupo}
                onChange={(event) => setQuickProductData((prev) => ({ ...prev, grupo: event.target.value }))}
                disabled={loadingGroups}
                className="w-full rounded-md border border-[rgba(75,58,46,0.12)] bg-white px-3 py-2"
              >
                <option value="">Sem grupo</option>
                {groups
                  .filter((group) => (group.tipo || 'TECNICO') === 'COMERCIAL')
                  .map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quick-product-category" className="mb-1 block text-sm font-medium text-primary">Categoria técnica</label>
              <select
                id="quick-product-category"
                value={quickProductData.tipo_produto}
                onChange={(event) => setQuickProductData((prev) => ({ ...prev, tipo_produto: event.target.value }))}
                className="w-full rounded-md border border-[rgba(75,58,46,0.12)] bg-white px-3 py-2"
              >
                {TECHNICAL_PRODUCT_TYPES.map((option) => (
                  <option key={option.value || 'none'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Descrição"
              multiline
              rows={3}
              value={quickProductData.descricao}
              onChange={(event) => setQuickProductData((prev) => ({ ...prev, descricao: event.target.value }))}
              placeholder="Detalhes do produto"
            />
          </div>
        )}
      </QuickCreateModal>
    </form>
  );
};

export default ServiceForm;
