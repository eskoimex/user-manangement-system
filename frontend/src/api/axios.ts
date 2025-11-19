
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL,
  withCredentials: true,
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
