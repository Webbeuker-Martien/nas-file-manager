import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL ?? 'https://localhost',
});

export default apiClient;