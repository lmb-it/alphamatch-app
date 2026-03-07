/**
 * Root saga — forks all module sagas
 */
import {all, fork} from 'redux-saga/effects';
import authSaga from '../modules/Auth/store/auth.saga';

export default function* rootSaga(): Generator {
  yield all([
    fork(authSaga),
    // Jobs, Bids, Chat, Profile, Payments, Notifications, Lookups
    // sagas will be forked here as modules are implemented
  ]);
}
