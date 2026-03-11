import type {RootState} from '@src/redux';

export const selectProfile = (state: RootState) => state.profile;
export const selectProfileData = (state: RootState) => state.profile.data;
export const selectActiveWorkspace = (state: RootState) => state.profile.activeWorkspace;
export const selectTradingAccounts = (state: RootState) => state.profile.data?.tradingAccounts ?? [];
export const selectProfileLoading = (state: RootState) => state.profile.loading;
export const selectProfileError = (state: RootState) => state.profile.error;
