import api from "./api";

// Mock enquanto não há API
const weeklyMockData = {
  completed: 128,
  inProgress: 14,
  seamstresses: 9,
  efficiency: 92,

  activities: [
    { day: "Seg", value: 8 },
    { day: "Ter", value: 12 },
    { day: "Qua", value: 10 },
    { day: "Qui", value: 15 },
    { day: "Sex", value: 11 },
    { day: "Sáb", value: 6 },
    { day: "Dom", value: 4 },
  ],
};

const monthlyMockData = {
  completed: 486,
  inProgress: 31,
  seamstresses: 12,
  efficiency: 95,

  activities: [
    { day: "1ª Sem", value: 110 },
    { day: "2ª Sem", value: 126 },
    { day: "3ª Sem", value: 118 },
    { day: "4ª Sem", value: 132 },
  ],
};

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true" || false;

export const fetchProductivityData = async (period = "week") => {
  try {
    const response = await api.get(`/produtividade/?period=${period}`);
    return response.data;
  } catch (error) {
    if (!USE_MOCKS && import.meta.env.PROD) {
      console.error("Erro ao buscar produtividade:", error);
      throw new Error("Erro ao carregar produtividade", {
        cause: error,
      });
    }

    console.warn(
      "API de produtividade não disponível, usando dados mockados:",
      error.message
    );

    return period === "month"
      ? monthlyMockData
      : weeklyMockData;
  }
};

export default {
  fetchProductivityData,
};