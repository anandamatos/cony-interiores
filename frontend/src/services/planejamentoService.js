import api from "./api";

// Mock enquanto não há API
const mockPlanningData = {
  planning: [
    {
      id: 1,
      title: "Esta semana",
      subtitle: "Pagamentos previstos",
      total: 4500,
      seamstresses: 8,
      services: 15,
      variant: "gold",
    },
    {
      id: 2,
      title: "Próxima semana",
      subtitle: "Pagamentos previstos",
      total: 3800,
      seamstresses: 6,
      services: 12,
      variant: "default",
    },
  ],
};

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true" || false;

export const fetchPlanningData = async () => {
  try {
    const response = await api.get("/planejamento/");
    return response.data;
  } catch (error) {
    if (!USE_MOCKS && import.meta.env.PROD) {
      console.error("Erro ao buscar planejamento:", error);
      throw new Error("Erro ao carregar planejamento", { cause: error });
    }

    console.warn(
      "API de planejamento não disponível, usando dados mockados:",
      error.message,
    );

    return mockPlanningData;
  }
};

export default {
  fetchPlanningData,
};