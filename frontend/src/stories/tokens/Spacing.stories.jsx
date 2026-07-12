import { spacing } from '../../styles/tokens/spacing';

export default {
  title: 'Tokens/Espaçamento',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de espaçamento da Cony Interiores',
      },
    },
  },
};

export const SpacingScale = {
  render: () => (
    <div className="p-4 space-y-4">
      {Object.entries(spacing).map(([key, value]) => (
        <div key={key} className="flex items-center gap-4">
          <span className="w-16 font-medium">{key}:</span>
          <span className="w-16">{value}</span>
          <div className="bg-emerald-500 rounded" style={{ width: value, height: '20px' }} />
        </div>
      ))}
    </div>
  ),
};