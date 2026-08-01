import { colors } from "../../styles/tokens/colors";

const gradientTokens = [
  {
    name: "gradient-primary",
    css: "linear-gradient(135deg, #DEBBA4 0%, #903839 55%, #703824 100%)",
    use: "Assinatura visual principal, CTAs e blocos de destaque editorial.",
  },
  {
    name: "gradient-gold",
    css: "linear-gradient(135deg, #E8E3D9 0%, #DEBBA4 100%)",
    use: "Cards ativos, badges neutros e superficies com aquecimento sutil.",
  },
  {
    name: "gradient-warm",
    css: "linear-gradient(135deg, #703824 0%, #903839 100%)",
    use: "Estados premium, ações principais e destaque institucional.",
  },
  {
    name: "gradient-sage",
    css: "linear-gradient(135deg, #7C8A6E 0%, #5C6B63 100%)",
    use: "Blocos analiticos e informacoes complementares com tom sereno.",
  },
  {
    name: "gradient-offWhite",
    css: "linear-gradient(135deg, #F8F5F0 0%, #E8E3D9 100%)",
    use: "Planos de fundo, mini stats e elevacao discreta de containers.",
  },
];

const meta = {
  title: "Tokens/Cores",
  parameters: {
    docs: {
      description: {
        component: "Sistema de cores da Cony Interiores",
      },
    },
  },
};

export default meta;

const ScaleSection = ({ title, scale }) => (
  <div className="space-y-3">
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {Object.entries(scale)
        .filter(([key]) => key !== "DEFAULT")
        .map(([key, value]) => (
          <div key={key} className="rounded-lg border border-border/80 bg-white p-2">
            <div className="w-full h-12 rounded-md" style={{ backgroundColor: value }} />
            <div className="mt-2 text-[11px] text-primary/70">{key}</div>
            <div className="text-xs font-mono text-primary">{value}</div>
          </div>
        ))}
    </div>
  </div>
);

export const Primary = {
  render: () => (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">Paleta oficial da interface</h2>
      <p className="text-sm text-taupe max-w-3xl">
        Tokens sincronizados com o protótipo oficial do dashboard e com o manual visual em anexo.
      </p>
      <div className="space-y-6">
        <ScaleSection title="Primary" scale={colors.primary} />
        <ScaleSection title="Secondary" scale={colors.secondary} />
        <ScaleSection title="Taupe" scale={colors.taupe} />
        <ScaleSection title="OffWhite" scale={colors.offWhite} />
      </div>
    </div>
  ),
};

export const Secondary = {
  render: () => (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">Cores de Suporte e Status</h2>
      <p className="text-sm text-taupe max-w-3xl">
        Escalas auxiliares para leitura de dados, semaforos e feedback visual do sistema.
      </p>
      <div className="space-y-6">
        <ScaleSection title="Sage" scale={colors.sage} />
        <ScaleSection title="Gold" scale={colors.gold} />
        <ScaleSection title="Terracota" scale={colors.terracota} />
        <ScaleSection title="Slate" scale={colors.slate} />
        <ScaleSection title="Status Success" scale={colors.success} />
        <ScaleSection title="Status Warning" scale={colors.warning} />
        <ScaleSection title="Status Danger" scale={colors.danger} />
        <ScaleSection title="Status Info" scale={colors.info} />
      </div>
    </div>
  ),
};

export const Gradients = {
  render: () => (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">Gradientes</h2>
      <p className="text-sm text-taupe max-w-3xl">
        Gradientes oficiais para composicao de atmosfera visual. Evite criar variacoes fora deste
        conjunto sem aprovacao do Design System.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradientTokens.map((gradient) => (
          <div key={gradient.name} className="rounded-xl border border-border bg-white p-3">
            <div
              className="h-24 rounded-lg border border-white/50 shadow-sm"
              style={{ backgroundImage: gradient.css }}
            />
            <div className="mt-3 text-sm font-semibold text-primary">{gradient.name}</div>
            <div className="mt-1 text-xs font-mono text-primary/80">{gradient.css}</div>
            <div className="mt-2 text-sm text-taupe">{gradient.use}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};
