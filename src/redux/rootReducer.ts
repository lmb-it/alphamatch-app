/**
 * Root Redux reducer — combines all module reducers
 */
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../modules/Auth/store/auth.slice';
import {profileReducer} from '../modules/Profile';
import {tradingAccountReducer} from '../modules/TradingAccount';
import {workspaceReducer} from '../modules/Workspace';
import {lookupsReducer} from '../modules/Lookups';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  tradingAccount: tradingAccountReducer,
  workspace: workspaceReducer,
  lookups: lookupsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
