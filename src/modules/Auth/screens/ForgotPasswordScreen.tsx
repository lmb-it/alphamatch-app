import React, {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  Form,
  useLanguage,
  useDialog,
  useKitsTheme,
  type IFormElement,
  type IUseFormReturn,
} from '@lmb-it/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import authService from '../api/auth.service';
import {sendFirebaseOtp, confirmFirebaseOtp, toE164} from '../services/firebasePhoneAuth';
import {parseApiError} from '@src/services/apiError';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

interface IForgotPasswordForm {
  identifier: string;
}

interface INewPasswordForm {
  newSecret: string;
  newSecret_confirmation: string;
}

type Step = 'request' | 'verifyCode' | 'newPassword';

const EMAIL_CODE_LENGTH = 6;
const PHONE_CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const ForgotPasswordScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {toast} = useDialog();
  const requestFormRef = useRef<IUseFormReturn<IForgotPasswordForm>>(null);
  const passwordFormRef = useRef<IUseFormReturn<INewPasswordForm>>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>('request');
  const [contactInfo, setContactInfo] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [resetToken, setResetToken] = useState('');

  // OTP input state
  const codeLength = isPhone ? PHONE_CODE_LENGTH : EMAIL_CODE_LENGTH;
  const [code, setCode] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const primaryColor = resolveToken('primary');
  const borderColor = resolveToken('border');

  // Reset code array when step changes to verifyCode
  useEffect(() => {
    if (step === 'verifyCode') {
      setCode(Array(codeLength).fill(''));
      setCountdown(RESEND_COOLDOWN);
      setTimeout(() => inputRefs.current[0]?.focus(), 300);
    }
  }, [step, codeLength]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // ─── Step 1: Request form ───
  const requestElements = useMemo(
    (): IFormElement<IForgotPasswordForm>[] => [
      {
        id: 'identifier',
        type: 'Text',
        label: t('auth.emailOrPhone'),
        placeholder: t('auth.emailOrPhonePlaceholder'),
        colSpan: 12,
        schema: Yup.string().required(t('auth.emailRequired')),
      },
    ],
    [t],
  );

  // ─── Step 3: New password form ───
  const passwordElements = useMemo(
    (): IFormElement<INewPasswordForm>[] => [
      {
        id: 'newSecret',
        type: 'Password',
        label: t('auth.newPassword'),
        placeholder: t('auth.newPasswordPlaceholder'),
        colSpan: 12,
        toggleEye:true,
        schema: Yup.string()
          .required(t('auth.passwordRequired'))
          .min(6, t('auth.passwordMin6')),
      },
      {
        id: 'newSecret_confirmation',
        type: 'Password',
        label: t('auth.confirmPassword'),
        placeholder: t('auth.confirmPasswordPlaceholder'),
        colSpan: 12,
        toggleEye:true,
        schema: Yup.string()
          .required(t('auth.confirmPasswordRequired'))
          .oneOf([Yup.ref('newSecret')], t('auth.passwordsMustMatch')),
      },
    ],
    [t],
  );

  // ─── OTP input handlers ───
  const handleCodeChange = useCallback(
    (text: string, index: number) => {
      // Handle paste of full code
      if (text.length === codeLength) {
        const digits = text.split('').slice(0, codeLength);
        setCode(digits);
        inputRefs.current[codeLength - 1]?.focus();
        return;
      }

      const digit = text.slice(-1);
      const updated = [...code];
      updated[index] = digit;
      setCode(updated);

      if (digit && index < codeLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [code, codeLength],
  );

  const handleCodeKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === 'Backspace' && !code[index] && index > 0) {
        const updated = [...code];
        updated[index - 1] = '';
        setCode(updated);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [code],
  );

  const isCodeComplete = code.length === codeLength && code.every(d => d !== '');

  // ─── Handle Step 1: Request Reset ───
  const handleRequest = useCallback(
    async (data: IForgotPasswordForm, setIsSubmitting: (v: boolean) => void) => {
      setLoading(true);
      const identifier = data.identifier.trim();
      const cleaned = identifier.replace(/[\s\-()]/g, '');
      const phoneDetected = /^\+?[0-9]{8,15}$/.test(cleaned);
      setIsPhone(phoneDetected);
      setContactInfo(identifier);

      try {
        if (phoneDetected) {
          const formattedPhone = toE164(identifier);
          setContactInfo(formattedPhone);
          await sendFirebaseOtp(formattedPhone);
          toast('success', t('auth.codeSent'), t('auth.otpSentToPhone'));
          setStep('verifyCode');
        } else {
          await authService.forgotPassword({contactInfo: identifier});
          toast('success', t('auth.codeSent'), t('auth.codeSentMessage'));
          setStep('verifyCode');
        }
      } catch (err: any) {
        toast('error', parseApiError(err).message);
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    },
    [t, toast],
  );

  // ─── Handle Step 2: Verify Code ───
  const handleVerifyCode = useCallback(async () => {
    if (!isCodeComplete) return;
    setLoading(true);
    const fullCode = code.join('');

    try {
      if (isPhone) {
        const firebaseToken = await confirmFirebaseOtp(fullCode);
        setResetToken(firebaseToken);
        setStep('newPassword');
      } else {
        const res = await authService.verifyResetCode({
          contactInfo: contactInfo,
          resetCode: fullCode,
        });
        setResetToken(res.data.resetToken);
        setStep('newPassword');
      }
    } catch (err: any) {
      toast('error', parseApiError(err).message);
      setCode(Array(codeLength).fill(''));
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } finally {
      setLoading(false);
    }
  }, [isCodeComplete, code, isPhone, contactInfo, codeLength, toast]);

  // Auto-submit when all digits filled
  useEffect(() => {
    if (isCodeComplete && step === 'verifyCode') {
      handleVerifyCode();
    }
  }, [isCodeComplete, step]);

  // ─── Handle Resend ───
  const handleResend = useCallback(async () => {
    if (countdown > 0) return;
    setLoading(true);
    try {
      if (isPhone) {
        await sendFirebaseOtp(contactInfo);
      } else {
        await authService.forgotPassword({contactInfo});
      }
      setCountdown(RESEND_COOLDOWN);
      setCode(Array(codeLength).fill(''));
      toast('success', t('auth.codeSent'));
    } catch (err: any) {
      toast('error', parseApiError(err).message);
    } finally {
      setLoading(false);
    }
  }, [countdown, isPhone, contactInfo, codeLength, t, toast]);

  // ─── Handle Step 3: Set New Password ───
  const handleNewPassword = useCallback(
    async (data: INewPasswordForm, setIsSubmitting: (v: boolean) => void) => {
      setLoading(true);
      try {
        if (isPhone) {
          await authService.resetViaPhone({
            contactPhone: contactInfo,
            firebaseToken: resetToken,
            newSecret: data.newSecret,
            newSecret_confirmation: data.newSecret_confirmation,
          });
        } else {
          await authService.resetPassword({
            contactInfo: contactInfo,
            resetToken: resetToken,
            newSecret: data.newSecret,
            newSecret_confirmation: data.newSecret_confirmation,
          });
        }
        toast('success', t('auth.passwordResetSuccess'));
        navigation.navigate('Login');
      } catch (err: any) {
        toast('error', parseApiError(err).message);
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    },
    [isPhone, contactInfo, resetToken, navigation, t, toast],
  );

  const getTitle = () => {
    switch (step) {
      case 'request':
        return t('auth.forgotTitle');
      case 'verifyCode':
        return t('auth.enterCode');
      case 'newPassword':
        return t('auth.newPasswordTitle');
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case 'request':
        return t('auth.forgotSubtitle');
      case 'verifyCode':
        return isPhone
          ? (t('auth.verifyPhoneSubtitle') || '').replace('{{phone}}', contactInfo)
          : t('auth.enterCodeSubtitle');
      case 'newPassword':
        return t('auth.newPasswordSubtitle');
    }
  };

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={79} pb={32} flexDirection="column" gap={24}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          <Heading as="h2" bold color="text-primary" style={{fontSize: 24, lineHeight: 32}}>
            {getTitle()}{' '}
            <Heading as="h2" bold color="primary" style={{fontSize: 24, lineHeight: 32}}>
              {t('auth.forgotTitleAccent')}
            </Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {getSubtitle()}
          </Text>
        </Flex>

        {/* Step 1: Request */}
        {step === 'request' && (
          <>
            <Form<IForgotPasswordForm>
              ref={requestFormRef}
              elements={requestElements}
              onSubmit={handleRequest}
              outputFormat="Json"
              submitButtonProps="none"
            />
            <Button
              label="auth.sendCode"
              w="full"
              severity="brand"
              loading={loading}
              onClick={() => requestFormRef.current?.onFormSubmit()}
            />
          </>
        )}

        {/* Step 2: Verify Code — OTP-style input */}
        {step === 'verifyCode' && (
          <>
            <Flex flexDirection="row" justifyContent="space-between" gap={8}>
              {Array.from({length: codeLength}).map((_, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.codeInput,
                    {
                      borderColor: code[index] ? primaryColor : borderColor,
                      color: resolveToken('text'),
                    },
                  ]}
                  value={code[index] || ''}
                  onChangeText={text => handleCodeChange(text, index)}
                  onKeyPress={({nativeEvent}) => handleCodeKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={index === 0 ? codeLength : 1}
                  textContentType="oneTimeCode"
                  autoComplete={index === 0 ? 'sms-otp' : 'off'}
                />
              ))}
            </Flex>

            <Button
              label="auth.verifyCode"
              w="full"
              severity="brand"
              loading={loading}
              disabled={!isCodeComplete}
              onClick={handleVerifyCode}
            />

            {/* Resend */}
            <Flex justifyContent="center" alignItems="center">
              <Text fontSize={14} color="text-subtle">
                {t('auth.didntReceiveCode')}{' '}
              </Text>
              {countdown > 0 ? (
                <Text fontSize={14} color="text-subtle" fontWeight="600">
                  {t('auth.resendIn')} {countdown}{t('auth.seconds')}
                </Text>
              ) : (
                <Text fontSize={14} color="primary" fontWeight="600" onPress={handleResend}>
                    {t('auth.resendCode')}
                </Text>
              )}
            </Flex>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 'newPassword' && (
          <>
            <Form<INewPasswordForm>
              ref={passwordFormRef}
              elements={passwordElements}
              onSubmit={handleNewPassword}
              outputFormat="Json"
              submitButtonProps="none"
            />
            <Button
              label="auth.resetPassword"
              w="full"
              severity="brand"
              loading={loading}
              onClick={() => passwordFormRef.current?.onFormSubmit()}
            />
          </>
        )}

        {/* Go back to Sign In */}
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize={14} color="text-subtle">
            {t('auth.goBackTo')}{' '}
          </Text>
          <Text fontSize={14} color="primary" fontWeight="600" textDecoration="underline" onPress={() => navigation.navigate('Login')}>
              {t('auth.signIn')}
          </Text>
        </Flex>
      </Flex>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  codeInput: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default ForgotPasswordScreen;
