import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Image, Easing} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Text, useKitsTheme} from '@lmb-it/kitsconcerto';
import {useLanguage} from '@lmb-it/kitsconcerto';
import Svg, {Circle as SvgCircle} from 'react-native-svg';
import {profileActions, selectProfileLoading, selectProfileError} from '@src/modules/Profile';
import type {ProfileStackParamList} from '@src/routes/ProfileStackNavigator';

type Nav = NativeStackNavigationProp<ProfileStackParamList>;
type Route = RouteProp<ProfileStackParamList, 'WorkspaceSwitching'>;

const AVATAR_SIZE = 100;
const RING_SIZE = 120;
const RING_STROKE = 3;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle);

const WorkspaceSwitchingScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const dispatch = useDispatch();
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  const {accountIdentifier, accountName, accountAvatar} = route.params;

  // Animation values
  const spinAnim = useRef(new Animated.Value(0)).current;
  const exitScale = useRef(new Animated.Value(1)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;
  const startTime = useRef(Date.now());
  const didNavigate = useRef(false);

  // Dispatch workspace switch on mount
  useEffect(() => {
    dispatch(profileActions.switchWorkspace({workspaceRef: accountIdentifier}));
  }, [accountIdentifier, dispatch]);

  // Start spinning animation
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spinAnim]);

  // Listen for switch completion
  useEffect(() => {
    if (didNavigate.current) return;
    if (loading) return; // still switching

    // Switch completed (or errored) — ensure minimum display time then exit
    didNavigate.current = true;
    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(0, 1000 - elapsed);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(exitScale, {
          toValue: 1.15,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(exitOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.reset({index: 0, routes: [{name: 'Profile'}]});
      });
    }, remaining);
  }, [loading, error, exitScale, exitOpacity, navigation]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Avatar color from identifier (same logic as WorkspaceSwitcher)
  const colors = ['#14B8A6', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6'];
  const colorIndex = accountIdentifier.charCodeAt(0) % colors.length;
  const avatarBg = colors[colorIndex];
  const initial = (accountName || '?').charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.center,
          {
            transform: [{scale: exitScale}],
            opacity: exitOpacity,
          },
        ]}>
        {/* Spinning ring */}
        <Animated.View style={[styles.ringContainer, {transform: [{rotate: spin}]}]}>
          <Svg width={RING_SIZE} height={RING_SIZE}>
            <SvgCircle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={`${primaryColor}20`}
              strokeWidth={RING_STROKE}
              fill="none"
            />
            <SvgCircle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={primaryColor}
              strokeWidth={RING_STROKE}
              fill="none"
              strokeDasharray={`${RING_CIRCUMFERENCE * 0.3} ${RING_CIRCUMFERENCE * 0.7}`}
              strokeLinecap="round"
            />
          </Svg>
        </Animated.View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {accountAvatar ? (
            <Image source={{uri: accountAvatar}} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, {backgroundColor: avatarBg}]}>
              <Text fontSize={32} fontWeight="700" color="white">
                {initial}
              </Text>
            </View>
          )}
        </View>

        {/* Label */}
        <Text fontSize={16} color="text-subtle" mt={24}>
          {t('profile.switchingTo')}
        </Text>
        <Text fontSize={20} fontWeight="700" color="text-primary" mt={4}>
          {accountName}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  ringContainer: {
    position: 'absolute',
    top: -(RING_SIZE - AVATAR_SIZE) / 2,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkspaceSwitchingScreen;
