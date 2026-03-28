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
import {uploadAvatarApi, uploadCoverApi, createAddressApi, updateAddressApi, deleteAddressApi} from '../../api/profile.service';
import {lookupsActions, selectNationalities, selectLanguages} from '@src/modules/Lookups';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {IAddress} from '../../models/profile.types';
import type {IAddressEntry, IEditProfileForm} from '../../models/profile.component.types';
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
  const addLanguageRef = useRef<()=>void>(null)
  const addAddressRef = useRef<()=>void>(null)
  const isSaving = useRef(false);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // ── Lookup data from Redux ──────────────────────────────────────────────
  const nationalities = useSelector(selectNationalities);
  const languageOptions = useSelector(selectLanguages);

  // ── Dispatch fetch on mount (skips if already loaded) ───────────────────
  useEffect(() => {
    if (nationalities.length === 0) dispatch(lookupsActions.fetchNationalities());
    if (languageOptions.length === 0) dispatch(lookupsActions.fetchLanguages());
  }, [dispatch, nationalities.length, languageOptions.length]);

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
    if (uri) {
      setCoverPreview(uri);
      formRef.current?.setValue('coverImage', uri);
    }
  }, []);

  const handlePickAvatar = useCallback(async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 0.8});
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setAvatarPreview(uri);
      formRef.current?.setValue('avatarImage', uri);
    }
  }, []);

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = useCallback(
    async (data: IEditProfileForm, setIsSubmitting: (v: boolean) => void) => {
      setIsSubmitting(true);

      try {
        if (data.coverImage) {
          await uploadCoverApi(data.coverImage);
        }
        if (data.avatarImage) {
          await uploadAvatarApi(data.avatarImage);
        }
      } catch (e) {
        setIsSubmitting(false);
        showToast('error', e instanceof Error ? e.message : 'Image upload failed');
        return;
      }

      try {
        const existingRefs = (user?.addresses ?? []).map((a: IAddress) => a.identifier);
        const submittedRefs = data.addresses
          .filter(a => a.identifier)
          .map(a => a.identifier);

        const deletedRefs = existingRefs.filter(r => !submittedRefs.includes(r));
        for (const ref of deletedRefs) {
          await deleteAddressApi(ref);
        }

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

      // contactPhone is an Object element — its value is either:
      // A) nested: { phoneCountryId: "14", phoneNumber: "0412345678" }
      // B) flat at root (if Object nesting failed): phoneNumber and phoneCountryId at data root
      const phone = data.contactPhone;
      let phoneNumber: string | undefined;
      let phoneCountryId: number | undefined;

      if (phone && typeof phone === 'object') {
        // Case A — nested object from Object element
        phoneNumber = (phone as any).phoneNumber || undefined;
        phoneCountryId = (phone as any).phoneCountryId ? Number((phone as any).phoneCountryId) : undefined;
      } else {
        // Case B — flat (fallback)
        phoneNumber = String(phone || '') || undefined;
        phoneCountryId = (data as any).phoneCountryId ? Number((data as any).phoneCountryId) : undefined;
      }

      isSaving.current = true;
      dispatch(profileActions.updateProfile({
        displayName: data.displayName,
        middleName: data.middleName || undefined,
        familyName: data.familyName,
        contactPhone: phoneNumber,
        phoneCountryId,
        shortBio: data.shortBio || undefined,
        gender: data.gender || undefined,
        birthDate: data.birthDate || undefined,
        nationalityRef: data.nationalityRef || undefined,
        languages: data.languages?.length > 0 ? data.languages : undefined,
      }));
    },
    [dispatch, showToast, user?.addresses],
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

  // ── Pre-populate languages via setValue (backup for late-loading data) ───
  // With the KitsConcerto Group initialValue fix, rows are created from defaultValues.
  // This useEffect handles the case where user data loads after the form mounts.
  useEffect(() => {
    const langs = user?.languages ?? [];
    if (langs.length === 0 || !formRef.current || languageOptions.length === 0) return;

    langs.forEach((lang, index) => {
      const prefix = `languages.${index}` as `languages.${number}`;
      formRef.current?.setValue(`${prefix}.ref`, lang.ref);
      formRef.current?.setValue(`${prefix}.proficiencyLevel`, lang.proficiencyLevel);
      formRef.current?.setValue(`${prefix}.isNative`, lang.isNative);
    });
  }, [user?.languages, languageOptions.length]);

  // ── Form elements ─────────────────────────────────────────────────────────
  const formElements = useMemo(
    () => getEditProfileElements({
      user,
      initialAddresses,
      t,
      formRef,
      addAddressRef,
      addLanguageRef,
      nationalities,
      languageOptions,
    }),
    [user, initialAddresses, t, nationalities, languageOptions],
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
          onChange={(data)=>{
            console.log(data)
          }}
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
