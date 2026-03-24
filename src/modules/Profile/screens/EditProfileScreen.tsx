/**
 * EditProfileScreen
 *
 * Fields:
 * 1. Cover photo (POST /app/profile/cover) — picker + preview
 * 2. Profile photo (POST /app/profile/avatar) — picker + preview
 * 3-7. Text fields via KitsConcerto Form with initialValue
 * 8. Addresses — repeatable Group with type dropdown + Location + manual entry
 *
 * Image uploads happen inline (async/await) before text update dispatches.
 * Address CRUD is separate from profile update — each address is saved independently.
 */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text, Form, Box,
  useKitsTheme, useDialog, useLanguage,
  type IUseFormReturn,
} from '@lmb-it/kitsconcerto';
import Config from 'react-native-config';
import {Camera} from 'lucide-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {selectProfileUser, selectProfileLoading, selectProfileError, profileActions} from '@src/modules/Profile';
import {useProfileErrorToast} from '@src/hooks/useErrorToast';
import {uploadAvatarApi, uploadCoverApi, createAddressApi, updateAddressApi, deleteAddressApi} from '../api/profile.service';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {IAddress} from '../models/profile.types';
import type {IAddressEntry, IEditProfileForm} from '../models/profile.component.types';
import {getEditProfileElements} from './editProfile.elements';

const COVER_HEIGHT = 180;
const AVATAR_SIZE = 100;

