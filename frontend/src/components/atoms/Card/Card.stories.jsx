import React from 'react';
import Card from './index';

export default {
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

export const Default = (args) => (
  <Card {...args} className="max-w-sm">
    <h3 className="font-primary font-semibold text-lg text-[#703824]">Título do Card</h3>
    <p className="text-[#8C7568] mt-2">
      Conteúdo do card com os tokens de design da Cony.
    </p>
  </Card>
);
Default.args = {
  variant: 'default',
  shadow: 'card',
  hover: false,
  padding: true,
};

export const Gold = (args) => (
  <Card {...args} className="max-w-sm">
    <h3 className="font-primary font-semibold text-lg text-[#703824]">Card Gold</h3>
    <p className="text-[#8C7568] mt-2">
      Versão com gradiente gold para destaques.
    </p>
  </Card>
);
Gold.args = {
  variant: 'gold',
  shadow: 'gold',
  hover: true,
};

export const Glass = (args) => (
  <Card {...args} className="max-w-sm">
    <h3 className="font-primary font-semibold text-lg text-[#703824]">Efeito Glass</h3>
    <p className="text-[#8C7568] mt-2">
      Card com efeito de vidro fosco.
    </p>
  </Card>
);
Glass.args = {
  variant: 'ghost',
  shadow: 'sm',
  hover: true,
};

export const Elevated = (args) => (
  <Card {...args} className="max-w-sm">
    <h3 className="font-primary font-semibold text-lg text-[#703824]">Card Elevado</h3>
    <p className="text-[#8C7568] mt-2">
      Card com sombra elevada para maior destaque.
    </p>
  </Card>
);
Elevated.args = {
  variant: 'elevated',
  shadow: 'elevated',
  hover: true,
};