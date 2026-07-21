import api from './api';

export const getServices = async () => {
  const response = await api.get('/servicos/');
  return Array.isArray(response.data) ? response.data : [];
};

export const createService = async (data) => {
  const response = await api.post('/servicos/', data);
  return response.data;
};

export const updateService = async (id, data) => {
  const response = await api.patch(`/servicos/${id}/`, data);
  return response.data;
};

export const deleteService = async (id) => {
  await api.delete(`/servicos/${id}/`);
  return true;
};

export const serviceService = {
  getAll: getServices,
  create: createService,
  update: updateService,
  delete: deleteService,
};

export default serviceService;
