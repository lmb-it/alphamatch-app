import {call, put, takeLatest} from 'redux-saga/effects';
import {profileActions} from './profile.slice';
import {fetchProfileApi, switchWorkspaceApi} from '../api/profile.service';
import {parseApiError} from '@src/services/apiError';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {IProfileData, ISwitchWorkspacePayload} from '../models/profile.types';

function* fetchProfileSaga() {
  try {
    const data: IProfileData = yield call(fetchProfileApi);
    yield put(profileActions.fetchProfileSuccess(data));
  } catch (e) {
    yield put(profileActions.fetchProfileFailure(parseApiError(e).message));
  }
}

function* switchWorkspaceSaga(action: PayloadAction<ISwitchWorkspacePayload>) {
  try {
    const activeWorkspace: string | null = yield call(switchWorkspaceApi, action.payload);
    yield put(profileActions.switchWorkspaceSuccess(activeWorkspace));
    // Re-fetch profile to get updated context
    yield put(profileActions.fetchProfile());
  } catch (e) {
    yield put(profileActions.switchWorkspaceFailure(parseApiError(e).message));
  }
}

export default function* profileSaga() {
  yield takeLatest(profileActions.fetchProfile.type, fetchProfileSaga);
  yield takeLatest(profileActions.switchWorkspace.type, switchWorkspaceSaga);
}
