import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectProfileUser} from '@src/modules/Profile';

export type MissingProfileField = 'displayName' | 'familyName' | 'contactEmail' | 'contactPhone';

export interface IProfileCompletionResult {
  isComplete: boolean;
  missingFields: MissingProfileField[];
}

/**
 * Checks whether the user's personal profile has the minimum required fields
 * before entering the Trading Account creation flow.
 *
 * Required:
 * - displayName (first name) — not empty
 * - familyName (last name) — not empty
 * - contactEmail OR contactPhone — at least one must exist
 */
export function useProfileCompletionCheck(): IProfileCompletionResult {
  const user = useSelector(selectProfileUser);

  return useMemo(() => {
    const missing: MissingProfileField[] = [];

    if (!user?.displayName?.trim()) {
      missing.push('displayName');
    }
    if (!user?.familyName?.trim()) {
      missing.push('familyName');
    }

    const hasEmail = !!user?.contactEmail?.trim();
    const hasPhone = !!user?.contactPhone?.trim();

    if (!hasEmail && !hasPhone) {
      // Show both fields so user can fill at least one
      missing.push('contactEmail');
      missing.push('contactPhone');
    }

    return {isComplete: missing.length === 0, missingFields: missing};
  }, [user]);
}
