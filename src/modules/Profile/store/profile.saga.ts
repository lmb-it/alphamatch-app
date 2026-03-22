import {all, call, put, takeLatest} from 'redux-saga/effects';
import {profileActions} from './profile.slice';
import {
  fetchProfileApi, switchWorkspaceApi, updateProfileApi, uploadAvatarApi, uploadCoverApi,
  getExperiencesApi, createExperienceApi, updateExperienceApi, deleteExperienceApi,
  getEducationApi, createEducationApi, updateEducationApi, deleteEducationApi,
  getQualificationsApi, createQualificationApi, updateQualificationApi, deleteQualificationApi,
  getReferencesApi, createReferenceApi, updateReferenceApi, deleteReferenceApi,
  getPortfolioItemsApi, createPortfolioItemApi, updatePortfolioItemApi, deletePortfolioItemApi,
} from '../api/profile.service';
import {tradingAccountActions} from '@src/modules/TradingAccount';
import {listTradingAccountsApi} from '@src/modules/TradingAccount/api/tradingAccount.service';
import {parseApiError} from '@src/services/apiError';
import * as Sentry from '@sentry/react-native';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {
  IProfileData, ISwitchWorkspacePayload, IUpdateProfilePayload,
  ICreateExperience, ICreateEducation, ICreateQualification, ICreateReference, ICreatePortfolioItem,
} from '../models/profile.types';

// ── Profile core sagas ──────────────────────────────────────────────────────

function* fetchProfileSaga(): Generator {
  try {
    const data = yield call(fetchProfileApi);
    yield put(profileActions.fetchProfileSuccess(data as IProfileData));
  } catch (e) {
    yield put(profileActions.fetchProfileFailure(parseApiError(e).message));
  }
}

function* switchWorkspaceSaga(action: PayloadAction<ISwitchWorkspacePayload>): Generator {
  try {
    const activeWorkspace = yield call(switchWorkspaceApi, action.payload);
    yield put(profileActions.switchWorkspaceSuccess(activeWorkspace as string | null));
    const [profileData, accounts]: any = yield all([
      call(fetchProfileApi),
      call(listTradingAccountsApi),
    ]);
    yield put(profileActions.fetchProfileSuccess(profileData as IProfileData));
    yield put(tradingAccountActions.fetchMyAccountsSuccess(accounts));
  } catch (e) {
    yield put(profileActions.switchWorkspaceFailure(parseApiError(e).message));
  }
}

function* updateProfileSaga(action: PayloadAction<IUpdateProfilePayload>): Generator {
  try {
    yield call(updateProfileApi, action.payload);
    const data = yield call(fetchProfileApi);
    yield put(profileActions.updateProfileSuccess(data as IProfileData));
  } catch (e) {
    yield put(profileActions.updateProfileFailure(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'update'}});
  }
}

function* uploadAvatarSaga(action: PayloadAction<string>): Generator {
  try {
    yield call(uploadAvatarApi, action.payload);
    yield put(profileActions.uploadAvatarSuccess());
    const data = yield call(fetchProfileApi);
    yield put(profileActions.fetchProfileSuccess(data as IProfileData));
  } catch (e) {
    yield put(profileActions.uploadAvatarFailure(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'upload_avatar'}});
  }
}

function* uploadCoverSaga(action: PayloadAction<string>): Generator {
  try {
    yield call(uploadCoverApi, action.payload);
    yield put(profileActions.uploadCoverSuccess());
    const data = yield call(fetchProfileApi);
    yield put(profileActions.fetchProfileSuccess(data as IProfileData));
  } catch (e) {
    yield put(profileActions.uploadCoverFailure(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'upload_cover'}});
  }
}

// ── Experience sagas ────────────────────────────────────────────────────────

function* loadExperiencesSaga(action: PayloadAction<string>): Generator {
  try {
    const data = yield call(getExperiencesApi, action.payload);
    yield put(profileActions.setExperiences(data as any));
  } catch (e) {
    yield put(profileActions.setExperiencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'load_experiences'}});
  }
}

function* createExperienceSaga(action: PayloadAction<{ref: string; data: ICreateExperience}>): Generator {
  try {
    yield call(createExperienceApi, action.payload.ref, action.payload.data);
    yield put(profileActions.loadExperiences(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setExperiencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'create_experience'}});
  }
}

