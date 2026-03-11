/**
 * Firebase Phone Auth — wraps @react-native-firebase/auth for OTP flow.
 *
 * Flow:
 *   1. signInWithPhoneNumber(phone) → Firebase sends SMS, returns confirmation
 *   2. confirmation.confirm(code)   → verifies code, returns Firebase user
 *   3. user.getIdToken()            → returns Firebase ID token for backend
 */
import auth, {type FirebaseAuthTypes} from '@react-native-firebase/auth';

let _confirmation: FirebaseAuthTypes.ConfirmationResult | null = null;

/**
 * Initiate Firebase phone sign-in — sends SMS to the phone number.
 * Stores the confirmation result for later verification.
 */
export async function sendFirebaseOtp(phone: string): Promise<void> {
  _confirmation = await auth().signInWithPhoneNumber(phone);
}

/**
 * Confirm the SMS code the user entered.
 * Returns the Firebase ID token to send to our backend.
 */
export async function confirmFirebaseOtp(code: string): Promise<string> {
  if (!_confirmation) {
    throw new Error('No pending OTP confirmation. Call sendFirebaseOtp first.');
  }

  const credential = await _confirmation.confirm(code);

  if (!credential?.user) {
    throw new Error('Firebase phone verification failed');
  }

  const idToken = await credential.user.getIdToken();
  if (!idToken) {
    throw new Error('Failed to get Firebase ID token');
  }

  _confirmation = null;
  return idToken;
}

/**
 * Clear any pending confirmation (e.g. on screen unmount).
 */
export function clearConfirmation(): void {
  _confirmation = null;
}
