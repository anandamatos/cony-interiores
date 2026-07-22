import api from './api';

const mapFromApi = (item) => ({
  id: item.id,
  nome: item.nome,
  contato: item.contato || '',
  especialidade: item.tipo_servico_preferido || item.especialidade || '',
  ativa: item.ativo ?? true,
  capacidadeBaseSemanal: item.capacidade_base_semanal,
  disponibilidadePercentual: item.disponibilidade_percentual,
});

const mapToApi = (data) => ({
  nome: data.nome,
  contato: data.contato || '',
  tipo_servico_preferido: data.especialidade || '',
  ativo: data.ativa ?? true,
});

const extractErrorMessage = (error) => {
  const payload = error?.response?.data;
  if (!payload) return 'Não foi possível concluir a operação.';
  if (typeof payload === 'string') return payload;

  const firstKey = Object.keys(payload)[0];
  const firstValue = payload[firstKey];
  if (Array.isArray(firstValue) && firstValue.length > 0) {
    return String(firstValue[0]);
  }
  if (typeof firstValue === 'string') {
    return firstValue;
  }
  return 'Não foi possível concluir a operação.';
};

export const getSeamstresses = async () => {
  const response = await api.get('/costureiras/');
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(mapFromApi);
};

export const getSeamstressById = async (id) => {
  const response = await api.get(`/costureiras/${id}/`);
  return mapFromApi(response.data);
};

export const createSeamstress = async (data) => {
  try {
    const response = await api.post('/costureiras/', mapToApi(data));
    return mapFromApi(response.data);
  } catch (error) {
    throw new Error(extractErrorMessage(error), { cause: error });
  }
};

export const updateSeamstress = async (id, data) => {
  try {
    const response = await api.patch(`/costureiras/${id}/`, mapToApi(data));
    return mapFromApi(response.data);
  } catch (error) {
    throw new Error(extractErrorMessage(error), { cause: error });
  }
};

export const deleteSeamstress = async (id) => {
  await api.delete(`/costureiras/${id}/`);
  return true;
};

export const seamstressService = {
  getAll: getSeamstresses,
  getById: getSeamstressById,
  create: createSeamstress,
  update: updateSeamstress,
  delete: deleteSeamstress,
};

export default seamstressService;
