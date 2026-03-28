/**
 * Root saga — forks all module sagas
 */
import {all, fork} from 'redux-saga/effects';
import authSaga from '../modules/Auth/store/auth.saga';
import {profileSaga} from '../modules/Profile';
import {tradingAccountSaga} from '../modules/TradingAccount';
import {workspaceSaga} from '../modules/Workspace';
import {lookupsSaga} from '../modules/Lookups';

export default function* rootSaga(): Generator {
  yield all([
    fork(authSaga),
    fork(profileSaga),
    fork(tradingAccountSaga),
    fork(workspaceSaga),
    fork(lookupsSaga),
  ]);
}
