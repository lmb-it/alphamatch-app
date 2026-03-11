import type {RootState} from '@src/redux';

export const selectTradingAccountState = (state: RootState) => state.tradingAccount;
export const selectBasicInfo = (state: RootState) => state.tradingAccount.basicInfo;
export const selectAIResult = (state: RootState) => state.tradingAccount.aiResult;
export const selectAnalyzing = (state: RootState) => state.tradingAccount.analyzing;
export const selectCareers = (state: RootState) => state.tradingAccount.careers;
export const selectCareersLoading = (state: RootState) => state.tradingAccount.careersLoading;
export const selectSelectedCareerRef = (state: RootState) => state.tradingAccount.selectedCareerRef;
export const selectCreatedAccount = (state: RootState) => state.tradingAccount.createdAccount;
export const selectMyAccounts = (state: RootState) => state.tradingAccount.myAccounts;
export const selectPlans = (state: RootState) => state.tradingAccount.plans;
export const selectRequiredDocuments = (state: RootState) => state.tradingAccount.requiredDocuments;
export const selectStripeClientSecret = (state: RootState) => state.tradingAccount.stripeClientSecret;
export const selectStripeEphemeralKey = (state: RootState) => state.tradingAccount.stripeEphemeralKey;
export const selectStripeCustomerId = (state: RootState) => state.tradingAccount.stripeCustomerId;
export const selectTALoading = (state: RootState) => state.tradingAccount.loading;
export const selectTAError = (state: RootState) => state.tradingAccount.error;
