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
    yield call(authService.register, action.payload);
    // Registration now requires email verification — no token yet
    yield put(
      authActions.registerSuccess({
        pendingVerification: {
          contactEmail: action.payload.contactEmail,
          context: 'emailVerification',
        },
      }),
    );
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
  yield takeLatest(authActions.logout.type, logoutSaga);
  yield takeLatest(authActions.fetchMe.type, fetchMeSaga);
}
