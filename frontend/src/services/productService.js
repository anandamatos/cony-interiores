import api from './api';

export const productService = {
  getAll: async () => {
    try {
      const response = await api.get('/produtos/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/produtos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/produtos/', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/produtos/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/produtos/${id}/`);
    } catch (error) {
      console.error(`Erro ao deletar produto ${id}:`, error);
      throw error;
    }
  },
};

export default productService;
