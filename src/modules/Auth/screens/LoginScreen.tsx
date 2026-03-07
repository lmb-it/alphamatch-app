import React, {useRef, useCallback} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../store/auth.slice';
import {selectAuthLoading, selectAuthError} from '../store/auth.selectors';
import type {ILoginPayload} from '../models/auth.types';

interface ILoginForm {
  email: string;
  password: string;
}

interface LoginScreenProps {
  onNavigateRegister?: () => void;
  onNavigateForgotPassword?: () => void;
  onGoBack?: () => void;
}

const loginElements: IFormElement<ILoginForm>[] = [
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
  {
    id: 'password',
    type: 'Password',
    label: 'Password',
    placeholder: 'Enter your password',
    colSpan: 12,
    schema: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  },
];

const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateRegister,
  onNavigateForgotPassword,
  onGoBack,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const formRef = useRef<IUseFormReturn<ILoginForm>>(null);

  const handleSubmit = useCallback(
    (data: ILoginForm, setIsSubmitting: (v: boolean) => void) => {
      const payload: ILoginPayload = {
        email: data.email,
        password: data.password,
      };
      dispatch(authActions.login(payload));
      setIsSubmitting(false);
    },
    [dispatch],
  );

  return (
    <Box w="full" h="full" bg="white" p="1.5rem" pt="3rem">
      <VStack space="lg" w="full">
        {/* Header */}
        <Box mb="0.5rem">
          <Flex flexDirection="row" gap="0.4rem" mb="0.5rem">
            <Heading as="h3" fontWeight="800">
              Welcome
            </Heading>
            <Heading as="h3" fontWeight="800" fontColor="primary">
              Back!
            </Heading>
          </Flex>
          <Text fontSize="sm" fontColor="secondary">
            Welcome back! Log in to access your account and continue where you
            left off.
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

        {/* Login form */}
        <Form<ILoginForm>
          ref={formRef}
          elements={loginElements}
          onSubmit={handleSubmit}
          outputFormat="Json"
          submitButtonProps="none"
        />

        {/* Remember me + Forgot password row */}
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt="-0.5rem">
          <Text fontSize="sm" fontColor="secondary">
            Remember me
          </Text>
          <Text
            fontSize="sm"
            fontColor="primary"
            bold
            onPress={onNavigateForgotPassword}>
            Forgot Password
          </Text>
        </Flex>

        {/* Sign In button */}
        <Button
          label="Sign In"
          w="full"
          rounded
          loading={loading}
          onPress={() => formRef.current?.onFormSubmit()}
        />

        {/* Sign Up link */}
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="0.25rem">
          <Text fontSize="sm" fontColor="secondary">
            Don't have an account?
          </Text>
          <Text fontSize="sm" fontColor="primary" bold onPress={onNavigateRegister}>
            Sign Up
          </Text>
        </Flex>

        {/* Divider */}
        <Flex flexDirection="row" alignItems="center" gap="0.75rem">
          <Box flex={1} h="1px" bg="gray.200" />
          <Text fontSize="sm" fontColor="secondary">
            or
          </Text>
          <Box flex={1} h="1px" bg="gray.200" />
        </Flex>

        {/* Google button */}
        <Button
          label="Continue with Google"
          w="full"
          rounded
          outlined
          severity="secondary"
        />

        {/* Terms */}
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          gap="0.2rem">
          <Text fontSize="xs" fontColor="secondary">
            By continuing, I agree to the
          </Text>
          <Text fontSize="xs" fontColor="primary" bold>
            Terms & Conditions
          </Text>
          <Text fontSize="xs" fontColor="secondary">
            and
          </Text>
          <Text fontSize="xs" fontColor="primary" bold>
            Privacy Policy.
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
