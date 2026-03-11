import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainContextProvider} from '@lmb-it/kitsconcerto';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@src/redux';
import languages from '@src/localization';
import {alphaMatchTheme} from '@src/config/theme';
import Routes from '@src/routes';
import {setOnUnauthorized} from '@src/services/api';
import {authActions} from '@src/modules/Auth/store/auth.slice';
import './global.css';

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

export default App;
