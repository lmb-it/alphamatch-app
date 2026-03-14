import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {
  IAIAnalysisResult,
  IAIAnalyzePayload,
  IBasicInfo,
  ICareerOption,
  ICreateTradingAccountPayload,
  IDocumentRequirement,
  IFetchComplianceDocumentsPayload,
  IFetchDocumentFormFieldsPayload,
  IFinalizeTradingAccountPayload,
  IStepData,
  ISubmitDocumentFormPayload,
  ISubmitFormAnswersPayload,
  ISubscribePayload,
  ISubscriptionPlan,
  ITradingAccountDetail,
  ITradingAccountState,
  IUnansweredQuestion,
} from '../models/tradingAccount.types';
import type {ITierStatus, IRequiredDocumentsResponse} from '../models/tier.types';

const initialState: ITradingAccountState = {
  basicInfo: null,
  stepData: {},
  aiResult: null,
  analyzing: false,
  careers: [],
  careersLoading: false,
  selectedCareerRef: null,
  createdAccount: null,
  myAccounts: [],
  lastFetched: null,
  plans: [],
  formFields: [],
  requiredDocuments: [],
  documentsChecked: false,
  stripeClientSecret: null,
  stripeEphemeralKey: null,
  stripeCustomerId: null,
  stripePublishableKey: null,
  documentFormFields: [],
  documentFormLoading: false,
  documentFormSubmitting: false,
  documentFormSuccess: false,
  tierStatus: null,
  tierStatusLoading: false,
  requiredDocsWithTier: null,
  requiredDocsWithTierLoading: false,
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

    // Persist intermediate step data for back-button preservation
    saveStepData(state, action: PayloadAction<Partial<IStepData>>) {
      state.stepData = {...state.stepData, ...action.payload};
    },

    // Fetch my accounts (for resume flow)
    fetchMyAccounts(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMyAccountsSuccess(state, action: PayloadAction<ITradingAccountDetail[]>) {
      state.loading = false;
      state.myAccounts = action.payload;
      state.lastFetched = Date.now();
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

    // Form fields (manual flow)
    fetchFormFields(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchFormFieldsSuccess(state, action: PayloadAction<IUnansweredQuestion[]>) {
      state.loading = false;
      state.formFields = action.payload;
    },
    fetchFormFieldsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Required documents
    fetchDocuments(state, _action: PayloadAction<IFetchComplianceDocumentsPayload>) {
      state.loading = true;
    },
    fetchDocumentsSuccess(state, action: PayloadAction<IDocumentRequirement[]>) {
      state.loading = false;
      state.requiredDocuments = action.payload;
      state.documentsChecked = true;
    },
    fetchDocumentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      // Mark as checked even on failure so TAConfirmationScreen can render
      // (assume no verification documents required if the check fails)
      state.documentsChecked = true;
    },

    // Stripe setup intent
    fetchSetupIntent(state) {
      state.loading = true;
    },
    fetchSetupIntentSuccess(state, action: PayloadAction<{clientSecret: string; ephemeralKey: string; customerId: string; publishableKey: string}>) {
      state.loading = false;
      state.stripeClientSecret = action.payload.clientSecret;
      state.stripeEphemeralKey = action.payload.ephemeralKey;
      state.stripeCustomerId = action.payload.customerId;
      state.stripePublishableKey = action.payload.publishableKey;
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

    // Document form (verification flow)
    fetchDocumentFormFields(state, _action: PayloadAction<IFetchDocumentFormFieldsPayload>) {
      state.documentFormLoading = true;
      state.documentFormFields = [];
      state.documentFormSuccess = false;
      state.error = null;
    },
    fetchDocumentFormFieldsSuccess(state, action: PayloadAction<IUnansweredQuestion[]>) {
      state.documentFormLoading = false;
      state.documentFormFields = action.payload;
    },
    fetchDocumentFormFieldsFailure(state, action: PayloadAction<string>) {
      state.documentFormLoading = false;
      state.error = action.payload;
    },
    submitDocumentForm(state, _action: PayloadAction<ISubmitDocumentFormPayload>) {
      state.documentFormSubmitting = true;
      state.documentFormSuccess = false;
      state.error = null;
    },
    submitDocumentFormSuccess(state, action: PayloadAction<ITradingAccountDetail>) {
      state.documentFormSubmitting = false;
      state.documentFormSuccess = true;
      state.createdAccount = action.payload;
    },
    submitDocumentFormFailure(state, action: PayloadAction<string>) {
      state.documentFormSubmitting = false;
      state.error = action.payload;
    },
    resetDocumentForm(state) {
      state.documentFormFields = [];
      state.documentFormLoading = false;
      state.documentFormSubmitting = false;
      state.documentFormSuccess = false;
    },

    // Tier status
    fetchTierStatus(state, _action: PayloadAction<string>) {
      state.tierStatusLoading = true;
      state.error = null;
    },
    fetchTierStatusSuccess(state, action: PayloadAction<ITierStatus>) {
      state.tierStatusLoading = false;
      state.tierStatus = action.payload;
    },
    fetchTierStatusFailure(state, action: PayloadAction<string>) {
      state.tierStatusLoading = false;
      state.error = action.payload;
    },

    // Required documents with tier info
    fetchRequiredDocsWithTier(state, _action: PayloadAction<string>) {
      state.requiredDocsWithTierLoading = true;
      state.error = null;
    },
    fetchRequiredDocsWithTierSuccess(state, action: PayloadAction<IRequiredDocumentsResponse>) {
      state.requiredDocsWithTierLoading = false;
      state.requiredDocsWithTier = action.payload;
    },
    fetchRequiredDocsWithTierFailure(state, action: PayloadAction<string>) {
      state.requiredDocsWithTierLoading = false;
      state.error = action.payload;
    },

    // Reset (preserve myAccounts — they're not creation-specific)
    resetCreationFlow(state) {
      return {
        ...initialState,
        myAccounts: state.myAccounts,
        lastFetched: state.lastFetched,
        documentsChecked: false,
      };
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const tradingAccountActions = tradingAccountSlice.actions;
export default tradingAccountSlice.reducer;
