/**
 * Auth Redux slice
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {
  IAuthState,
  ILoginPayload,
  IRegisterPayload,
  IUser,
  IPendingVerification,
  IVerifyEmailPayload,
  IResendCodePayload,
  ISocialLoginPayload,
  IPhoneLoginPayload,
  IForgotPasswordPayload,
  IVerifyResetCodePayload,
  IResetPasswordPayload,
} from '../models/auth.types';

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  pendingVerification: null,
  resetContact: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ── Login ──
    login(state, _action: PayloadAction<ILoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{user: IUser; token: string}>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.pendingVerification = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Register ──
    register(state, _action: PayloadAction<IRegisterPayload>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<{pendingVerification: IPendingVerification}>) {
      state.loading = false;
      state.error = null;
      state.pendingVerification = action.payload.pendingVerification;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Verify Email ──
    verifyEmail(state, _action: PayloadAction<IVerifyEmailPayload>) {
      state.loading = true;
      state.error = null;
    },
    verifyEmailSuccess(state, action: PayloadAction<{user: IUser; token: string}>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.pendingVerification = null;
    },
    verifyEmailFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Resend Code ──
    resendCode(state, _action: PayloadAction<IResendCodePayload>) {
      state.loading = true;
      state.error = null;
    },
    resendCodeSuccess(state) {
      state.loading = false;
    },
    resendCodeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Social Login ──
    socialLogin(state, _action: PayloadAction<ISocialLoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    socialLoginSuccess(state, action: PayloadAction<{user: IUser; token: string}>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    socialLoginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Phone Login ──
    phoneLogin(state, _action: PayloadAction<IPhoneLoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    phoneLoginSuccess(state, action: PayloadAction<{user: IUser; token: string}>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    phoneLoginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Forgot Password ──
    forgotPassword(state, _action: PayloadAction<IForgotPasswordPayload>) {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess(state, action: PayloadAction<{contactInfo: string}>) {
      state.loading = false;
      state.resetContact = action.payload.contactInfo;
      state.pendingVerification = {
        contactEmail: action.payload.contactInfo,
        context: 'passwordReset',
      };
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Verify Reset Code ──
    verifyResetCode(state, _action: PayloadAction<IVerifyResetCodePayload>) {
      state.loading = true;
      state.error = null;
    },
    verifyResetCodeSuccess(state, action: PayloadAction<{resetToken: string}>) {
      state.loading = false;
      state.resetContact = action.payload.resetToken;
    },
    verifyResetCodeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Reset Password ──
    resetPassword(state, _action: PayloadAction<IResetPasswordPayload>) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
      state.resetContact = null;
      state.pendingVerification = null;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Logout ──
    logout(state) {
      state.loading = true;
    },
    logoutSuccess() {
      return initialState;
    },

    // ── Fetch Me (restore session) ──
    fetchMe(state) {
      state.loading = true;
    },
    fetchMeSuccess(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    fetchMeFailure(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },

    // ── Utility ──
    setPendingVerification(state, action: PayloadAction<IPendingVerification | null>) {
      state.pendingVerification = action.payload;
    },
    setResetContact(state, action: PayloadAction<string | null>) {
      state.resetContact = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
