/**
 * Auth Redux saga
 */
import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authActions} from './auth.slice';
import authService from '../api/auth.service';
import {signInWithGoogle} from '../services/googleAuth';
import {signInWithApple} from '../services/appleAuth';
import {parseApiError} from '@src/services/apiError';
import {sendFirebaseOtp, confirmFirebaseOtp} from '../services/firebasePhoneAuth';

function* loginSaga(action: ReturnType<typeof authActions.login>): Generator {
  try {
    const res: any = yield call(authService.login, action.payload);
    const token = res.data.token;
    yield call(AsyncStorage.setItem, 'auth_token', token);

    // Login only returns token — fetch user data with /me
    const meRes: any = yield call(authService.me);
    yield put(authActions.loginSuccess({user: meRes.data, token}));
  } catch (e: any) {
    yield put(authActions.loginFailure(parseApiError(e).message));
  }
}

function* registerSaga(action: ReturnType<typeof authActions.register>): Generator {
  try {
    const res: any = yield call(authService.register, action.payload);
    const token = res.data.token;
    yield call(AsyncStorage.setItem, 'auth_token', token);

    // Backend returns token + account — auto-login the user
    yield put(authActions.loginSuccess({user: res.data.account, token}));
  } catch (e: any) {
    yield put(authActions.registerFailure(parseApiError(e).message));
  }
}

function* socialLoginSaga(action: ReturnType<typeof authActions.socialLogin>): Generator {
  try {
    // Step 1: Get native provider token
    let providerToken: string;
    const provider = action.payload.providerName;

    if (provider === 'google') {
      providerToken = (yield call(signInWithGoogle)) as string;
    } else {
      providerToken = (yield call(signInWithApple)) as string;
    }

    // Step 2: Send token to backend for verification + login/register
    const res: any = yield call(authService.socialLogin, {
      providerName: provider,
      providerToken,
    });

    const token = res.data.token;
    yield call(AsyncStorage.setItem, 'auth_token', token);
    yield put(authActions.socialLoginSuccess({user: res.data.account, token}));
  } catch (e: any) {
    // User-cancelled flows should not show an error
    if (e.message?.includes('cancelled') || e.message?.includes('canceled')) {
      yield put(authActions.socialLoginFailure(''));
      return;
    }
    yield put(authActions.socialLoginFailure(parseApiError(e).message));
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

function* sendOtpSaga(action: ReturnType<typeof authActions.sendOtp>): Generator {
  try {
    const {phone, context} = action.payload;

    // Step 1: Validate phone with backend (exists for login, doesn't for register)
    yield call(authService.validatePhone, {phone, context});

    // Step 2: Initiate Firebase Phone Auth — sends SMS
    yield call(sendFirebaseOtp, phone);

    yield put(authActions.sendOtpSuccess({phone, context}));
  } catch (e: any) {
    yield put(authActions.sendOtpFailure(parseApiError(e).message));
  }
}

function* verifyOtpSaga(action: ReturnType<typeof authActions.verifyOtp>): Generator {
  try {
    const {phone, code, context} = action.payload;

    // Step 1: Confirm code with Firebase — returns Firebase ID token
    const firebaseToken: string = (yield call(confirmFirebaseOtp, code)) as string;

    // Step 2: Send Firebase token to backend for verification + login/register
    const res: any = yield call(authService.verifyOtp, {phone, firebaseToken, context});
    const token = res.data.token;

    yield call(AsyncStorage.setItem, 'auth_token', token);
    yield put(authActions.verifyOtpSuccess({user: res.data.account, token}));
  } catch (e: any) {
    yield put(authActions.verifyOtpFailure(parseApiError(e).message));
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
  yield takeLatest(authActions.socialLogin.type, socialLoginSaga);
  yield takeLatest(authActions.sendOtp.type, sendOtpSaga);
  yield takeLatest(authActions.verifyOtp.type, verifyOtpSaga);
  yield takeLatest(authActions.logout.type, logoutSaga);
  yield takeLatest(authActions.fetchMe.type, fetchMeSaga);
}
