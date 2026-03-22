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
import {Image, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text, Flex, Form, Box, Button,
  useKitsTheme, useDialog, Icon, useLanguage,
  type IFormElement, type IUseFormReturn,
} from '@lmb-it/kitsconcerto';
import {Camera} from 'lucide-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import * as Yup from 'yup';
import {selectProfileUser, selectProfileLoading, selectProfileError, profileActions} from '@src/modules/Profile';
import {useProfileErrorToast} from '@src/hooks/useErrorToast';
import {uploadAvatarApi, uploadCoverApi, createAddressApi, updateAddressApi, deleteAddressApi} from '../api/profile.service';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {ADDRESS_TYPE_OPTIONS} from '@src/config/options';
import type {IAddress} from '../models/profile.types';

const COVER_HEIGHT = 250;
const AVATAR_SIZE = 90;

interface IAddressEntry {
  identifier: string;
  addressType: string;
  fullAddress: string;
  line1: string;
  line2: string;
  stateName: string;
  cityName: string;
  zipCode: string;
  country: string;
  lat: number | null;
  lng: number | null;
  googlePlaceId: string | null;
  entryMode: string;
  manualEntry: boolean;
}

interface IEditProfileForm {
  displayName: string;
  middleName: string;
  familyName: string;
  contactPhone: string;
  shortBio: string;
  addresses: IAddressEntry[];
}

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
      return [{
        identifier: '',
        addressType: 'home',
        fullAddress: '',
        line1: '',
        line2: '',
        stateName: '',
        cityName: '',
        zipCode: '',
        country: '',
        lat: null,
        lng: null,
        googlePlaceId: null,
        entryMode: 'autocomplete',
        manualEntry: false,
      }];
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

  // ── Form elements ─────────────────────────────────────────────────────────
  const formElements = useMemo(
    (): IFormElement<IEditProfileForm>[] => [
      {
        id: 'displayName',
        type: 'Text',
        label: 'First Name',
        placeholder: 'Enter first name',
        colSpan: 12,
        initialValue: user?.displayName ?? '',
        schema: Yup.string().required('First name is required'),
      },
      {
        id: 'middleName',
        type: 'Text',
        label: 'Middle Name (optional)',
        placeholder: 'Enter middle name',
        colSpan: 12,
        initialValue: user?.middleName ?? '',
      },
      {
        id: 'familyName',
        type: 'Text',
        label: 'Last Name',
        placeholder: 'Enter last name',
        colSpan: 12,
        initialValue: user?.familyName ?? '',
        schema: Yup.string().required('Last name is required'),
      },
      {
        id: 'contactPhone',
        type: 'Text',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        colSpan: 12,
        initialValue: user?.contactPhone ?? '',
        keyboardType: 'phone-pad',
      },
      {
        id: 'shortBio',
        type: 'Textarea',
        label: 'Bio',
        placeholder: 'Tell us about yourself',
        colSpan: 12,
        initialValue: user?.shortBio ?? '',
        rows: 4,
      },
      // ── Addresses — repeatable Group ──
      {
        type: 'Group',
        id: 'addresses',
        label: 'Addresses',
        colSpan: 12,
        initialValue: initialAddresses,
        groupsSettings: {
          repeatable: {
            plusButton: (total: number, addOne: () => void) => (
              <Button
                label={`Add Address (${total})`}
                severity="brand"
                onClick={addOne}
                icon={<Icon name="plus" color={'white'} />}
              />
            ),
            minusButton: (_total: number, removeOne: () => void) => (
              <Button
                label="Remove"
                severity="danger"
                onClick={() => removeOne()}
                icon={<Icon name="trash" />}
              />
            ),
            maxRepeats: 5,
            minRepeats: 0,
          },
          grid: {columns: 12},
        },
        elements: [
          {
            type: 'Select',
            id: 'addressType',
            label: 'Type',
            initialValue: 'home',
            list: ADDRESS_TYPE_OPTIONS.map(o => ({...o, label: t(o.label)})),
            schema: Yup.string().required('Type is required'),
            colSpan: 12,
          },
          {
            type: 'Location',
            id: 'fullAddress',
            label: 'Address',
            placeholder: 'Search for address',
            initialValue: '',
            provider: 'google',
            apiKey: 'AIzaSyBENsjk_sS3EhtqENIgDmySwxFjpH_8KlU',
            deps: ['manualEntry'],
            isDisabled: ([manualEntry]: any[]) => manualEntry === true,
            onAddressClick: (address: any, group: {index: number}) => {
              const prefix = `addresses.${group.index}` as any;
              const street = [address.street_number, address.route].filter(Boolean).join(' ');
              formRef.current?.setValue(`${prefix}.line1`, street);
              formRef.current?.setValue(`${prefix}.cityName`, address.locality || address.administrative_area_level_2 || '');
              formRef.current?.setValue(`${prefix}.stateName`, address.administrative_area_level_1 || '');
              formRef.current?.setValue(`${prefix}.zipCode`, address.postal_code || '');
              formRef.current?.setValue(`${prefix}.country`, address.country || '');
              formRef.current?.setValue(`${prefix}.googlePlaceId`, address.place_id || null);
              formRef.current?.setValue(`${prefix}.lat`, address.lat ?? null);
              formRef.current?.setValue(`${prefix}.lng`, address.lng ?? null);
            },
            colSpan: 12,
          },
          {
            type: 'Switch',
            id: 'manualEntry',
            label: "Enter address manually",
            initialValue: false,
            colSpan: 12,
          },
          {
            type: 'Text',
            id: 'line1',
            label: 'Street Address',
            placeholder: 'Enter street address',
            initialValue: '',
            deps: ['manualEntry'],
            show: ([manualEntry]: any[]) => manualEntry === true,
            schema: Yup.string().when('manualEntry', {
              is: true,
              then: (s) => s.required('Street is required'),
            }),
            colSpan: 12,
          },
          {
            type: 'Text',
            id: 'cityName',
            label: 'City',
            placeholder: 'Enter city',
            initialValue: '',
            deps: ['manualEntry'],
            show: ([manualEntry]: any[]) => manualEntry === true,
            schema: Yup.string().when('manualEntry', {
              is: true,
              then: (s) => s.required('City is required'),
            }),
            colSpan: 6,
          },
          {
            type: 'Text',
            id: 'stateName',
            label: 'State / Region',
            placeholder: 'Enter state',
            initialValue: '',
            deps: ['manualEntry'],
            show: ([manualEntry]: any[]) => manualEntry === true,
            colSpan: 6,
          },
          {
            type: 'Text',
            id: 'zipCode',
            label: 'Postcode',
            placeholder: 'Postcode',
            initialValue: '',
            deps: ['manualEntry'],
            show: ([manualEntry]: any[]) => manualEntry === true,
            colSpan: 6,
          },
        ],
      } as any,
    ],
    [user, initialAddresses, t],
  );

  // ── Resolved display URIs ─────────────────────────────────────────────────
  const coverUri = coverPreview || user?.coverImage || null;
  const avatarUri = avatarPreview || user?.avatar || null;

  return (
    <AlphaLayout fullScreen>
      {/* Cover Photo */}
      <Pressable style={styles.coverContainer} onPress={handlePickCover}>
        {coverUri ? (
          <>
            <Image source={{uri: coverUri}} style={styles.coverImage} />
            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgb(255,255,255)']}
                locations={[0, 0.95]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.coverGradientTop}
            />
          </>
        ) : (
          <LinearGradient
            colors={['transparent', primaryColor]}
            style={styles.coverImage}
          />
        )}
        <Flex
          style={styles.coverCameraIcon}
          flexDirection="row"
          alignItems="center"
          bgColor="rgba(0,0,0,0.5)"
          px={14}
          py={8}
          borderRadius={20}>
          <Camera color="#FFFFFF" size={20} />
          <Text fontSize={12} fontWeight="600" color="#FFFFFF" ml={6}>
            Change Cover
          </Text>
        </Flex>
      </Pressable>

      {/* Avatar */}
      <Flex alignItems="center" style={styles.avatarSection}>
        <Pressable onPress={handlePickAvatar}>
          {avatarUri ? (
            <Image source={{uri: avatarUri}} style={styles.avatar} />
          ) : (
            <Flex
              w={AVATAR_SIZE}
              h={AVATAR_SIZE}
              borderRadius={AVATAR_SIZE / 2}
              bgColor="gray.200"
              justifyContent="center"
              alignItems="center"
              style={styles.avatarBorder}>
              <Text fontSize={28} fontWeight="700" color="text-subtle">
                {(user?.displayName || '?').charAt(0).toUpperCase()}
              </Text>
            </Flex>
          )}
          <Flex
            style={styles.cameraBadge}
            bgColor="primary"
            w={28}
            h={28}
            borderRadius={14}
            justifyContent="center"
            alignItems="center">
            <Camera color="#FFFFFF" size={14} />
          </Flex>
        </Pressable>
        <Text fontSize={13} color="text-subtle" mt={8}>
          Tap to change photo
        </Text>
      </Flex>

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
    // marginHorizontal: -24,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  coverCameraIcon: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
  },
  avatarSection: {
    marginTop: -(AVATAR_SIZE / 2),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarBorder: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
