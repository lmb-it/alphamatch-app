import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {
  IAIAnalysisResult,
  IAIAnalyzePayload,
  IBasicInfo,
  ICareerOption,
  ICreateTradingAccountPayload,
  IDocumentRequirement,
  IFinalizeTradingAccountPayload,
  ISubmitFormAnswersPayload,
  ISubscribePayload,
  ISubscriptionPlan,
  ITradingAccountDetail,
  ITradingAccountState,
} from '../models/tradingAccount.types';

const initialState: ITradingAccountState = {
  basicInfo: null,
  aiResult: null,
  analyzing: false,
  careers: [],
  careersLoading: false,
  selectedCareerRef: null,
  createdAccount: null,
  myAccounts: [],
  plans: [],
  requiredDocuments: [],
  stripeClientSecret: null,
  stripeEphemeralKey: null,
  stripeCustomerId: null,
  loading: false,
  error: null,
};

const tradingAccountSlice = createSlice({
  name: 'tradingAccount',
  initialState,
  reducers: {
    // Basic info
    setBasicInfo(state, action: PayloadAction<IBasicInfo>) {
      state.basicInfo = action.payload;
    },

    // Fetch my accounts (for resume flow)
    fetchMyAccounts(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMyAccountsSuccess(state, action: PayloadAction<ITradingAccountDetail[]>) {
      state.loading = false;
      state.myAccounts = action.payload;
    },
    fetchMyAccountsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // AI Analyze
    aiAnalyze(state, _action: PayloadAction<IAIAnalyzePayload>) {
      state.analyzing = true;
      state.error = null;
      state.aiResult = null;
    },
    aiAnalyzeSuccess(state, action: PayloadAction<IAIAnalysisResult>) {
      state.analyzing = false;
      state.aiResult = action.payload;
      state.selectedCareerRef = action.payload.detectedCareer.identifier;
    },
    aiAnalyzeFailure(state, action: PayloadAction<string>) {
      state.analyzing = false;
      state.error = action.payload;
    },

    // Careers list (manual)
    fetchCareers(state) {
      state.careersLoading = true;
    },
    fetchCareersSuccess(state, action: PayloadAction<ICareerOption[]>) {
      state.careersLoading = false;
      state.careers = action.payload;
    },
    fetchCareersFailure(state, action: PayloadAction<string>) {
      state.careersLoading = false;
      state.error = action.payload;
    },

    // Select career
    selectCareer(state, action: PayloadAction<string>) {
      state.selectedCareerRef = action.payload;
    },

    // Create trading account
    createAccount(state, _action: PayloadAction<ICreateTradingAccountPayload>) {
      state.loading = true;
      state.error = null;
    },
    createAccountSuccess(state, action: PayloadAction<ITradingAccountDetail>) {
      state.loading = false;
      state.createdAccount = action.payload;
    },
    createAccountFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Submit form answers
    submitFormAnswers(state, _action: PayloadAction<ISubmitFormAnswersPayload>) {
      state.loading = true;
      state.error = null;
    },
    submitFormAnswersSuccess(state, action: PayloadAction<ITradingAccountDetail>) {
      state.loading = false;
      state.createdAccount = action.payload;
    },
    submitFormAnswersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Finalize
    finalizeAccount(state, _action: PayloadAction<IFinalizeTradingAccountPayload>) {
      state.loading = true;
      state.error = null;
    },
    finalizeAccountSuccess(state, action: PayloadAction<{tradingAccount: ITradingAccountDetail; nextStep: string}>) {
      state.loading = false;
      state.createdAccount = action.payload.tradingAccount;
    },
    finalizeAccountFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Subscription plans
    fetchPlans(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchPlansSuccess(state, action: PayloadAction<ISubscriptionPlan[]>) {
      state.loading = false;
      state.plans = action.payload;
    },
    fetchPlansFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Required documents
    fetchDocuments(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchDocumentsSuccess(state, action: PayloadAction<IDocumentRequirement[]>) {
      state.loading = false;
      state.requiredDocuments = action.payload;
    },
    fetchDocumentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Stripe setup intent
    fetchSetupIntent(state) {
      state.loading = true;
    },
    fetchSetupIntentSuccess(state, action: PayloadAction<{clientSecret: string; ephemeralKey: string; customerId: string}>) {
      state.loading = false;
      state.stripeClientSecret = action.payload.clientSecret;
      state.stripeEphemeralKey = action.payload.ephemeralKey;
      state.stripeCustomerId = action.payload.customerId;
    },
    fetchSetupIntentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Subscribe
    subscribe(state, _action: PayloadAction<ISubscribePayload>) {
      state.loading = true;
      state.error = null;
    },
    subscribeSuccess(state, action: PayloadAction<ITradingAccountDetail>) {
      state.loading = false;
      state.createdAccount = action.payload;
    },
    subscribeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset
    resetCreationFlow(state) {
      return initialState;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const tradingAccountActions = tradingAccountSlice.actions;
export default tradingAccountSlice.reducer;
