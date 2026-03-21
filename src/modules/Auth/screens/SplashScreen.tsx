import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@src/routes/AuthNavigator';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authActions} from '../store/auth.slice';
import authService from '../api/auth.service';
import {configureGoogleSignIn} from '../services/googleAuth';
import {Box} from "@lmb-it/kitsconcerto";

type SplashNav = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

const BRAND_TEAL = '#00A8B1';
const MIN_DISPLAY_MS = 2000;

const splashLogo = require('@src/assets/images/logo-white.png');

export default function SplashScreen() {
  const navigation = useNavigation<SplashNav>();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const startTime = useRef(Date.now());

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Configure Google Sign-In once on app start
    configureGoogleSignIn();

    let cancelled = false;

    const navigateAfterDelay = (screen: keyof AuthStackParamList) => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => {
        if (!cancelled) {
          // @ts-ignore
          navigation.replace(screen);
        }
      }, remaining);
    };

    (async () => {
      try {
        // 1. Check if user has chosen a language
        const savedLang = await AsyncStorage.getItem('currentLanguage');
        if (!savedLang) {
          navigateAfterDelay('LanguageSelection');
          return;
        }

        // 2. Check if there's a stored auth token
        const authToken = await AsyncStorage.getItem('auth_token');
        if (!authToken) {
          navigateAfterDelay('Login');
          return;
        }

        // 3. Token exists — try to restore session via /me
        const res = await authService.me();
        if (cancelled) return;

        // Session valid — update Redux, Routes will switch to CustomerNavigator
        dispatch(authActions.loginSuccess({user: res.data, token: authToken}));
      } catch (_e) {
        if (cancelled) return;
        // Token invalid/expired — clear it and go to Login
        await AsyncStorage.removeItem('auth_token');
        dispatch(authActions.fetchMeFailure());
        navigateAfterDelay('Login');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Box entering={'fadeInUp'} animationDuration={1000} style={styles.imageWrapper}>
        <Image
          source={splashLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_TEAL,
  },
  imageWrapper: {
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 300,
    tintColor: '#FFFFFF',
  },
});
