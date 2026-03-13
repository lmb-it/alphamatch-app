/**
 * Step access guard for the Trading Account creation flow.
 *
 * Determines the furthest step the user can access based on the current
 * Redux state (createdAccount, aiResult, basicInfo, etc.).
 * Screens call `canAccess(routeName)` — if false they should redirect
 * back to the earliest valid screen.
 */
import {useSelector} from 'react-redux';
import {
  selectBasicInfo,
  selectAIResult,
  selectCreatedAccount,
  selectSelectedCareerRef,
} from '../store/tradingAccount.selectors';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';

/** Ordered list of route names in the creation flow. */
const STEP_ORDER: (keyof TradingAccountCreationParamList)[] = [
  'TAIntro',
  'TABasicInfo',
  'TAInput',
  'TACareerSelection',
  'TACareerConfirmation',
  'TAMissingQuestions',
  'TAConfirmation',
  'TAProConfirmation',
  'TAVerification',
  'TADocumentForm',
  'TAFlexActivation',
  'TACompletion',
];

/**
 * Returns the furthest step index the user can currently reach.
 * Everything at or below this index is accessible.
 */
function computeMaxReachable(state: {
  hasBasicInfo: boolean;
  hasAiResultOrCareer: boolean;
  hasCreatedAccount: boolean;
  setupStatus: string | null;
  careerModel: string | null;
}): number {
  // TAIntro is always accessible
  let max = 0; // TAIntro

  if (!state.hasBasicInfo) return max;
  max = 1; // TABasicInfo done → can reach TAInput

  if (!state.hasAiResultOrCareer) return max + 1; // TAInput
  max = 4; // TACareerConfirmation

  if (!state.hasCreatedAccount) return max + 1; // TAMissingQuestions
  max = 6; // TAConfirmation

  // Past TAConfirmation, routing depends on career model
  if (state.careerModel === 'pro') {
    max = 9; // TADocumentForm
  } else {
    max = 10; // TAFlexActivation
  }

  // TACompletion always accessible once an account exists
  max = STEP_ORDER.length - 1;
  return max;
}

export function useStepGuard() {
  const basicInfo = useSelector(selectBasicInfo);
  const aiResult = useSelector(selectAIResult);
  const selectedCareerRef = useSelector(selectSelectedCareerRef);
  const createdAccount = useSelector(selectCreatedAccount);

  const maxReachable = computeMaxReachable({
    hasBasicInfo: !!basicInfo,
    hasAiResultOrCareer: !!(aiResult || selectedCareerRef),
    hasCreatedAccount: !!createdAccount,
    setupStatus: createdAccount?.setupStatus ?? null,
    careerModel: createdAccount?.careerModel ?? null,
  });

  /**
   * Check if a specific route is accessible.
   * Returns true if the user has completed prerequisite steps.
   */
  function canAccess(routeName: keyof TradingAccountCreationParamList): boolean {
    const idx = STEP_ORDER.indexOf(routeName);
    if (idx === -1) return true; // Unknown route — allow
    return idx <= maxReachable;
  }

  /**
   * Returns the route name of the furthest step the user should be on.
   * Useful for redirecting when they try to access a step they haven't reached.
   */
  function getFurthestRoute(): keyof TradingAccountCreationParamList {
    return STEP_ORDER[Math.min(maxReachable, STEP_ORDER.length - 1)];
  }

  return {canAccess, getFurthestRoute, maxReachable};
}
