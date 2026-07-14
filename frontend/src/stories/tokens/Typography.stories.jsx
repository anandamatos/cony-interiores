import { typography } from '../../styles/tokens/typography';

export default {
  title: 'Tokens/Tipografia',
  parameters: {
    docs: {
      description: {
        component: 'Sistema tipográfico da Cony Interiores',
      },
    },
  },
};

export const FontSizes = {
  render: () => (
    <div className="p-4 max-w-2xl mx-auto space-y-2">
      <h2 className="text-lg font-bold mb-4 text-primary">Escala Tipográfica</h2>
      {Object.entries(typography.sizes).map(([key, value]) => (
        <div key={key} style={{ fontSize: value }}>
          <span className="font-medium text-primary">{key}:</span> {value} - Texto de exemplo
        </div>
      ))}
    </div>
  ),
};

export const FontWeights = {
  render: () => (
    <div className="p-4 max-w-2xl mx-auto space-y-2">
      <h2 className="text-lg font-bold mb-4 text-primary">Pesos de Fonte</h2>
      {Object.entries(typography.weights).map(([key, value]) => (
        <div key={key} style={{ fontWeight: value }}>
          <span className="font-medium text-primary">{key}:</span> {value} - Texto de exemplo
        </div>
      ))}
    </div>
  ),
};

export const Hierarchy = {
  render: () => (
    <div className="p-4 max-w-2xl mx-auto space-y-2">
      <h2 className="text-lg font-bold mb-4 text-primary">Hierarquia Tipográfica</h2>
      <h1 className="text-4xl font-bold text-primary">Heading 1 - Título Principal</h1>
      <h2 className="text-2xl font-semibold text-primary">Heading 2 - Título de Seção</h2>
      <h3 className="text-xl font-semibold text-primary">Heading 3 - Subtítulo</h3>
      <h4 className="text-lg font-semibold text-primary">Heading 4 - Subtítulo Menor</h4>
      <p className="text-base text-primary/80">Body 1 - Texto principal para parágrafos e descrições.</p>
      <p className="text-sm text-primary/70">Body 2 - Texto secundário para informações complementares.</p>
      <span className="text-xs text-taupe">Caption - Texto auxiliar para legendas e informações menores.</span>
    </div>
  ),
};