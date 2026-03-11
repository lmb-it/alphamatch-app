import React, {useRef, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {
  Flex,
  Text,
  Heading,
  Button,
  Form,
  useLanguage,
  type IUseFormReturn,
  type IFormElement,
} from '@lmb-it/kitsconcerto';
import {
  tradingAccountActions,
  selectAIResult,
  selectCreatedAccount,
  selectTALoading,
} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

const MissingQuestionsScreen: React.FC = () => {
  const {t} = useLanguage();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const aiResult = useSelector(selectAIResult);
  const createdAccount = useSelector(selectCreatedAccount);
  const loading = useSelector(selectTALoading);
  const formRef = useRef<IUseFormReturn<Record<string, any>>>(null);
  const didSubmit = useRef(false);

  // Navigate to account details after form submission success
  useEffect(() => {
    if (createdAccount && didSubmit.current && !loading) {
      didSubmit.current = false;
      navigation.navigate('TAAccountDetails');
    }
  }, [createdAccount, loading, navigation]);

  // Build form elements from unanswered questions based on JSON spec
  const formElements: IFormElement[] = useMemo(() => {
    const questions = aiResult?.unansweredQuestions || [];
    return questions.map((q: any) => {
      // API provides dbType and fieldType. We map to KitsConcerto types.
      // KitsConcerto expects Title case for types like 'Text', 'Textarea', 'Select'
      const mappedType = q.fieldType === 'textfield' ? 'Text'
                       : q.fieldType === 'select' ? 'Select'
                       : q.fieldType === 'checkbox' ? 'Checkbox'
                       : q.fieldType === 'Text' ? 'Text' // Assuming it might already be mapped
                       : 'Text';

      return {
        id: q.fieldRef,
        name: q.fieldName || q.fieldRef, // fieldName matches the kitconcerto format better
        label: q.fieldLabel,
        type: mappedType as any,
        placeholder: q.placeholder || '',
        required: q.isRequired || q.validation?.required || false,
        options: q.options?.map((opt: any) => ({
          label: typeof opt === 'string' ? opt : opt.label,
          value: typeof opt === 'string' ? opt : opt.value,
        })),
        helpText: q.helpText,
      };
    });
  }, [aiResult]);

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

  // If no unanswered questions, skip to account details
  useEffect(() => {
    if (formElements.length === 0) {
      navigation.navigate('TAAccountDetails');
    }
  }, [formElements.length, navigation]);

  if (formElements.length === 0) {
    return null;
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
            <Form
              ref={formRef}
              elements={formElements}
              onSubmit={handleSubmit}
              outputFormat="Json"
              submitButtonProps="none"
            />
          </View>
        </View>

        <Button
          label={t('ta.continue')}
          severity="brand"
          w="full"
          loading={loading}
          onClick={() => formRef.current?.onFormSubmit()}
        />
      </Flex>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  formContainer: {
    marginTop: 24,
  },
});

export default MissingQuestionsScreen;
