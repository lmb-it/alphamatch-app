/**
 * Google Sign-In service
 *
 * Wraps @react-native-google-signin/google-signin to obtain an ID token
 * that the backend can verify via Google's public certificates.
 */
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

/**
 * Must be called once before any sign-in attempt (e.g. in App.tsx or SplashScreen).
 */
export function configureGoogleSignIn() {
  GoogleSignin.configure({
    // Do NOT set iosClientId here — the SDK reads it automatically from
    // GoogleService-Info.plist (CLIENT_ID key). Setting a Web-type ID here
    // causes "Custom scheme URIs are not allowed for 'WEB' client type".
    webClientId: Config.FIREBASE_WEB_CLIENT_ID,
    offlineAccess: true,
  });
}

/**
 * Triggers the native Google Sign-In flow and returns the ID token.
 * Throws if the user cancels or an error occurs.
 */
export async function signInWithGoogle(): Promise<string> {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  const response = await GoogleSignin.signIn();

  if (!isSuccessResponse(response)) {
    throw new Error('Google sign-in was cancelled');
  }

  const idToken = response.data.idToken;
  if (!idToken) {
    throw new Error('Failed to obtain Google ID token');
  }

  return idToken;
}

/**
 * Signs the user out of Google (clears cached credentials).
 */
export async function signOutGoogle(): Promise<void> {
  try {
    await GoogleSignin.signOut();
  } catch (_e) {
    // Ignore — user may not be signed in
  }
}
