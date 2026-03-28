import React, {useRef, useCallback, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {
  Flex,
  Text,
  Heading,
  Button,
  useLanguage,
} from '@lmb-it/kitsconcerto';
import {
  tradingAccountActions,
  selectCreatedAccount,
  selectDocumentFormFields,
  selectDocumentFormLoading,
  selectDocumentFormSubmitting,
  selectDocumentFormSuccess,
  selectTAError,
} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import DynamicForm, {type DynamicFormRef} from '@src/components/shared/DynamicForm';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;
type Route = RouteProp<TradingAccountCreationParamList, 'TADocumentForm'>;

export default function DocumentFormScreen() {
  const {t} = useLanguage();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const dispatch = useDispatch();

  const {documentRef, documentName, accountRef} = route.params;
  const createdAccount = useSelector(selectCreatedAccount);
  const formFields = useSelector(selectDocumentFormFields);
  const loading = useSelector(selectDocumentFormLoading);
  const submitting = useSelector(selectDocumentFormSubmitting);
  const success = useSelector(selectDocumentFormSuccess);
  const error = useSelector(selectTAError);

  // Use accountRef from route params (Profile flow) or createdAccount (onboarding flow)
  const resolvedAccountRef = accountRef ?? createdAccount?.identifier ?? null;

  const dynamicFormRef = useRef<DynamicFormRef>(null);
  const didFetch = useRef(false);

  // Fetch form fields on mount
  useEffect(() => {
    if (resolvedAccountRef && !didFetch.current) {
      didFetch.current = true;
      dispatch(
        tradingAccountActions.fetchDocumentFormFields({
          tradingAccountRef: resolvedAccountRef,
          documentRef,
        }),
      );
    }
  }, [resolvedAccountRef, documentRef, dispatch]);

  // Navigate back on successful submission
  useEffect(() => {
    if (success) {
      dispatch(tradingAccountActions.resetDocumentForm());
      navigation.goBack();
    }
  }, [success, dispatch, navigation]);

  // Show error
  useEffect(() => {
    if (error && !loading && !submitting) {
      Alert.alert(t('error'), error);
      dispatch(tradingAccountActions.clearError());
    }
  }, [error, loading, submitting, t, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(tradingAccountActions.resetDocumentForm());
    };
  }, [dispatch]);

  const handleSubmit = useCallback(
    (data: Record<string, any>, setIsSubmitting: (v: boolean) => void) => {
      if (!resolvedAccountRef) return;

      const filePicks = dynamicFormRef.current?.getFilePicks() ?? {};
      const addressPicks = dynamicFormRef.current?.getAddressPicks() ?? {};

      const answers = Object.entries(data).map(([fieldRef, value]) => ({
        fieldRef,
        value: filePicks[fieldRef]
          ? filePicks[fieldRef].name
          : addressPicks[fieldRef]
            ? JSON.stringify(addressPicks[fieldRef])
            : value,
      }));

     dispatch(
        tradingAccountActions.submitDocumentForm({
          tradingAccountRef: resolvedAccountRef,
          documentRef,
          answers,
          fileFields: filePicks,
        }),
      );
      setIsSubmitting(false);
    },
    [resolvedAccountRef, documentRef, dispatch],
  );

  if (loading || formFields.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        {formFields.length === 0 && !loading && didFetch.current && (
          <Text fontSize={14} color="text-subtle" mt={16}>
            {t('trading.docForm.noFields')}
          </Text>
        )}
      </View>
    );
  }

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {documentName}
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8}>
            {t('trading.docForm.subtitle')}
          </Text>

          <View style={styles.formContainer}>
            <DynamicForm
              ref={dynamicFormRef}
              fields={formFields}
              onSubmit={handleSubmit}
              enableFilePicker
            />
          </View>
        </View>
      </Flex>
    </AlphaLayout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  formContainer: {
    marginTop: 24,
  },
});
