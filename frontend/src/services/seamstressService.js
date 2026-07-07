import api from './api';

// Dados mockados
const mockSeamstresses = [
  { id: 1, nome: 'Sirlene Santos', contato: '(11) 99999-9999', observacoes: 'Especialista em cortinas', especialidade: 'Cortinas' },
  { id: 2, nome: 'Maria Oliveira', contato: '(11) 98888-8888', observacoes: 'Faz forros', especialidade: 'Forros' },
];

export const fetchSeamstresses = async () => {
  try {
    const response = await api.get('/costureiras/');
    return response.data;
  } catch (error) {
    console.warn('API de costureiras não disponível, usando dados mockados');
    return mockSeamstresses;
  }
};

export const createSeamstress = async (data) => {
  try {
    const response = await api.post('/costureiras/', data);
    return response.data;
  } catch (error) {
    console.warn('API de costureiras não disponível, simulando criação');
    const newSeamstress = { id: Date.now(), ...data };
    mockSeamstresses.push(newSeamstress);
    return newSeamstress;
  }
};