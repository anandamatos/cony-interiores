import Card from "../../components/atoms/Card";

export default {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    hover: { control: "boolean" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    children: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-taupe">Card Base</p>
            <h3 className="text-[18px] font-semibold font-primary text-primary">Resumo</h3>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success">
            +12%
          </span>
        </div>
        <p className="text-[14px] leading-[1.6] text-primary/70">
          Superfície neutra com borda suave, raio curto e sombra discreta, como no protótipo.
        </p>
        <button className="rounded-[6px] bg-primary px-4 py-2 text-sm font-semibold text-offWhite">
          Ação
        </button>
      </div>
    ),
  },
};

export const WithHover = {
  args: {
    hover: true,
    children: (
      <div className="space-y-2">
        <h3 className="text-[18px] font-semibold font-primary text-primary">Hover State</h3>
        <p className="text-[14px] text-primary/70">Elevação e borda ficam visíveis ao passar o mouse.</p>
        <span className="inline-block text-sm font-semibold text-gold">Ver detalhes →</span>
      </div>
    ),
  },
};

export const StatCard = {
  args: {
    hover: true,
    shadow: 'stat-primary',
    className: 'border-l-4 border-l-gold',
    children: (
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-taupe">Serviços Ativos</p>
            <div className="mt-2 text-[32px] font-bold leading-none font-primary text-primary">12</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-offWhite text-taupe">
            12
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success">
          ↗ 3 novos esta semana
        </span>
      </div>
    ),
  },
};
