import axios from 'axios';
import { getDecryptedToken } from '@/utils/auth';

export const api = axios.create({
  baseURL: 'https://localhost:7004/api',
});

debugger;
api.interceptors.request.use((config) => {
  const token = getDecryptedToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
