import api from './api';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'current_user';

export const getStoredUser = () => {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const isAuthenticated = () => !!getAccessToken();

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me/');
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post('/auth/token/', { username, password });
  localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);

  const user = await getCurrentUser();
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return {
    ...response.data,
    user,
  };
};

export const logout = async () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getAuthSnapshot = () => ({
  accessToken: getAccessToken(),
  user: getStoredUser(),
});
