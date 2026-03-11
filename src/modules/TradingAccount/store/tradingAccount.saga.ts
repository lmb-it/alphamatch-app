import {call, put, takeLatest} from 'redux-saga/effects';
import {tradingAccountActions} from './tradingAccount.slice';
import {
  aiAnalyzeApi,
  createTradingAccountApi,
  fetchCareersApi,
  fetchPlansApi,
  fetchRequiredDocumentsApi,
  fetchSetupIntentApi,
  finalizeTradingAccountApi,
  listTradingAccountsApi,
  submitFormAnswersApi,
  subscribeApi,
} from '../api/tradingAccount.service';
import {parseApiError} from '@src/services/apiError';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {
  IAIAnalyzePayload,
  ICreateTradingAccountPayload,
  IFinalizeTradingAccountPayload,
  ISubmitFormAnswersPayload,
  ISubscribePayload,
} from '../models/tradingAccount.types';

function* fetchMyAccountsSaga() {
  try {
    const accounts = yield call(listTradingAccountsApi);
    yield put(tradingAccountActions.fetchMyAccountsSuccess(accounts));
  } catch (e) {
    yield put(tradingAccountActions.fetchMyAccountsFailure(parseApiError(e).message));
  }
}

function* aiAnalyzeSaga(action: PayloadAction<IAIAnalyzePayload>) {
  try {
    const result = yield call(aiAnalyzeApi, action.payload.description, action.payload.formTypeRef);
    yield put(tradingAccountActions.aiAnalyzeSuccess(result));
  } catch (e) {
    yield put(tradingAccountActions.aiAnalyzeFailure(parseApiError(e).message));
  }
}

function* fetchCareersSaga() {
  try {
    const careers = yield call(fetchCareersApi);
    yield put(tradingAccountActions.fetchCareersSuccess(careers));
  } catch (e) {
    yield put(tradingAccountActions.fetchCareersFailure(parseApiError(e).message));
  }
}

function* createAccountSaga(action: PayloadAction<ICreateTradingAccountPayload>) {
  try {
    const account = yield call(createTradingAccountApi, action.payload);
    yield put(tradingAccountActions.createAccountSuccess(account));
  } catch (e) {
    yield put(tradingAccountActions.createAccountFailure(parseApiError(e).message));
  }
}

function* submitFormAnswersSaga(action: PayloadAction<ISubmitFormAnswersPayload>) {
  try {
    const account = yield call(submitFormAnswersApi, action.payload);
    yield put(tradingAccountActions.submitFormAnswersSuccess(account));
  } catch (e) {
    yield put(tradingAccountActions.submitFormAnswersFailure(parseApiError(e).message));
  }
}

function* finalizeAccountSaga(action: PayloadAction<IFinalizeTradingAccountPayload>) {
  try {
    const result = yield call(finalizeTradingAccountApi, action.payload);
    yield put(tradingAccountActions.finalizeAccountSuccess(result));
  } catch (e) {
    yield put(tradingAccountActions.finalizeAccountFailure(parseApiError(e).message));
  }
}

function* fetchPlansSaga(action: PayloadAction<string>) {
  try {
    const plans = yield call(fetchPlansApi, action.payload);
    yield put(tradingAccountActions.fetchPlansSuccess(plans));
  } catch (e) {
    yield put(tradingAccountActions.fetchPlansFailure(parseApiError(e).message));
  }
}

function* fetchDocumentsSaga(action: PayloadAction<string>) {
  try {
    const docs = yield call(fetchRequiredDocumentsApi, action.payload);
    yield put(tradingAccountActions.fetchDocumentsSuccess(docs));
  } catch (e) {
    yield put(tradingAccountActions.fetchDocumentsFailure(parseApiError(e).message));
  }
}

function* fetchSetupIntentSaga() {
  try {
    const result = yield call(fetchSetupIntentApi);
    yield put(tradingAccountActions.fetchSetupIntentSuccess(result));
  } catch (e) {
    yield put(tradingAccountActions.fetchSetupIntentFailure(parseApiError(e).message));
  }
}

function* subscribeSaga(action: PayloadAction<ISubscribePayload>) {
  try {
    const account = yield call(subscribeApi, action.payload);
    yield put(tradingAccountActions.subscribeSuccess(account));
  } catch (e) {
    yield put(tradingAccountActions.subscribeFailure(parseApiError(e).message));
  }
}

export default function* tradingAccountSaga() {
  yield takeLatest(tradingAccountActions.fetchMyAccounts.type, fetchMyAccountsSaga);
  yield takeLatest(tradingAccountActions.aiAnalyze.type, aiAnalyzeSaga);
  yield takeLatest(tradingAccountActions.fetchCareers.type, fetchCareersSaga);
  yield takeLatest(tradingAccountActions.createAccount.type, createAccountSaga);
  yield takeLatest(tradingAccountActions.submitFormAnswers.type, submitFormAnswersSaga);
  yield takeLatest(tradingAccountActions.finalizeAccount.type, finalizeAccountSaga);
  yield takeLatest(tradingAccountActions.fetchPlans.type, fetchPlansSaga);
  yield takeLatest(tradingAccountActions.fetchDocuments.type, fetchDocumentsSaga);
  yield takeLatest(tradingAccountActions.fetchSetupIntent.type, fetchSetupIntentSaga);
  yield takeLatest(tradingAccountActions.subscribe.type, subscribeSaga);
}
