import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshRequest = null;

// Interceptor para adicionar token (se necessário)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta para refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        if (!refreshRequest) {
          const refreshToken = localStorage.getItem("refreshToken");
          refreshRequest = axios
            .post("/api/auth/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("token", response.data.access);
              return response.data.access;
            })
            .finally(() => {
              refreshRequest = null;
            });
        }

        const accessToken = await refreshRequest;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = "Bearer " + accessToken;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;