import { borders } from '../../styles/tokens/borders';

export default {
  title: 'Tokens/Bordas',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de cantos arredondados e bordas para consistência visual.',
      },
    },
  },
};

export const BorderRadius = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-6">🔲 Cantos Arredondados</h2>
      <p className="text-taupe mb-8">
        Sistema de cantos arredondados baseado em tokens para consistência visual em toda a interface.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(borders.radius).map(([key, value]) => (
          <div key={key} className="p-4 bg-offWhite rounded-lg border border-gray text-center">
            <div
              className="w-full h-16 bg-gradient-gold mx-auto"
              style={{ borderRadius: value }}
            />
            <span className="block mt-2 text-sm font-medium text-primary">{key}</span>
            <span className="block text-xs text-taupe">{value}</span>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-primary mb-4">🎨 Cores de Borda</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(borders.colors).map(([key, value]) => (
          <div key={key} className="p-4 bg-offWhite rounded-lg border border-gray text-center">
            <div
              className="w-full h-12 rounded-lg mx-auto"
              style={{ backgroundColor: value, border: `2px solid ${value}` }}
            />
            <span className="block mt-2 text-sm font-medium text-primary">{key}</span>
            <span className="block text-xs text-taupe truncate">{value}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <p className="text-sm text-info">
          💡 <strong>Uso:</strong> Utilize os tokens de borda para consistência em todos os componentes.
        </p>
      </div>
    </div>
  ),
};

BorderRadius.storyName = 'Cantos e Bordas';