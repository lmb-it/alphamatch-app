/**
 * Auth API service
 */
import api from '../../../services/api';
import {URLs} from '../../../services/urls';
import type {ILoginPayload, IRegisterPayload, IUser} from '../models/auth.types';

export default {
  login: async (data: ILoginPayload) => {
    const res = await api.post(URLs.auth.login, data);
    return res.data;
  },

  register: async (data: IRegisterPayload) => {
    const res = await api.post(URLs.auth.register, data);
    return res.data;
  },

  me: async (): Promise<{success: boolean; data: IUser}> => {
    const res = await api.get(URLs.auth.me);
    return res.data;
  },

  logout: async () => {
    const res = await api.post(URLs.auth.logout);
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await api.post(URLs.auth.forgotPassword, {email});
    return res.data;
  },

  resetPassword: async (data: {token: string; password: string; passwordConfirmation: string}) => {
    const res = await api.post(URLs.auth.resetPassword, data);
    return res.data;
  },
};
