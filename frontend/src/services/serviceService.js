import api from './api';

export const serviceService = {
  getAll: async () => {
    try {
      const response = await api.get('/servicos/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/servicos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar serviço ${id}:`, error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post('/servicos/', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/servicos/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar serviço ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/servicos/${id}/`);
    } catch (error) {
      console.error(`Erro ao deletar serviço ${id}:`, error);
      throw error;
    }
  },

  getClientes: async () => {
    try {
      const response = await api.get('/clientes/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },
};

export default serviceService;
