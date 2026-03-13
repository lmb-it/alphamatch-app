import {
  selectBasicInfo,
  selectStepData,
  selectAIResult,
  selectAnalyzing,
  selectCareers,
  selectCareersLoading,
  selectSelectedCareerRef,
  selectCreatedAccount,
  selectMyAccounts,
  selectPlans,
  selectFormFields,
  selectRequiredDocuments,
  selectDocumentsChecked,
  selectLastFetched,
  selectTALoading,
  selectTAError,
  selectDocumentFormFields,
  selectDocumentFormLoading,
  selectDocumentFormSubmitting,
  selectDocumentFormSuccess,
} from '../store/tradingAccount.selectors';

const mockState = {
  tradingAccount: {
    basicInfo: {firstName: 'John', lastName: 'Doe', fullAddress: '123 St'},
    stepData: {aiDescription: 'I am a plumber'},
    aiResult: null,
    analyzing: false,
    careers: [{identifier: 'CAR-1', title: 'Plumber', summary: null, categoryName: 'Trade', businessModel: 'pro'}],
    careersLoading: false,
    selectedCareerRef: 'CAR-1',
    createdAccount: null,
    myAccounts: [],
    lastFetched: 1700000000000,
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
  },
} as any;

describe('tradingAccount selectors', () => {
  it('selectBasicInfo returns basicInfo', () => {
    expect(selectBasicInfo(mockState)?.firstName).toBe('John');
  });

  it('selectStepData returns stepData', () => {
    expect(selectStepData(mockState)?.aiDescription).toBe('I am a plumber');
  });

  it('selectAIResult returns null when no result', () => {
    expect(selectAIResult(mockState)).toBeNull();
  });

  it('selectAnalyzing returns false', () => {
    expect(selectAnalyzing(mockState)).toBe(false);
  });

  it('selectCareers returns careers array', () => {
    expect(selectCareers(mockState)).toHaveLength(1);
  });

  it('selectCareersLoading returns false', () => {
    expect(selectCareersLoading(mockState)).toBe(false);
  });

  it('selectSelectedCareerRef returns selected ref', () => {
    expect(selectSelectedCareerRef(mockState)).toBe('CAR-1');
  });

  it('selectCreatedAccount returns null', () => {
    expect(selectCreatedAccount(mockState)).toBeNull();
  });

  it('selectMyAccounts returns empty array', () => {
    expect(selectMyAccounts(mockState)).toEqual([]);
  });

  it('selectLastFetched returns timestamp', () => {
    expect(selectLastFetched(mockState)).toBe(1700000000000);
  });

  it('selectTALoading returns false', () => {
    expect(selectTALoading(mockState)).toBe(false);
  });

  it('selectTAError returns null', () => {
    expect(selectTAError(mockState)).toBeNull();
  });

  it('selectPlans returns empty array', () => {
    expect(selectPlans(mockState)).toEqual([]);
  });

  it('selectFormFields returns empty array', () => {
    expect(selectFormFields(mockState)).toEqual([]);
  });

  it('selectRequiredDocuments returns empty array', () => {
    expect(selectRequiredDocuments(mockState)).toEqual([]);
  });

  it('selectDocumentsChecked returns false', () => {
    expect(selectDocumentsChecked(mockState)).toBe(false);
  });

  it('selectDocumentFormFields returns empty array', () => {
    expect(selectDocumentFormFields(mockState)).toEqual([]);
  });

  it('selectDocumentFormLoading returns false', () => {
    expect(selectDocumentFormLoading(mockState)).toBe(false);
  });

  it('selectDocumentFormSubmitting returns false', () => {
    expect(selectDocumentFormSubmitting(mockState)).toBe(false);
  });

  it('selectDocumentFormSuccess returns false', () => {
    expect(selectDocumentFormSuccess(mockState)).toBe(false);
  });
});