const EditProfileScreen: React.FC = () => {
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const {t} = useLanguage();
  const {toast: showToast} = useDialog();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectProfileUser);
  const profileLoading = useSelector(selectProfileLoading);
  const profileError = useSelector(selectProfileError);

  useProfileErrorToast();

  const formRef = useRef<IUseFormReturn<IEditProfileForm>>(null);
  const addAddressRef = useRef<()=>void>(null)
  const isSaving = useRef(false);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // ── Watch profile loading for saga completion ─────────────────────────────
  useEffect(() => {
    if (isSaving.current && !profileLoading) {
      isSaving.current = false;
      formRef.current?.setIsSubmitting(false);
      if (!profileError) {
        navigation.goBack();
      }
    }
  }, [profileLoading, profileError, navigation]);

  // ── Photo pickers ─────────────────────────────────────────────────────────
  const handlePickCover = useCallback(async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 0.8});
    const uri = result.assets?.[0]?.uri;
    if (uri) setCoverPreview(uri);
  }, []);

  const handlePickAvatar = useCallback(async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 0.8});
    const uri = result.assets?.[0]?.uri;
    if (uri) setAvatarPreview(uri);
  }, []);

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = useCallback(
    async (data: IEditProfileForm, setIsSubmitting: (v: boolean) => void) => {
      setIsSubmitting(true);

      // 1. Upload images if changed
      try {
        if (coverPreview) {
          await uploadCoverApi(coverPreview);
        }
        if (avatarPreview) {
          await uploadAvatarApi(avatarPreview);
        }
      } catch (e) {
        setIsSubmitting(false);
        showToast('error', e instanceof Error ? e.message : 'Image upload failed');
        return;
      }

      // 2. Save addresses — create/update each entry
      try {
        const existingRefs = (user?.addresses ?? []).map((a: IAddress) => a.identifier);
        const submittedRefs = data.addresses
          .filter(a => a.identifier)
          .map(a => a.identifier);

        // Delete removed addresses
        const deletedRefs = existingRefs.filter(r => !submittedRefs.includes(r));
        for (const ref of deletedRefs) {
          await deleteAddressApi(ref);
        }

        // Create or update each address
        for (const addr of data.addresses) {
          const isManual = addr.manualEntry;
          const fullAddress = isManual
            ? [addr.line1, addr.cityName, addr.stateName, addr.zipCode, addr.country]
                .filter(Boolean)
                .join(', ')
            : addr.fullAddress;

          const payload = {
            addressType: addr.addressType as any,
            fullAddress,
            line1: addr.line1 || undefined,
            line2: addr.line2 || undefined,
            stateName: addr.stateName || undefined,
            cityName: addr.cityName || undefined,
            zipCode: addr.zipCode || undefined,
            googlePlaceId: addr.googlePlaceId || undefined,
            lat: addr.lat ?? undefined,
            lng: addr.lng ?? undefined,
            entryMode: (isManual ? 'manual' : 'autocomplete') as any,
          };

          if (addr.identifier) {
            await updateAddressApi(addr.identifier, payload);
          } else {
            await createAddressApi(payload);
          }
        }
      } catch (e) {
        setIsSubmitting(false);
        showToast('error', e instanceof Error ? e.message : 'Address save failed');
        return;
      }

      // 3. Dispatch text field update via saga
      isSaving.current = true;
      dispatch(profileActions.updateProfile({
        displayName: data.displayName,
        middleName: data.middleName || undefined,
        familyName: data.familyName,
        contactPhone: data.contactPhone || undefined,
        shortBio: data.shortBio || undefined,
      }));
    },
    [coverPreview, avatarPreview, dispatch, showToast, user?.addresses],
  );

  // ── Build initial addresses from existing data ────────────────────────────
  const initialAddresses: IAddressEntry[] = useMemo(() => {
    const existing = user?.addresses ?? [];
    if (existing.length === 0) {
      return [];
    }
    return existing.map((a: IAddress) => ({
      identifier: a.identifier,
      addressType: a.addressType,
      fullAddress: a.fullAddress || '',
      line1: a.line1 || '',
      line2: a.line2 || '',
      stateName: a.stateName || '',
      cityName: a.cityName || '',
      zipCode: a.zipCode || '',
      country: '',
      lat: a.lat ?? null,
      lng: a.lng ?? null,
      googlePlaceId: a.googlePlaceId ?? null,
      entryMode: a.entryMode,
      manualEntry: a.entryMode === 'manual',
    }));
  }, [user?.addresses]);


  useEffect(() => {
    if(initialAddresses.length > 0){
      initialAddresses.forEach((item, index)=>{
        const prefix = `addresses.${index}` as `addresses.${number}`;


        formRef.current?.setValue(`${prefix}.addressType`, item.addressType);
        formRef.current?.setValue(`${prefix}.fullAddress`, item.fullAddress);
        formRef.current?.setValue(`${prefix}.line1`, item.line1);
        formRef.current?.setValue(`${prefix}.cityName`, item.cityName);
        formRef.current?.setValue(`${prefix}.stateName`, item.stateName);
        formRef.current?.setValue(`${prefix}.zipCode`, item.zipCode);
        formRef.current?.setValue(`${prefix}.country`, item.country);
        formRef.current?.setValue(`${prefix}.googlePlaceId`, item.googlePlaceId);
        formRef.current?.setValue(`${prefix}.lat`, item.lat);
        formRef.current?.setValue(`${prefix}.lng`, item.lng);
      })
    }
  }, [initialAddresses]);
  // ── Form elements ─────────────────────────────────────────────────────────
  const formElements = useMemo(
    () => getEditProfileElements({
      user,
      initialAddresses,
      t,
      formRef,
      addAddressRef,
      googleMapsApiKey: Config.GOOGLE_MAPS_API_KEY || '',
    }),
    [user, initialAddresses, t],
  );

  // ── Resolved display URIs ─────────────────────────────────────────────────
  const coverUri = coverPreview || user?.coverImage || null;
  const avatarUri = avatarPreview || user?.avatar || null;

  return (
    <AlphaLayout fullScreen>
      {/* Cover Photo */}
      <View style={styles.coverContainer}>
        {coverUri ? (
            <Image source={{uri: coverUri}} style={styles.coverImage} />
        ) : (
            <View style={[styles.coverImage, {backgroundColor: primaryColor}]} />
        )}
        <LinearGradient
            colors={['transparent', 'rgba(249,250,252,0.6)']}
            style={styles.coverGradientBottom}
        />
        <TouchableOpacity
            style={styles.changeCoverBtn}
            onPress={handlePickCover}
            activeOpacity={0.7}>
          <Camera color="#FFFFFF" size={16} />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={handlePickAvatar} activeOpacity={0.8}>
          {avatarUri ? (
              <Image source={{uri: avatarUri}} style={styles.avatar} />
          ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text fontSize={32} fontWeight="700" color="text-subtle">
                  {user?.displayName?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
          )}
          <View style={[styles.cameraBadge, {backgroundColor: primaryColor}]}>
            <Camera color="#FFFFFF" size={14} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <Box px={20} mt={16} pb={40}>
        <Form<IEditProfileForm>
          ref={formRef}
          elements={formElements}
          onSubmit={handleSave}
          outputFormat="Json"
          submitButtonProps={{
            severity: 'brand',
            label: 'Save Changes',
            w: 'full',
          }}
        />
      </Box>
    </AlphaLayout>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  coverContainer: {
    height: COVER_HEIGHT,
    marginHorizontal: -24,
    marginTop: -20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  changeCoverBtn: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBadge: {
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
});