function* updateExperienceSaga(action: PayloadAction<{ref: string; itemRef: string; data: ICreateExperience}>): Generator {
  try {
    yield call(updateExperienceApi, action.payload.ref, action.payload.itemRef, action.payload.data);
    yield put(profileActions.loadExperiences(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setExperiencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'update_experience'}});
  }
}

function* deleteExperienceSaga(action: PayloadAction<{ref: string; itemRef: string}>): Generator {
  try {
    yield call(deleteExperienceApi, action.payload.ref, action.payload.itemRef);
    yield put(profileActions.loadExperiences(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setExperiencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'delete_experience'}});
  }
}

// ── Education sagas ─────────────────────────────────────────────────────────

function* loadEducationSaga(action: PayloadAction<string>): Generator {
  try {
    const data = yield call(getEducationApi, action.payload);
    yield put(profileActions.setEducation(data as any));
  } catch (e) {
    yield put(profileActions.setEducationError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'load_education'}});
  }
}

function* createEducationSaga(action: PayloadAction<{ref: string; data: ICreateEducation}>): Generator {
  try {
    yield call(createEducationApi, action.payload.ref, action.payload.data);
    yield put(profileActions.loadEducation(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setEducationError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'create_education'}});
  }
}

function* updateEducationSaga(action: PayloadAction<{ref: string; itemRef: string; data: ICreateEducation}>): Generator {
  try {
    yield call(updateEducationApi, action.payload.ref, action.payload.itemRef, action.payload.data);
    yield put(profileActions.loadEducation(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setEducationError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'update_education'}});
  }
}

function* deleteEducationSaga(action: PayloadAction<{ref: string; itemRef: string}>): Generator {
  try {
    yield call(deleteEducationApi, action.payload.ref, action.payload.itemRef);
    yield put(profileActions.loadEducation(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setEducationError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'delete_education'}});
  }
}

// ── Qualification sagas ─────────────────────────────────────────────────────

function* loadQualificationsSaga(action: PayloadAction<string>): Generator {
  try {
    const data = yield call(getQualificationsApi, action.payload);
    yield put(profileActions.setQualifications(data as any));
  } catch (e) {
    yield put(profileActions.setQualificationsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'load_qualifications'}});
  }
}

function* createQualificationSaga(action: PayloadAction<{ref: string; data: ICreateQualification}>): Generator {
  try {
    yield call(createQualificationApi, action.payload.ref, action.payload.data);
    yield put(profileActions.loadQualifications(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setQualificationsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'create_qualification'}});
  }
}

function* updateQualificationSaga(action: PayloadAction<{ref: string; itemRef: string; data: ICreateQualification}>): Generator {
  try {
    yield call(updateQualificationApi, action.payload.ref, action.payload.itemRef, action.payload.data);
    yield put(profileActions.loadQualifications(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setQualificationsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'update_qualification'}});
  }
}

function* deleteQualificationSaga(action: PayloadAction<{ref: string; itemRef: string}>): Generator {
  try {
    yield call(deleteQualificationApi, action.payload.ref, action.payload.itemRef);
    yield put(profileActions.loadQualifications(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setQualificationsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'delete_qualification'}});
  }
}

// ── Reference sagas ─────────────────────────────────────────────────────────

function* loadReferencesSaga(action: PayloadAction<string>): Generator {
  try {
    const data = yield call(getReferencesApi, action.payload);
    yield put(profileActions.setReferences(data as any));
  } catch (e) {
    yield put(profileActions.setReferencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'load_references'}});
  }
}

function* createReferenceSaga(action: PayloadAction<{ref: string; data: ICreateReference}>): Generator {
  try {
    yield call(createReferenceApi, action.payload.ref, action.payload.data);
    yield put(profileActions.loadReferences(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setReferencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'create_reference'}});
  }
}

function* updateReferenceSaga(action: PayloadAction<{ref: string; itemRef: string; data: ICreateReference}>): Generator {
  try {
    yield call(updateReferenceApi, action.payload.ref, action.payload.itemRef, action.payload.data);
    yield put(profileActions.loadReferences(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setReferencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'update_reference'}});
  }
}

