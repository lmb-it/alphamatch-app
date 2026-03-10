declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL: string;
    GOOGLE_AUTH_CLIENT_ID: string;
    APPLE_AUTH_CLIENT_ID: string;
    GOOGLE_MAPS_API_KEY: string;
    FIREBASE_API_KEY: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_IOS_APP_ID: string;
    FIREBASE_ANDROID_APP_ID: string;
    FIREBASE_WEB_CLIENT_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
