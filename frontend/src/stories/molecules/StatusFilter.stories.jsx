import StatusFilter from '../../components/molecules/StatusFilter';

export default {
  title: 'Molecules/StatusFilter',
  component: StatusFilter,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    onChange: { action: 'changed' },
  },
};

const defaultOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
  { value: 'pending', label: 'Pendentes' },
];

export const Default = {
  args: {
    options: defaultOptions,
  },
};

export const WithSelected = {
  args: {
    options: defaultOptions,
    defaultValue: 'active',
  },
};