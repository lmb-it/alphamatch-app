import Config from 'react-native-config';

export const API_CONFIG = {
  baseURL: Config.API_BASE_URL || 'http://localhost:1097/api/app',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
