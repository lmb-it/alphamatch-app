import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  useLanguage,
  useKitsTheme,
} from '@lmb-it/kitsconcerto';
import {useRoute, type RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, selectAuthLoading} from '@src/modules/Auth';
import {useAuthErrorToast} from '@src/hooks/useErrorToast';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {TouchableOpacity} from 'react-native';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

type VerifyEmailRoute = RouteProp<AuthStackParamList, 'VerifyEmail'>;

const VerifyEmailScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const route = useRoute<VerifyEmailRoute>();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  useAuthErrorToast();

  const {email} = route.params;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const primaryColor = resolveToken('primary');
  const borderColor = resolveToken('border');

  // Auto-focus first digit input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRefs.current[0]?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = useCallback(
    (text: string, index: number) => {
      if (text.length === CODE_LENGTH) {
        const digits = text.split('').slice(0, CODE_LENGTH);
        setCode(digits);
        inputRefs.current[CODE_LENGTH - 1]?.focus();
        return;
      }

      const digit = text.slice(-1);
      const updated = [...code];
      updated[index] = digit;
      setCode(updated);

      if (digit && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [code],
  );

  const handleKeyPress = useCallback(
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

  const handleVerify = useCallback(() => {
    const fullCode = code.join('');
    if (fullCode.length !== CODE_LENGTH) return;
    dispatch(
      authActions.verifyEmail({contactEmail: email, verificationCode: fullCode}),
    );
  }, [code, email, dispatch]);

  const handleResend = useCallback(() => {
    if (countdown > 0) return;
    dispatch(authActions.resendCode({contactEmail: email}));
    setCountdown(RESEND_COOLDOWN);
    setCode(Array(CODE_LENGTH).fill(''));
  }, [countdown, email, dispatch]);

  const isComplete = code.every(d => d !== '');

  // Auto-submit when all digits are filled (paste or SMS autofill)
  useEffect(() => {
    if (isComplete) {
      handleVerify();
    }
  }, [isComplete]);

  return (
    <AlphaLayout>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <Flex flex={1} px={22} mt={79} pb={32} flexDirection="column" gap={24}>
            <Flex flexDirection="column" gap={8}>
              <Heading
                as="h2"
                bold
                color="text-primary"
                style={{fontSize: 24, lineHeight: 32}}>
                {t('auth.verifyTitle')}{' '}
                <Heading
                  as="h2"
                  bold
                  color="primary"
                  style={{fontSize: 24, lineHeight: 32}}>
                  {t('auth.email')}
                </Heading>
              </Heading>
              <Text fontSize={14} color="text-subtle" lineHeight={20}>
                {t('auth.verifyEmailSubtitle').replace('{{email}}', email)}
              </Text>
            </Flex>

            <Flex flexDirection="row" justifyContent="center" gap={12}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.codeInput,
                    {
                      borderColor: digit ? primaryColor : borderColor,
                      color: resolveToken('text'),
                    },
                  ]}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={({nativeEvent}) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={index === 0 ? CODE_LENGTH : 1}
                  textContentType="oneTimeCode"
                  autoComplete={index === 0 ? 'sms-otp' : 'off'}
                />
              ))}
            </Flex>

            <Button
              label="auth.verify"
              w="full"
              severity="brand"
              loading={loading}
              disabled={!isComplete}
              onClick={handleVerify}
            />

            <Flex justifyContent="center" alignItems="center">
              <Text fontSize={14} color="text-subtle">
                {t('auth.didntReceiveCode')}{' '}
              </Text>
              {countdown > 0 ? (
                <Text fontSize={14} color="text-subtle" fontWeight="600">
                  {t('auth.resendIn')} {countdown}
                  {t('auth.seconds')}
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.6}>
                  <Text fontSize={14} color="primary" fontWeight="600">
                    {t('auth.resendCode')}
                  </Text>
                </TouchableOpacity>
              )}
            </Flex>
          </Flex>
        </ScrollView>
      </KeyboardAvoidingView>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
  },
});

export default VerifyEmailScreen;
