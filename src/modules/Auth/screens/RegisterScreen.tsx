import React, {useRef, useCallback, useMemo, useEffect} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  Divider,
  Form,
  useLanguage,
  type IUseFormReturn,
} from '@lmb-it/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, selectAuthLoading, selectPendingVerification} from '@src/modules/Auth';
import {useAuthErrorToast} from '@src/hooks/useErrorToast';
import {
  getRegisterFormElements,
  type IRegisterForm,
} from '../constants/registerFormElements';
import type {IRegisterPayload} from '../models/auth.types';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import GoogleIcon from '../components/GoogleIcon';
import AppleIcon from '../components/AppleIcon';

const RegisterScreen: React.FC = () => {
  const {t} = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const pendingVerification = useSelector(selectPendingVerification);
  const formRef = useRef<IUseFormReturn<IRegisterForm>>(null);
  useAuthErrorToast();

  // Navigate to verification screen when saga sets pendingVerification
  useEffect(() => {
    if (pendingVerification?.context === 'phoneVerification') {
      navigation.navigate('VerifyOTP', {
        phone: pendingVerification.contactEmail,
        context: 'register',
      });
    } else if (pendingVerification?.context === 'emailVerification') {
      navigation.navigate('VerifyEmail', {
        email: pendingVerification.contactEmail,
      });
    }
  }, [pendingVerification, navigation]);

  const formElements = useMemo(() => getRegisterFormElements(t), [t]);

  const handleGoogleLogin = useCallback(() => {
    dispatch(authActions.socialLogin({providerName: 'google', providerToken: ''}));
  }, [dispatch]);

  const handleAppleLogin = useCallback(() => {
    dispatch(authActions.socialLogin({providerName: 'apple', providerToken: ''}));
  }, [dispatch]);

  const handleSubmit = useCallback(
    (data: IRegisterForm, setIsSubmitting: (v: boolean) => void) => {
      Keyboard.dismiss();
      const cleaned = data.email.replace(/[\s\-()]/g, '');
      const isPhone = /^\+?[0-9]{8,15}$/.test(cleaned);
      if (isPhone) {
        dispatch(authActions.sendOtp({phone: data.email, context: 'register'}));
      } else {
        const payload: IRegisterPayload = {
          contactEmail: data.email,
          secret: data.password,
          secret_confirmation: data.passwordConfirmation,
        };
        dispatch(authActions.register(payload));
      }
      setIsSubmitting(false);
    },
    [dispatch, navigation],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={79} pb={32} flexDirection="column" gap={24}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          <Heading as="h2" bold color="text-primary" style={{ fontSize: 24, lineHeight: 32 }}>
            {t('auth.createAn')}{' '}
            <Heading as="h2" bold color="primary" style={{ fontSize: 24, lineHeight: 32 }}>
              {t('auth.account')}
            </Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {t('auth.registerSubtitle')}
          </Text>
        </Flex>

        {/* Form */}
        <Flex flexDirection="column" gap={16}>
          <Form<IRegisterForm>
            ref={formRef}
            elements={formElements}
            onSubmit={handleSubmit}
            outputFormat="Json"
            submitButtonProps="none"
          />
        </Flex>

        {/* Sign Up button */}
        <Button
          label="auth.signUp"
          w="full"
          severity="brand"
          loading={loading}
          onClick={() => formRef.current?.onFormSubmit()}
        />

        {/* Sign In link */}
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize={14} color="text-subtle">
            {t('auth.hasAccount')}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.6}>
            <Text fontSize={14} color="primary" fontWeight="600" textDecoration="underline">
              {t('auth.signIn')}
            </Text>
          </TouchableOpacity>
        </Flex>

        {/* Divider */}
        <Flex alignItems="center" gap={5}>
          <Flex flex={1} h={1} backgroundColor="border-default" />
          <Text fontSize={16} lineHeight={24} color="text-muted">
            {t('auth.or')}
          </Text>
          <Flex flex={1} h={1} backgroundColor="border-default" />
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

export default RegisterScreen;
