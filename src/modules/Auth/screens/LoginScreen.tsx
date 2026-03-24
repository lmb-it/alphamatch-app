import React, {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  Icon,
  Divider,
  Form,
  useLanguage,
  useKitsTheme,
  type IUseFormReturn,
} from '@lmb-it/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, selectAuthLoading, selectUser, selectPendingVerification} from '@src/modules/Auth';
import {useAuthErrorToast} from '@src/hooks/useErrorToast';
import {getLoginFormElements, type ILoginForm} from '../constants/loginFormElements';
import type {ILoginPayload} from '@src/modules/Auth';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import GoogleIcon from '../components/GoogleIcon';
import AppleIcon from '../components/AppleIcon';

const LoginScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const cachedUser = useSelector(selectUser);
  const pendingVerification = useSelector(selectPendingVerification);
  useAuthErrorToast();
  const formRef = useRef<IUseFormReturn<ILoginForm>>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Navigate to verification screen when saga sets pendingVerification
  useEffect(() => {
    if (pendingVerification?.context === 'emailVerification') {
      navigation.navigate('VerifyEmail', {
        email: pendingVerification.contactEmail,
      });
    }
  }, [pendingVerification, navigation]);

  const handleGoogleLogin = useCallback(() => {
    dispatch(authActions.socialLogin({providerName: 'google', providerToken: ''}));
  }, [dispatch]);

  const handleAppleLogin = useCallback(() => {
    dispatch(authActions.socialLogin({providerName: 'apple', providerToken: ''}));
  }, [dispatch]);

  const isReturningUser = !!cachedUser;
  const formElements = useMemo(() => getLoginFormElements(t), [t]);

  const handleSubmit = useCallback(
    (data: ILoginForm, setIsSubmitting: (v: boolean) => void) => {
      Keyboard.dismiss();
      const cleaned = data.identifier.replace(/[\s\-()]/g, '');
      const isPhone = /^\+?[0-9]{8,15}$/.test(cleaned);
      if (isPhone) {
        dispatch(authActions.login({
          contactPhone: data.identifier,
          secret: data.password,
        }));
      } else {
        dispatch(authActions.login({
          contactEmail: data.identifier,
          secret: data.password,
        }));
      }
      setIsSubmitting(false);
    },
    [dispatch],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={79} pb={32} flexDirection="column" gap={24}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          {isReturningUser ? (
            <Heading as="h2" bold color="text-primary" style={{ fontSize: 24, lineHeight: 32 }}>
              {t('auth.welcomeBack')}{' '}
              <Heading as="h2" bold color="primary" style={{ fontSize: 24, lineHeight: 32 }}>
                {cachedUser.displayName ?? t('auth.back')}
              </Heading>
            </Heading>
          ) : (
            <Heading as="h2" bold color="text-primary" style={{ fontSize: 24, lineHeight: 32 }}>
              {t('auth.welcomeTo')}{' '}
              <Heading as="h2" bold color="primary" style={{ fontSize: 24, lineHeight: 32 }}>
                {t('auth.appName')}
              </Heading>
            </Heading>
          )}
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {isReturningUser ? t('auth.loginSubtitle') : t('auth.loginSubtitleNew')}
          </Text>
        </Flex>

        {/* Form */}
        <Flex flexDirection="column" gap={16}>
          <Form<ILoginForm>
            ref={formRef}
            elements={formElements}
            onSubmit={handleSubmit}
            outputFormat="Json"
            submitButtonProps="none"
          />
        </Flex>

        {/* Remember me + Forgot password */}
        <Flex justifyContent="space-between" alignItems="center">
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
            style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Flex
              w={22}
              h={22}
              alignItems="center"
              justifyContent="center"
              borderRadius={11}
              borderWidth={1.5}
              borderColor={rememberMe ? resolveToken('primary') : resolveToken('gray.300')}
              backgroundColor={rememberMe ? resolveToken('primary') : 'transparent'}>
              {rememberMe && <Icon name="check" size="xs" color={resolveToken('bg')} />}
            </Flex>
            <Text fontSize={14} color="text-subtle">
              {t('auth.rememberMe')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.6}>
            <Text fontSize={14} color="primary" fontWeight="600">
              {t('auth.forgotPassword')}
            </Text>
          </TouchableOpacity>
        </Flex>

        {/* Sign In */}
        <Button
          label="auth.signIn"
          w="full"
          severity="brand"
          loading={loading}
          onClick={() => formRef.current?.onFormSubmit()}
        />

        {/* Sign Up link */}
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize={14} color="text-subtle">
            {t('auth.noAccount')}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.6}>
            <Text fontSize={14} color="primary" fontWeight="600" textDecoration="underline">
              {t('auth.signUp')}
            </Text>
          </TouchableOpacity>
        </Flex>

        {/* Divider */}
        <Flex alignItems="center" gap={5}>
          <Divider>
            {t('auth.or')}
          </Divider>
        </Flex>

        {/* Social buttons */}
        <Flex flexDirection="column" gap={16}>
          <Button
            icon={GoogleIcon}
            label="auth.continueWithGoogle"
            severity="secondary"
            outlined
            w="full"
            onClick={handleGoogleLogin}
          />

          <Button
            icon={AppleIcon}
            label="auth.continueWithApple"
            severity="secondary"
            outlined
            w="full"
            onClick={handleAppleLogin}
          />
        </Flex>

        {/* Terms */}
        <Text fontSize={12} textAlign="center" color="text-muted" lineHeight={20} px={8}>
          {t('auth.termsPrefix')}{' '}
          <Text fontSize={12} color="primary" fontWeight="500" lineHeight={20}>
            {t('auth.termsAndConditions')}
          </Text>
          {' '}{t('auth.and')}{' '}
          <Text fontSize={12} color="primary" fontWeight="500" lineHeight={20}>
            {t('auth.privacyPolicy')}
          </Text>
        </Text>
      </Flex>
    </AlphaLayout>
  );
};

export default LoginScreen;
