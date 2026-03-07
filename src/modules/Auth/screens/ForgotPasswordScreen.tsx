import React, {useRef, useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  VStack,
  Form,
  type IFormElement,
  type IUseFormReturn,
} from '@lmb/kitsconcerto';
import * as Yup from 'yup';
import authService from '../api/auth.service';

interface IForgotPasswordForm {
  email: string;
}

interface ForgotPasswordScreenProps {
  onNavigateLogin?: () => void;
  onGoBack?: () => void;
}

const forgotPasswordElements: IFormElement<IForgotPasswordForm>[] = [
  {
    id: 'email',
    type: 'Text',
    label: 'Email or Phone',
    placeholder: 'Enter your email or phone',
    colSpan: 12,
    schema: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email'),
  },
];

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onNavigateLogin,
  onGoBack,
}) => {
  const formRef = useRef<IUseFormReturn<IForgotPasswordForm>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (
      data: IForgotPasswordForm,
      setIsSubmitting: (v: boolean) => void,
    ) => {
      setLoading(true);
      setError(null);
      try {
        await authService.forgotPassword(data.email);
        Alert.alert(
          'Code Sent',
          'A password reset code has been sent to your email.',
        );
      } catch (err: any) {
        const message =
          err?.response?.data?.message || 'Something went wrong. Please try again.';
        setError(message);
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    },
    [],
  );

  return (
    <Box w="full" h="full" bg="white" p="1.5rem" pt="3rem">
      <VStack space="lg" w="full">
        {/* Header */}
        <Box mb="0.5rem">
          <Flex flexDirection="row" gap="0.4rem" mb="0.5rem">
            <Heading as="h3" fontWeight="800">
              Forgot
            </Heading>
            <Heading as="h3" fontWeight="800" fontColor="primary">
              Password?
            </Heading>
          </Flex>
          <Text fontSize="sm" fontColor="secondary">
            Don't worry! Enter your email or phone to reset your password and
            access your account.
          </Text>
        </Box>

        {/* Error message */}
        {error && (
          <Box
            bg="red.50"
            p="0.75rem"
            borderRadius="8px"
            border="1px solid"
            borderColor="danger">
            <Text fontSize="sm" fontColor="danger">
              {error}
            </Text>
          </Box>
        )}

        {/* Form */}
        <Form<IForgotPasswordForm>
          ref={formRef}
          elements={forgotPasswordElements}
          onSubmit={handleSubmit}
          outputFormat="Json"
          submitButtonProps="none"
        />

        {/* Send Code button */}
        <Button
          label="Send Code"
          w="full"
          rounded
          loading={loading}
          onPress={() => formRef.current?.onFormSubmit()}
        />

        {/* Go back to Sign In */}
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="0.25rem">
          <Text fontSize="sm" fontColor="secondary">
            Go back to
          </Text>
          <Text fontSize="sm" fontColor="primary" bold onPress={onNavigateLogin}>
            Sign In
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ForgotPasswordScreen;
