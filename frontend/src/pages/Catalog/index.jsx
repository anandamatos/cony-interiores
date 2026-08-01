import { useEffect, useMemo, useState } from 'react';
import { Save, RefreshCw, Pencil, XCircle, Trash2 } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Alert from '../../components/atoms/Alert';
import { productService } from '../../services/productService';
import { serviceService } from '../../services/serviceService';

const STORAGE_KEY = 'catalog-manual-pricing-v1';

const DIFFICULTY_LEVELS = [
  { value: 'sem_definicao', label: 'Sem complexidade definida', weight: 1 },
  { value: 'baixa', label: 'Baixa', weight: 1 },
  { value: 'media', label: 'Média', weight: 2 },
  { value: 'alta', label: 'Alta', weight: 3 },
  { value: 'especial', label: 'Especial', weight: 5 },
];

const TECHNICAL_PRODUCT_TYPES = [
  { value: '', label: 'Sem categoria técnica' },
  { value: 'ILHO', label: 'Cortina de Ilhó' },
  { value: 'PREGA_MACHO', label: 'Cortina de Prega Macho' },
  { value: 'FORRO', label: 'Forro' },
  { value: 'BLACKOUT', label: 'Blackout' },
  { value: 'ALMOFADA', label: 'Almofada' },
];

const EMPTY_FORM = {
  id: null,
  nome: '',
  descricao: '',
  valor_base: '',
  tipo_produto: '',
  grupo: '',
  difficulty: 'sem_definicao',
};

const EMPTY_GROUP_FORM = {
  id: null,
  nome: '',
  descricao: '',
  tipo: 'TECNICO',
  desconto_percentual: '',
  ativo: true,
};

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(Number(value || 0));

const parsePositiveNumber = (value, fallback = 0) => {
  const parsed = Number(String(value).replace(',', '.'));
  if (Number.isNaN(parsed) || parsed < 0) return fallback;
  return parsed;
};

const parsePercentage = (value, fallback = 0) => {
  const parsed = Number(String(value).replace(',', '.'));
  if (Number.isNaN(parsed) || parsed < 0) return fallback;
  if (parsed > 100) return 100;
  return parsed;
};

