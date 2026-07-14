import { colors } from '../../styles/tokens/colors';

export default {
  title: 'Tokens/Cores',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de cores da Cony Interiores',
      },
    },
  },
};

export const Primary = {
  render: () => (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-primary">Cores Primárias (Marrom Café)</h2>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(colors.primary).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="w-full h-12 rounded" style={{ backgroundColor: value }} />
            <span className="text-xs">{key}</span>
            <span className="text-xs block text-taupe">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Secondary = {
  render: () => (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-primary">Cores Secundárias (Bege Areia)</h2>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(colors.secondary).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="w-full h-12 rounded" style={{ backgroundColor: value }} />
            <span className="text-xs">{key}</span>
            <span className="text-xs block text-taupe">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Status = {
  render: () => (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-primary">Cores de Status</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-full h-12 rounded" style={{ backgroundColor: colors.success }} />
          <span className="text-xs block mt-1">Success</span>
          <span className="text-xs block text-taupe">{colors.success}</span>
        </div>
        <div className="text-center">
          <div className="w-full h-12 rounded" style={{ backgroundColor: colors.warning }} />
          <span className="text-xs block mt-1">Warning</span>
          <span className="text-xs block text-taupe">{colors.warning}</span>
        </div>
        <div className="text-center">
          <div className="w-full h-12 rounded" style={{ backgroundColor: colors.danger }} />
          <span className="text-xs block mt-1">Danger</span>
          <span className="text-xs block text-taupe">{colors.danger}</span>
        </div>
        <div className="text-center">
          <div className="w-full h-12 rounded" style={{ backgroundColor: colors.info }} />
          <span className="text-xs block mt-1">Info</span>
          <span className="text-xs block text-taupe">{colors.info}</span>
        </div>
      </div>
    </div>
  ),
};