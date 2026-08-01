import React, { useState } from 'react';
import SearchBar from './index';

export default {
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

export const Default = (args) => (
  <div className="w-96">
    <SearchBar {...args} />
  </div>
);
Default.args = {
  placeholder: 'Buscar serviços, costureiras...',
};

export const WithValue = () => {
  const [value, setValue] = useState('cortina');
  return (
    <div className="w-96">
      <SearchBar
        placeholder="Buscar..."
        value={value}
        onChange={setValue}
        onSearch={(val) => console.log('🔍 Buscando:', val)}
      />
    </div>
  );
};

export const Disabled = (args) => (
  <div className="w-96">
    <SearchBar {...args} disabled />
  </div>
);
Disabled.args = {
  placeholder: 'Busca desabilitada',
  disabled: true,
};