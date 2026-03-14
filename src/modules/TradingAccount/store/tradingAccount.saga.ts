import {call, put, select, takeLatest} from 'redux-saga/effects';
import {tradingAccountActions} from './tradingAccount.slice';
import {
  aiAnalyzeApi,
  createTradingAccountApi,
  fetchCareersApi,
  fetchDocumentFormFieldsApi,
  fetchFormFieldsApi,
  fetchPlansApi,
  fetchRequiredDocumentsApi,
  fetchRequiredDocumentsWithTierApi,
  fetchSetupIntentApi,
  fetchTierStatusApi,
  finalizeTradingAccountApi,
  listTradingAccountsApi,
  submitDocumentFormApi,
  submitFormAnswersApi,
  subscribeApi,
} from '../api/tradingAccount.service';
import {parseApiError} from '@src/services/apiError';
import {logger} from '@src/utils/logger';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {
  IAIAnalyzePayload,
  ICreateTradingAccountPayload,
  IFetchComplianceDocumentsPayload,
  IFetchDocumentFormFieldsPayload,
  IFinalizeTradingAccountPayload,
  ISubmitDocumentFormPayload,
  ISubmitFormAnswersPayload,
  ISubscribePayload,
} from '../models/tradingAccount.types';

function* fetchMyAccountsSaga(): Generator {
  try {
    const accounts = yield call(listTradingAccountsApi);
    yield put(tradingAccountActions.fetchMyAccountsSuccess(accounts as any));
  } catch (e) {
    logger.error('fetchMyAccounts failed', e, {feature: 'trading_account', step: 'fetch_accounts'});
    yield put(tradingAccountActions.fetchMyAccountsFailure(parseApiError(e).message));
  }
}

function* aiAnalyzeSaga(action: PayloadAction<IAIAnalyzePayload>): Generator {
  try {
    const result = yield call(aiAnalyzeApi, action.payload.description, action.payload.formTypeRef, action.payload.countryId);
    yield put(tradingAccountActions.aiAnalyzeSuccess(result as any));
  } catch (e) {
    logger.error('aiAnalyze failed', e, {feature: 'trading_account', step: 'ai_analyze'});
    yield put(tradingAccountActions.aiAnalyzeFailure(parseApiError(e).message));
  }
}

function* fetchCareersSaga(): Generator {
  try {
    const careers = yield call(fetchCareersApi);
    yield put(tradingAccountActions.fetchCareersSuccess(careers as any));
  } catch (e) {
    logger.error('fetchCareers failed', e, {feature: 'trading_account', step: 'fetch_careers'});
    yield put(tradingAccountActions.fetchCareersFailure(parseApiError(e).message));
  }
}

function* createAccountSaga(action: PayloadAction<ICreateTradingAccountPayload>): Generator {
  try {
    const account = yield call(createTradingAccountApi, action.payload);
    yield put(tradingAccountActions.createAccountSuccess(account as any));
    // Invalidate cache — refresh accounts list
    yield put(tradingAccountActions.fetchMyAccounts());
  } catch (e) {
    logger.error('createAccount failed', e, {feature: 'trading_account', step: 'create_account'});
    yield put(tradingAccountActions.createAccountFailure(parseApiError(e).message));
  }
}

function* submitFormAnswersSaga(action: PayloadAction<ISubmitFormAnswersPayload>): Generator {
  try {
    const account = yield call(submitFormAnswersApi, action.payload);
    yield put(tradingAccountActions.submitFormAnswersSuccess(account as any));
  } catch (e) {
    logger.error('submitFormAnswers failed', e, {feature: 'trading_account', step: 'submit_form_answers'});
    yield put(tradingAccountActions.submitFormAnswersFailure(parseApiError(e).message));
  }
}

function* finalizeAccountSaga(action: PayloadAction<IFinalizeTradingAccountPayload>): Generator {
  try {
    const result = yield call(finalizeTradingAccountApi, action.payload);
    yield put(tradingAccountActions.finalizeAccountSuccess(result as any));
    // Invalidate cache — refresh accounts list
    yield put(tradingAccountActions.fetchMyAccounts());
  } catch (e) {
    logger.error('finalizeAccount failed', e, {feature: 'trading_account', step: 'finalize'});
    yield put(tradingAccountActions.finalizeAccountFailure(parseApiError(e).message));
  }
}

function* fetchPlansSaga(action: PayloadAction<string>): Generator {
  try {
    const plans = yield call(fetchPlansApi, action.payload);
    yield put(tradingAccountActions.fetchPlansSuccess(plans as any));
  } catch (e) {
    logger.error('fetchPlans failed', e, {feature: 'trading_account', step: 'fetch_plans'});
    yield put(tradingAccountActions.fetchPlansFailure(parseApiError(e).message));
  }
}

function* fetchFormFieldsSaga(action: PayloadAction<string>): Generator {
  try {
    const fields = yield call(fetchFormFieldsApi, action.payload);
    yield put(tradingAccountActions.fetchFormFieldsSuccess(fields as any));
  } catch (e) {
    logger.error('fetchFormFields failed', e, {feature: 'trading_account', step: 'fetch_form_fields'});
    yield put(tradingAccountActions.fetchFormFieldsFailure(parseApiError(e).message));
  }
}

function* fetchDocumentsSaga(action: PayloadAction<IFetchComplianceDocumentsPayload>): Generator {
  try {
    const {type, careerRef, countryId} = action.payload;
    const docs = yield call(fetchRequiredDocumentsApi, type, careerRef, countryId);
    yield put(tradingAccountActions.fetchDocumentsSuccess(docs as any));
  } catch (e) {
    logger.error('fetchDocuments failed', e, {feature: 'trading_account', step: 'fetch_documents'});
    yield put(tradingAccountActions.fetchDocumentsFailure(parseApiError(e).message));
  }
}

