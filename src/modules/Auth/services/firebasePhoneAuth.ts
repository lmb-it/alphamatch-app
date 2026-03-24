/**
 * Firebase Phone Auth — wraps @react-native-firebase/auth for OTP flow.
 *
 * Flow:
 *   1. signInWithPhoneNumber(phone) → Firebase sends SMS, returns confirmation
 *   2. confirmation.confirm(code)   → verifies code, returns Firebase user
 *   3. user.getIdToken()            → returns Firebase ID token for backend
 *
 * Uses the NAMESPACED API (auth()) — more reliable than the modular getAuth()
 * wrapper for phone auth on react-native-firebase v23.
 */
import auth, {type FirebaseAuthTypes} from '@react-native-firebase/auth';

let _confirmation: FirebaseAuthTypes.ConfirmationResult | null = null;

/**
 * Ensure phone number is in E.164 format (e.g. +61412345678).
 * Firebase requires E.164 — calls will fail with [auth/internal-error] without it.
 */
export function toE164(phone: string): string {
  // Remove everything except digits and +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // If already in E.164 format
  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  // Remove any accidental leading +
  cleaned = cleaned.replace(/^\+/, '');

  // If starts with country code already (61...)
  if (cleaned.startsWith('61')) {
    return `+${cleaned}`;
  }

  // If local Australian number (starts with 0)
  if (cleaned.startsWith('0')) {
    return `+61${cleaned.slice(1)}`; // remove leading 0
  }

  // Fallback: assume missing country code
  return `+61${cleaned}`;
}

/**
 * Initiate Firebase phone sign-in — sends SMS to the phone number.
 * Stores the confirmation result for later verification.
 */
export async function sendFirebaseOtp(phone: string): Promise<void> {
  const formattedPhone = toE164(phone);

  if (__DEV__) {
    console.log('[FirebasePhoneAuth] Calling signInWithPhoneNumber:', formattedPhone);
  }

  _confirmation = await auth().signInWithPhoneNumber(formattedPhone);
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

/**
 * Sign out of Firebase Auth — must be called on app logout
 * to clear any cached Firebase session (phone, Google, Apple).
 */
export async function signOutFirebase(): Promise<void> {
  try {
    await auth().signOut();
  } catch (_e) {
    // Ignore — user may not have a Firebase session
  }
  _confirmation = null;
}
