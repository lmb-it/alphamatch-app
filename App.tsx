import React, { useEffect, useRef, useCallback } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainContextProvider } from '@lmb-it/kitsconcerto';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@src/redux';
import languages from '@src/localization';
import { alphaMatchTheme } from '@src/config/theme';
import Routes from '@src/routes';
import { setOnUnauthorized } from '@src/services/api';
import { authActions } from '@src/modules/Auth/store/auth.slice';
import { tradingAccountActions } from '@src/modules/TradingAccount';
import { profileActions } from '@src/modules/Profile';
import { StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';
import './global.css';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://98614f6fea78f18d42a3fe4908a17295@o4511028343144448.ingest.us.sentry.io/4511028357496832',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Sync Redux auth state when a 401 clears the AsyncStorage token
setOnUnauthorized(() => {
  store.dispatch(authActions.fetchMeFailure());
});

const STALE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

function refreshDataIfAuthenticated() {
  const state = store.getState();
  if (!state.auth.isAuthenticated || !state.auth.token) return;

  const lastFetched = state.tradingAccount.lastFetched;
  const isStale = !lastFetched || Date.now() - lastFetched > STALE_THRESHOLD;

  if (isStale) {
    store.dispatch(tradingAccountActions.fetchMyAccounts());
    store.dispatch(profileActions.fetchProfile());
  }
}

function App() {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const handleAppStateChange = useCallback((nextState: AppStateStatus) => {
    if (appStateRef.current.match(/inactive|background/) && nextState === 'active') {
      refreshDataIfAuthenticated();
    }
    appStateRef.current = nextState;
  }, []);

  // Refresh after redux-persist rehydration, listen for resume, and run periodic sync
  useEffect(() => {
    // Wait for persist rehydration before attempting to refresh
    const unsubscribe = persistor.subscribe(() => {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        unsubscribe();
        refreshDataIfAuthenticated();
      }
    });
    // If already bootstrapped (e.g. fast rehydration), fire immediately
    if (persistor.getState().bootstrapped) {
      unsubscribe();
      refreshDataIfAuthenticated();
    }

    const sub = AppState.addEventListener('change', handleAppStateChange);

    // Background periodic sync — silently refresh every 5 minutes while app is active
    const syncInterval = setInterval(() => {
      if (appStateRef.current === 'active') {
        refreshDataIfAuthenticated();
      }
    }, STALE_THRESHOLD);

    return () => {
      unsubscribe();
      sub.remove();
      clearInterval(syncInterval);
    };
  }, [handleAppStateChange]);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY || ''}>
            <MainContextProvider
              languages={languages}
              defaultLanguage="en"
              kitsTheme={alphaMatchTheme}
            >
              <Routes />
            </MainContextProvider>
          </StripeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
