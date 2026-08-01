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
    <div className="p-6 space-y-4 bg-offWhite min-h-screen">
      <div>
        <h2 className="text-2xl font-semibold text-primary">Escala tipográfica do dashboard</h2>
        <p className="text-sm text-taupe mt-2">Montserrat conduz títulos e textos. Syncopate aparece em labels, botões e identificação de marca.</p>
      </div>
      {Object.entries(typography.sizes).map(([key, value]) => (
        <div key={key} style={{ fontSize: value }} className="text-primary">
          <span className="font-display text-[10px] tracking-[0.15em] uppercase text-taupe mr-2">{key}</span>
          Texto de exemplo em {value}
        </div>
      ))}
    </div>
  ),
};

export const FontWeights = {
  render: () => (
    <div className="p-6 space-y-3 bg-offWhite min-h-screen">
      {Object.entries(typography.weights).map(([key, value]) => (
        <div key={key} style={{ fontWeight: value }} className="text-primary">
          <span className="font-display text-[10px] tracking-[0.15em] uppercase text-taupe mr-2">{key}</span>
          Peso {value} aplicado ao texto da interface
        </div>
      ))}
    </div>
  ),
};

export const Hierarchy = {
  render: () => (
    <div className="p-6 bg-offWhite min-h-screen space-y-5 max-w-4xl">
      <div className="font-primary text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-primary">
        Manual direto para manter o dashboard Cony consistente.
      </div>
      <div className="font-primary text-[24px] font-semibold leading-[1.25] tracking-[-0.03em] text-primary">
        Direção visual para interfaces que respiram elegância e conforto.
      </div>
      <div className="font-primary text-[18px] font-semibold leading-[1.4] text-primary">
        Alertas e avisos
      </div>
      <div className="font-secondary text-[16px] leading-[1.7] text-primary/85">
        A interface combina menos ruído visual, mais respiro, materiais claros, contrastes quentes e CTAs discretos.
      </div>
      <div className="font-secondary text-[14px] leading-[1.6] text-taupe">
        Texto de apoio para métricas, observações e explicações de contexto operacional.
      </div>
      <div className="font-display text-[10px] uppercase tracking-[0.15em] text-taupe">
        Referência oficial do dashboard
      </div>
    </div>
  ),
};
