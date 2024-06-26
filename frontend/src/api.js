import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiURL ="/choreo-apis/pesti/backend/rest-api-be2/v1"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/" ? "http://127.0.0.1:8000/" : apiURL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;