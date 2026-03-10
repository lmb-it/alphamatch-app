/**
 * Auth API service
 */
import api from '../../../services/api';
import {URLs} from '../../../services/urls';
import type {
  ILoginPayload,
  IRegisterPayload,
  IUser,
  IVerifyEmailPayload,
  IResendCodePayload,
  ISocialLoginPayload,
  IPhoneLoginPayload,
  IForgotPasswordPayload,
  IVerifyResetCodePayload,
  IResetPasswordPayload,
} from '../models/auth.types';

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
    const res = await api.post(URLs.auth.me);
    return res.data;
  },

  logout: async () => {
    const res = await api.post(URLs.auth.logout);
    return res.data;
  },

  verifyEmail: async (data: IVerifyEmailPayload) => {
    const res = await api.post(URLs.auth.verifyEmail, data);
    return res.data;
  },

  resendCode: async (data: IResendCodePayload) => {
    const res = await api.post(URLs.auth.resendCode, data);
    return res.data;
  },

  forgotPassword: async (data: IForgotPasswordPayload) => {
    const res = await api.post(URLs.auth.forgotPassword, data);
    return res.data;
  },

  verifyResetCode: async (data: IVerifyResetCodePayload) => {
    const res = await api.post(URLs.auth.verifyResetCode, data);
    return res.data;
  },

  resetPassword: async (data: IResetPasswordPayload) => {
    const res = await api.post(URLs.auth.resetPassword, data);
    return res.data;
  },

  socialLogin: async (data: ISocialLoginPayload) => {
    const res = await api.post(URLs.auth.socialLogin, data);
    return res.data;
  },

  phoneLogin: async (data: IPhoneLoginPayload) => {
    const res = await api.post(URLs.auth.phoneLogin, data);
    return res.data;
  },

};
