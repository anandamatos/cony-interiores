import api from "./api";

export const getSeamstresses = async () => {
  const response = await api.get("/costureiras/");
  return response.data;
};

export const getSeamstress = async (id) => {
  const response = await api.get(`/costureiras/${id}/`);
  return response.data;
};

export const createSeamstress = async (data) => {
  // Mapear campos do frontend para o backend
  const payload = {
    nome: data.nome,
    contato: data.contato,
    observacoes: data.especialidade || "",
    ativo: data.ativa !== undefined ? data.ativa : true,
    tipo_servico_preferido: data.especialidade || "",
  };
  console.log("Enviando costureira:", payload);
  const response = await api.post("/costureiras/", payload);
  return response.data;
};

export const updateSeamstress = async (id, data) => {
  const response = await api.put(`/costureiras/${id}/`, data);
  return response.data;
};

export const deleteSeamstress = async (id) => {
  const response = await api.delete(`/costureiras/${id}/`);
  return response.data;
};
