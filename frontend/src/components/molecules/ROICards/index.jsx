import { useEffect, useState } from 'react';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
import Badge from '../../atoms/Badge';
import Alert from '../../atoms/Alert';
import { roiService } from '../../../services/roiService';

const performanceBadge = {
  alta: { label: 'Alta performance', variant: 'success' },
  media: { label: 'Performance média', variant: 'warning' },
  baixa: { label: 'Atenção', variant: 'error' }, // ajusta o variant se o Badge não tiver "error"
};

const ROICards = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true);
        setLoadError('');
        const data = await roiService.getCards();
        setCards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao carregar cards de ROI:', error);
        setLoadError('Não foi possível carregar os indicadores de ROI.');
        setCards([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadCards();
  }, []);

  if (isLoading) {
    return (
      <Card className="p-8 text-center mb-6">
        <Typography variant="body1" className="text-taupe">
          Carregando indicadores de ROI...
        </Typography>
      </Card>
    );
  }

  if (loadError) {
    return <Alert type="error" title="Erro" message={loadError} className="mb-6" />;
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <Typography variant="h4" className="mb-4">Cards de ROI</Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const badge = performanceBadge[card.indicador_performance] || {
            label: card.indicador_performance,
            variant: 'neutral',
          };
          return (
            <Card key={card.costureira_id} className="p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <Typography variant="h4">{card.costureira_nome}</Typography>
                <Badge variant={badge.variant} size="sm">
                  {badge.label}
                </Badge>
              </div>
              <div className="space-y-1">
                <Typography variant="body2" className="text-taupe">
                  Receita gerada: R$ {card.receita_gerada.toFixed(2)}
                </Typography>
                <Typography variant="body2" className="text-taupe">
                  Peças produzidas: {card.pecas_produzidas}
                </Typography>
                <Typography variant="body2" className="text-taupe">
                  Eficiência: {card.eficiencia_percentual}%
                </Typography>
                <Typography variant="body2" className="text-taupe">
                  Taxa de atraso: {card.taxa_atraso_percentual}%
                </Typography>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ROICards;