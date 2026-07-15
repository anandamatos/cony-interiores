import SearchBar from '../../components/molecules/SearchBar';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    onSearch: { action: 'searched' },
  },
};

export const Default = {
  args: {
    placeholder: 'Buscar...',
  },
};

export const WithValue = {
  args: {
    placeholder: 'Buscar...',
    defaultValue: 'Costureira',
  },
};

export const Disabled = {
  args: {
    placeholder: 'Buscar desabilitado...',
    disabled: true,
  },
};