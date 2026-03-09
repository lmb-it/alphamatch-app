import React, {useRef, useCallback, useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
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
} from '@lmb/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, selectAuthLoading, selectAuthError, selectUser} from '@src/modules/Auth';
import {getLoginFormElements, type ILoginForm} from '../constants/loginFormElements';
import type {ILoginPayload} from '@src/modules/Auth';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import GoogleIcon from '../components/GoogleIcon';
import AppleIcon from '../components/AppleIcon';

interface LoginScreenProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({onGoogleLogin, onAppleLogin}) => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const cachedUser = useSelector(selectUser);
  const formRef = useRef<IUseFormReturn<ILoginForm>>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const isReturningUser = !!cachedUser;
  const formElements = useMemo(() => getLoginFormElements(t), [t]);

  const handleSubmit = useCallback(
    (data: ILoginForm, setIsSubmitting: (v: boolean) => void) => {
      const payload: ILoginPayload = {
        contactEmail: data.identifier,
        secret: data.password,
      };
      dispatch(authActions.login(payload));
      setIsSubmitting(false);
    },
    [dispatch],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={24} mt={80} pb={32} flexDirection="column" gap={50}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          {isReturningUser ? (
            <Heading as="h1" bold color="text-primary">
              {t('auth.welcomeBack')}{' '}
              <Heading as="h1" bold color="primary">
                {cachedUser.displayName ?? t('auth.back')}
              </Heading>
            </Heading>
          ) : (
            <Heading as="h1" bold color="text-primary">
              {t('auth.welcomeTo')}{' '}
              <Heading as="h1" bold color="primary">
                {t('auth.appName')}
              </Heading>
            </Heading>
          )}
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {isReturningUser ? t('auth.loginSubtitle') : t('auth.loginSubtitleNew')}
          </Text>
        </Flex>

        {/* Error */}
        {error && (
          <Flex
            p={12}
            flexDirection="column"
            backgroundColor="red.50"
            borderWidth={1}
            borderColor="red.200"
            borderRadius={10}>
            <Text fontSize={13} color="danger">
              {error}
            </Text>
          </Flex>
        )}

        {/* Form */}
        <Form<ILoginForm>
          ref={formRef}
          elements={formElements}
          onSubmit={handleSubmit}
          outputFormat="Json"
          submitButtonProps="none"
        />

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
        <Divider align="center">
          {t('auth.or')}
        </Divider>

        {/* Social buttons */}
        <Flex flexDirection="column" gap={12}>
          <Button
            icon={GoogleIcon}
            label="auth.continueWithGoogle"
            severity="secondary"
            outlined
            w="full"
            onClick={onGoogleLogin}
          />

          <Button
            icon={AppleIcon}
            label="auth.continueWithApple"
            severity="secondary"
            outlined
            w="full"
            onClick={onAppleLogin}
          />
        </Flex>

        {/* Terms */}
        <Text fontSize={12} textAlign="center" color="text-muted" lineHeight={18} px={8}>
          {t('auth.termsPrefix')}{' '}
          <Text fontSize={12} color="primary" fontWeight="500" lineHeight={18}>
            {t('auth.termsAndConditions')}
          </Text>
          {' '}{t('auth.and')}{' '}
          <Text fontSize={12} color="primary" fontWeight="500" lineHeight={18}>
            {t('auth.privacyPolicy')}
          </Text>
        </Text>
      </Flex>
    </AlphaLayout>
  );
};

export default LoginScreen;
