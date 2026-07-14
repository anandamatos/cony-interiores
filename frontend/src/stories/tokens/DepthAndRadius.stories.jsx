import { borders } from '../../styles/tokens/borders';
import { shadows } from '../../styles/tokens/shadows';

export default {
  title: 'Tokens/Sombras e Cantos',
  parameters: {
    docs: {
      description: {
        component: 'Tokens de profundidade (sombras) e arredondamento (raios) para consistencia visual no DS.',
      },
    },
  },
};

export const RadiusScale = {
  render: () => (
    <div className="p-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-primary mb-6">◯ Tokens de Cantos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(borders.radius).map(([key, value]) => (
          <div key={key} className="p-4 border border-gray rounded-lg bg-offWhite flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-primary">{key}</div>
              <div className="text-xs text-taupe">{value}</div>
            </div>
            <div
              className="w-20 h-12 bg-primary/15 border border-primary/20"
              style={{ borderRadius: value }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ShadowScale = {
  render: () => (
    <div className="p-8 max-w-5xl">
      <h2 className="text-2xl font-bold text-primary mb-6">☁ Tokens de Sombras</h2>
      <p className="text-taupe mb-8">Escala baseada no prototipo HTML com hierarquia de profundidade para cards, overlays e estados interativos.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(shadows)
          .filter(([, value]) => typeof value === 'string')
          .map(([key, value]) => (
            <div key={key} className="p-5 bg-white rounded-lg border border-gray/50">
              <div
                className="h-20 rounded-md bg-offWhite border border-border"
                style={{ boxShadow: value }}
              />
              <div className="mt-4 font-medium text-primary">{key}</div>
              <div className="text-xs text-taupe mt-1 break-all">{value}</div>
            </div>
          ))}
      </div>
    </div>
  ),
};
