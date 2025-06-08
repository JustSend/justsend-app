import axios, { InternalAxiosRequestConfig } from 'axios';
import { auth } from '@/firebaseConfig';
import { Platform } from 'react-native';

const BACKEND_URL =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_ANDROID_URL
    : process.env.EXPO_PUBLIC_WEB_URL;

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
