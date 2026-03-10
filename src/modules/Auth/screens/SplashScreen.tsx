import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@src/routes/AuthNavigator';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authActions} from '../store/auth.slice';
import authService from '../api/auth.service';
import {configureGoogleSignIn} from '../services/googleAuth';
import Svg, {Path, G} from 'react-native-svg';

type SplashNav = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

const BRAND_TEAL = '#20AAB0';
const MIN_DISPLAY_MS = 2000;

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
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 375 812" preserveAspectRatio="xMidYMid slice">
          <Path
            d="M-50 0 Q50 100 200 60 Q350 20 400 100 L400 0 Z"
            fill="rgba(255,255,255,0.08)"
          />
          <Path
            d="M-20 650 Q100 600 200 650 Q300 700 420 620 L420 812 L-20 812 Z"
            fill="rgba(255,255,255,0.06)"
          />
        </Svg>
      </View>

      <Animated.View style={[styles.center, {opacity: fadeAnim}]}>
        <Svg width={120} height={80} viewBox="0 0 120 80">
          <G>
            <Path
              d="M30 55 L50 25 L60 40 L70 25 L90 55"
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M40 55 L50 38 L60 50 L70 38 L80 55"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </G>
        </Svg>
        <Animated.Text style={styles.title}>AlphaMatch</Animated.Text>
        <Animated.Text style={styles.tagline}>
          ONE STOP JOB MATCHING SOLUTION
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_TEAL,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    letterSpacing: 2,
  },
});
