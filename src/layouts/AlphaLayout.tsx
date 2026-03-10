import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ImageKey, Images} from '@src/config/demo-ui-images.ts';
import {Icon, useKitsTheme} from '@lmb/kitsconcerto';
import Svg, { LinearGradient, Defs, Stop, Circle } from 'react-native-svg';

interface AlphaLayoutProps {
  children: React.ReactNode;
  screenKey?: ImageKey;
}

const AlphaLayout: React.FC<AlphaLayoutProps> = ({children, screenKey}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const {resolveToken} = useKitsTheme();

  const bgColor = resolveToken('bg');
  const primaryColor = resolveToken('primary');
  const textColor = resolveToken('text-primary');

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      {!!screenKey && (
        <ImageBackground
          source={Images[screenKey]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: '100%',
            height: '100%',
            marginTop: 40,
          }}
          resizeMode="contain"
        />
      )}

      {/* Decorative Circles SVG Background */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 375 812" preserveAspectRatio="xMinYMin slice">
          <Defs>
            <LinearGradient id="paint0" x1="133.948" y1="-89.9495" x2="133.948" y2="196.609" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={primaryColor} stopOpacity="0.2"/>
              <Stop offset="1" stopColor={primaryColor} stopOpacity="0"/>
            </LinearGradient>
            <LinearGradient id="paint1" x1="346.686" y1="-113.354" x2="346.686" y2="97.9901" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={primaryColor} stopOpacity="0.2"/>
              <Stop offset="1" stopColor={primaryColor} stopOpacity="0"/>
            </LinearGradient>
            <LinearGradient id="paint2" x1="-73.0929" y1="49.1999" x2="-73.0929" y2="235.217" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={primaryColor} stopOpacity="0.2"/>
              <Stop offset="1" stopColor={primaryColor} stopOpacity="0"/>
            </LinearGradient>
          </Defs>
          <Circle cx="133.948" cy="53.3299" r="143.279" transform="rotate(-10.6299 133.948 53.3299)" fill="url(#paint0)" fillOpacity="0.8"/>
          <Circle cx="346.686" cy="-7.682" r="105.672" transform="rotate(-99.6464 346.686 -7.682)" fill="url(#paint1)" fillOpacity="0.8"/>
          <Circle cx="-73.0929" cy="142.209" r="93.0087" transform="rotate(76.2714 -73.0929 142.209)" fill="url(#paint2)" fillOpacity="0.8"/>
        </Svg>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: insets.top},
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {canGoBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.6}
              style={styles.backButton}>
              <Icon name="arrow-left" size="lg" color={textColor} />
            </TouchableOpacity>
          )}
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 24,
    marginBottom: 4,
  },
});

export default AlphaLayout;
