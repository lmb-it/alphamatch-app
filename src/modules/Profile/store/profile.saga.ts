import {call, put, takeLatest} from 'redux-saga/effects';
import {profileActions} from './profile.slice';
import {fetchProfileApi, switchWorkspaceApi} from '../api/profile.service';
import {parseApiError} from '@src/services/apiError';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {IProfileData, ISwitchWorkspacePayload} from '../models/profile.types';

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
    // Re-fetch profile to get updated context
    yield put(profileActions.fetchProfile());
  } catch (e) {
    yield put(profileActions.switchWorkspaceFailure(parseApiError(e).message));
  }
}

export default function* profileSaga(): Generator {
  yield takeLatest(profileActions.fetchProfile.type, fetchProfileSaga);
  yield takeLatest(profileActions.switchWorkspace.type, switchWorkspaceSaga);
}
