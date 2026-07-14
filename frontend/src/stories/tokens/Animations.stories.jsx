import { animations } from '../../styles/tokens/animations';

export default {
  title: 'Tokens/Animações',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de animações para transições e interações fluidas.',
      },
    },
  },
};

export const AnimationTokens = {
  render: () => (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-6">✨ Tokens de Animação</h2>
      <p className="text-taupe mb-8">
        O sistema de animações utiliza durações e easings consistentes para criar interações fluidas e naturais.
      </p>

      <h3 className="text-lg font-semibold text-primary mb-4">⏱️ Durações</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(animations.duration).map(([key, value]) => (
          <div key={key} className="p-4 bg-offWhite rounded-lg border border-gray text-center">
            <div
              className="w-full h-2 bg-gradient-gold rounded mb-2 transition-all duration-300 hover:h-4"
              style={{
                transition: `width ${value} ease-in-out`,
                width: '100%',
              }}
            />
            <span className="text-sm font-medium text-primary">{key}</span>
            <span className="block text-xs text-taupe">{value}</span>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-primary mb-4">🔄 Easing Functions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(animations.easing).map(([key, value]) => (
          <div key={key} className="p-4 bg-offWhite rounded-lg border border-gray">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-primary">{key}</span>
              <span className="text-xs text-taupe">{value}</span>
            </div>
            <div className="relative h-12 bg-white rounded overflow-hidden border border-gray">
              <div
                className="absolute bottom-0 left-0 w-4 h-4 bg-gold rounded-full"
                style={{
                  animation: `slideAcross 2s ${value} infinite`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-primary mb-4">🎬 Animações Predefinidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {['fadeIn', 'slideUp', 'springIn', 'pulse', 'float', 'glow'].map((name) => (
          <div key={name} className="p-6 bg-offWhite rounded-lg border border-gray text-center">
            <div
              className="w-16 h-16 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold"
              style={{
                animation: `${name} 1s ease-in-out infinite`,
              }}
            >
              {name === 'fadeIn' && 'F'}
              {name === 'slideUp' && '↑'}
              {name === 'springIn' && 'S'}
              {name === 'pulse' && 'P'}
              {name === 'float' && '↕'}
              {name === 'glow' && '✨'}
            </div>
            <span className="block mt-3 text-sm font-medium text-primary">{name}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideAcross {
          0% { left: 0; }
          100% { left: calc(100% - 16px); }
        }
      `}</style>
    </div>
  ),
};

AnimationTokens.storyName = 'Tokens de Animação';