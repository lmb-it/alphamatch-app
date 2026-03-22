import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {
  IProfileData, IProfileState, ISwitchWorkspacePayload, IUpdateProfilePayload,
  IExperience, IEducation, IQualification, IReference, IPortfolioItemDetail,
  ICreateExperience, ICreateEducation, ICreateQualification, ICreateReference, ICreatePortfolioItem,
} from '../models/profile.types';

const sectionInitial = {items: [] as any[], loading: false, error: null};

const initialState: IProfileState = {
  data: null,
  activeWorkspace: null,
  loading: false,
  error: null,
  experiences: {...sectionInitial},
  education: {...sectionInitial},
  qualifications: {...sectionInitial},
  references: {...sectionInitial},
  portfolioItems: {...sectionInitial},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // ── Fetch profile ──
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

    // ── Switch workspace ──
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

    // ── Update profile ──
    updateProfile(state, _action: PayloadAction<IUpdateProfilePayload>) {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: PayloadAction<IProfileData>) {
      state.loading = false;
      state.data = action.payload;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Upload avatar ──
    uploadAvatar(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    uploadAvatarSuccess(state) {
      state.loading = false;
    },
    uploadAvatarFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Upload cover ──
    uploadCover(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    uploadCoverSuccess(state) {
      state.loading = false;
    },
    uploadCoverFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ══ EXPERIENCE ══
    loadExperiences(state, _action: PayloadAction<string>) {
      state.experiences.loading = true;
      state.experiences.error = null;
    },
    setExperiences(state, action: PayloadAction<IExperience[]>) {
      state.experiences = {items: action.payload, loading: false, error: null};
    },
    setExperiencesError(state, action: PayloadAction<string>) {
      state.experiences.loading = false;
      state.experiences.error = action.payload;
    },
    createExperience(_state, _action: PayloadAction<{ref: string; data: ICreateExperience}>) {},
    updateExperience(_state, _action: PayloadAction<{ref: string; itemRef: string; data: ICreateExperience}>) {},
    deleteExperience(_state, _action: PayloadAction<{ref: string; itemRef: string}>) {},

    // ══ EDUCATION ══
    loadEducation(state, _action: PayloadAction<string>) {
      state.education.loading = true;
      state.education.error = null;
    },
    setEducation(state, action: PayloadAction<IEducation[]>) {
      state.education = {items: action.payload, loading: false, error: null};
    },
    setEducationError(state, action: PayloadAction<string>) {
      state.education.loading = false;
      state.education.error = action.payload;
    },
    createEducation(_state, _action: PayloadAction<{ref: string; data: ICreateEducation}>) {},
    updateEducation(_state, _action: PayloadAction<{ref: string; itemRef: string; data: ICreateEducation}>) {},
    deleteEducation(_state, _action: PayloadAction<{ref: string; itemRef: string}>) {},

    // ══ QUALIFICATIONS ══
    loadQualifications(state, _action: PayloadAction<string>) {
      state.qualifications.loading = true;
      state.qualifications.error = null;
    },
    setQualifications(state, action: PayloadAction<IQualification[]>) {
      state.qualifications = {items: action.payload, loading: false, error: null};
    },
    setQualificationsError(state, action: PayloadAction<string>) {
      state.qualifications.loading = false;
      state.qualifications.error = action.payload;
    },
    createQualification(_state, _action: PayloadAction<{ref: string; data: ICreateQualification}>) {},
    updateQualification(_state, _action: PayloadAction<{ref: string; itemRef: string; data: ICreateQualification}>) {},
    deleteQualification(_state, _action: PayloadAction<{ref: string; itemRef: string}>) {},

    // ══ REFERENCES ══
    loadReferences(state, _action: PayloadAction<string>) {
      state.references.loading = true;
      state.references.error = null;
    },
    setReferences(state, action: PayloadAction<IReference[]>) {
      state.references = {items: action.payload, loading: false, error: null};
    },
    setReferencesError(state, action: PayloadAction<string>) {
      state.references.loading = false;
      state.references.error = action.payload;
    },
    createReference(_state, _action: PayloadAction<{ref: string; data: ICreateReference}>) {},
    updateReference(_state, _action: PayloadAction<{ref: string; itemRef: string; data: ICreateReference}>) {},
    deleteReference(_state, _action: PayloadAction<{ref: string; itemRef: string}>) {},

    // ══ PORTFOLIO ITEMS ══
    loadPortfolioItems(state, _action: PayloadAction<string>) {
      state.portfolioItems.loading = true;
      state.portfolioItems.error = null;
    },
    setPortfolioItems(state, action: PayloadAction<IPortfolioItemDetail[]>) {
      state.portfolioItems = {items: action.payload, loading: false, error: null};
    },
    setPortfolioItemsError(state, action: PayloadAction<string>) {
      state.portfolioItems.loading = false;
      state.portfolioItems.error = action.payload;
    },
    createPortfolioItem(_state, _action: PayloadAction<{ref: string; data: ICreatePortfolioItem}>) {},
    updatePortfolioItem(_state, _action: PayloadAction<{ref: string; itemRef: string; data: ICreatePortfolioItem}>) {},
    deletePortfolioItem(_state, _action: PayloadAction<{ref: string; itemRef: string}>) {},

    // ── Clear ──
    clearProfile() {
      return initialState;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
