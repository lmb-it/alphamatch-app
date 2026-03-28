import React, {useRef, useMemo, useCallback, useEffect} from 'react';
import {Modal, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Flex,
  Text,
  Heading,
  Form,
  useLanguage,
  type IUseFormReturn,
} from '@lmb-it/kitsconcerto';
import * as Yup from 'yup';
import type {IFormElement} from '@lmb-it/kitsconcerto';
import {profileActions, selectProfileLoading} from '@src/modules/Profile';
import type {MissingProfileField} from '../../hooks/useProfileCompletionCheck';

interface ProfileSetupModalProps {
  visible: boolean;
  missingFields: MissingProfileField[];
  onComplete: () => void;
  onDismiss: () => void;
}

interface IProfileSetupForm {
  displayName?: string;
  familyName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

/**
 * Modal shown before entering the Trading Account creation flow
 * when the user's personal profile is missing required fields.
 *
 * Shows only the fields that are missing. Saves via the existing
 * updateProfile saga. Calls onComplete after successful save.
 */
export function ProfileSetupModal({
  visible,
  missingFields,
  onComplete,
  onDismiss,
}: ProfileSetupModalProps) {
  const {t} = useLanguage();
  const dispatch = useDispatch();
  const loading = useSelector(selectProfileLoading);
  const formRef = useRef<IUseFormReturn<IProfileSetupForm>>(null);
  const didSubmit = useRef(false);
  const prevLoading = useRef(loading);

  // Detect when updateProfile completes (loading goes from true → false after submit)
  useEffect(() => {
    if (didSubmit.current && prevLoading.current && !loading) {
      didSubmit.current = false;
      onComplete();
    }
    prevLoading.current = loading;
  }, [loading, onComplete]);

  const elements = useMemo(() => {
    const els: IFormElement[] = [];

    if (missingFields.includes('displayName')) {
      els.push({
        id: 'displayName',
        type: 'Text',
        label: t('trading.profileSetup.firstName'),
        placeholder: t('trading.profileSetup.firstNamePlaceholder'),
        colSpan: 12,
        schema: Yup.string().required(t('trading.profileSetup.firstNameRequired')),
      });
    }

    if (missingFields.includes('familyName')) {
      els.push({
        id: 'familyName',
        type: 'Text',
        label: t('trading.profileSetup.lastName'),
        placeholder: t('trading.profileSetup.lastNamePlaceholder'),
        colSpan: 12,
        schema: Yup.string().required(t('trading.profileSetup.lastNameRequired')),
      });
    }

    const needsContact =
      missingFields.includes('contactEmail') || missingFields.includes('contactPhone');

    if (needsContact && missingFields.includes('contactEmail')) {
      els.push({
        id: 'contactEmail',
        type: 'Text',
        label: t('trading.profileSetup.contactEmail'),
        placeholder: t('trading.profileSetup.contactEmailPlaceholder'),
        colSpan: 12,
        schema: Yup.string()
          .email()
          .when('contactPhone', {
            is: (val: string | undefined) => !val || val.trim() === '',
            then: (schema: Yup.StringSchema) =>
              schema.required(t('trading.profileSetup.contactRequired')),
            otherwise: (schema: Yup.StringSchema) => schema.nullable(),
          }),
      });
    }

    if (needsContact && missingFields.includes('contactPhone')) {
      els.push({
        id: 'contactPhone',
        type: 'Text',
        label: t('trading.profileSetup.contactPhone'),
        placeholder: t('trading.profileSetup.contactPhonePlaceholder'),
        colSpan: 12,
        schema: Yup.string().when('contactEmail', {
          is: (val: string | undefined) => !val || val.trim() === '',
          then: (schema: Yup.StringSchema) =>
            schema.required(t('trading.profileSetup.contactRequired')),
          otherwise: (schema: Yup.StringSchema) => schema.nullable(),
        }),
      });
    }

    return els;
  }, [missingFields, t]);

  const handleSubmit = useCallback(
    (data: IProfileSetupForm, setIsSubmitting: (v: boolean) => void) => {
      setIsSubmitting(false);
      didSubmit.current = true;
      dispatch(profileActions.updateProfile(data));
    },
    [dispatch],
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onDismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Flex flex={1} px={24} pt={40} pb={32} flexDirection="column">
          <Heading as="h3" bold color="text-primary" mb={8}>
            {t('trading.profileSetup.title')}
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20} mb={24}>
            {t('trading.profileSetup.subtitle')}
          </Text>

          <Form<IProfileSetupForm>
            ref={formRef}
            elements={elements as any}
            onSubmit={handleSubmit}
            outputFormat="Json"
            submitButtonProps={{
              label: t('trading.profileSetup.save'),
              severity: 'brand',
              w: 'full',
              loading,
            }}
          />
        </Flex>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ProfileSetupModal;
