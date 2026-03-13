import React, {useRef, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
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
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  tradingAccountActions,
  selectCreatedAccount,
  selectDocumentFormFields,
  selectDocumentFormLoading,
  selectDocumentFormSubmitting,
  selectDocumentFormSuccess,
  selectTAError,
} from '@src/modules/TradingAccount';
import type {IUnansweredQuestion} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;
type Route = RouteProp<TradingAccountCreationParamList, 'TADocumentForm'>;

/** Map backend field types to KitsConcerto component types */
const mapFieldType = (q: IUnansweredQuestion): string => {
  const ft = q.fieldType;
  if (['Text', 'Textarea', 'Select', 'Number', 'DatePicker', 'Radio', 'Checkbox', 'FileUpload'].includes(ft)) {
    return ft;
  }
  switch (q.dbType) {
    case 'textarea': return 'Textarea';
    case 'select': case 'multiselect': return 'Select';
    case 'checkbox': return 'Checkbox';
    case 'number': case 'decimal': case 'currency': return 'Number';
    case 'file': case 'image': return 'FileUpload';
    default: return 'Text';
  }
};

const isFileField = (q: IUnansweredQuestion): boolean => {
  return q.fieldType === 'FileUpload' || q.dbType === 'file' || q.dbType === 'image';
};

export default function DocumentFormScreen() {
  const {t} = useLanguage();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const dispatch = useDispatch();

  const {documentRef, documentName} = route.params;
  const createdAccount = useSelector(selectCreatedAccount);
  const formFields = useSelector(selectDocumentFormFields);
  const loading = useSelector(selectDocumentFormLoading);
  const submitting = useSelector(selectDocumentFormSubmitting);
  const success = useSelector(selectDocumentFormSuccess);
  const error = useSelector(selectTAError);

  const formRef = useRef<IUseFormReturn<Record<string, any>>>(null);
  const filePicksRef = useRef<Record<string, {uri: string; type: string; name: string}>>({});
  const didFetch = useRef(false);

  // Fetch form fields on mount
  useEffect(() => {
    if (createdAccount?.identifier && !didFetch.current) {
      didFetch.current = true;
      dispatch(
        tradingAccountActions.fetchDocumentFormFields({
          tradingAccountRef: createdAccount.identifier,
          documentRef,
        }),
      );
    }
  }, [createdAccount?.identifier, documentRef, dispatch]);

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

  const handleFilePick = useCallback(
    async (fieldRef: string, dbType: string) => {
      if (dbType === 'image') {
        // Image picker for image fields
        launchImageLibrary(
          {mediaType: 'photo', quality: 0.8},
          (response) => {
            if (response.didCancel || response.errorCode) return;
            const asset = response.assets?.[0];
            if (asset?.uri) {
              filePicksRef.current[fieldRef] = {
                uri: asset.uri,
                type: asset.type || 'image/jpeg',
                name: asset.fileName || 'photo.jpg',
              };
              // Update form value to show filename
              formRef.current?.setValue(fieldRef, asset.fileName || 'photo.jpg');
            }
          },
        );
      } else {
        // Document picker for file fields
        try {
          const result = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
          });
          filePicksRef.current[fieldRef] = {
            uri: result.uri,
            type: result.type || 'application/octet-stream',
            name: result.name || 'document',
          };
          formRef.current?.setValue(fieldRef, result.name || 'document');
        } catch (err) {
          if (!DocumentPicker.isCancel(err)) {
            Alert.alert(t('error'), String(err));
          }
        }
      }
    },
    [t],
  );

  // Build form elements from fields
  const formElements: IFormElement[] = useMemo(() => {
    return formFields.map(q => {
      const type = mapFieldType(q);
      const element: IFormElement = {
        id: q.fieldRef,
        name: q.fieldName || q.fieldRef,
        label: q.fieldLabel,
        type: type as any,
        placeholder: q.placeholder || '',
        required: q.isRequired || q.validation?.required || false,
        list: q.options?.map(opt => ({
          label: typeof opt === 'string' ? opt : opt.label,
          value: typeof opt === 'string' ? opt : opt.value,
        })),
        helpText: q.helpText,
      };

      // For file upload fields, make them tappable text fields that trigger picker
      if (isFileField(q)) {
        element.type = 'Text' as any;
        element.placeholder = t('trading.docForm.tapToSelectFile');
        element.onFocus = () => handleFilePick(q.fieldRef, q.dbType);
      }

      return element;
    });
  }, [formFields, t, handleFilePick]);

  const handleSubmit = useCallback(
    (data: Record<string, any>, setIsSubmitting: (v: boolean) => void) => {
      if (!createdAccount) return;

      const answers = Object.entries(data).map(([fieldRef, value]) => ({
        fieldRef,
        value: filePicksRef.current[fieldRef] ? filePicksRef.current[fieldRef].name : value,
      }));

      dispatch(
        tradingAccountActions.submitDocumentForm({
          tradingAccountRef: createdAccount.identifier,
          documentRef,
          answers,
          fileFields: filePicksRef.current,
        }),
      );
      setIsSubmitting(false);
    },
    [createdAccount, documentRef, dispatch],
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
          label={t('trading.docForm.submit')}
          severity="brand"
          w="full"
          loading={submitting}
          onClick={() => formRef.current?.onFormSubmit()}
        />
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
