import api from '@src/services/api';
import {URLs, resolveUrl} from '@src/services/urls';
import type {
  IAIAnalysisResult,
  ICareerOption,
  ICreateTradingAccountPayload,
  IDocumentRequirement,
  IFinalizeTradingAccountPayload,
  ISubmitFormAnswersPayload,
  ISubscribePayload,
  ISubscriptionPlan,
  ITradingAccountDetail,
} from '../models/tradingAccount.types';

export async function listTradingAccountsApi(): Promise<ITradingAccountDetail[]> {
  const response = await api.get(URLs.tradingAccounts.index);
  return response.data.data.tradingAccounts;
}

export async function aiAnalyzeApi(description: string, formTypeRef: string): Promise<IAIAnalysisResult> {
  const response = await api.post(URLs.tradingAccounts.aiAnalyze, {description, formTypeRef});
  return response.data.data;
}

export async function fetchCareersApi(search?: string): Promise<ICareerOption[]> {
  const response = await api.get(URLs.tradingAccounts.careers, {params: {search}});
  return response.data.data.careers;
}

export async function createTradingAccountApi(payload: ICreateTradingAccountPayload): Promise<ITradingAccountDetail> {
  const response = await api.post(URLs.tradingAccounts.create, payload);
  return response.data.data.tradingAccount;
}

export async function submitFormAnswersApi(payload: ISubmitFormAnswersPayload): Promise<ITradingAccountDetail> {
  const response = await api.patch(
    resolveUrl(URLs.tradingAccounts.submitFormAnswers, {ref: payload.tradingAccountRef}),
    {answers: payload.answers},
  );
  return response.data.data.tradingAccount;
}

export async function finalizeTradingAccountApi(payload: IFinalizeTradingAccountPayload): Promise<{tradingAccount: ITradingAccountDetail; nextStep: string}> {
  const {tradingAccountRef, ...body} = payload;
  const response = await api.patch(
    resolveUrl(URLs.tradingAccounts.finalize, {ref: tradingAccountRef}),
    body,
  );
  return response.data.data;
}

export async function fetchRequiredDocumentsApi(ref: string): Promise<IDocumentRequirement[]> {
  const response = await api.get(resolveUrl(URLs.tradingAccounts.requiredDocuments, {ref}));
  return response.data.data.documents;
}

export async function fetchPlansApi(careerRef: string): Promise<ISubscriptionPlan[]> {
  const response = await api.get(URLs.subscriptions.plans, {params: {careerRef}});
  return response.data.data.plans;
}

export async function fetchSetupIntentApi(): Promise<{clientSecret: string; ephemeralKey: string; customerId: string}> {
  const response = await api.post(URLs.subscriptions.setupIntent);
  return response.data.data;
}

export async function subscribeApi(payload: ISubscribePayload): Promise<ITradingAccountDetail> {
  const response = await api.post(URLs.subscriptions.subscribe, payload);
  return response.data.data.tradingAccount;
}

export async function fetchTradingAccountApi(ref: string): Promise<ITradingAccountDetail> {
  const response = await api.get(resolveUrl(URLs.tradingAccounts.show, {ref}));
  return response.data.data.tradingAccount;
}
