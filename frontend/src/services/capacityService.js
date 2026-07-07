import api from './api';

// Dados mockados (fallback enquanto API não está pronta)
const mockCapacityData = [
  { id: 1, nome: 'Sirlene Santos', carga: 8, capacidade: 10, complexidade: 3, especialidade: 'Cortinas' },
  { id: 2, nome: 'Maria Oliveira', carga: 6, capacidade: 10, complexidade: 2, especialidade: 'Forros' },
  { id: 3, nome: 'Joana Silva', carga: 4, capacidade: 10, complexidade: 1, especialidade: 'Reformas' },
  { id: 4, nome: 'Ana Paula', carga: 9, capacidade: 10, complexidade: 4, especialidade: 'Cortinas' },
  { id: 5, nome: 'Carla Souza', carga: 3, capacidade: 10, complexidade: 1, especialidade: 'Almofadas' },
  { id: 6, nome: 'Beatriz Lima', carga: 7, capacidade: 10, complexidade: 3, especialidade: 'Cortinas' },
];

/**
 * Busca dados de capacidade da API
 * Se a API não estiver disponível, retorna dados mockados
 */
export const fetchCapacityData = async (params = {}) => {
  try {
    // Tenta buscar da API
    const response = await api.get('/capacidade/', { params });
    return response.data;
  } catch (error) {
    console.warn('API de capacidade não disponível, usando dados mockados:', error.message);
    // Retorna dados mockados como fallback
    return mockCapacityData;
  }
};

/**
 * Busca dados de capacidade filtrados por período
 */
export const fetchCapacityByPeriod = async (period) => {
  try {
    const response = await api.get('/capacidade/', { params: { periodo: period } });
    return response.data;
  } catch (error) {
    console.warn('API de capacidade não disponível, usando dados mockados para o período:', period);
    return mockCapacityData;
  }
};

/**
 * Busca dados de capacidade filtrados por especialidade
 */
export const fetchCapacityBySpecialty = async (specialty) => {
  try {
    const response = await api.get('/capacidade/', { params: { especialidade: specialty } });
    return response.data;
  } catch (error) {
    console.warn('API de capacidade não disponível, usando dados mockados para especialidade:', specialty);
    if (specialty !== 'todas') {
      return mockCapacityData.filter(item => item.especialidade === specialty);
    }
    return mockCapacityData;
  }
};

/**
 * Busca dados de capacidade com filtros combinados
 */
export const fetchCapacityWithFilters = async (filters = {}) => {
  const { period, specialty } = filters;
  
  try {
    const response = await api.get('/capacidade/', { params: filters });
    return response.data;
  } catch (error) {
    console.warn('API de capacidade não disponível, usando dados mockados com filtros:', filters);
    
    let filteredData = [...mockCapacityData];
    
    if (specialty && specialty !== 'todas') {
      filteredData = filteredData.filter(item => item.especialidade === specialty);
    }
    
    // Simula filtro por período (na API real, isso viria do backend)
    if (period === 'semana') {
      // Mantém os dados
    } else if (period === 'mes') {
      // Mantém os dados
    }
    
    return filteredData;
  }
};

export default {
  fetchCapacityData,
  fetchCapacityByPeriod,
  fetchCapacityBySpecialty,
  fetchCapacityWithFilters,
};