const getGroupDiscountRate = (group) => {
  if (!group || group.tipo !== 'COMERCIAL') return 0;
  return parsePercentage(group.desconto_percentual, 0) / 100;
};

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const normalizeDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [services, setServices] = useState([]);
  const [pricingMap, setPricingMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [groupFormData, setGroupFormData] = useState(EMPTY_GROUP_FORM);
  const [isSavingGroup, setIsSavingGroup] = useState(false);

  const loadPageData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const [productsData, servicesData, groupsData] = await Promise.all([
        productService.getAll(),
        serviceService.getAll(),
        productService.getGroups(),
      ]);

      const productList = Array.isArray(productsData) ? productsData : [];
      const servicesList = Array.isArray(servicesData) ? servicesData : [];
      const groupsList = Array.isArray(groupsData) ? groupsData : [];
      setProducts(productList);
      setServices(servicesList);
      setGroups(groupsList);

      const storedRaw = localStorage.getItem(STORAGE_KEY);
      const stored = storedRaw ? JSON.parse(storedRaw) : {};

      const nextMap = {};
      productList.forEach((product) => {
        const id = String(product.id);
        const basePrice = parsePositiveNumber(product.valor_base, 0);
        const saved = stored[id];
        const difficulty = saved?.difficulty || 'sem_definicao';
        const linkedGroup = groupsList.find((group) => group.id === product.grupo);
        const discountRate = getGroupDiscountRate(linkedGroup);

        const level = DIFFICULTY_LEVELS.find((item) => item.value === difficulty) || DIFFICULTY_LEVELS[0];
        const suggestedPrice = Number((basePrice * level.weight * (1 - discountRate)).toFixed(2));

        nextMap[id] = {
          difficulty,
          finalPrice: parsePositiveNumber(saved?.finalPrice, suggestedPrice),
        };
      });

      setPricingMap(nextMap);
    } catch (loadErr) {
      console.error('Erro ao carregar catálogo:', loadErr);
      setError('Não foi possível carregar os produtos cadastrados.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial data hydration for catalog page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPageData();
  }, []);

  const updateProductConfig = (productId, patch) => {
    setPricingMap((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        ...patch,
      },
    }));
  };

  const applySuggestedPrice = (product) => {
    const productId = String(product.id);
    const config = pricingMap[productId] || { difficulty: 'sem_definicao' };
    const level = DIFFICULTY_LEVELS.find((item) => item.value === config.difficulty) || DIFFICULTY_LEVELS[0];
    const basePrice = parsePositiveNumber(product.valor_base, 0);
    const linkedGroup = groups.find((group) => group.id === product.grupo);
    const discountRate = getGroupDiscountRate(linkedGroup);
    const suggested = Number((basePrice * level.weight * (1 - discountRate)).toFixed(2));

    updateProductConfig(productId, { finalPrice: suggested });
  };

  const saveManualPricing = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pricingMap));
    setFeedback('Tabela manual de dificuldade e preço salva com sucesso.');
    setTimeout(() => setFeedback(''), 3500);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const startEdit = (product) => {
    const savedConfig = pricingMap[String(product.id)] || {};
    setFormData({
      id: product.id,
      nome: product.nome || '',
      descricao: product.descricao || '',
      valor_base: String(product.valor_base ?? ''),
      tipo_produto: product.tipo_produto || '',
      grupo: product.grupo ? String(product.grupo) : '',
      difficulty: savedConfig.difficulty || 'sem_definicao',
    });
  };

  const cancelEdit = () => {
    setFormData(EMPTY_FORM);
  };

  const saveProduct = async () => {
    const payload = {
      nome: formData.nome.trim(),
      descricao: formData.descricao,
      valor_base: parsePositiveNumber(formData.valor_base, 0),
      tipo_produto: formData.tipo_produto,
      grupo: formData.grupo ? Number(formData.grupo) : null,
    };

    if (!payload.nome) {
      setError('Nome do produto é obrigatório para salvar.');
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      let savedProduct;
      if (formData.id) {
        savedProduct = await productService.update(formData.id, payload);
        setFeedback('Produto atualizado com sucesso.');
      } else {
        savedProduct = await productService.create(payload);
        setFeedback('Produto criado com sucesso.');
      }

      const savedProductId = String(savedProduct?.id || formData.id);
      const selectedDifficulty = formData.difficulty || 'sem_definicao';
      const selectedLevel = DIFFICULTY_LEVELS.find((item) => item.value === selectedDifficulty) || DIFFICULTY_LEVELS[0];
      const linkedGroup = groups.find((group) => String(group.id) === String(payload.grupo));
      const discountRate = getGroupDiscountRate(linkedGroup);
      const suggestedPrice = Number((payload.valor_base * selectedLevel.weight * (1 - discountRate)).toFixed(2));

      const mergedPricing = {
        ...pricingMap,
        [savedProductId]: {
          difficulty: selectedDifficulty,
          finalPrice: pricingMap[savedProductId]?.finalPrice ?? suggestedPrice,
        },
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedPricing));
      setPricingMap(mergedPricing);

      setFormData(EMPTY_FORM);
      await loadPageData();
      setTimeout(() => setFeedback(''), 3500);
    } catch (saveErr) {
      console.error('Erro ao salvar produto:', saveErr);
      setError('Não foi possível salvar o produto.');
    } finally {
      setIsSaving(false);
    }
  };

  const slugify = (text) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 40);
  };

  const buildUniqueGroupCode = (name, currentId = null) => {
    const base = slugify(name) || 'GRUPO';
    const usedCodes = new Set(
      groups
        .filter((group) => group.id !== currentId)
        .map((group) => group.codigo)
    );

    if (!usedCodes.has(base)) return base;
    let suffix = 2;
    while (usedCodes.has(`${base}_${suffix}`)) suffix += 1;
    return `${base}_${suffix}`;
  };

  const startGroupEdit = (group) => {
    setGroupFormData({
      id: group.id,
      nome: group.nome || '',
      descricao: group.descricao || '',
      tipo: group.tipo || 'TECNICO',
      desconto_percentual: String(group.desconto_percentual ?? ''),
      ativo: group.ativo !== false,
    });
  };

  const cancelGroupEdit = () => {
    setGroupFormData(EMPTY_GROUP_FORM);
  };

  const saveGroup = async () => {
    const nome = groupFormData.nome.trim();
    if (!nome) {
      setError('Nome do grupo é obrigatório para salvar.');
      return;
    }

    const payload = {
      codigo: buildUniqueGroupCode(nome, groupFormData.id),
      nome,
      descricao: groupFormData.descricao,
      tipo: groupFormData.tipo || 'TECNICO',
      desconto_percentual: groupFormData.tipo === 'COMERCIAL'
        ? parsePercentage(groupFormData.desconto_percentual, 0)
        : 0,
      ativo: groupFormData.ativo,
    };

    try {
      setIsSavingGroup(true);
      setError('');

      if (groupFormData.id) {
        const current = groups.find((item) => item.id === groupFormData.id);
        payload.codigo = current?.codigo || payload.codigo;
        await productService.updateGroup(groupFormData.id, payload);
        setFeedback('Grupo atualizado com sucesso.');
      } else {
        await productService.createGroup(payload);
        setFeedback('Grupo criado com sucesso.');
      }

      setGroupFormData(EMPTY_GROUP_FORM);
      await loadPageData();
      setTimeout(() => setFeedback(''), 3500);
    } catch (groupErr) {
      console.error('Erro ao salvar grupo:', groupErr);
      setError('Não foi possível salvar o grupo.');
    } finally {
      setIsSavingGroup(false);
    }
  };

  const removeGroup = async (groupId) => {
    try {
      setError('');
      await productService.deleteGroup(groupId);
      setFeedback('Grupo removido com sucesso.');
      if (groupFormData.id === groupId) {
        setGroupFormData(EMPTY_GROUP_FORM);
      }
      await loadPageData();
      setTimeout(() => setFeedback(''), 3500);
    } catch (groupErr) {
      console.error('Erro ao remover grupo:', groupErr);
      setError('Não foi possível remover o grupo. Verifique se há dependências.');
    }
  };

  const pricingSummary = useMemo(() => {
    return products.map((product) => {
      const productId = String(product.id);
      const config = pricingMap[productId] || { difficulty: 'sem_definicao', finalPrice: parsePositiveNumber(product.valor_base, 0) };
      const level = DIFFICULTY_LEVELS.find((item) => item.value === config.difficulty) || DIFFICULTY_LEVELS[0];
      const basePrice = parsePositiveNumber(product.valor_base, 0);
      const linkedGroup = groups.find((group) => group.id === product.grupo);
      const discountRate = getGroupDiscountRate(linkedGroup);
      const suggestedPrice = Number((basePrice * level.weight * (1 - discountRate)).toFixed(2));

      return {
        product,
        config,
        level,
        basePrice,
        suggestedPrice,
      };
    });
  }, [products, pricingMap, groups]);

  const insights = useMemo(() => {
    const now = new Date();
    const weekStart = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6));
    const weekEnd = endOfDay(now);
    const monthStart = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
    const monthEnd = endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0));

    const productsById = {};
    const groupsById = {};
    products.forEach((product) => {
      productsById[product.id] = product;
    });
    groups.forEach((group) => {
      groupsById[group.id] = group;
    });

    const weeklyCountByProduct = {};
    const monthlyCountByProduct = {};
    const globalCountByProduct = {};
    const monthlyGroupStats = {};
    const globalGroupStats = {};
    const technicalTypeCounts = {};

    services.forEach((service) => {
      const serviceDate = normalizeDate(service?.data_envio || service?.prazo_entrega);
      if (!serviceDate) return;

      const productIds = Array.isArray(service?.produto) ? service.produto : [];
      const serviceValue = parsePositiveNumber(service?.valor, 0);

      productIds.forEach((id) => {
        globalCountByProduct[id] = (globalCountByProduct[id] || 0) + 1;
        const group = productsById[id]?.grupo || productsById[id]?.tipo_produto || 'SEM_GRUPO';
        const technicalType = productsById[id]?.tipo_produto || 'SEM_CATEGORIA';
        technicalTypeCounts[technicalType] = (technicalTypeCounts[technicalType] || 0) + 1;
        if (!globalGroupStats[group]) {
          globalGroupStats[group] = { sum: 0, count: 0 };
        }
        globalGroupStats[group].sum += serviceValue;
        globalGroupStats[group].count += 1;
      });

      if (serviceDate >= weekStart && serviceDate <= weekEnd) {
        productIds.forEach((id) => {
          weeklyCountByProduct[id] = (weeklyCountByProduct[id] || 0) + 1;
        });
      }

      if (serviceDate >= monthStart && serviceDate <= monthEnd) {
        productIds.forEach((id) => {
          monthlyCountByProduct[id] = (monthlyCountByProduct[id] || 0) + 1;

          const group = productsById[id]?.grupo || productsById[id]?.tipo_produto || 'SEM_GRUPO';
          if (!monthlyGroupStats[group]) {
            monthlyGroupStats[group] = { sum: 0, count: 0 };
          }
          monthlyGroupStats[group].sum += serviceValue;
          monthlyGroupStats[group].count += 1;
        });
      }
    });

    const sortedWeek = Object.entries(weeklyCountByProduct).sort((a, b) => b[1] - a[1]);
    const sortedMonth = Object.entries(monthlyCountByProduct).sort((a, b) => b[1] - a[1]);
    const sortedGlobal = Object.entries(globalCountByProduct).sort((a, b) => b[1] - a[1]);

    const topWeekEntry = sortedWeek[0] || sortedGlobal[0];
    const topMonthEntry = sortedMonth[0] || sortedGlobal[0];

    const leastMonthEntry = sortedMonth.length > 0
      ? sortedMonth[sortedMonth.length - 1]
      : (sortedGlobal.length > 0 ? sortedGlobal[sortedGlobal.length - 1] : null);

    const groupTicket = Object.entries(monthlyGroupStats)
      .map(([group, stats]) => ({
        group,
        ticket: stats.count > 0 ? stats.sum / stats.count : 0,
        count: stats.count,
      }))
      .sort((a, b) => b.ticket - a.ticket);

    const commercialGroupIds = new Set(
      groups
        .filter((group) => (group.tipo || 'TECNICO') === 'COMERCIAL')
        .map((group) => group.id)
    );

    const commercialGroupTicket = groupTicket.filter((item) => commercialGroupIds.has(Number(item.group)));

    const globalTicket = Object.entries(globalGroupStats)
      .map(([group, stats]) => ({
        group,
        ticket: stats.count > 0 ? stats.sum / stats.count : 0,
      }))
      .sort((a, b) => b.ticket - a.ticket);

    const highestTicketGroup = commercialGroupTicket[0] || groupTicket[0] || globalTicket[0] || null;
    const topTechnicalTypeEntry = Object.entries(technicalTypeCounts).sort((a, b) => b[1] - a[1])[0] || null;

    const productName = (id) => productsById[id]?.nome || 'Sem produto';
    const groupName = (groupValue) => {
      if (groupsById[groupValue]) return groupsById[groupValue].nome;
      return TECHNICAL_PRODUCT_TYPES.find((item) => item.value === groupValue)?.label || 'Sem grupo';
    };

    const technicalTypeName = (value) => {
      return TECHNICAL_PRODUCT_TYPES.find((item) => item.value === value)?.label || 'Sem categoria técnica';
    };

    return {
      topWeek: topWeekEntry ? { label: productName(Number(topWeekEntry[0])), value: `${topWeekEntry[1]} serviços` } : { label: 'Sem dados', value: '-' },
      topTicketGroup: highestTicketGroup
        ? { label: groupName(highestTicketGroup.group), value: `${formatCurrency(highestTicketGroup.ticket)} médio` }
        : { label: 'Sem dados', value: '-' },
      lowOutput: leastMonthEntry
        ? { label: productName(Number(leastMonthEntry[0])), value: `${leastMonthEntry[1]} no mês` }
        : { label: 'Sem dados', value: '-' },
      topMonth: topMonthEntry
        ? { label: productName(Number(topMonthEntry[0])), value: `${topMonthEntry[1]} no mês` }
        : { label: 'Sem dados', value: '-' },
      topTechnicalType: topTechnicalTypeEntry
        ? { label: technicalTypeName(topTechnicalTypeEntry[0]), value: `${topTechnicalTypeEntry[1]} serviços` }
        : { label: 'Sem dados', value: '-' },
    };
  }, [products, services, groups]);

  if (isLoading) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Typography variant="body1">Carregando catálogo...</Typography>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Catálogo e Precificação Manual</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Ajuste dificuldade, preço final e também gerencie produtos e grupos.
          </Typography>
        </div>

        <Button variant="primary" size="sm" onClick={saveManualPricing}>
          <Save className="w-4 h-4" />
          Salvar ajustes
        </Button>
      </div>

      {error && (
        <Alert type="error" title="Erro" message={error} className="mb-6" />
      )}

      {feedback && (
        <Alert type="success" title="Salvo" message={feedback} className="mb-6" />
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8" aria-label="Mini dashboards">
        <Card className="group relative overflow-hidden p-5 border-l-4 border-gold bg-white/80 backdrop-blur-sm hover:-translate-y-1 hover:shadow-md transition-all duration-normal">
          <Typography variant="caption" className="uppercase text-taupe">Mais feito na semana</Typography>
          <Typography variant="h3" className="mt-2">{insights.topWeek.label}</Typography>
          <Typography variant="body2" className="text-taupe mt-1">{insights.topWeek.value}</Typography>
        </Card>

        <Card className="group relative overflow-hidden p-5 border-l-4 border-terracota bg-white/80 backdrop-blur-sm hover:-translate-y-1 hover:shadow-md transition-all duration-normal">
          <Typography variant="caption" className="uppercase text-taupe">Grupo comercial maior ticket médio</Typography>
          <Typography variant="h3" className="mt-2">{insights.topTicketGroup.label}</Typography>
          <Typography variant="body2" className="text-taupe mt-1">{insights.topTicketGroup.value}</Typography>
        </Card>

        <Card className="group relative overflow-hidden p-5 border-l-4 border-sage bg-white/80 backdrop-blur-sm hover:-translate-y-1 hover:shadow-md transition-all duration-normal">
          <Typography variant="caption" className="uppercase text-taupe">Categoria técnica mais recorrente</Typography>
          <Typography variant="h3" className="mt-2">{insights.topTechnicalType.label}</Typography>
          <Typography variant="body2" className="text-taupe mt-1">{insights.topTechnicalType.value}</Typography>
        </Card>

        <Card className="group relative overflow-hidden p-5 border-l-4 border-secondary bg-white/80 backdrop-blur-sm hover:-translate-y-1 hover:shadow-md transition-all duration-normal">
          <Typography variant="caption" className="uppercase text-taupe">Mais feito no mês</Typography>
          <Typography variant="h3" className="mt-2">{insights.topMonth.label}</Typography>
          <Typography variant="body2" className="text-taupe mt-1">{insights.topMonth.value}</Typography>
        </Card>
      </section>

      <Card className="p-6 mb-6">
        <Typography variant="h3" className="mb-4">Criar ou editar produto</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography variant="caption" className="text-taupe">Nome</Typography>
            <input
              className="w-full rounded-md border border-border bg-white px-3 py-2 mt-1"
              value={formData.nome}
              onChange={(event) => handleFormChange('nome', event.target.value)}
              placeholder="Ex: Cortina Linho"
            />
          </div>

          <div>
            <Typography variant="caption" className="text-taupe">Valor base</Typography>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full rounded-md border border-border bg-white px-3 py-2 mt-1"
              value={formData.valor_base}
              onChange={(event) => handleFormChange('valor_base', event.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <Typography variant="caption" className="text-taupe">Grupo comercial</Typography>
            <select
              className="w-full rounded-md border border-border bg-white px-3 py-2 mt-1"
              value={formData.grupo}
              onChange={(event) => handleFormChange('grupo', event.target.value)}
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
            <Typography variant="caption" className="mt-1 block text-taupe">
              Grupo comercial organiza para visão de negócio e precificação.
            </Typography>
          </div>

          <div>
            <Typography variant="caption" className="text-taupe">Categoria técnica</Typography>
            <select
              className="w-full rounded-md border border-border bg-white px-3 py-2 mt-1"
              value={formData.tipo_produto}
              onChange={(event) => handleFormChange('tipo_produto', event.target.value)}
            >
              {TECHNICAL_PRODUCT_TYPES.map((option) => (
                <option key={option.value || 'none'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Typography variant="caption" className="mt-1 block text-taupe">
              Categoria técnica define o tipo de confecção para operação e cálculo.
            </Typography>
          </div>

          <div>
            <Typography variant="caption" className="text-taupe">Complexidade padrão (peso)</Typography>
            <select
              className="w-full rounded-md border border-border bg-white px-3 py-2 mt-1"
              value={formData.difficulty}
              onChange={(event) => handleFormChange('difficulty', event.target.value)}
            >
              {DIFFICULTY_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label} • peso {level.weight}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
              <Typography variant="caption" className="text-taupe">Descrição</Typography>
            <input
              className="w-full rounded-md border border-border bg-white px-3 py-2 mt-1"
              value={formData.descricao}
              onChange={(event) => handleFormChange('descricao', event.target.value)}
                placeholder="Detalhes do produto"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Button variant="primary" size="sm" onClick={saveProduct} disabled={isSaving}>
            <Save className="w-4 h-4" />
            {formData.id ? 'Salvar edição' : 'Criar produto'}
          </Button>

          {formData.id && (
            <Button variant="secondary" size="sm" onClick={cancelEdit}>
              <XCircle className="w-4 h-4" />
              Cancelar edição
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <Typography variant="h3" className="mb-4">Guia de grupos</Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="rounded-md border border-border bg-white px-3 py-2"
            placeholder="Nome do grupo"
            value={groupFormData.nome}
            onChange={(event) => setGroupFormData((prev) => ({ ...prev, nome: event.target.value }))}
          />

          <select
            className="rounded-md border border-border bg-white px-3 py-2"
            value={groupFormData.tipo}
            onChange={(event) => setGroupFormData((prev) => ({ ...prev, tipo: event.target.value }))}
          >
            <option value="TECNICO">Técnico</option>
            <option value="COMERCIAL">Comercial</option>
          </select>

          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            disabled={groupFormData.tipo !== 'COMERCIAL'}
            className="rounded-md border border-border bg-white px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100"
            placeholder="% de desconto"
            value={groupFormData.desconto_percentual}
            onChange={(event) => setGroupFormData((prev) => ({ ...prev, desconto_percentual: event.target.value }))}
          />

          <input
            className="rounded-md border border-border bg-white px-3 py-2"
            placeholder="Descrição"
            value={groupFormData.descricao}
            onChange={(event) => setGroupFormData((prev) => ({ ...prev, descricao: event.target.value }))}
          />

          <select
            className="rounded-md border border-border bg-white px-3 py-2"
            value={groupFormData.ativo ? 'true' : 'false'}
            onChange={(event) => setGroupFormData((prev) => ({ ...prev, ativo: event.target.value === 'true' }))}
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Button variant="primary" size="sm" onClick={saveGroup} disabled={isSavingGroup}>
            <Save className="w-4 h-4" />
            {groupFormData.id ? 'Salvar grupo' : 'Criar grupo'}
          </Button>

          {groupFormData.id && (
            <Button variant="secondary" size="sm" onClick={cancelGroupEdit}>
              <XCircle className="w-4 h-4" />
              Cancelar edição
            </Button>
          )}
        </div>

        <div className="mt-5 space-y-2">
          {groups.map((group) => (
            <div key={group.id} className="flex items-center justify-between rounded-md border border-border px-4 py-3">
              <div>
                <Typography variant="h4">{group.nome}</Typography>
                <Typography variant="caption" className="text-taupe">
                  Código: {group.codigo}
                  {' • '}
                  {group.tipo === 'COMERCIAL' ? 'Comercial' : 'Técnico'}
                  {' • '}
                  {group.tipo === 'COMERCIAL'
                    ? `${parsePercentage(group.desconto_percentual, 0).toFixed(2)}% desc.`
                    : 'Sem desconto'}
                  {' • '}
                  {group.ativo ? 'Ativo' : 'Inativo'}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => startGroupEdit(group)}>
                  <Pencil className="w-4 h-4" />
                  Editar
                </Button>
                <Button variant="secondary" size="sm" onClick={() => removeGroup(group.id)}>
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </Button>
              </div>
            </div>
          ))}

          {groups.length === 0 && (
            <Typography variant="body2" className="text-taupe">
              Nenhum grupo cadastrado ainda.
            </Typography>
          )}
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-offWhite border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-primary">Produto</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Grupo</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Preço Base</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Dificuldade (peso)</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Preço Sugerido</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Preço Final Manual</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pricingSummary.map(({ product, config, suggestedPrice, basePrice }) => {
                const productId = String(product.id);
                const groupLabel = groups.find((option) => option.id === product.grupo)?.nome
                  || TECHNICAL_PRODUCT_TYPES.find((option) => option.value === (product.tipo_produto || ''))?.label
                  || 'Sem grupo';

                return (
                  <tr key={productId} className="border-b border-border/70 last:border-b-0">
                    <td className="px-4 py-3">
                      <Typography variant="h4" className="text-[15px]">{product.nome}</Typography>
                      <Typography variant="caption" className="text-taupe">{product.descricao || 'Sem descrição'}</Typography>
                    </td>
                    <td className="px-4 py-3">{groupLabel}</td>
                    <td className="px-4 py-3">{formatCurrency(basePrice)}</td>
                    <td className="px-4 py-3">
                      <select
                        className="w-full rounded-md border border-border bg-white px-3 py-2"
                        value={config.difficulty}
                        onChange={(event) => updateProductConfig(productId, { difficulty: event.target.value })}
                      >
                        {DIFFICULTY_LEVELS.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">{formatCurrency(suggestedPrice)}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded-md border border-border bg-white px-3 py-2"
                        value={config.finalPrice}
                        onChange={(event) => updateProductConfig(productId, {
                          finalPrice: parsePositiveNumber(event.target.value, 0),
                        })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" onClick={() => applySuggestedPrice(product)}>
                          <RefreshCw className="w-4 h-4" />
                          Sugerir
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => startEdit(product)}>
                          <Pencil className="w-4 h-4" />
                          Editar
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 mt-6">
        <Typography variant="h3">Regras de Dificuldade</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
          {DIFFICULTY_LEVELS.map((level) => (
            <div key={level.value} className="rounded-md border border-border bg-offWhite px-4 py-3">
              <Typography variant="h4">{level.label}</Typography>
              <Typography variant="body2" className="text-taupe mt-1">
                Peso Fibonacci: {level.weight}
              </Typography>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
};

export default Catalog;
