const breakpoints = [
  { name: 'sm', value: '640px', usage: 'Mobile grande / tablet pequeno' },
  { name: 'md', value: '768px', usage: 'Tablet' },
  { name: 'lg', value: '1024px', usage: 'Desktop inicial e shell com sidebar fixa' },
  { name: 'xl', value: '1280px', usage: 'Desktop amplo' },
  { name: '2xl', value: '1536px', usage: 'Telas grandes' },
];

export default {
  title: 'Tokens/Breakpoints',
  parameters: {
    docs: {
      description: {
        component:
          'Breakpoints oficiais do projeto. Use estas larguras para comportamento responsivo consistente entre pages e componentes.',
      },
    },
  },
};

export const Scale = {
  render: () => (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">Escala de Breakpoints</h2>
      <div className="space-y-3">
        {breakpoints.map((bp) => (
          <div key={bp.name} className="rounded-lg border border-border bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-primary">{bp.name}</div>
                <div className="text-sm text-taupe">{bp.usage}</div>
              </div>
              <div className="text-sm font-mono text-primary">{bp.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ResponsivePreview = {
  render: () => (
    <div className="p-6 space-y-4 bg-offWhite min-h-[320px]">
      <h2 className="text-xl font-bold text-primary">Preview de Comportamento</h2>
      <p className="text-sm text-taupe">
        Redimensione o viewport no Storybook para validar mudancas entre mobile, tablet e desktop.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-white p-4">
          <div className="text-sm font-semibold text-primary">Card 1</div>
          <div className="text-sm text-taupe mt-1">Stack no mobile, 2 colunas em md, 4 em xl.</div>
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <div className="text-sm font-semibold text-primary">Card 2</div>
          <div className="text-sm text-taupe mt-1">Mantem ritmo de espacamento por breakpoint.</div>
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <div className="text-sm font-semibold text-primary">Card 3</div>
          <div className="text-sm text-taupe mt-1">Ajuda a validar densidade de informacao.</div>
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <div className="text-sm font-semibold text-primary">Card 4</div>
          <div className="text-sm text-taupe mt-1">Referencia para dashboards e listas.</div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-white p-4">
        <div className="text-sm font-semibold text-primary">Shell Responsivo</div>
        <ul className="mt-2 text-sm text-taupe list-disc list-inside space-y-1">
          <li>Mobile: sidebar em drawer e header com botao hamburger.</li>
          <li>Desktop (lg+): sidebar fixa e header deslocado com left 64.</li>
          <li>Conteudo principal com top padding para compensar header fixo.</li>
        </ul>
      </div>
    </div>
  ),
};
