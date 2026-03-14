import React, {useRef, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
  selectAIResult,
  selectCreatedAccount,
  selectFormFields,
  selectTALoading,
} from '@src/modules/TradingAccount';
import type {IUnansweredQuestion} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import DynamicForm, {type DynamicFormRef} from '@src/components/shared/DynamicForm';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

const MissingQuestionsScreen: React.FC = () => {
  const {t} = useLanguage();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const aiResult = useSelector(selectAIResult);
  const createdAccount = useSelector(selectCreatedAccount);
  const formFieldsFromApi = useSelector(selectFormFields);
  const loading = useSelector(selectTALoading);
  const dynamicFormRef = useRef<DynamicFormRef>(null);
  const didSubmit = useRef(false);
  const didFetch = useRef(false);

  // For manual flow: fetch form fields from backend when no AI result
  useEffect(() => {
    if (!aiResult && createdAccount?.identifier && !didFetch.current) {
      didFetch.current = true;
      dispatch(tradingAccountActions.fetchFormFields(createdAccount.identifier));
    }
  }, [aiResult, createdAccount?.identifier, dispatch]);

  // Navigate to account details after form submission success
  const prevAccountRef = useRef(createdAccount);
  useEffect(() => {
    if (
      didSubmit.current &&
      createdAccount &&
      !loading &&
      createdAccount !== prevAccountRef.current
    ) {
      didSubmit.current = false;
      navigation.navigate('TAConfirmation');
    }
    prevAccountRef.current = createdAccount;
  }, [createdAccount, loading, navigation]);

  // Use AI unanswered questions or fetched form fields
  const questions: IUnansweredQuestion[] = useMemo(() => {
    if (aiResult?.unansweredQuestions?.length) {
      return aiResult.unansweredQuestions;
    }
    return formFieldsFromApi || [];
  }, [aiResult, formFieldsFromApi]);

  const handleSubmit = useCallback(
    (data: Record<string, any>, setIsSubmitting: (v: boolean) => void) => {
      if (!createdAccount) return;
      didSubmit.current = true;
      const answers = Object.entries(data).map(([fieldRef, value]) => ({
        fieldRef,
        value,
      }));
      dispatch(
        tradingAccountActions.submitFormAnswers({
          tradingAccountRef: createdAccount.identifier,
          answers,
        }),
      );
      setIsSubmitting(false);
    },
    [createdAccount, dispatch],
  );

  // If no questions and not loading, skip to confirmation
  useEffect(() => {
    if (questions.length === 0 && !loading && (aiResult || didFetch.current)) {
      navigation.navigate('TAConfirmation');
    }
  }, [questions.length, loading, aiResult, navigation]);

  // Show a loader while questions are being fetched or while navigation is queuing
  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('ta.questionsTitle')}{' '}
            <Heading as="h2" bold color="primary">{t('ta.questionsTitleAccent')}</Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8}>
            {t('ta.questionsSubtitle')}
          </Text>

          <View style={styles.formContainer}>
            <DynamicForm
              ref={dynamicFormRef}
              fields={questions}
              onSubmit={handleSubmit}
            />
          </View>
        </View>

        <Button
          label={t('ta.continue')}
          severity="brand"
          w="full"
          loading={loading}
          onClick={() => dynamicFormRef.current?.submit()}
        />
      </Flex>
    </AlphaLayout>
  );
};

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

export default MissingQuestionsScreen;
