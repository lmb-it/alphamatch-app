import React, {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
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
  useKitsTheme,
  type IUseFormReturn,
} from '@lmb-it/kitsconcerto';
import {Camera} from 'lucide-react-native';
import {launchImageLibrary, type ImageLibraryOptions} from 'react-native-image-picker';
import {
  tradingAccountActions,
  selectBasicInfo,
  selectCreatedAccount,
  selectTALoading,
} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {IAccountDetailsForm} from '../../models/tradingAccount.form.types';
import {getAccountDetailsElements} from './elements';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

const AccountDetailsScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const basicInfo = useSelector(selectBasicInfo);
  const createdAccount = useSelector(selectCreatedAccount);
  const loading = useSelector(selectTALoading);
  const formRef = useRef<IUseFormReturn<IAccountDetailsForm>>(null);
  const primaryColor = resolveToken('primary');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const didSubmit = useRef(false);

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
          setAvatarBase64(`data:${asset.type || 'image/jpeg'};base64,${asset.base64}`);
        }
      }
    });
  }, [t]);

  // Navigate after finalize success — track account identity to avoid firing on mount
  const prevAccountRef = useRef(createdAccount);
  useEffect(() => {
    if (
      didSubmit.current &&
      createdAccount &&
      !loading &&
      createdAccount !== prevAccountRef.current
    ) {
      didSubmit.current = false;
      // Pro → Verification first, Flex → straight to Subscription
      if (createdAccount.careerModel === 'pro') {
        navigation.navigate('TAVerification');
      } else {
        navigation.navigate('TASubscription');
      }
    }
    prevAccountRef.current = createdAccount;
  }, [createdAccount, loading, navigation]);

  const formElements = useMemo(
    () => getAccountDetailsElements({t, basicInfo}),
    [t, basicInfo],
  );

  const handleSubmit = useCallback(
    (data: IAccountDetailsForm, setIsSubmitting: (v: boolean) => void) => {
      if (!createdAccount) return;
      didSubmit.current = true;
      dispatch(
        tradingAccountActions.finalizeAccount({
          tradingAccountRef: createdAccount.identifier,
          accountName: data.accountName || createdAccount.accountName,
          shortBio: data.shortBio,
          contactPhone: data.contactPhone,
          fullAddress: data.fullAddress,
          zipCode: data.zipCode,
          ...(avatarBase64 ? {profileImageBase64: avatarBase64} : {}),
        }),
      );
      setIsSubmitting(false);
    },
    [createdAccount, dispatch],
  );

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column">
        <Heading as="h2" bold color="text-primary" style={styles.heading}>
          {t('trading.details.setupYour')}{' '}
          <Heading as="h2" bold color="primary">{t('trading.details.profile')}</Heading>
        </Heading>
        <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8}>
          {t('trading.details.subtitle')}
        </Text>

        {/* Avatar Upload */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.7} onPress={handlePickImage}>
            {avatarUri ? (
              <Image source={{uri: avatarUri}} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text fontSize={28} color="text-subtle">?</Text>
              </View>
            )}
            <View style={[styles.cameraIcon, {backgroundColor: primaryColor}]}>
              <Camera color="#FFFFFF" size={14} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Form<IAccountDetailsForm>
            ref={formRef}
            elements={formElements as any}
            onSubmit={handleSubmit}
            outputFormat="Json"
            submitButtonProps="none"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={t('ta.continue')}
            severity="brand"
            w="full"
            loading={loading}
            onClick={() => formRef.current?.onFormSubmit()}
          />
        </View>
      </Flex>
    </AlphaLayout>
  );
};

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
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
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
  buttonContainer: {
    marginTop: 24,
    paddingBottom: 16,
  },
});

export default AccountDetailsScreen;
