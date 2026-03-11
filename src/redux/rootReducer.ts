/**
 * Root Redux reducer — combines all module reducers
 */
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../modules/Auth/store/auth.slice';
import {profileReducer} from '../modules/Profile';
import {tradingAccountReducer} from '../modules/TradingAccount';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  tradingAccount: tradingAccountReducer,
  // Jobs, Bids, Chat, Payments, Notifications, Lookups
  // will be added here as modules are implemented
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
