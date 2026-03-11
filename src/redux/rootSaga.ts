/**
 * Root saga — forks all module sagas
 */
import {all, fork} from 'redux-saga/effects';
import authSaga from '../modules/Auth/store/auth.saga';
import {profileSaga} from '../modules/Profile';
import {tradingAccountSaga} from '../modules/TradingAccount';

export default function* rootSaga(): Generator {
  yield all([
    fork(authSaga),
    fork(profileSaga),
    fork(tradingAccountSaga),
    // Jobs, Bids, Chat, Payments, Notifications, Lookups
    // sagas will be forked here as modules are implemented
  ]);
}
