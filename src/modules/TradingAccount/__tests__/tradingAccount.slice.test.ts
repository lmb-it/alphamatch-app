import tradingAccountReducer, {tradingAccountActions} from '../store/tradingAccount.slice';
import type {ITradingAccountState, ITradingAccountDetail, IAIAnalysisResult} from '../models/tradingAccount.types';

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
  loading: false,
  error: null,
};

const mockAccount: ITradingAccountDetail = {
  identifier: 'TA-001',
  accountName: 'Test Account',
  shortBio: 'Bio',
  careerName: 'Plumber',
  careerModel: 'pro',
  avatar: null,
  isActive: false,
  isVerified: false,
  setupStatus: 'incomplete',
  contactPhone: null,
  locationType: null,
  fullAddress: null,
  zipCode: null,
  countryName: null,
  stateName: null,
  cityName: null,
  createdAt: '2026-01-01T00:00:00Z',
};

describe('tradingAccountSlice', () => {
  it('returns initial state', () => {
    const state = tradingAccountReducer(undefined, {type: '@@INIT'});
    expect(state.basicInfo).toBeNull();
    expect(state.myAccounts).toEqual([]);
    expect(state.loading).toBe(false);
  });

  describe('setBasicInfo', () => {
    it('stores basic info', () => {
      const info = {firstName: 'John', lastName: 'Doe', fullAddress: '123 St'};
      const state = tradingAccountReducer(initialState, tradingAccountActions.setBasicInfo(info));
      expect(state.basicInfo).toEqual(info);
    });
  });

  describe('saveStepData', () => {
    it('merges step data', () => {
      let state = tradingAccountReducer(initialState, tradingAccountActions.saveStepData({aiDescription: 'I am a plumber'}));
      expect(state.stepData.aiDescription).toBe('I am a plumber');

      state = tradingAccountReducer(state, tradingAccountActions.saveStepData({missingAnswers: {q1: 'yes'}}));
      expect(state.stepData.aiDescription).toBe('I am a plumber');
      expect(state.stepData.missingAnswers).toEqual({q1: 'yes'});
    });
  });

  describe('fetchMyAccounts', () => {
    it('sets loading on dispatch', () => {
      const state = tradingAccountReducer(initialState, tradingAccountActions.fetchMyAccounts());
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('stores accounts on success and sets lastFetched', () => {
      const before = Date.now();
      const state = tradingAccountReducer(
        {...initialState, loading: true},
        tradingAccountActions.fetchMyAccountsSuccess([mockAccount]),
      );
      expect(state.loading).toBe(false);
      expect(state.myAccounts).toHaveLength(1);
      expect(state.myAccounts[0].identifier).toBe('TA-001');
      expect(state.lastFetched).toBeGreaterThanOrEqual(before);
    });

    it('stores error on failure', () => {
      const state = tradingAccountReducer(
        {...initialState, loading: true},
        tradingAccountActions.fetchMyAccountsFailure('Network error'),
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });
  });

  describe('aiAnalyze', () => {
    it('sets analyzing flag and clears previous result', () => {
      const state = tradingAccountReducer(initialState, tradingAccountActions.aiAnalyze({
        description: 'test',
        formTypeRef: 'REF',
      }));
      expect(state.analyzing).toBe(true);
      expect(state.aiResult).toBeNull();
    });

    it('stores result and sets selectedCareerRef on success', () => {
      const result: IAIAnalysisResult = {
        detectedCareer: {
          identifier: 'CAR-1',
          name: 'Plumber',
          categoryName: 'Trade',
          model: 'pro',
          confidence: 0.95,
          availableInLocation: true,
        },
        alternativeCareers: [],
        answeredQuestions: [],
        unansweredQuestions: [],
        unmatchedContent: [],
      };
      const state = tradingAccountReducer(
        {...initialState, analyzing: true},
        tradingAccountActions.aiAnalyzeSuccess(result),
      );
      expect(state.analyzing).toBe(false);
      expect(state.aiResult).toEqual(result);
      expect(state.selectedCareerRef).toBe('CAR-1');
    });
  });

  describe('createAccount', () => {
    it('sets loading on dispatch', () => {
      const state = tradingAccountReducer(initialState, tradingAccountActions.createAccount({
        careerRef: 'CAR-1',
        signupMethod: 'ai',
      }));
      expect(state.loading).toBe(true);
    });

    it('stores created account on success', () => {
      const state = tradingAccountReducer(
        {...initialState, loading: true},
        tradingAccountActions.createAccountSuccess(mockAccount),
      );
      expect(state.loading).toBe(false);
      expect(state.createdAccount?.identifier).toBe('TA-001');
    });
  });

  describe('resetCreationFlow', () => {
    it('resets all creation data but preserves myAccounts and lastFetched', () => {
      const dirtyState: ITradingAccountState = {
        ...initialState,
        basicInfo: {firstName: 'A', lastName: 'B', fullAddress: 'C'},
        selectedCareerRef: 'CAR-1',
        createdAccount: mockAccount,
        myAccounts: [mockAccount],
        lastFetched: 12345,
        stepData: {aiDescription: 'test'},
      };
      const state = tradingAccountReducer(dirtyState, tradingAccountActions.resetCreationFlow());
      expect(state.basicInfo).toBeNull();
      expect(state.selectedCareerRef).toBeNull();
      expect(state.createdAccount).toBeNull();
      expect(state.stepData).toEqual({});
      expect(state.myAccounts).toHaveLength(1);
      expect(state.lastFetched).toBe(12345);
    });
  });

  describe('selectCareer', () => {
    it('sets selectedCareerRef', () => {
      const state = tradingAccountReducer(initialState, tradingAccountActions.selectCareer('CAR-99'));
      expect(state.selectedCareerRef).toBe('CAR-99');
    });
  });

  describe('clearError', () => {
    it('clears error', () => {
      const state = tradingAccountReducer(
        {...initialState, error: 'Some error'},
        tradingAccountActions.clearError(),
      );
      expect(state.error).toBeNull();
    });
  });

  describe('document form actions', () => {
    it('manages document form lifecycle', () => {
      let state = tradingAccountReducer(initialState, tradingAccountActions.fetchDocumentFormFields({
        tradingAccountRef: 'TA-001',
        documentRef: 'DOC-1',
      }));
      expect(state.documentFormLoading).toBe(true);
      expect(state.documentFormSuccess).toBe(false);

      state = tradingAccountReducer(state, tradingAccountActions.fetchDocumentFormFieldsSuccess([]));
      expect(state.documentFormLoading).toBe(false);

      state = tradingAccountReducer(state, tradingAccountActions.submitDocumentForm({
        tradingAccountRef: 'TA-001',
        documentRef: 'DOC-1',
        answers: [],
        fileFields: {},
      }));
      expect(state.documentFormSubmitting).toBe(true);

      state = tradingAccountReducer(state, tradingAccountActions.submitDocumentFormSuccess(mockAccount));
      expect(state.documentFormSubmitting).toBe(false);
      expect(state.documentFormSuccess).toBe(true);

      state = tradingAccountReducer(state, tradingAccountActions.resetDocumentForm());
      expect(state.documentFormFields).toEqual([]);
      expect(state.documentFormSuccess).toBe(false);
    });
  });

  describe('Stripe setup intent', () => {
    it('stores Stripe keys on success', () => {
      const state = tradingAccountReducer(
        {...initialState, loading: true},
        tradingAccountActions.fetchSetupIntentSuccess({
          clientSecret: 'cs_test',
          ephemeralKey: 'ek_test',
          customerId: 'cus_test',
          publishableKey: 'pk_test',
        }),
      );
      expect(state.stripeClientSecret).toBe('cs_test');
      expect(state.stripeEphemeralKey).toBe('ek_test');
      expect(state.stripeCustomerId).toBe('cus_test');
      expect(state.stripePublishableKey).toBe('pk_test');
    });
  });
});
