import axios from "axios";

const isDev = import.meta.env.VITE_NODE_ENV;

const baseURL = isDev
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL; 

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isDev) {
      console.error("API Error:", error);
    } else {
      console.error("API Error:", error?.message || "Something went wrong");
    }
    return Promise.reject(error);
  }
);
