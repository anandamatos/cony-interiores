import Card from './index';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gold', 'offWhite', 'ghost', 'elevated'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'card', 'elevated', 'gold', 'terracota', 'sage', 'primary', 'card-hover'],
    },
    hover: { control: 'boolean' },
    padding: { control: 'boolean' },
  },
};

export default meta;

export const Default = {
  args: {
    variant: 'default',
    shadow: 'card',
    hover: false,
    padding: true,
  },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <h3 className="font-primary font-semibold text-lg text-primary">Visão geral da operação</h3>
      <p className="text-taupe mt-2">
        Superfície base para agrupar métricas, gráficos e recados operacionais com respiro elegante.
      </p>
    </Card>
  ),
};

export const Gold = {
  args: {
    variant: 'gold',
    shadow: 'gold',
    hover: true,
  },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <h3 className="font-primary font-semibold text-lg text-primary">Card de destaque</h3>
      <p className="text-taupe mt-2">
        Aplicação recomendada para chamadas de destaque, filtros ativos e painéis de navegação visual.
      </p>
    </Card>
  ),
};

export const Glass = {
  args: {
    variant: 'ghost',
    shadow: 'sm',
    hover: true,
  },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <h3 className="font-primary font-semibold text-lg text-primary">Superfície translúcida</h3>
      <p className="text-taupe mt-2">
        Ideal para contextos com fundos texturizados ou camadas suaves sem perder legibilidade.
      </p>
    </Card>
  ),
};

export const Elevated = {
  args: {
    variant: 'elevated',
    shadow: 'elevated',
    hover: true,
  },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <h3 className="font-primary font-semibold text-lg text-primary">Card elevado</h3>
      <p className="text-taupe mt-2">
        Útil para módulos prioritários, atalhos ou ações com maior peso visual dentro da página.
      </p>
    </Card>
  ),
};