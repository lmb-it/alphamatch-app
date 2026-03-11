import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
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
const RESEND_COOLDOWN = 60; // seconds

type VerifyOTPRoute = RouteProp<AuthStackParamList, 'VerifyOTP'>;

const VerifyOTPScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const route = useRoute<VerifyOTPRoute>();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  useAuthErrorToast();

  const {phone, context} = route.params;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const primaryColor = resolveToken('primary');
  const borderColor = resolveToken('border');

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = useCallback(
    (text: string, index: number) => {
      // Handle paste of full code
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
    dispatch(authActions.verifyOtp({phone, code: fullCode, context}));
  }, [code, phone, context, dispatch]);

  const handleResend = useCallback(() => {
    if (countdown > 0) return;
    dispatch(authActions.sendOtp({phone, context}));
    setCountdown(RESEND_COOLDOWN);
  }, [countdown, phone, context, dispatch]);

  const isComplete = code.every(d => d !== '');

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={79} pb={32} flexDirection="column" gap={24}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          <Heading as="h2" bold color="text-primary" style={{fontSize: 24, lineHeight: 32}}>
            {t('auth.verifyTitle')}{' '}
            <Heading as="h2" bold color="primary" style={{fontSize: 24, lineHeight: 32}}>
              {t('auth.verifyTitleAccent')}
            </Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {t('auth.verifyPhoneSubtitle').replace('{{phone}}', phone)}
          </Text>
        </Flex>

        {/* Code inputs */}
        <Flex flexDirection="row" justifyContent="space-between" gap={8}>
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
              onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={index === 0 ? CODE_LENGTH : 1}
              textContentType="oneTimeCode"
              autoComplete={index === 0 ? 'sms-otp' : 'off'}
            />
          ))}
        </Flex>

        {/* Verify button */}
        <Button
          label="auth.verify"
          w="full"
          severity="brand"
          loading={loading}
          disabled={!isComplete}
          onClick={handleVerify}
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
            <TouchableOpacity onPress={handleResend} activeOpacity={0.6}>
              <Text fontSize={14} color="primary" fontWeight="600">
                {t('auth.resendCode')}
              </Text>
            </TouchableOpacity>
          )}
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

export default VerifyOTPScreen;
