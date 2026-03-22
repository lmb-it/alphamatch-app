import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ImageKey, Images} from '@src/config/demo-ui-images.ts';
import {Icon, Text, useKitsTheme} from '@lmb-it/kitsconcerto';
import Svg, {LinearGradient, Defs, Stop, Circle} from 'react-native-svg';

interface AlphaLayoutProps {
  children: React.ReactNode;
  screenKey?: ImageKey;
  title?: string;
  rightActions?: React.ReactNode;
  scrollEnabled?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  closeIcon?: boolean;
  showDecorations?: boolean;
  headerStyle?: 'transparent' | 'solid';
  fullScreen?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const AlphaLayout: React.FC<AlphaLayoutProps> = ({
  children,
  screenKey,
  title,
  rightActions,
  scrollEnabled = true,
  showBackButton,
  onBackPress,
  closeIcon = false,
  showDecorations = true,
  headerStyle = 'transparent',
  fullScreen = false,
  contentContainerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const {resolveToken} = useKitsTheme();

  const bgColor = resolveToken('bg');
  const primaryColor = resolveToken('primary');
  const textColor = resolveToken('text-primary');
  const surfaceColor = resolveToken('surface');
  const borderColor = resolveToken('border');

  const shouldShowBack = showBackButton ?? canGoBack;
  const hasSolidHeader = headerStyle === 'solid' && (!!title || !!rightActions || closeIcon);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const renderSolidHeader = () => (
    <View style={[styles.solidHeader, fullScreen && styles.floatingHeader, {backgroundColor: fullScreen ? 'transparent' : surfaceColor, borderBottomColor: fullScreen ? 'transparent' : borderColor, paddingTop: insets.top}]} pointerEvents={fullScreen ? 'box-none' : 'auto'}>
      <View style={styles.solidHeaderContent} pointerEvents={fullScreen ? 'box-none' : 'auto'}>
        {shouldShowBack ? (
          <TouchableOpacity onPress={handleBack} activeOpacity={0.6} style={styles.headerIcon}>
            <Icon name={closeIcon ? 'x' : 'arrow-left'} size={22} color={textColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerIconSpacer} />
        )}
        <Text fontSize={16} fontWeight="700" color="text-primary" style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        {rightActions ? (
          <View style={styles.headerRight}>{rightActions}</View>
        ) : (
          <View style={styles.headerIconSpacer} />
        )}
      </View>
    </View>
  );

  const renderTransparentBack = () => {
    if (!shouldShowBack || hasSolidHeader || fullScreen) return null;
    return (
      <TouchableOpacity
        onPress={handleBack}
        activeOpacity={0.6}
        style={styles.backButton}>
        <Icon name="arrow-left" size="lg" color={textColor} />
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    const needsTopPadding = !hasSolidHeader && !fullScreen;
    if (scrollEnabled) {
      return (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            needsTopPadding && {paddingTop: insets.top},
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {renderTransparentBack()}
          {children}
        </ScrollView>
      );
    }
    return (
      <View style={[styles.flex, needsTopPadding && {paddingTop: insets.top}]}>
        {renderTransparentBack()}
        {children}
      </View>
    );
  };

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

      {showDecorations && (
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
      )}

      {hasSolidHeader && !fullScreen && renderSolidHeader()}

      <KeyboardAvoidingView
        style={[styles.flex, fullScreen && StyleSheet.absoluteFillObject]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {renderContent()}
      </KeyboardAvoidingView>

      {fullScreen && hasSolidHeader && renderSolidHeader()}
      {fullScreen && !hasSolidHeader && shouldShowBack && (
        <View style={[styles.floatingBackRow, {paddingTop: insets.top}]} pointerEvents="box-none">
          <TouchableOpacity onPress={handleBack} activeOpacity={0.6} style={styles.backButton}>
            <Icon name="arrow-left" size="lg" color={textColor} />
          </TouchableOpacity>
        </View>
      )}
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
  solidHeader: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  solidHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 16,
  },
  headerIcon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconSpacer: {
    width: 36,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  floatingBackRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default AlphaLayout;
