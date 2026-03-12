import React from 'react';
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

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainContextProvider
            languages={languages}
            defaultLanguage="en"
            kitsTheme={alphaMatchTheme}
          >
            <Routes />
          </MainContextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
