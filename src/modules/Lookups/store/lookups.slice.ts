import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {ILookupsState, INationalityOption, ILanguageOption} from '../models/lookups.types';

const initialState: ILookupsState = {
  countries: [],
  states: [],
  cities: [],
  currencies: [],
  careers: [],
  nationalities: [],
  languages: [],
  loading: {},
  errors: {},
};

const lookupsSlice = createSlice({
  name: 'lookups',
  initialState,
  reducers: {
    // ── Fetch triggers (saga listens) ──
    fetchNationalities: (state) => {
      state.loading.nationalities = true;
      state.errors.nationalities = null;
    },
    fetchLanguages: (state) => {
      state.loading.languages = true;
      state.errors.languages = null;
    },

    // ── Setters ──
    setNationalities: (state, action: PayloadAction<INationalityOption[]>) => {
      state.nationalities = action.payload;
      state.loading.nationalities = false;
    },
    setLanguages: (state, action: PayloadAction<ILanguageOption[]>) => {
      state.languages = action.payload;
      state.loading.languages = false;
    },

    // ── Error handlers ──
    setError: (state, action: PayloadAction<{key: string; error: string}>) => {
      state.errors[action.payload.key] = action.payload.error;
      state.loading[action.payload.key] = false;
    },
  },
});

export const lookupsActions = lookupsSlice.actions;
export default lookupsSlice.reducer;
