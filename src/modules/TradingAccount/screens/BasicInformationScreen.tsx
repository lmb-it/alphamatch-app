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
import {Camera, CheckSquare, Square} from 'lucide-react-native';
import {launchImageLibrary, type ImageLibraryOptions} from 'react-native-image-picker';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {selectUser} from '@src/modules/Auth';
import Config from 'react-native-config';
import {tradingAccountActions} from '../store/tradingAccount.slice';

export interface IBasicInfoForm {
  firstName: string;
  lastName: string;
  businessPhone: string;
  fullAddress: string;
  country_id?: number;
  profileImageBase64?: string;
}

export default function BasicInformationScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const formRef = useRef<IUseFormReturn<IBasicInfoForm>>(null);
  const primaryColor = resolveToken('primary');

  const user = useSelector(selectUser);

  // States
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [sameAsPersonal, setSameAsPersonal] = useState(false);

  // Handle Image Picker
  const handlePickImage = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert(t('error'), response.errorMessage || t('trading.basic.imageError'));
        return;
      }

      const asset = response.assets?.[0];
      if (asset) {
        setAvatarUri(asset.uri || null);
        if (asset.base64) {
          // Prepend data uri scheme if necessary or just send raw base64
          setAvatarBase64(`data:${asset.type || 'image/jpeg'};base64,${asset.base64}`);
        }
      }
    });
  }, []);

  const formElements = useMemo(() => {
    const elements: any[] = [
      {
        id: 'firstName',
        name: 'firstName',
        label: t('trading.basic.firstName'),
        type: 'Text',
        placeholder: t('trading.basic.firstNamePlaceholder'),
        defaultValue: user?.displayName || '',
        required: !user?.displayName,
        disabled: !!user?.displayName,
        colSpan: 12, // User requested everything to be 12
      },
      {
        id: 'lastName',
        name: 'lastName',
        label: t('trading.basic.lastName'),
        type: 'Text',
        placeholder: t('trading.basic.lastNamePlaceholder'),
        defaultValue: user?.familyName || '',
        required: !user?.familyName,
        disabled: !!user?.familyName,
        colSpan: 12,
      },
      // Note: User explicitly requested NOT to ask about personal number here.
      // So no Input field for `personalPhone`. It only appears as a conditional checkbox if user?.contactPhone exists
    ];

    if (!sameAsPersonal) {
      elements.push({
        id: 'businessPhone',
        name: 'businessPhone',
        label: t('trading.basic.businessPhone'),
        type: 'Text',
        placeholder: t('trading.basic.phonePlaceholder'),
        required: true,
        colSpan: 12,
      });
    }

    elements.push({
      id: 'fullAddress',
      name: 'fullAddress',
      label: t('trading.basic.fullAddress'),
      type: 'Location',
      placeholder: t('trading.basic.addressPlaceholder'),
      required: true,
      colSpan: 12,
      apiKey: Config.GOOGLE_MAPS_API_KEY || '',
      provider: 'google',
      countryISO: 'aus',
      forceSelection: true,
    });

    return elements;
  }, [t, sameAsPersonal, user]);

  const processFormSubmit = useCallback((data: IBasicInfoForm) => {
    const finalPayload = {
      ...data,
      country_id: 14, // Hardcoded to Australia
    };

    if (sameAsPersonal && user?.contactPhone) {
      finalPayload.businessPhone = user.contactPhone;
    }

    if (avatarBase64) {
      finalPayload.profileImageBase64 = avatarBase64;
    }

    dispatch(tradingAccountActions.setBasicInfo(finalPayload));
    navigation.navigate('TAInput');
  }, [navigation, dispatch, sameAsPersonal, user, avatarBase64]);

  const handleSubmit = useCallback(
    (data: IBasicInfoForm, setIsSubmitting: (v: boolean) => void) => {
      setIsSubmitting(false);

      if (!avatarUri) {
        Alert.alert(
          t('trading.basic.photoTitle'),
          t('trading.basic.photoMessage'),
          [
            {
              text: t('trading.basic.addPhoto'),
              style: "cancel",
              onPress: handlePickImage
            },
            {
              text: t('trading.basic.continueWithout'),
              style: "default",
              onPress: () => processFormSubmit(data),
            }
          ]
        );
      } else {
        processFormSubmit(data);
      }
    },
    [avatarUri, processFormSubmit, handlePickImage],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column">
        <Heading as="h2" bold color="text-primary" style={styles.heading}>
          {t('trading.basic.title')}
        </Heading>

        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.7} onPress={handlePickImage}>
            {avatarUri ? (
              <Image source={{uri: avatarUri}} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                 <Camera color="#9CA3AF" size={32} />
              </View>
            )}
            <View style={[styles.cameraIcon, {backgroundColor: primaryColor}]}>
              <Text fontSize={18} color="white" style={{lineHeight: 22}}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {user?.contactPhone && (
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.7}
              onPress={() => setSameAsPersonal(!sameAsPersonal)}>
              {sameAsPersonal ? (
                <CheckSquare color={primaryColor} size={20} />
              ) : (
                <Square color="#9CA3AF" size={20} />
              )}
              <Text fontSize={14} color="text-primary" ml={8}>
                {t('trading.basic.sameAsPrimary')} ({user.contactPhone})
              </Text>
            </TouchableOpacity>
          )}

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
    marginTop: 24,
    marginBottom: 16,
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
});
