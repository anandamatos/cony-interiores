import api from './api';

// Dados mockados para serviços
const mockServices = [
  { id: 1, cliente: 'João Silva', tipo: 'Cortina Ilhós', status: 'active', valor: 350, dataEntrega: '2026-06-25' },
  { id: 2, cliente: 'Maria Oliveira', tipo: 'Almofadas', status: 'active', valor: 280, dataEntrega: '2026-06-28' },
  { id: 3, cliente: 'Ana Costa', tipo: 'Tapete', status: 'completed', valor: 450, dataEntrega: '2026-06-20' },
  { id: 4, cliente: 'Pedro Santos', tipo: 'Cortina Romana', status: 'pending', valor: 520, dataEntrega: '2026-07-05' },
];

export const getServices = async () => {
  return mockServices;
};

export const createService = async (data) => {
  const newService = { ...data, id: Date.now(), status: 'pending' };
  mockServices.push(newService);
  return newService;
};

export const updateService = async (id, data) => {
  const index = mockServices.findIndex(s => s.id === id);
  if (index !== -1) {
    mockServices[index] = { ...mockServices[index], ...data };
    return mockServices[index];
  }
  throw new Error('Service not found');
};

export const deleteService = async (id) => {
  const index = mockServices.findIndex(s => s.id === id);
  if (index !== -1) {
    mockServices.splice(index, 1);
    return true;
  }
  throw new Error('Service not found');
};

export const serviceService = {
  getAll: getServices,
  create: createService,
  update: updateService,
  delete: deleteService,
};

export default serviceService;
