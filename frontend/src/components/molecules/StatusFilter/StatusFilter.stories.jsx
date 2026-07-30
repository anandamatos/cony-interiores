import React, { useState } from 'react';
import StatusFilter from './index';

const options = [
  { value: 'all', label: 'Todos', variant: 'all' },
  { value: 'active', label: 'Ativos', variant: 'active' },
  { value: 'inactive', label: 'Inativos', variant: 'inactive' },
  { value: 'pending', label: 'Pendentes', variant: 'pending' },
  { value: 'completed', label: 'Concluídos', variant: 'completed' },
];

export default {
  title: 'Molecules/StatusFilter',
  component: StatusFilter,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'select',
      options: ['all', 'active', 'inactive', 'pending', 'completed'],
    },
  },
};

export const Default = (args) => (
  <div className="w-full max-w-md">
    <StatusFilter {...args} options={options} />
  </div>
);
Default.args = {
  defaultValue: 'all',
};

export const WithState = () => {
  const [value, setValue] = useState('all');
  return (
    <div>
      <StatusFilter
        options={options}
        value={value}
        onChange={setValue}
      />
      <p className="mt-4 text-sm text-[#8C7568]">Filtro selecionado: <strong>{value}</strong></p>
    </div>
  );
};