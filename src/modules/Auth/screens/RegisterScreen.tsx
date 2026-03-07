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
import type {IRegisterPayload} from '../models/auth.types';

interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface RegisterScreenProps {
  userType?: 'customer' | 'worker';
  onNavigateLogin?: () => void;
  onClose?: () => void;
}

const registerElements: IFormElement<IRegisterForm>[] = [
  {
    id: 'firstName',
    type: 'Text',
    label: 'First Name',
    placeholder: 'Enter your first name',
    colSpan: 6,
    schema: Yup.string().required('First name is required'),
  },
  {
    id: 'lastName',
    type: 'Text',
    label: 'Last Name',
    placeholder: 'Enter your last name',
    colSpan: 6,
    schema: Yup.string().required('Last name is required'),
  },
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
      .min(8, 'Password must be at least 8 characters'),
  },
  {
    id: 'passwordConfirmation',
    type: 'Password',
    label: 'Confirm Password',
    placeholder: 'Re-enter password',
    colSpan: 12,
    schema: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  },
];

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  userType = 'customer',
  onNavigateLogin,
  onClose,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const formRef = useRef<IUseFormReturn<IRegisterForm>>(null);

  const handleSubmit = useCallback(
    (data: IRegisterForm, setIsSubmitting: (v: boolean) => void) => {
      const payload: IRegisterPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        userType,
      };
      dispatch(authActions.register(payload));
      setIsSubmitting(false);
    },
    [dispatch, userType],
  );

  return (
    <Box w="full" h="full" bg="white" p="1.5rem" pt="3rem">
      <VStack space="lg" w="full">
        {/* Header */}
        <Box mb="0.5rem">
          <Flex flexDirection="row" gap="0.4rem" mb="0.5rem">
            <Heading as="h3" fontWeight="800">
              Create An
            </Heading>
            <Heading as="h3" fontWeight="800" fontColor="primary">
              Account!
            </Heading>
          </Flex>
          <Text fontSize="sm" fontColor="secondary">
            Sign up in minutes to access all features and start your journey
            today.
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

        {/* Register form */}
        <Form<IRegisterForm>
          ref={formRef}
          elements={registerElements}
          onSubmit={handleSubmit}
          outputFormat="Json"
          submitButtonProps="none"
        />

        {/* Sign Up button */}
        <Button
          label="Sign Up"
          w="full"
          rounded
          loading={loading}
          onPress={() => formRef.current?.onFormSubmit()}
        />

        {/* Sign In link */}
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="0.25rem">
          <Text fontSize="sm" fontColor="secondary">
            Already have an account?
          </Text>
          <Text fontSize="sm" fontColor="primary" bold onPress={onNavigateLogin}>
            Sign In
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

export default RegisterScreen;
