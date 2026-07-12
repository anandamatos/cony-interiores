import Select from '../../src/components/atoms/Select';

export default {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    options: { control: 'object' },
  },
};

const defaultOptions = [
  { value: '', label: 'Selecione uma opção' },
  { value: '1', label: 'Opção 1' },
  { value: '2', label: 'Opção 2' },
  { value: '3', label: 'Opção 3' },
];

export const Default = {
  args: {
    options: defaultOptions,
    placeholder: 'Selecione...',
  },
};

export const WithLabel = {
  args: {
    label: 'Categoria',
    options: defaultOptions,
  },
};

export const WithError = {
  args: {
    label: 'Categoria',
    options: defaultOptions,
    error: 'Selecione uma categoria válida',
  },
};

export const Disabled = {
  args: {
    label: 'Categoria',
    options: defaultOptions,
    disabled: true,
  },
};

export const Required = {
  args: {
    label: 'Categoria',
    options: defaultOptions,
    required: true,
  },
};