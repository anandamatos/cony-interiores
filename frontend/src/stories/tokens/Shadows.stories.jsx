import { shadows } from '../../styles/tokens/shadows';

export default {
  title: 'Tokens/Sombras',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de sombras para profundidade e efeitos de volume.',
      },
    },
  },
};

export const ShadowTokens = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-6">🌓 Sombras</h2>
      <p className="text-taupe mb-8">
        Sistema de sombras para criar profundidade e hierarquia visual.
      </p>

      <h3 className="text-lg font-semibold text-primary mb-4">📦 Sombras por Nível</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Object.entries(shadows)
          .filter(([key]) => !key.includes('gradients') && !key.includes('stat'))
          .slice(0, 8)
          .map(([key, value]) => (
            <div key={key} className="p-6 bg-white rounded-lg border border-gray text-center">
              <div
                className="w-full h-20 bg-white rounded-lg mx-auto flex items-center justify-center text-sm text-taupe"
                style={{ boxShadow: value }}
              >
                <span className="font-medium text-primary">{key}</span>
              </div>
              <span className="block mt-2 text-xs text-taupe truncate">{value}</span>
            </div>
          ))}
      </div>

      <h3 className="text-lg font-semibold text-primary mb-4">🎨 Efeitos de Volume (Stat Cards)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(shadows)
          .filter(([key]) => key.startsWith('stat'))
          .map(([key, value]) => (
            <div key={key} className="p-4 bg-white rounded-lg border border-gray text-center">
              <div
                className="w-full h-16 rounded-lg mx-auto flex items-center justify-center text-xs text-taupe"
                style={{ boxShadow: value }}
              >
                <span className="font-medium text-primary">{key.replace('stat', '')}</span>
              </div>
              <span className="block mt-2 text-xs text-taupe truncate">{value}</span>
            </div>
          ))}
      </div>

      <h3 className="text-lg font-semibold text-primary mb-4">🌈 Gradientes</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(shadows.gradients).map(([key, value]) => (
          <div key={key} className="p-4 bg-offWhite rounded-lg border border-gray text-center">
            <div
              className="w-full h-16 rounded-lg mx-auto"
              style={{ background: value }}
            />
            <span className="block mt-2 text-sm font-medium text-primary">{key}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

ShadowTokens.storyName = 'Sombras e Gradientes';