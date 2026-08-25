import axios from 'axios';

import { useAuthStore } from '@/store/authStore';

const client = axios.create({
  baseURL: '/',
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.startsWith('/auth/login')) {
      useAuthStore.getState().setUnauthenticated();
    }

    return Promise.reject(error);
  }
);

export default client;
