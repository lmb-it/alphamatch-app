/**
 * Root Redux reducer — combines all module reducers
 */
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../modules/Auth/store/auth.slice';
import {profileReducer} from '../modules/Profile';
import {tradingAccountReducer} from '../modules/TradingAccount';
import {workspaceReducer} from '../modules/Workspace';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  tradingAccount: tradingAccountReducer,
  workspace: workspaceReducer,
  // Jobs, Bids, Chat, Payments, Notifications, Lookups
  // will be added here as modules are implemented
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
