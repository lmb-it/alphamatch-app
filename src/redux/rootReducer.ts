/**
 * Root Redux reducer — combines all module reducers
 */
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../modules/Auth/store/auth.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Jobs, Bids, Chat, Profile, Payments, Notifications, Lookups
  // will be added here as modules are implemented
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
