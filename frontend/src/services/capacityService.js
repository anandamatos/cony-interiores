import api from './api';

export const capacityService = {
  getAll: async () => {
    const response = await api.get('/capacity/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/capacity/${id}/`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/capacity/', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/capacity/${id}/`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/capacity/${id}/`);
  },

  getBySeamstress: async (seamstressId) => {
    const response = await api.get(`/capacity/?seamstress=${seamstressId}`);
    return response.data;
  },
};

export default capacityService;