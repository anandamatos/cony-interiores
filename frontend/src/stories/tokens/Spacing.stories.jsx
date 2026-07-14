import { spacing } from '../../styles/tokens/spacing';
import { Info, Ruler } from 'lucide-react';

export default {
  title: 'Tokens/Espaçamento',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de espaçamento baseado em múltiplos de 4px para consistência visual.',
      },
    },
  },
};

export const SpacingScale = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold text-primary mb-6 inline-flex items-center gap-2">
        <Ruler className="w-6 h-6" />
        Escala de Espaçamento
      </h2>
      <p className="text-taupe mb-8">
        Escala baseada em múltiplos de 4px para manter ritmo visual consistente entre layout, componentes e conteúdo.
      </p>

      <div className="space-y-4">
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-6 p-3 bg-offWhite rounded-lg border border-gray">
            <span className="w-16 font-mono text-sm font-semibold text-primary">{key}</span>
            <span className="w-20 text-sm text-taupe">{value}</span>
            <div
              className="h-6 bg-gradient-gold rounded transition-all duration-300"
              style={{ width: value }}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-info/10 border border-info/20 rounded-lg">
        <p className="text-sm text-info inline-flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5" />
          <span><strong>Uso:</strong> aplique esta escala em padding, margin e gap antes de criar valores customizados.</span>
        </p>
      </div>
    </div>
  ),
};