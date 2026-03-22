import type {RootState} from '@src/redux';

export const selectProfile = (state: RootState) => state.profile;
export const selectProfileData = (state: RootState) => state.profile.data;
export const selectActiveWorkspace = (state: RootState) => state.profile.activeWorkspace;
export const selectProfileUser = (state: RootState) => state.profile.data?.user ?? null;
export const selectTradingAccounts = (state: RootState) => state.profile.data?.tradingAccounts ?? [];
export const selectProfileLoading = (state: RootState) => state.profile.loading;
export const selectProfileError = (state: RootState) => state.profile.error;

// Portfolio sections
export const selectExperiences = (state: RootState) => state.profile.experiences;
export const selectEducation = (state: RootState) => state.profile.education;
export const selectQualifications = (state: RootState) => state.profile.qualifications;
export const selectReferences = (state: RootState) => state.profile.references;
export const selectPortfolioItems = (state: RootState) => state.profile.portfolioItems;
