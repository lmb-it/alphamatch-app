/**
 * Auth Redux saga
 */
import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authActions} from './auth.slice';
import authService from '../api/auth.service';

function* loginSaga(action: ReturnType<typeof authActions.login>): Generator {
  try {
    const res: any = yield call(authService.login, action.payload);
    const token = res.data.token;
    yield call(AsyncStorage.setItem, 'auth_token', token);

    // Login only returns token — fetch user data with /me
    const meRes: any = yield call(authService.me);
    yield put(authActions.loginSuccess({user: meRes.data, token}));
  } catch (e: any) {
    const msg = e.response?.data?.message || 'Login failed';
    yield put(authActions.loginFailure(msg));
  }
}

function* registerSaga(action: ReturnType<typeof authActions.register>): Generator {
  try {
    const res: any = yield call(authService.register, action.payload);
    const token = res.data.token;
    yield call(AsyncStorage.setItem, 'auth_token', token);
    yield put(authActions.registerSuccess({user: res.data.account, token}));
  } catch (e: any) {
    const msg = e.response?.data?.message || 'Registration failed';
    yield put(authActions.registerFailure(msg));
  }
}

function* logoutSaga(): Generator {
  try {
    yield call(authService.logout);
  } catch (_e) {
    // Ignore errors on logout
  } finally {
    yield call(AsyncStorage.removeItem, 'auth_token');
    yield put(authActions.logoutSuccess());
  }
}

function* fetchMeSaga(): Generator {
  try {
    const res: any = yield call(authService.me);
    yield put(authActions.fetchMeSuccess(res.data));
  } catch (_e) {
    yield call(AsyncStorage.removeItem, 'auth_token');
    yield put(authActions.fetchMeFailure());
  }
}

export default function* authSaga(): Generator {
  yield takeLatest(authActions.login.type, loginSaga);
  yield takeLatest(authActions.register.type, registerSaga);
  yield takeLatest(authActions.logout.type, logoutSaga);
  yield takeLatest(authActions.fetchMe.type, fetchMeSaga);
}
