import axios, { InternalAxiosRequestConfig } from 'axios';
import { auth } from '@/firebaseConfig';

const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL || 'put variable in .env';

export const apiPublic = axios.create({
  baseURL: BACKEND_URL,
});

export const apiPrivate = axios.create({
  baseURL: BACKEND_URL,
});

apiPrivate.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
