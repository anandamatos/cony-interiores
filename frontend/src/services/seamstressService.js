import api from './api';
import { costureirasMock } from '../mocks/costureiras';

export const getSeamstresses = async () => {
  return costureirasMock;
};

export const createSeamstress = async (data) => {
  const newSeamstress = { ...data, id: Date.now() };
  costureirasMock.push(newSeamstress);
  return newSeamstress;
};

export const updateSeamstress = async (id, data) => {
  const index = costureirasMock.findIndex(s => s.id === id);
  if (index !== -1) {
    costureirasMock[index] = { ...costureirasMock[index], ...data };
    return costureirasMock[index];
  }
  throw new Error('Seamstress not found');
};

export const deleteSeamstress = async (id) => {
  const index = costureirasMock.findIndex(s => s.id === id);
  if (index !== -1) {
    costureirasMock.splice(index, 1);
    return true;
  }
  throw new Error('Seamstress not found');
};

export const seamstressService = {
  getAll: getSeamstresses,
  create: createSeamstress,
  update: updateSeamstress,
  delete: deleteSeamstress,
};

export default seamstressService;
