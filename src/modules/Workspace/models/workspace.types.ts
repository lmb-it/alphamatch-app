/**
 * Workspace module — type definitions
 * The Workspace module is the single source of truth for which workspace is active.
 * Every context-aware screen reads from this module's Redux slice.
 *
 * [REF-ARCH-003]
 */

// ── Item ────────────────────────────────────────────────────────────────────

export interface IWorkspaceItem {
  id: string; // 'personal' | trading account ref (UUID)
  type: 'personal' | 'trading_account';
  /** Display label: "Personal" or career name e.g. "Electrician" */
  label: string;
  avatar: string | null;
  /** Alpha Pro accounts require document verification */
  isVerified: boolean;
  /** Alpha Flex accounts require an active subscription */
  hasActiveSubscription: boolean;
}

// ── State ────────────────────────────────────────────────────────────────────

export type WorkspaceTab = 'Home' | 'MyJobs' | 'Messages' | 'Profile';

export interface IWorkspaceState {
  activeWorkspaceId: string; // 'personal' or a trading account ref
  activeWorkspaceType: 'personal' | 'trading_account';
  workspaceList: IWorkspaceItem[];
  lastActiveTab: WorkspaceTab;
}

// ── Action Payloads ──────────────────────────────────────────────────────────

export interface ISetActiveWorkspacePayload {
  workspaceId: string;
  workspaceType: 'personal' | 'trading_account';
}
