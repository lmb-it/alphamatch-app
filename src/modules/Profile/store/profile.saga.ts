import {all, call, put, takeLatest} from 'redux-saga/effects';
import {profileActions} from './profile.slice';
import {fetchProfileApi, switchWorkspaceApi} from '../api/profile.service';
import {tradingAccountActions} from '@src/modules/TradingAccount';
import {listTradingAccountsApi} from '@src/modules/TradingAccount/api/tradingAccount.service';
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
    // Switch workspace on backend
    const activeWorkspace = yield call(switchWorkspaceApi, action.payload);
    yield put(profileActions.switchWorkspaceSuccess(activeWorkspace as string | null));

    // Fetch fresh profile + trading accounts in parallel
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

export default function* profileSaga(): Generator {
  yield takeLatest(profileActions.fetchProfile.type, fetchProfileSaga);
  yield takeLatest(profileActions.switchWorkspace.type, switchWorkspaceSaga);
}
