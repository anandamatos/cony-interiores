import axios from 'axios';

const API_PREFIX = '/api';
const DEFAULT_TIMEOUT_MS = Number.parseInt(import.meta.env.VITE_API_TIMEOUT_MS || '10000', 10);

const apiClient = axios.create({
  baseURL: API_PREFIX,
  timeout: DEFAULT_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

// Interceptor para adicionar token (se necessario)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function normalizePath(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    throw new Error('O caminho da API deve comecar com "/".');
  }

  return path;
}

export async function getApiMessage(path) {
  const normalizedPath = normalizePath(path);

  try {
    const response = await apiClient.get(normalizedPath);
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tempo limite excedido na requisicao da API');
    }

    if (error.response) {
      throw new Error('Falha na requisicao da API');
    }

    throw error;
  }
}

export default apiClient;
