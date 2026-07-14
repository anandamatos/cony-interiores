import { spacing } from '../../styles/tokens/spacing';

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
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-6">📏 Escala de Espaçamento</h2>
      <p className="text-taupe mb-8">
        A escala é baseada em múltiplos de 4px, garantindo consistência visual em toda a interface.
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
        <p className="text-sm text-info">
          💡 <strong>Uso:</strong> Utilize os tokens de espaçamento para padding, margin e gap.
        </p>
      </div>
    </div>
  ),
};