import api from './api';

export const roiService = {
  getCards: async () => {
    try {
      const response = await api.get('/core/eficiencia/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cards de ROI:', error);
      throw error;
    }
  },
};

export default roiService;