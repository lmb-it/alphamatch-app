import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {IProfileData, IProfileState, ISwitchWorkspacePayload} from '../models/profile.types';

const initialState: IProfileState = {
  data: null,
  activeWorkspace: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Fetch profile
    fetchProfile(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action: PayloadAction<IProfileData>) {
      state.loading = false;
      state.data = action.payload;
      state.activeWorkspace = action.payload.activeWorkspace;
    },
    fetchProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Switch workspace
    switchWorkspace(state, _action: PayloadAction<ISwitchWorkspacePayload>) {
      state.loading = true;
      state.error = null;
    },
    switchWorkspaceSuccess(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.activeWorkspace = action.payload;
    },
    switchWorkspaceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear
    clearProfile(state) {
      return initialState;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
