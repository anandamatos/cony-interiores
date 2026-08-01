import { useEffect, useMemo, useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import Alert from '../../components/atoms/Alert';
import { productService } from '../../services/productService';

const STORAGE_KEY = 'catalog-manual-pricing-v1';

const DIFFICULTY_LEVELS = [
  { value: 'baixa', label: 'Baixa', multiplier: 1.0 },
  { value: 'media', label: 'Média', multiplier: 1.25 },
  { value: 'alta', label: 'Alta', multiplier: 1.6 },
  { value: 'especial', label: 'Especial', multiplier: 2.0 },
];

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(Number(value || 0));

const parsePositiveNumber = (value, fallback = 0) => {
  const parsed = Number(String(value).replace(',', '.'));
  if (Number.isNaN(parsed) || parsed < 0) return fallback;
  return parsed;
};

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [pricingMap, setPricingMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await productService.getAll();
        const list = Array.isArray(data) ? data : [];
        setProducts(list);

        const storedRaw = localStorage.getItem(STORAGE_KEY);
        const stored = storedRaw ? JSON.parse(storedRaw) : {};

        const nextMap = {};
        list.forEach((product) => {
          const id = String(product.id);
          const basePrice = parsePositiveNumber(product.valor_base, 0);
          const saved = stored[id];
          const difficulty = saved?.difficulty || 'media';

          const level = DIFFICULTY_LEVELS.find((item) => item.value === difficulty) || DIFFICULTY_LEVELS[1];
          const suggestedPrice = Number((basePrice * level.multiplier).toFixed(2));

          nextMap[id] = {
            difficulty,
            finalPrice: parsePositiveNumber(saved?.finalPrice, suggestedPrice),
          };
        });

        setPricingMap(nextMap);
      } catch (loadErr) {
        console.error('Erro ao carregar produtos:', loadErr);
        setError('Não foi possível carregar os produtos cadastrados.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
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
    const config = pricingMap[productId] || { difficulty: 'media' };
    const level = DIFFICULTY_LEVELS.find((item) => item.value === config.difficulty) || DIFFICULTY_LEVELS[1];
    const basePrice = parsePositiveNumber(product.valor_base, 0);
    const suggested = Number((basePrice * level.multiplier).toFixed(2));

    updateProductConfig(productId, { finalPrice: suggested });
  };

  const saveManualPricing = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pricingMap));
    setFeedback('Tabela manual de dificuldade e preço salva com sucesso.');
    setTimeout(() => setFeedback(''), 3500);
  };

  const pricingSummary = useMemo(() => {
    return products.map((product) => {
      const productId = String(product.id);
      const config = pricingMap[productId] || { difficulty: 'media', finalPrice: parsePositiveNumber(product.valor_base, 0) };
      const level = DIFFICULTY_LEVELS.find((item) => item.value === config.difficulty) || DIFFICULTY_LEVELS[1];
      const basePrice = parsePositiveNumber(product.valor_base, 0);
      const suggestedPrice = Number((basePrice * level.multiplier).toFixed(2));

      return {
        product,
        config,
        level,
        basePrice,
        suggestedPrice,
      };
    });
  }, [products, pricingMap]);

  if (isLoading) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Typography variant="body1">Carregando catálogo...</Typography>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Alert type="error" title="Erro" message={error} />
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Catálogo e Precificação Manual</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Ajuste nível de dificuldade e preço final de forma manual para cada produto.
          </Typography>
        </div>

        <Button variant="primary" size="sm" onClick={saveManualPricing}>
          <Save className="w-4 h-4" />
          Salvar ajustes
        </Button>
      </div>

      {feedback && (
        <Alert type="success" title="Salvo" message={feedback} className="mb-6" />
      )}

      <Card className="p-6 mb-6">
        <Typography variant="h3">Regras de Dificuldade</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {DIFFICULTY_LEVELS.map((level) => (
            <div key={level.value} className="rounded-md border border-border bg-offWhite px-4 py-3">
              <Typography variant="h4">{level.label}</Typography>
              <Typography variant="body2" className="text-taupe mt-1">
                Multiplicador: {level.multiplier.toFixed(2)}x
              </Typography>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-offWhite border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-primary">Produto</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Preço Base</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Dificuldade</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Preço Sugerido</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Preço Final Manual</th>
                <th className="text-left px-4 py-3 font-semibold text-primary">Ação</th>
              </tr>
            </thead>
            <tbody>
              {pricingSummary.map(({ product, config, suggestedPrice, basePrice }) => {
                const productId = String(product.id);

                return (
                  <tr key={productId} className="border-b border-border/70 last:border-b-0">
                    <td className="px-4 py-3">
                      <Typography variant="h4" className="text-[15px]">{product.nome}</Typography>
                      <Typography variant="caption" className="text-taupe">{product.descricao || 'Sem descrição'}</Typography>
                    </td>
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
                      <Button variant="secondary" size="sm" onClick={() => applySuggestedPrice(product)}>
                        <RefreshCw className="w-4 h-4" />
                        Aplicar sugestão
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
};

export default Catalog;
