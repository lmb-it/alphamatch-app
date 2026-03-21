/**
 * Apple Sign-In service (structure only)
 *
 * Uses @invertase/react-native-apple-authentication.
 * Apple Sign-In is iOS-only and requires the "Sign in with Apple" entitlement.
 *
 * iOS setup required:
 *   1. Enable "Sign in with Apple" capability in Xcode
 *   2. Add to ios/<App>.entitlements:
 *      <key>com.apple.developer.applesignin</key>
 *      <array><string>Default</string></array>
 *
 * Backend setup required:
 *   - Verify Apple identity token via Apple's JWKS endpoint
 *   - Extract `sub` (Apple user ID) and `email` from the decoded JWT
 */
import {Platform} from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';

/**
 * Returns true if Apple Sign-In is available on this device (iOS 13+).
 */
export function isAppleSignInAvailable(): boolean {
  return Platform.OS === 'ios' && appleAuth.isSupported;
}

/**
 * Triggers the native Apple Sign-In flow and returns the identity token.
 * Throws if the user cancels or an error occurs.
 */
export async function signInWithApple(): Promise<string> {
  if (!isAppleSignInAvailable()) {
    throw new Error('Apple Sign-In is not available on this device');
  }

  const credential = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [
      appleAuth.Scope.EMAIL,
      appleAuth.Scope.FULL_NAME,
    ],
  });

  const credentialState = await appleAuth.getCredentialStateForUser(
    credential.user,
  );

  if (credentialState !== appleAuth.State.AUTHORIZED) {
    throw new Error('Apple Sign-In authorization failed');
  }

  const identityToken = credential.identityToken;
  if (!identityToken) {
    throw new Error('Failed to obtain Apple identity token');
  }

  return identityToken;
}
