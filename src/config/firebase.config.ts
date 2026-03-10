import Config from 'react-native-config';
import {Platform} from 'react-native';

/**
 * Firebase configuration loaded from environment variables.
 * These values are set in .env / .env.local / .env.stage / .env.uat / .env.production
 * and read by react-native-config at build time.
 *
 * Note: The native Firebase SDKs (iOS/Android) initialize from
 * GoogleService-Info.plist and google-services.json respectively.
 * This config is primarily used by JS-level Firebase features and Google Sign-In.
 */
export const FIREBASE_CONFIG = {
  apiKey: Config.FIREBASE_API_KEY || '',
  projectId: Config.FIREBASE_PROJECT_ID || '',
  storageBucket: Config.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: Platform.select({
    ios: Config.FIREBASE_IOS_APP_ID || '',
    android: Config.FIREBASE_ANDROID_APP_ID || '',
  }) || '',
};

/**
 * Google Sign-In configuration.
 * The webClientId is the Firebase-generated Web Client ID used by
 * @react-native-google-signin/google-signin to request an idToken.
 */
export const GOOGLE_SIGNIN_CONFIG = {
  webClientId: Config.FIREBASE_WEB_CLIENT_ID || '',
};

/**
 * Google Maps API key for Places Autocomplete and Maps.
 */
export const GOOGLE_MAPS_CONFIG = {
  apiKey: Config.GOOGLE_MAPS_API_KEY || '',
};
