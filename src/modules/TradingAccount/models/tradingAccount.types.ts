export interface IDetectedCareer {
  identifier: string;
  name: string;
  categoryName: string;
  model: 'flex' | 'pro';
  confidence: number;
  availableInLocation: boolean;
}

export interface IAnsweredQuestion {
  fieldRef: string;
  fieldLabel: string;
  fieldType: string;
  extractedValue: string;
}

export interface IUnansweredQuestion {
  fieldRef: string;
  fieldLabel: string;
  fieldName: string;
  fieldType: string;
  dbType: string;
  isRequired: boolean;
  placeholder: string | null;
  helpText: string | null;
  order: number;
  options?: {label: string; value: string}[];
  isMulti?: boolean;
  validation?: Record<string, unknown>;
}

export interface IAIAnalysisResult {
  detectedCareer: IDetectedCareer;
  alternativeCareers: {identifier: string; name: string; confidence: number}[];
  answeredQuestions: IAnsweredQuestion[];
  unansweredQuestions: IUnansweredQuestion[];
  unmatchedContent: string[];
}

export interface ICareerOption {
  identifier: string;
  title: string;
  summary: string | null;
  categoryName: string | null;
  businessModel: string | null;
}

export interface ISubscriptionPlan {
  identifier: string;
  title: string;
  summary: string | null;
  cost: number;
  cycle: string;
  trialDays: number;
  perks: string[];
  stripePriceId: string | null;
}

export interface IDocumentFormField {
  fieldRef: string;
  fieldLabel: string;
  fieldName: string;
  fieldType: string;
  placeholder: string | null;
  options: unknown | null;
  validation: Record<string, unknown> | null;
  order: number;
}

export interface IDocumentForm {
  identifier: string;
  title: string;
  description: string | null;
  fields: IDocumentFormField[];
}

export interface IDocumentExpiryRules {
  hasExpiry: boolean;
  expirySource: string | null;
  validityPeriodDays: number | null;
  reminderSchedule: unknown | null;
  actionOnExpiry: string | null;
  gracePeriodDays: number | null;
}

export interface IDocumentRequirement {
  id: number;
  uuid: string;
  identifier: string;
  name: string;
  description: string | null;
  category: string | null;
  reviewRequired: boolean;
  expiryRules: IDocumentExpiryRules | null;
  form: IDocumentForm | null;
  // Computed on the client from existing form submissions
  uploadStatus?: string;
}

export interface ITradingAccountDetail {
  identifier: string;
  accountName: string | null;
  shortBio: string | null;
  careerRef: string | null;
  careerName: string | null;
  careerModel: string | null;
  avatar: string | null;
  isActive: boolean;
  isVerified: boolean;
  setupStatus: string;
  contactPhone: string | null;
  locationType: string | null;
  fullAddress: string | null;
  zipCode: string | null;
  countryName: string | null;
  stateName: string | null;
  cityName: string | null;
  createdAt: string;
}

export interface IBasicInfo {
  firstName: string;
  lastName: string;
  businessName?: string;
  contactPhone?: string;
  contactEmail?: string;
  shortBio?: string;
  fullAddress: string;
  zipCode?: string;
  country_id?: number;
  profileImageBase64?: string;
}

// Persisted step data for back-button preservation
export interface IStepData {
  /** AI input screen — user's freeform description */
  aiDescription?: string;
  /** Missing questions — partial answers the user typed before going back */
  missingAnswers?: Record<string, unknown>;
}

// Creation flow wizard state
export interface ITradingAccountState {
  // Basic info (from step 1 form)
  basicInfo: IBasicInfo | null;

  // Persisted data from intermediate steps (for back button)
  stepData: IStepData;

  // AI analysis
  aiResult: IAIAnalysisResult | null;
  analyzing: boolean;

  // Career list (manual flow)
  careers: ICareerOption[];
  careersLoading: boolean;

  // Selected career
  selectedCareerRef: string | null;

  // Created account
  createdAccount: ITradingAccountDetail | null;

  // User's existing accounts (for resume flow)
  myAccounts: ITradingAccountDetail[];

  // Timestamp (ms) of last successful fetchMyAccounts — used for staleness checks
  lastFetched: number | null;

  // Subscription plans
  plans: ISubscriptionPlan[];

  // Form fields (for manual flow when no AI result)
  formFields: IUnansweredQuestion[];

  // Required documents
  requiredDocuments: IDocumentRequirement[];

  // Stripe
  stripeClientSecret: string | null;
  stripeEphemeralKey: string | null;
  stripeCustomerId: string | null;
  stripePublishableKey: string | null;

  // Tracks whether fetchDocuments has completed (chained after finalizeAccount)
  documentsChecked: boolean;

  // Document form (verification flow)
  documentFormFields: IUnansweredQuestion[];
  documentFormLoading: boolean;
  documentFormSubmitting: boolean;
  documentFormSuccess: boolean;

  // General
  loading: boolean;
  error: string | null;
}

// Payloads
export interface IAIAnalyzePayload {
  description: string;
  formTypeRef: string;
  countryId?: number;
}

export interface ICreateTradingAccountPayload {
  careerRef: string;
  signupMethod: 'ai' | 'manual';
  answeredQuestions?: {fieldRef: string; value: unknown}[];
  unmatchedContent?: string[];
}

export interface ISubmitFormAnswersPayload {
  tradingAccountRef: string;
  answers: {fieldRef: string; value: unknown}[];
}

export interface IFinalizeTradingAccountPayload {
  tradingAccountRef: string;
  accountName: string | null;
  shortBio?: string;
  contactPhone?: string;
  locationType?: 'region' | 'fixed_address';
  countryRef?: string;
  stateRef?: string;
  cityRef?: string;
  fullAddress?: string;
  zipCode?: string;
  profileImageBase64?: string;
}

export interface ISubscribePayload {
  tradingAccountRef: string;
  planRef: string;
  paymentMethodId: string;
}

export interface IFetchComplianceDocumentsPayload {
  type: 'provider' | 'client';
  careerRef: string;
  countryId: number;
}

export interface IFetchDocumentFormFieldsPayload {
  tradingAccountRef: string;
  documentRef: string;
}

export interface ISubmitDocumentFormPayload {
  tradingAccountRef: string;
  documentRef: string;
  answers: {fieldRef: string; value: unknown}[];
  fileFields: Record<string, {uri: string; type: string; name: string}>;
}
