import React from 'react';
import Input from './index';

export default {
  title: 'Atoms/Input',
  component: Input,
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
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    multiline: { control: 'boolean' },
  },
};

export const Default = (args) => <Input {...args} />;
Default.args = {
  label: 'Nome',
  placeholder: 'Digite seu nome...',
  required: true,
};

export const WithError = (args) => <Input {...args} />;
WithError.args = {
  label: 'Email',
  placeholder: 'email@exemplo.com',
  error: 'Email inválido',
  required: true,
};

export const Disabled = (args) => <Input {...args} />;
Disabled.args = {
  label: 'Campo desabilitado',
  placeholder: 'Não editável',
  disabled: true,
};

export const Multiline = (args) => <Input {...args} />;
Multiline.args = {
  label: 'Observações',
  placeholder: 'Digite suas observações...',
  multiline: true,
  rows: 4,
};