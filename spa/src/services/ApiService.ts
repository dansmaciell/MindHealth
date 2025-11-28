import axios, { type AxiosInstance } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const apiService: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export default apiService;
