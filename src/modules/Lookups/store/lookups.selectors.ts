import type {RootState} from '@src/redux/rootReducer';

export const selectNationalities = (state: RootState) => state.lookups.nationalities;
export const selectLanguages = (state: RootState) => state.lookups.languages;
export const selectLookupsLoading = (key: string) => (state: RootState) =>
  state.lookups.loading[key] ?? false;
