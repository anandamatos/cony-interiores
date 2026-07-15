import { colors } from "../../styles/tokens/colors";

const gradientTokens = [
  {
    name: "gradient-primary",
    css: "linear-gradient(135deg, #C9A86A 0%, #A8968B 50%, #4B3A2E 100%)",
    use: "Hero sections, highlights e cards de assinatura visual.",
  },
  {
    name: "gradient-gold",
    css: "linear-gradient(135deg, #D9C7B1 0%, #C9A86A 100%)",
    use: "Barras de progresso, graficos e estados ativos suaves.",
  },
  {
    name: "gradient-warm",
    css: "linear-gradient(135deg, #4B3A2E 0%, #B56A4A 100%)",
    use: "CTAs fortes, estados de destaque e superficies premium.",
  },
  {
    name: "gradient-sage",
    css: "linear-gradient(135deg, #8D9ABA 0%, #465057 100%)",
    use: "Dados analiticos, secoes tecnicas e comparativos.",
  },
  {
    name: "gradient-offWhite",
    css: "linear-gradient(135deg, #F6F3EF 0%, #E6E2DD 100%)",
    use: "Planos de fundo e elevacao discreta de containers.",
  },
];

const renderScale = (title, scale) => (
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

export default {
  title: "Tokens/Cores",
  parameters: {
    docs: {
      description: {
        component: "Sistema de cores da Cony Interiores",
      },
    },
  },
};

export const Primary = {
  render: () => (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">Cores Primarias e Secundarias</h2>
      <p className="text-sm text-taupe max-w-3xl">
        Paleta base para identidade da Cony. Utilize os tons 500 como referencia principal e os tons
        50-300/600-900 para estados de interface, backgrounds e contraste.
      </p>
      <div className="space-y-6">
        {renderScale("Primary", colors.primary)}
        {renderScale("Secondary", colors.secondary)}
        {renderScale("Taupe", colors.taupe)}
        {renderScale("OffWhite", colors.offWhite)}
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
        {renderScale("Sage", colors.sage)}
        {renderScale("Gold", colors.gold)}
        {renderScale("Terracota", colors.terracota)}
        {renderScale("Slate", colors.slate)}
        {renderScale("Status Success", colors.success)}
        {renderScale("Status Warning", colors.warning)}
        {renderScale("Status Danger", colors.danger)}
        {renderScale("Status Info", colors.info)}
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
