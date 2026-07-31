import React from 'react';
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
  children: 'Clique aqui',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
};

export const AllVariants = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="gold">Gold</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);

export const AllSizes = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Loading = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button loading>Carregando</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex gap-4 flex-wrap items-center">
    <Button disabled>Desabilitado</Button>
    <Button variant="secondary" disabled>Desabilitado</Button>
  </div>
);