import { useState } from 'react';
import SearchBar from './index';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default = {
  args: {
    placeholder: 'Buscar serviços, costureiras...',
  },
  render: (args) => (
    <div className="w-96">
      <SearchBar {...args} />
    </div>
  ),
};

const WithValueStory = () => {
  const [value, setValue] = useState('cortina');

  return (
    <div className="w-96">
      <SearchBar
        placeholder="Buscar pedidos, clientes ou materiais"
        value={value}
        onChange={setValue}
        onSearch={(val) => console.log('Buscando:', val)}
      />
    </div>
  );
};

export const WithValue = {
  render: () => <WithValueStory />,
};

export const Disabled = {
  args: {
    placeholder: 'Busca temporariamente indisponível',
    disabled: true,
  },
  render: (args) => (
    <div className="w-96">
      <SearchBar {...args} />
    </div>
  ),
};