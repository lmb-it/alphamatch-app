import React, {useRef, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {
  Flex,
  Heading,
  Button,
  Form,
  useLanguage,
  type IUseFormReturn,
  type IFormElement,
} from '@lmb-it/kitsconcerto';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {selectUser} from '@src/modules/Auth';
import {CustomerJobPostingParamList} from '@src/routes/CustomerJobPostingNavigator';

type Props = NativeStackScreenProps<CustomerJobPostingParamList, 'JobPostingBasicInfo'>;

export default function JobPostingBasicInfoScreen({navigation, route}: Props) {
  const {t} = useLanguage();
  const formRef = useRef<IUseFormReturn<any>>(null);

  const user = useSelector(selectUser);
  const {description, attachments} = route.params;

  // Personal Info Gate: Check if the user already has basic name/phone details securely.
  // If they do, skip directly to the Job Posting pricing AI Results screens.
  useEffect(() => {
    if (user?.displayName && user?.familyName && user?.contactPhone) {
      // Simulate navigating directly to the AI Branch Logic Step
      console.log('User Profile completed, skipping Basic Info screen.');
      navigation.replace('JobPostingAIResults', { description, attachments });
    }
  }, [user, navigation, description, attachments]);

  const formElements = useMemo(() => {
    return [
      {
        id: 'firstName',
        label: t('trading.basic.firstName'),
        type: 'Text',
        placeholder: t('trading.basic.firstNamePlaceholder'),
        defaultValue: user?.displayName || '',
        required: !user?.displayName,
        disabled: !!user?.displayName,
        colSpan: 12,
      },
      {
        id: 'lastName',
        label: t('trading.basic.lastName'),
        type: 'Text',
        placeholder: t('trading.basic.lastNamePlaceholder'),
        defaultValue: user?.familyName || '',
        required: !user?.familyName,
        disabled: !!user?.familyName,
        colSpan: 12,
      },
      {
        id: 'personalPhone',
        label: t('trading.basic.personalPhone'),
        type: 'Text',
        placeholder: t('trading.basic.phonePlaceholder'),
        defaultValue: user?.contactPhone || '',
        required: !user?.contactPhone,
        disabled: !!user?.contactPhone,
        colSpan: 12,
      },
    ] as any[];
  }, [t, user]);

  const handleSubmit = useCallback(
    (data: any, setIsSubmitting: (v: boolean) => void) => {
      setIsSubmitting(false);
      // Process updates via Redux Profile/Auth action if necessary
      console.log('Sending Basic Info Data Payload (Job Post Entry):', data);

      // Navigate onto AI Results
      navigation.replace('JobPostingAIResults', { description, attachments });
    },
    [navigation, description, attachments],
  );

  // If user profile is already fully loaded and complete, don't flash the form UI at all
  if (user?.displayName && user?.familyName && user?.contactPhone) {
    return <AlphaLayout><Flex flex={1} backgroundColor="bg" /></AlphaLayout>;
  }

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column">
        <Heading as="h2" bold color="text-primary" style={styles.heading}>
          {t('jobs.beforeWeBegin')}
        </Heading>

        <View style={styles.formContainer}>
          <Form<any>
            ref={formRef}
            elements={formElements as any}
            onSubmit={handleSubmit}
            outputFormat="Json"
            submitButtonProps="none"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={t('continue')}
            severity="brand"
            w="full"
            onClick={() => formRef.current?.onFormSubmit()}
          />
        </View>
      </Flex>
    </AlphaLayout>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  formContainer: {
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 32,
    paddingBottom: 32,
  },
});
