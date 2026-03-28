import React, {useRef, useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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
} from '@lmb-it/kitsconcerto';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {selectUser} from '@src/modules/Auth';
import Config from 'react-native-config';
import {tradingAccountActions} from '../../store/tradingAccount.slice';
import type {IBasicInfoForm} from '../../models/tradingAccount.form.types';
import {getBasicInfoElements} from './elements';
import {createAvatarPickerTemplate} from './AvatarPickerTemplate';

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

  const onImageChange = useCallback((value: Record<string, unknown>) => {
    const b64 = value?.base64
      ? `data:${value.type || 'image/jpeg'};base64,${value.base64}`
      : null;
    avatarBase64Ref.current = b64;
    setHasImage(!!b64);
  }, []);

  const avatarTemplate = useMemo(
    () => createAvatarPickerTemplate({primaryColor}),
    [primaryColor],
  );

  const formElements = useMemo(
    () => getBasicInfoElements({
      t,
      user,
      avatarTemplate,
      onImageChange,
      googleMapsApiKey: Config.GOOGLE_MAPS_API_KEY || '',
    }) as any,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, user, primaryColor, avatarTemplate, onImageChange],
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
  formContainer: {
    marginTop: 8,
  },
});
