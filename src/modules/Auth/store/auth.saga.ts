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
import {sendFirebaseOtp, confirmFirebaseOtp, toE164} from '../services/firebasePhoneAuth';
import {tradingAccountActions} from '@src/modules/TradingAccount';

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

    // Backend now returns pendingVerification — user must verify email code
    yield put(
      authActions.registerSuccess({
        pendingVerification: {
          contactEmail: res.data.contactEmail,
          context: 'emailVerification',
        },
      }),
    );
  } catch (e: any) {
    yield put(authActions.registerFailure(parseApiError(e).message));
  }
}

function* verifyEmailSaga(action: ReturnType<typeof authActions.verifyEmail>): Generator {
  try {
    const res: any = yield call(authService.verifyEmail, action.payload);
    const token = res.data.token;
    yield call(AsyncStorage.setItem, 'auth_token', token);
    yield put(authActions.verifyEmailSuccess({user: res.data.account, token}));
  } catch (e: any) {
    yield put(authActions.verifyEmailFailure(parseApiError(e).message));
  }
}

function* resendCodeSaga(action: ReturnType<typeof authActions.resendCode>): Generator {
  try {
    yield call(authService.resendCode, action.payload);
    yield put(authActions.resendCodeSuccess());
  } catch (e: any) {
    yield put(authActions.resendCodeFailure(parseApiError(e).message));
  }
}

function* markWelcomeSeenSaga(): Generator {
  try {
    const res: any = yield call(authService.markWelcomeSeen);
    yield put(authActions.markWelcomeSeenSuccess(res.data));
  } catch (e: any) {
    yield put(authActions.markWelcomeSeenFailure(parseApiError(e).message));
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
    const formattedPhone = toE164(phone);

    // Step 1: Validate phone with backend (exists for login, doesn't for register)
    yield call(authService.validatePhone, {phone: formattedPhone, context});

    // Step 2: Initiate Firebase Phone Auth — sends SMS
    yield call(sendFirebaseOtp, formattedPhone);

    yield put(authActions.sendOtpSuccess({phone: formattedPhone, context}));
  } catch (e: any) {
    console.log(e)
    yield put(authActions.sendOtpFailure(parseApiError(e).message));
  }
}

function* verifyOtpSaga(action: ReturnType<typeof authActions.verifyOtp>): Generator {
  try {
    const {phone, code, context} = action.payload;

    // Step 1: Confirm code with Firebase — returns Firebase ID token
    const firebaseToken: string = (yield call(confirmFirebaseOtp, code)) as string;

    // Step 2: Send Firebase token to backend for verification + login/register
    // Format phone to E.164 to match what Firebase stored
    const res: any = yield call(authService.verifyOtp, {phone: toE164(phone), firebaseToken, context});
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

// Bootstrap: load trading accounts after any successful login
function* postLoginBootstrapSaga(): Generator {
  yield put(tradingAccountActions.fetchMyAccounts());
}

export default function* authSaga(): Generator {
  yield takeLatest(authActions.login.type, loginSaga);
  yield takeLatest(authActions.register.type, registerSaga);
  yield takeLatest(authActions.verifyEmail.type, verifyEmailSaga);
  yield takeLatest(authActions.resendCode.type, resendCodeSaga);
  yield takeLatest(authActions.socialLogin.type, socialLoginSaga);
  yield takeLatest(authActions.sendOtp.type, sendOtpSaga);
  yield takeLatest(authActions.verifyOtp.type, verifyOtpSaga);
  yield takeLatest(authActions.markWelcomeSeen.type, markWelcomeSeenSaga);
  yield takeLatest(authActions.logout.type, logoutSaga);
  yield takeLatest(authActions.fetchMe.type, fetchMeSaga);
  // Bootstrap data after any login success path
  yield takeLatest(
    [
      authActions.loginSuccess.type,
      authActions.socialLoginSuccess.type,
      authActions.verifyOtpSuccess.type,
      authActions.verifyEmailSuccess.type,
      authActions.fetchMeSuccess.type,
    ],
    postLoginBootstrapSaga,
  );
}
