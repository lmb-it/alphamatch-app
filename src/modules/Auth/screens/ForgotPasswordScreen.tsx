import React, {useRef, useCallback, useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  Form,
  useLanguage,
  useDialog,
  type IFormElement,
  type IUseFormReturn,
} from '@lmb/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import authService from '../api/auth.service';
import {parseApiError} from '@src/services/apiError';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

interface IForgotPasswordForm {
  email: string;
}

const ForgotPasswordScreen: React.FC = () => {
  const {t} = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {toast} = useDialog();
  const formRef = useRef<IUseFormReturn<IForgotPasswordForm>>(null);
  const [loading, setLoading] = useState(false);

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
      try {
        await authService.forgotPassword({contactInfo: data.email});
        toast('success', t('auth.codeSent'), t('auth.codeSentMessage'));
      } catch (err: any) {
        toast('error', parseApiError(err).message);
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    },
    [t],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={79} pb={32} flexDirection="column" gap={24}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          <Heading as="h2" bold color="text-primary" style={{ fontSize: 24, lineHeight: 32 }}>
            {t('auth.forgotTitle')}{' '}
            <Heading as="h2" bold color="primary" style={{ fontSize: 24, lineHeight: 32 }}>
              {t('auth.forgotTitleAccent')}
            </Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {t('auth.forgotSubtitle')}
          </Text>
        </Flex>

        {/* Form */}
        <Flex flexDirection="column" gap={16}>
          <Form<IForgotPasswordForm>
            ref={formRef}
            elements={formElements}
            onSubmit={handleSubmit}
            outputFormat="Json"
            submitButtonProps="none"
          />
        </Flex>

        {/* Send Code button */}
        <Button
          label="auth.sendCode"
          w="full"
          severity="brand"
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
