import Button from './index';

export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'gold', 'ghost'],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
  },
};

export const Default = (args) => <Button {...args} />;
Default.args = {
  children: 'Novo serviço',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
};

export const AllVariants = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button variant="primary">Novo serviço</Button>
    <Button variant="secondary">Relatórios</Button>
    <Button variant="gold">Explorar tokens</Button>
    <Button variant="ghost">Ver detalhes</Button>
  </div>
);

export const AllSizes = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button size="sm">Ação curta</Button>
    <Button size="md">Ação padrão</Button>
    <Button size="lg">Ação de destaque</Button>
  </div>
);

export const Loading = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button loading>Salvar ajustes</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button disabled>Indisponível</Button>
    <Button variant="secondary" disabled>Indisponível</Button>
  </div>
);