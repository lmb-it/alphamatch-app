/**
 * Auth selectors
 */
import type {RootState} from '../../../redux/store';

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectPendingVerification = (state: RootState) => state.auth.pendingVerification;
export const selectResetContact = (state: RootState) => state.auth.resetContact;
export const selectWelcomeIntent = (state: RootState) => state.auth.welcomeIntent;
