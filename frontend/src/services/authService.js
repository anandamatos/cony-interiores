import axios from "axios";
import api from "./api";

export const login = async (username, password) => {
  const response = await axios.post("/api/auth/token/", { username, password });
  localStorage.setItem("token", response.data.access);
  localStorage.setItem("refreshToken", response.data.refresh);
  return response.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    await api.post("/api/auth/token/logout/", { refresh: refreshToken });
  }
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => !!localStorage.getItem("token");
