import React, {useRef, useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Flex,
  Text,
  Heading,
  Form,
  useLanguage,
  useKitsTheme,
  type IUseFormReturn,
  type IFormElement,
} from '@lmb-it/kitsconcerto';
import * as Yup from 'yup';
import {Camera} from 'lucide-react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {selectUser} from '@src/modules/Auth';
import Config from 'react-native-config';
import {tradingAccountActions} from '../store/tradingAccount.slice';

export interface IBasicInfoForm {
  profileImage?: Record<string, unknown>;
  firstName: string;
  lastName: string;
  businessName?: string;
  shortBio?: string;
  contactPhone?: string;
  contactEmail?: string;
  fullAddress: string;
}

const PRIVACY_NOTE =
  'This information will not be visible to anyone unless you choose to grant access.';

export default function BasicInformationScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const formRef = useRef<IUseFormReturn<IBasicInfoForm>>(null);
  const primaryColor = resolveToken('primary');

  const user = useSelector(selectUser);

  // Track whether user uploaded a profile image
  const avatarBase64Ref = useRef<string | null>(null);
  const [hasImage, setHasImage] = useState(false);

  const formElements: IFormElement[] = useMemo(
    () => [
      // ── Profile image (scoped to trading account; does NOT update global profile) ──
      {
        id: 'profileImage',
        type: 'Image',
        colSpan: 12,
        multiple: false,
        limit: 1,
        onChangeValue: (value: Record<string, unknown>) => {
          const b64 = value?.base64
            ? `data:${value.type || 'image/jpeg'};base64,${value.base64}`
            : null;
          avatarBase64Ref.current = b64;
          setHasImage(!!b64);
        },
        schema: Yup.object(),
        template: ({values, browse}: any) => (
          <Flex justifyContent="center" w="full" style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarContainer}
              activeOpacity={0.7}
              onPress={() => browse()}>
              {values?.length > 0 ? (
                <Image
                  source={{uri: values[0].uri || values[0]}}
                  style={styles.avatar}
                />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Camera color="#9CA3AF" size={32} />
                </View>
              )}
              <View style={[styles.cameraIcon, {backgroundColor: primaryColor}]}>
                <Text fontSize={18} color="white" style={{lineHeight: 22}}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </Flex>
        ),
      },

      // ── Global fields (shared across the entire app) ──
      {
        id: 'firstName',
        type: 'Text',
        label: t('trading.basic.firstName'),
        placeholder: t('trading.basic.firstNamePlaceholder'),
        defaultValue: user?.displayName || '',
        disabled: !!user?.displayName,
        colSpan: 12,
        schema: Yup.string().required(t('trading.basic.firstNameRequired')),
      },
      {
        id: 'lastName',
        type: 'Text',
        label: t('trading.basic.lastName'),
        placeholder: t('trading.basic.lastNamePlaceholder'),
        defaultValue: user?.familyName || '',
        disabled: !!user?.familyName,
        colSpan: 12,
        schema: Yup.string().required(t('trading.basic.lastNameRequired')),
      },

      // ── Business name (used as accountName on finalize) ──
      {
        id: 'businessName',
        type: 'Text',
        label: t('trading.basic.businessName'),
        placeholder: t('trading.basic.businessNamePlaceholder'),
        colSpan: 12,
        schema: Yup.string().max(50),
      },

      // ── Trading account bio ──
      {
        id: 'shortBio',
        type: 'Textarea',
        label: t('ta.bio'),
        placeholder: t('ta.bioPlaceholder'),
        colSpan: 12,
      },

      // ── Contact: email OR phone required (not both mandatory) ──
      // Yup.when() works here because schemaBuilder merges ALL field schemas
      // into a single Yup.object().shape({...}), giving each field access to
      // its siblings. When contactEmail is empty (user has no email on account),
      // contactPhone becomes required — mirroring Laravel's nullable rule.
      {
        id: 'contactPhone',
        type: 'Text',
        label: t('ta.phone'),
        placeholder: t('ta.phonePlaceholder'),
        colSpan: 12,
        helperText: PRIVACY_NOTE,
        schema: Yup.string().when('contactEmail', {
          is: (val: string | undefined) => !val || val.trim() === '',
          then: schema => schema.required(t('trading.basic.phoneRequired')),
          otherwise: schema => schema.nullable(),
        }),
      },
      {
        id: 'contactEmail',
        type: 'Text',
        label: t('ta.email'),
        placeholder: t('trading.details.emailPlaceholder'),
        defaultValue: user?.contactEmail || '',
        disabled: true,
        colSpan: 12,
        schema: Yup.string().email().nullable(),
      },

      // ── Address ──
      {
        id: 'fullAddress',
        type: 'Location',
        label: t('trading.basic.fullAddress'),
        placeholder: t('trading.basic.addressPlaceholder'),
        helperText: PRIVACY_NOTE,
        colSpan: 12,
        schema: Yup.string().required(t('trading.basic.addressRequired')),
        apiKey: Config.GOOGLE_MAPS_API_KEY || '',
        provider: 'google',
        countryISO: 'aus',
        forceSelection: true,
      } as any,
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, user, primaryColor],
  );

  const proceedWithSubmit = useCallback(
    (data: IBasicInfoForm) => {
      dispatch(
        tradingAccountActions.setBasicInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          businessName: data.businessName,
          shortBio: data.shortBio,
          contactPhone: data.contactPhone,
          contactEmail: data.contactEmail,
          fullAddress: data.fullAddress,
          country_id: 14,
          ...(avatarBase64Ref.current
            ? {profileImageBase64: avatarBase64Ref.current}
            : {}),
        }),
      );
      navigation.navigate('TAInput');
    },
    [navigation, dispatch],
  );

  const handleSubmit = useCallback(
    (data: IBasicInfoForm, setIsSubmitting: (v: boolean) => void) => {
      setIsSubmitting(false);

      // Advisory alert when no profile photo uploaded — non-blocking
      if (!hasImage && !avatarBase64Ref.current) {
        Alert.alert(
          t('trading.basic.photoAlertTitle'),
          t('trading.basic.photoAlertMessage'),
          [
            {
              text: t('trading.basic.photoAlertSkip'),
              style: 'cancel',
              onPress: () => proceedWithSubmit(data),
            },
            {
              text: t('trading.basic.photoAlertAdd'),
              style: 'default',
              // User stays on screen to add a photo; no action needed
            },
          ],
        );
        return;
      }

      proceedWithSubmit(data);
    },
    [hasImage, proceedWithSubmit, t],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column">
        {/* Heading moved from the former AccountDetailsScreen */}
        <Heading as="h2" bold color="text-primary" style={styles.heading}>
          {t('trading.details.setupYour')}{' '}
          <Heading as="h2" bold color="primary">
            {t('trading.details.profile')}
          </Heading>
        </Heading>
        <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8} mb={4}>
          {t('trading.details.subtitle')}
        </Text>

        <View style={styles.formContainer}>
          <Form<IBasicInfoForm>
            ref={formRef}
            elements={formElements as any}
            onSubmit={handleSubmit}
            outputFormat="Json"
            submitButtonProps={{
              label: t('trading.basic.nextCareer'),
              severity: 'brand',
              w: 'full',
            }}
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
  avatarSection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  formContainer: {
    marginTop: 8,
  },
});
