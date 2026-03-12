/**
 * Redux store configuration with persistence
 */
import {configureStore, type Middleware} from '@reduxjs/toolkit';
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

// Strip transient fields from profile on rehydration
const profileTransform = createTransform(
  null,
  (outbound: any) => ({...outbound, error: null, loading: false}),
  {whitelist: ['profile']},
);

const persistConfig = {
  key: 'alphamatch',
  storage: AsyncStorage,
  whitelist: ['auth', 'profile', 'workspace'],
  transforms: [authTransform, profileTransform],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const store = configureStore({
  reducer: persistedReducer as any,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware as Middleware);

    if (__DEV__) {
      return middlewares.concat(logger as Middleware);
    }
    return middlewares;
  },
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
