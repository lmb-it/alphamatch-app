/**
 * Redux store configuration with persistence
 */
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// Strip transient fields (error, loading) from auth on rehydration
const authTransform = createTransform(
  null, // inbound: persist as-is
  (outbound: any) => ({...outbound, error: null, loading: false, pendingVerification: null, resetContact: null}), // outbound: reset transient fields
  {whitelist: ['auth']},
);

const persistConfig = {
  key: 'alphamatch',
  storage: AsyncStorage,
  whitelist: ['auth'],
  transforms: [authTransform],
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer) as any,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(sagaMiddleware)
      .concat(__DEV__ ? logger : []),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
