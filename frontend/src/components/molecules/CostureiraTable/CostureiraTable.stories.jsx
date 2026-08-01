import React from 'react';
import CostureiraTable from './index';

const mockData = [
  { id: 1, nome: 'Maria Silva', especialidade: 'Cortinas', status: 'active', capacidade: 8 },
  { id: 2, nome: 'Joana Santos', especialidade: 'Almofadas', status: 'active', capacidade: 6 },
  { id: 3, nome: 'Ana Paula', especialidade: 'Tapetes', status: 'inactive', capacidade: 4 },
  { id: 4, nome: 'Sirlene Souza', especialidade: 'Cortinas', status: 'active', capacidade: 10 },
];

export default {
  title: 'Molecules/CostureiraTable',
  component: CostureiraTable,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};

export const Default = () => (
  <div className="w-full max-w-3xl">
    <CostureiraTable data={mockData} />
  </div>
);

export const Empty = () => (
  <div className="w-full max-w-3xl">
    <CostureiraTable data={[]} />
  </div>
);