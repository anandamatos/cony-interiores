import { typography } from "../../styles/tokens/typography";

export default {
  title: "Tokens/Tipografia",
  parameters: {
    docs: {
      description: {
        component: "Sistema tipográfico da Cony Interiores",
      },
    },
  },
};

export const FontSizes = {
  render: () => (
    <div className="p-4 space-y-2">
      {Object.entries(typography.sizes).map(([key, value]) => (
        <div key={key} style={{ fontSize: value }}>
          <span className="font-medium">{key}:</span> {value} - Texto de exemplo
        </div>
      ))}
    </div>
  ),
};

export const FontWeights = {
  render: () => (
    <div className="p-4 space-y-2">
      {Object.entries(typography.weights).map(([key, value]) => (
        <div key={key} style={{ fontWeight: value }}>
          <span className="font-medium">{key}:</span> {value} - Texto de exemplo
        </div>
      ))}
    </div>
  ),
};
