/**
 * Workspace saga
 * Currently a stub — no API calls yet.
 * Future: will handle workspace/switch API calls and sync workspace list
 * from trading accounts response.
 */
import {takeLatest, put, select} from 'redux-saga/effects';
import {workspaceActions} from './workspace.slice';
import {selectMyAccounts} from '@src/modules/TradingAccount';
import {selectActiveWorkspaceId} from './workspace.selectors';
import type {IWorkspaceItem} from '../models/workspace.types';

/**
 * Build workspace list from trading accounts.
 * The personal workspace is always prepended.
 * If the active workspace no longer exists in the new list, fall back to personal.
 */
function* syncWorkspaceListSaga(): Generator {
  const myAccounts = (yield select(selectMyAccounts)) as any[];

  const workspaceItems: IWorkspaceItem[] = [
    {
      id: 'personal',
      type: 'personal',
      label: 'Personal',
      avatar: null,
      isVerified: true,
      hasActiveSubscription: true,
    },
    ...myAccounts.map(account => ({
      id: account.identifier ?? account.id ?? '',
      type: 'trading_account' as const,
      label: account.careerName ?? account.accountName ?? 'Trading Account',
      avatar: account.avatar ?? null,
      isVerified: account.setupStatus === 'active',
      hasActiveSubscription: account.hasActiveSubscription ?? false,
    })),
  ];

  yield put(workspaceActions.setWorkspaceList(workspaceItems));

  // If persisted activeWorkspaceId points to a deleted account, reset to personal
  const activeId = (yield select(selectActiveWorkspaceId)) as string;
  const stillExists = workspaceItems.some(w => w.id === activeId);
  if (!stillExists) {
    yield put(workspaceActions.switchToPersonal());
  }
}

export default function* workspaceSaga(): Generator {
  yield takeLatest(
    'tradingAccount/fetchMyAccountsSuccess',
    syncWorkspaceListSaga,
  );
}
