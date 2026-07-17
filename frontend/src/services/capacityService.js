import api from './api';

export const capacityService = {
  getAll: async () => {
    try {
      const response = await api.get('/capacity/');
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao buscar capacidades');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/capacity/${id}/`);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao buscar capacidade');
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/capacity/', data);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao criar capacidade');
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/capacity/${id}/`, data);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao atualizar capacidade');
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/capacity/${id}/`);
    } catch (_error) {
      throw new Error('Erro ao deletar capacidade');
    }
  },

  getBySeamstress: async (seamstressId) => {
    try {
      const response = await api.get(`/capacity/?seamstress=${seamstressId}`);
      return response.data;
    } catch (_error) {
      throw new Error('Erro ao buscar capacidade da costureira');
    }
  },
};

export default capacityService;
