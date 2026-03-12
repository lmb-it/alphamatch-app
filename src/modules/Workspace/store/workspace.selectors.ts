/**
 * Workspace selectors
 */
import type {RootState} from '@src/redux';

export const selectWorkspace = (state: RootState) => state.workspace;

export const selectActiveWorkspaceId = (state: RootState) =>
  state.workspace.activeWorkspaceId;

export const selectActiveWorkspaceType = (state: RootState) =>
  state.workspace.activeWorkspaceType;

export const selectWorkspaceList = (state: RootState) =>
  state.workspace.workspaceList;

export const selectLastActiveTab = (state: RootState) =>
  state.workspace.lastActiveTab;

/** True when the user is operating in a trading account context */
export const selectIsTradeMode = (state: RootState) =>
  state.workspace.activeWorkspaceType === 'trading_account';

/** Returns the active workspace item, or null when in personal mode */
export const selectActiveWorkspaceItem = (state: RootState) => {
  const {activeWorkspaceId, workspaceList} = state.workspace;
  return workspaceList.find(w => w.id === activeWorkspaceId) ?? null;
};
