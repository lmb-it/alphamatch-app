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
  validation?: Record<string, any>;
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

export interface IDocumentRequirement {
  identifier: string;
  documentName: string;
  isMandatory: boolean;
  uploadStatus: string;
}

export interface ITradingAccountDetail {
  identifier: string;
  accountName: string | null;
  shortBio: string | null;
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
  businessPhone: string;
  fullAddress: string;
  country_id?: number;
  profileImageBase64?: string;
}

// Creation flow wizard state
export interface ITradingAccountState {
  // Basic info (from step 1 form)
  basicInfo: IBasicInfo | null;

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

  // Subscription plans
  plans: ISubscriptionPlan[];

  // Required documents
  requiredDocuments: IDocumentRequirement[];

  // Stripe
  stripeClientSecret: string | null;
  stripeEphemeralKey: string | null;
  stripeCustomerId: string | null;

  // General
  loading: boolean;
  error: string | null;
}

// Payloads
export interface IAIAnalyzePayload {
  description: string;
  formTypeRef: string;
}

export interface ICreateTradingAccountPayload {
  careerRef: string;
  signupMethod: 'ai' | 'manual';
  answeredQuestions?: {fieldRef: string; value: any}[];
  unmatchedContent?: string[];
}

export interface ISubmitFormAnswersPayload {
  tradingAccountRef: string;
  answers: {fieldRef: string; value: any}[];
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
}

export interface ISubscribePayload {
  tradingAccountRef: string;
  planRef: string;
  paymentMethodId: string;
}
