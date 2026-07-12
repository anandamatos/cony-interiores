import api from './api';

export const getServices = async () => {
  const response = await api.get('/servicos/');
  return response.data;
};

export const getService = async (id) => {
  const response = await api.get(`/servicos/${id}/`);
  return response.data;
};

export const createService = async (data) => {
  console.log('Enviando para API:', data);
  const response = await api.post('/servicos/', data);
  return response.data;
};

export const updateService = async (id, data) => {
  const response = await api.put(`/servicos/${id}/`, data);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/servicos/${id}/`);
  return response.data;
};