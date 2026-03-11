/**
 * Axios instance with auth interceptors
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_CONFIG} from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      // Use .set() — direct property assignment (config.headers.Authorization)
      // does not work reliably with AxiosHeaders on Hermes engine
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Callback for 401 handling — set by app bootstrap to dispatch Redux logout
let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(cb: () => void) {
  onUnauthorized = cb;
}

// Response interceptor — handle 401
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('auth_token');
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);

export default api;
