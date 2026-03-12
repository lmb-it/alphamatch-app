/**
 * Workspace Redux slice
 * Single source of truth for which workspace (personal or trading account) is active.
 * This slice is persisted so the last active workspace and tab are restored on launch.
 *
 * [REF-ARCH-003]
 */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {
  IWorkspaceState,
  IWorkspaceItem,
  ISetActiveWorkspacePayload,
  WorkspaceTab,
} from '../models/workspace.types';

// ── Initial state ────────────────────────────────────────────────────────────

const initialState: IWorkspaceState = {
  activeWorkspaceId: 'personal',
  activeWorkspaceType: 'personal',
  workspaceList: [],
  lastActiveTab: 'Home',
};

// ── Slice ────────────────────────────────────────────────────────────────────

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    /**
     * Switch the active workspace.
     * Called from WorkspaceSwitcherSheet when the user selects a workspace.
     */
    setActiveWorkspace(
      state,
      action: PayloadAction<ISetActiveWorkspacePayload>,
    ) {
      state.activeWorkspaceId = action.payload.workspaceId;
      state.activeWorkspaceType = action.payload.workspaceType;
    },

    /**
     * Update the full workspace list (populated from trading accounts API response).
     * Always call this on successful trading accounts fetch so the switcher sheet is current.
     */
    setWorkspaceList(state, action: PayloadAction<IWorkspaceItem[]>) {
      state.workspaceList = action.payload;
    },

    /**
     * Persist the last active tab so it can be restored on next launch.
     */
    setLastActiveTab(state, action: PayloadAction<WorkspaceTab>) {
      state.lastActiveTab = action.payload;
    },

    /**
     * Switch back to personal workspace.
     * Convenience action for "Switch to User Mode" button.
     */
    switchToPersonal(state) {
      state.activeWorkspaceId = 'personal';
      state.activeWorkspaceType = 'personal';
    },

    /**
     * Reset workspace state (called on logout).
     */
    resetWorkspace() {
      return initialState;
    },
  },
});

export const workspaceActions = workspaceSlice.actions;
export default workspaceSlice.reducer;