function* fetchSetupIntentSaga(): Generator {
  try {
    const result = yield call(fetchSetupIntentApi);
    yield put(tradingAccountActions.fetchSetupIntentSuccess(result as any));
  } catch (e) {
    logger.error('fetchSetupIntent failed', e, {feature: 'trading_account', step: 'fetch_setup_intent'});
    yield put(tradingAccountActions.fetchSetupIntentFailure(parseApiError(e).message));
  }
}

function* subscribeSaga(action: PayloadAction<ISubscribePayload>): Generator {
  try {
    const account = yield call(subscribeApi, action.payload);
    yield put(tradingAccountActions.subscribeSuccess(account as any));
    // Invalidate cache — refresh accounts list after subscription change
    yield put(tradingAccountActions.fetchMyAccounts());
  } catch (e) {
    logger.error('subscribe failed', e, {feature: 'trading_account', step: 'subscribe'});
    yield put(tradingAccountActions.subscribeFailure(parseApiError(e).message));
  }
}

function* fetchDocumentFormFieldsSaga(action: PayloadAction<IFetchDocumentFormFieldsPayload>): Generator {
  try {
    const fields = yield call(
      fetchDocumentFormFieldsApi,
      action.payload.tradingAccountRef,
      action.payload.documentRef,
    );
    yield put(tradingAccountActions.fetchDocumentFormFieldsSuccess(fields as any));
  } catch (e) {
    logger.error('fetchDocumentFormFields failed', e, {feature: 'trading_account', step: 'fetch_doc_form_fields'});
    yield put(tradingAccountActions.fetchDocumentFormFieldsFailure(parseApiError(e).message));
  }
}

function* submitDocumentFormSaga(action: PayloadAction<ISubmitDocumentFormPayload>): Generator {
  try {
    const account = yield call(
      submitDocumentFormApi,
      action.payload.tradingAccountRef,
      action.payload.documentRef,
      action.payload.answers,
      action.payload.fileFields,
    );
    yield put(tradingAccountActions.submitDocumentFormSuccess(account as any));
    // Refresh documents list — use careerRef from state + hardcoded countryId
    const careerRef = yield select((state: any) => state.tradingAccount.selectedCareerRef);
    if (careerRef) {
      yield put(tradingAccountActions.fetchDocuments({type: 'provider', careerRef: careerRef as string, countryId: 14}));
    }
  } catch (e) {
    logger.error('submitDocumentForm failed', e, {feature: 'trading_account', step: 'submit_doc_form'});
    yield put(tradingAccountActions.submitDocumentFormFailure(parseApiError(e).message));
  }
}

function* fetchTierStatusSaga(action: PayloadAction<string>): Generator {
  try {
    const status = yield call(fetchTierStatusApi, action.payload);
    yield put(tradingAccountActions.fetchTierStatusSuccess(status as any));
  } catch (e) {
    logger.error('fetchTierStatus failed', e, {feature: 'trading_account', step: 'fetch_tier_status'});
    yield put(tradingAccountActions.fetchTierStatusFailure(parseApiError(e).message));
  }
}

function* fetchRequiredDocsWithTierSaga(action: PayloadAction<string>): Generator {
  try {
    const result = yield call(fetchRequiredDocumentsWithTierApi, action.payload);
    yield put(tradingAccountActions.fetchRequiredDocsWithTierSuccess(result as any));
  } catch (e) {
    logger.error('fetchRequiredDocsWithTier failed', e, {feature: 'trading_account', step: 'fetch_required_docs_with_tier'});
    yield put(tradingAccountActions.fetchRequiredDocsWithTierFailure(parseApiError(e).message));
  }
}

export default function* tradingAccountSaga(): Generator {
  yield takeLatest(tradingAccountActions.fetchMyAccounts.type, fetchMyAccountsSaga);
  yield takeLatest(tradingAccountActions.aiAnalyze.type, aiAnalyzeSaga);
  yield takeLatest(tradingAccountActions.fetchCareers.type, fetchCareersSaga);
  yield takeLatest(tradingAccountActions.createAccount.type, createAccountSaga);
  yield takeLatest(tradingAccountActions.submitFormAnswers.type, submitFormAnswersSaga);
  yield takeLatest(tradingAccountActions.finalizeAccount.type, finalizeAccountSaga);
  yield takeLatest(tradingAccountActions.fetchPlans.type, fetchPlansSaga);
  yield takeLatest(tradingAccountActions.fetchFormFields.type, fetchFormFieldsSaga);
  yield takeLatest(tradingAccountActions.fetchDocuments.type, fetchDocumentsSaga);
  yield takeLatest(tradingAccountActions.fetchSetupIntent.type, fetchSetupIntentSaga);
  yield takeLatest(tradingAccountActions.subscribe.type, subscribeSaga);
  yield takeLatest(tradingAccountActions.fetchDocumentFormFields.type, fetchDocumentFormFieldsSaga);
  yield takeLatest(tradingAccountActions.submitDocumentForm.type, submitDocumentFormSaga);
  yield takeLatest(tradingAccountActions.fetchTierStatus.type, fetchTierStatusSaga);
  yield takeLatest(tradingAccountActions.fetchRequiredDocsWithTier.type, fetchRequiredDocsWithTierSaga);
}
