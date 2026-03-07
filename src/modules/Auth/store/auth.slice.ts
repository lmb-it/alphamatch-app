/**
 * Auth Redux slice
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {IAuthState, ILoginPayload, IRegisterPayload, IUser} from '../models/auth.types';

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
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
    registerSuccess(state, action: PayloadAction<{user: IUser; token: string}>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
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

    // ── Clear error ──
    clearError(state) {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
