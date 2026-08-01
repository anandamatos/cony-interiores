import React from 'react';
import Select from './index';

const options = [
  { value: 'active', label: 'Ativo' },
  { value: 'pending', label: 'Pendente' },
  { value: 'completed', label: 'Concluído' },
  { value: 'cancelled', label: 'Cancelado' },
];

export default {
  title: 'Atoms/Select',
  component: Select,
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
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
};

export const Default = (args) => <Select {...args} />;
Default.args = {
  label: 'Status',
  options,
  placeholder: 'Selecione um status...',
  required: true,
};

export const WithError = (args) => <Select {...args} />;
WithError.args = {
  label: 'Status',
  options,
  placeholder: 'Selecione um status...',
  error: 'Campo obrigatório',
  required: true,
};

export const Disabled = (args) => <Select {...args} />;
Disabled.args = {
  label: 'Status desabilitado',
  options,
  placeholder: 'Não editável',
  disabled: true,
};