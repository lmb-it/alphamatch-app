import React, {useRef, useCallback, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  Divider,
  Form,
  useLanguage,
  type IUseFormReturn,
} from '@lmb/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, selectAuthLoading, selectAuthError} from '@src/modules/Auth';
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
  const error = useSelector(selectAuthError);
  const formRef = useRef<IUseFormReturn<IRegisterForm>>(null);

  const formElements = useMemo(() => getRegisterFormElements(t), [t]);

  const handleSubmit = useCallback(
    (data: IRegisterForm, setIsSubmitting: (v: boolean) => void) => {
      const payload: IRegisterPayload = {
        contactEmail: data.email,
        secret: data.password,
        secret_confirmation: data.passwordConfirmation,
      };
      dispatch(authActions.register(payload));
      setIsSubmitting(false);
    },
    [dispatch],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={24} pt={12} pb={32} flexDirection="column" gap={20}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          <Heading as="h1" bold color="text-primary">
            {t('auth.createAn')}{' '}
            <Heading as="h1" bold color="primary">
              {t('auth.account')}
            </Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {t('auth.registerSubtitle')}
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
        <Form<IRegisterForm>
          ref={formRef}
          elements={formElements}
          onSubmit={handleSubmit}
          outputFormat="Json"
          submitButtonProps="none"
        />

        {/* Sign Up button */}
        <Button
          label="auth.signUp"
          w="full"
          severity="primary"
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
          />

          <Button
            icon={AppleIcon}
            label="auth.continueWithApple"
            severity="secondary"
            outlined
            w="full"
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

export default RegisterScreen;
