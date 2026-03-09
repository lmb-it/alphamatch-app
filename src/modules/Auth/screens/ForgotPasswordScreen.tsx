import React, {useRef, useCallback, useMemo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  Form,
  useLanguage,
  type IFormElement,
  type IUseFormReturn,
} from '@lmb/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import authService from '../api/auth.service';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

interface IForgotPasswordForm {
  email: string;
}

const ForgotPasswordScreen: React.FC = () => {
  const {t} = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const formRef = useRef<IUseFormReturn<IForgotPasswordForm>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formElements = useMemo(
    (): IFormElement<IForgotPasswordForm>[] => [
      {
        id: 'email',
        type: 'Text',
        label: t('auth.emailOrPhone'),
        placeholder: t('auth.emailOrPhonePlaceholder'),
        colSpan: 12,
        schema: Yup.string()
          .required(t('auth.emailRequired'))
          .email(t('auth.emailInvalid')),
      },
    ],
    [t],
  );

  const handleSubmit = useCallback(
    async (
      data: IForgotPasswordForm,
      setIsSubmitting: (v: boolean) => void,
    ) => {
      setLoading(true);
      setError(null);
      try {
        await authService.forgotPassword(data.email);
        Alert.alert(t('auth.codeSent'), t('auth.codeSentMessage'));
      } catch (err: any) {
        const message =
          err?.response?.data?.message || t('auth.genericError');
        setError(message);
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    },
    [t],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={24} pt={12} pb={32} flexDirection="column" gap={20}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          <Heading as="h1" bold color="text-primary">
            {t('auth.forgotTitle')}{' '}
            <Heading as="h1" bold color="primary">
              {t('auth.forgotTitleAccent')}
            </Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {t('auth.forgotSubtitle')}
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
        <Form<IForgotPasswordForm>
          ref={formRef}
          elements={formElements}
          onSubmit={handleSubmit}
          outputFormat="Json"
          submitButtonProps="none"
        />

        {/* Send Code button */}
        <Button
          label="auth.sendCode"
          w="full"
          severity="primary"
          loading={loading}
          onClick={() => formRef.current?.onFormSubmit()}
        />

        {/* Go back to Sign In */}
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize={14} color="text-subtle">
            {t('auth.goBackTo')}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.6}>
            <Text fontSize={14} color="primary" fontWeight="600" textDecoration="underline">
              {t('auth.signIn')}
            </Text>
          </TouchableOpacity>
        </Flex>
      </Flex>
    </AlphaLayout>
  );
};

export default ForgotPasswordScreen;
