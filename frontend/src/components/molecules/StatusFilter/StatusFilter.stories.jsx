import { useState } from 'react';
import StatusFilter from './index';

const options = [
  { value: 'all', label: 'Todos', variant: 'all' },
  { value: 'active', label: 'Semanal', variant: 'active' },
  { value: 'inactive', label: 'Mensal', variant: 'inactive' },
  { value: 'pending', label: 'Urgentes', variant: 'pending' },
  { value: 'completed', label: 'Concluídos', variant: 'completed' },
];

const meta = {
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

export default meta;

export const Default = {
  args: {
    defaultValue: 'all',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <StatusFilter {...args} options={options} />
    </div>
  ),
};

const WithStateStory = () => {
  const [value, setValue] = useState('all');

  return (
    <div>
      <StatusFilter
        options={options}
        value={value}
        onChange={setValue}
      />
      <p className="mt-4 text-sm text-taupe">Filtro selecionado: <strong>{value}</strong></p>
    </div>
  );
};

export const WithState = {
  render: () => <WithStateStory />,
};