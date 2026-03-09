import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainContextProvider} from '@lmb/kitsconcerto';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@src/redux';
import languages from '@src/localization';
import {alphaMatchTheme} from '@src/config/theme';
import Routes from '@src/routes';
import './global.css';

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