function* deleteReferenceSaga(action: PayloadAction<{ref: string; itemRef: string}>): Generator {
  try {
    yield call(deleteReferenceApi, action.payload.ref, action.payload.itemRef);
    yield put(profileActions.loadReferences(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setReferencesError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'delete_reference'}});
  }
}

// ── Portfolio item sagas ────────────────────────────────────────────────────

function* loadPortfolioItemsSaga(action: PayloadAction<string>): Generator {
  try {
    const data = yield call(getPortfolioItemsApi, action.payload);
    yield put(profileActions.setPortfolioItems(data as any));
  } catch (e) {
    yield put(profileActions.setPortfolioItemsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'load_portfolio'}});
  }
}

function* createPortfolioItemSaga(action: PayloadAction<{ref: string; data: ICreatePortfolioItem}>): Generator {
  try {
    yield call(createPortfolioItemApi, action.payload.ref, action.payload.data);
    yield put(profileActions.loadPortfolioItems(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setPortfolioItemsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'create_portfolio'}});
  }
}

function* updatePortfolioItemSaga(action: PayloadAction<{ref: string; itemRef: string; data: ICreatePortfolioItem}>): Generator {
  try {
    yield call(updatePortfolioItemApi, action.payload.ref, action.payload.itemRef, action.payload.data);
    yield put(profileActions.loadPortfolioItems(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setPortfolioItemsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'update_portfolio'}});
  }
}

function* deletePortfolioItemSaga(action: PayloadAction<{ref: string; itemRef: string}>): Generator {
  try {
    yield call(deletePortfolioItemApi, action.payload.ref, action.payload.itemRef);
    yield put(profileActions.loadPortfolioItems(action.payload.ref));
  } catch (e) {
    yield put(profileActions.setPortfolioItemsError(parseApiError(e).message));
    Sentry.captureException(e, {tags: {feature: 'profile', step: 'delete_portfolio'}});
  }
}

// ── Root watcher ────────────────────────────────────────────────────────────

export default function* profileSaga(): Generator {
  // Profile core
  yield takeLatest(profileActions.fetchProfile.type, fetchProfileSaga);
  yield takeLatest(profileActions.switchWorkspace.type, switchWorkspaceSaga);
  yield takeLatest(profileActions.updateProfile.type, updateProfileSaga);
  yield takeLatest(profileActions.uploadAvatar.type, uploadAvatarSaga);
  yield takeLatest(profileActions.uploadCover.type, uploadCoverSaga);
  // Experience
  yield takeLatest(profileActions.loadExperiences.type, loadExperiencesSaga);
  yield takeLatest(profileActions.createExperience.type, createExperienceSaga);
  yield takeLatest(profileActions.updateExperience.type, updateExperienceSaga);
  yield takeLatest(profileActions.deleteExperience.type, deleteExperienceSaga);
  // Education
  yield takeLatest(profileActions.loadEducation.type, loadEducationSaga);
  yield takeLatest(profileActions.createEducation.type, createEducationSaga);
  yield takeLatest(profileActions.updateEducation.type, updateEducationSaga);
  yield takeLatest(profileActions.deleteEducation.type, deleteEducationSaga);
  // Qualifications
  yield takeLatest(profileActions.loadQualifications.type, loadQualificationsSaga);
  yield takeLatest(profileActions.createQualification.type, createQualificationSaga);
  yield takeLatest(profileActions.updateQualification.type, updateQualificationSaga);
  yield takeLatest(profileActions.deleteQualification.type, deleteQualificationSaga);
  // References
  yield takeLatest(profileActions.loadReferences.type, loadReferencesSaga);
  yield takeLatest(profileActions.createReference.type, createReferenceSaga);
  yield takeLatest(profileActions.updateReference.type, updateReferenceSaga);
  yield takeLatest(profileActions.deleteReference.type, deleteReferenceSaga);
  // Portfolio items
  yield takeLatest(profileActions.loadPortfolioItems.type, loadPortfolioItemsSaga);
  yield takeLatest(profileActions.createPortfolioItem.type, createPortfolioItemSaga);
  yield takeLatest(profileActions.updatePortfolioItem.type, updatePortfolioItemSaga);
  yield takeLatest(profileActions.deletePortfolioItem.type, deletePortfolioItemSaga);
}
