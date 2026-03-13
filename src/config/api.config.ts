import Config from 'react-native-config';

export const API_CONFIG = {
  baseURL: Config.API_BASE_URL || 'http://localhost:1097/api/app',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

/** Form type reference IDs — sourced from form_types table */
export const FORM_TYPE_REFS = {
  providerProfile: Config.PROVIDER_PROFILE_FORM_TYPE_REF || 'FOR-Y1JAJIHT',
};
