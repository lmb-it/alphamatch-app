import api from '@src/services/api';
import {URLs, resolveUrl} from '@src/services/urls';
import {logger} from '@src/utils/logger';
import {z} from 'zod';
import {
  AIAnalysisResultSchema,
  CareerOptionSchema,
  DocumentRequirementSchema,
  FinalizeResultSchema,
  RequiredDocumentsResponseSchema,
  SetupIntentSchema,
  SubscriptionPlanSchema,
  TierStatusSchema,
  TradingAccountDetailSchema,
  UnansweredQuestionSchema,
} from '../schemas';
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
  IUnansweredQuestion,
} from '../models/tradingAccount.types';
import type {IRequiredDocumentsResponse, ITierStatus} from '../models/tier.types';

/**
 * Safe parse helper — logs a warning if validation fails but still returns the raw data
 * so the app doesn't crash on unexpected backend changes.
 */
function safeParse<T>(schema: z.ZodType<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    logger.warn(`Zod validation warning: ${label}`, {
      feature: 'trading_account',
      issues: result.error.issues,
    });
    return data as T;
  }
  return result.data;
}

export async function listTradingAccountsApi(): Promise<ITradingAccountDetail[]> {
  const response = await api.get(URLs.tradingAccounts.index);
  const raw = response.data.data.tradingAccounts;
  return safeParse(z.array(TradingAccountDetailSchema), raw, 'listTradingAccounts');
}

export async function aiAnalyzeApi(description: string, formTypeRef: string, countryId?: number): Promise<IAIAnalysisResult> {
  const body: Record<string, unknown> = {description, formTypeRef};
  if (countryId) body.countryId = countryId;
  const response = await api.post(URLs.tradingAccounts.aiAnalyze, body);
  return safeParse(AIAnalysisResultSchema, response.data.data, 'aiAnalyze');
}

export async function fetchCareersApi(search?: string): Promise<ICareerOption[]> {
  const response = await api.get(URLs.tradingAccounts.careers, {params: {search}});
  return safeParse(z.array(CareerOptionSchema), response.data.data.careers, 'fetchCareers');
}

export async function createTradingAccountApi(payload: ICreateTradingAccountPayload): Promise<ITradingAccountDetail> {
  const response = await api.post(URLs.tradingAccounts.create, payload);
  return safeParse(TradingAccountDetailSchema, response.data.data.tradingAccount, 'createAccount');
}

export async function submitFormAnswersApi(payload: ISubmitFormAnswersPayload): Promise<ITradingAccountDetail> {
  const response = await api.patch(
    resolveUrl(URLs.tradingAccounts.submitFormAnswers, {ref: payload.tradingAccountRef}),
    {answers: payload.answers},
  );
  return safeParse(TradingAccountDetailSchema, response.data.data.tradingAccount, 'submitFormAnswers');
}

export async function finalizeTradingAccountApi(payload: IFinalizeTradingAccountPayload): Promise<{tradingAccount: ITradingAccountDetail; nextStep: string}> {
  const {tradingAccountRef, ...body} = payload;
  const response = await api.patch(
    resolveUrl(URLs.tradingAccounts.finalize, {ref: tradingAccountRef}),
    body,
  );
  return safeParse(FinalizeResultSchema, response.data.data, 'finalizeAccount');
}

export async function fetchFormFieldsApi(ref: string): Promise<IUnansweredQuestion[]> {
  const response = await api.get(resolveUrl(URLs.tradingAccounts.formFields, {ref}));
  return safeParse(z.array(UnansweredQuestionSchema), response.data.data.formFields, 'fetchFormFields');
}

export async function fetchRequiredDocumentsApi(
  type: 'provider' | 'client',
  careerRef: string,
  countryId: number,
): Promise<IDocumentRequirement[]> {
  const response = await api.get(
    resolveUrl(URLs.complianceDocuments.index, {type, careerRef, countryId}),
  );
  return safeParse(z.array(DocumentRequirementSchema), response.data.data.documents, 'fetchDocuments');
}

export async function fetchPlansApi(careerRef: string): Promise<ISubscriptionPlan[]> {
  const response = await api.get(URLs.subscriptions.plans, {params: {careerRef}});
  return safeParse(z.array(SubscriptionPlanSchema), response.data.data.plans, 'fetchPlans');
}

export async function fetchSetupIntentApi(): Promise<{clientSecret: string; ephemeralKey: string; customerId: string; publishableKey: string}> {
  const response = await api.post(URLs.subscriptions.setupIntent);
  return safeParse(SetupIntentSchema, response.data.data, 'fetchSetupIntent');
}

export async function subscribeApi(payload: ISubscribePayload): Promise<ITradingAccountDetail> {
  const response = await api.post(URLs.subscriptions.subscribe, payload);
  return safeParse(TradingAccountDetailSchema, response.data.data.tradingAccount, 'subscribe');
}

export async function fetchTradingAccountApi(ref: string): Promise<ITradingAccountDetail> {
  const response = await api.get(resolveUrl(URLs.tradingAccounts.show, {ref}));
  return safeParse(TradingAccountDetailSchema, response.data.data.tradingAccount, 'fetchAccount');
}

export async function fetchDocumentFormFieldsApi(
  tradingAccountRef: string,
  documentRef: string,
): Promise<IUnansweredQuestion[]> {
  const response = await api.get(
    resolveUrl(URLs.tradingAccounts.documentFormFields, {ref: tradingAccountRef, docRef: documentRef}),
  );
  return safeParse(z.array(UnansweredQuestionSchema), response.data.data.formFields, 'fetchDocumentFormFields');
}

export async function submitDocumentFormApi(
  tradingAccountRef: string,
  documentRef: string,
  answers: {fieldRef: string; value: unknown}[],
  fileFields: Record<string, {uri: string; type: string; name: string}>,
): Promise<ITradingAccountDetail> {
  const formData = new FormData();
  formData.append('answers', JSON.stringify(answers));

  // Attach files keyed by file_{fieldRef}
  Object.entries(fileFields).forEach(([fieldRef, file]) => {
    formData.append(`file_${fieldRef}`, file as unknown as Blob);
  });

  const response = await api.post(
    resolveUrl(URLs.tradingAccounts.documentFormSubmit, {ref: tradingAccountRef, docRef: documentRef}),
    formData,
    {headers: {'Content-Type': 'multipart/form-data'}},
  );
  return safeParse(TradingAccountDetailSchema, response.data.data.tradingAccount, 'submitDocumentForm');
}

export async function fetchRequiredDocumentsWithTierApi(
  ref: string,
): Promise<IRequiredDocumentsResponse> {
  const response = await api.get(
    resolveUrl(URLs.tradingAccounts.requiredDocuments, {ref}),
  );
  return safeParse(RequiredDocumentsResponseSchema, response.data.data, 'fetchRequiredDocumentsWithTier');
}

export async function fetchTierStatusApi(ref: string): Promise<ITierStatus> {
  const response = await api.get(
    resolveUrl(URLs.tradingAccounts.tierStatus, {ref}),
  );
  return safeParse(TierStatusSchema, response.data.data, 'fetchTierStatus');
}
