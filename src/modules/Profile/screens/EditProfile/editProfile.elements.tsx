/**
 * EditProfile form elements — pure function, no hooks or state.
 *
 * Pattern B: Form elements live in a separate file because the screen
 * has significant non-form UI (cover photo picker, avatar picker, gradient).
 */
import React from 'react';
import {
  Text, Flex, Button, Icon,
  type IFormElement,
} from '@lmb-it/kitsconcerto';
import * as Yup from 'yup';
import {ADDRESS_TYPE_OPTIONS} from '@src/config/options';
import type {IEditProfileForm, IEditProfileElementOptions} from '../../models/profile.component.types';
import Config from "react-native-config";

export function getEditProfileElements(
  options: IEditProfileElementOptions,
): IFormElement<IEditProfileForm>[] {
  const {user, initialAddresses, t, formRef, addAddressRef, addLanguageRef, nationalities, languageOptions} = options;

  return [
    // Image URI fields — invisible but tracked in Form state.
    {
      id: 'coverImage',
      type: 'Text',
      label: '',
      initialValue: '' as any,
      show: () => false,
    },
    {
      id: 'avatarImage',
      type: 'Text',
      label: '',
      initialValue: '' as any,
      show: () => false,
    },
    {
      id: 'displayName',
      type: 'Text',
      label: t('profile.fields.firstName'),
      placeholder: t('profile.fields.firstNamePlaceholder'),
      colSpan: 4,
      initialValue: user?.displayName ?? '',
      schema: Yup.string().required(t('profile.fields.firstNameRequired')),
    },
    {
      id: 'middleName',
      type: 'Text',
      label: t('profile.fields.middleName'),
      placeholder: t('profile.fields.middleNamePlaceholder'),
      colSpan: 4,
      initialValue: user?.middleName ?? '',
    },
    {
      id: 'familyName',
      type: 'Text',
      label: t('profile.fields.lastName'),
      placeholder: t('profile.fields.lastNamePlaceholder'),
      colSpan: 4,
      initialValue: user?.familyName ?? '',
      schema: Yup.string().required(t('profile.fields.lastNameRequired')),
    },
    {
      type: 'Object',
      id: 'contactPhone',
      label: t('profile.fields.phoneNumber'),
      // output: 'phoneNumber',
      grid: {columns: 12, columnGap: 4},
      colSpan: 12,
      elements: [
        {
          type: 'Select',
          id: 'phoneCountryId',
          placeholder: t('profile.fields.countryCode'),
          initialValue: '14',
          list: [{label: '🇦🇺 +61 (AU)', value: '14'}],
          labelKey: 'label',
          valueKey: 'value',
          colSpan: 4,
          isDisabled: true,
        },
        {
          type: 'Text',
          id: 'phoneNumber',
          placeholder: t('profile.fields.phoneNumberPlaceholder'),
          initialValue: user?.contactPhone ?? '',
          keyboardType: 'phone-pad',
          colSpan: 8,
        },
      ],
    },
    {
      id: 'shortBio',
      type: 'Textarea',
      label: t('profile.fields.bio'),
      placeholder: t('profile.fields.bioPlaceholder'),
      colSpan: 12,
      initialValue: user?.shortBio ?? '',
      rows: 4,
    },
    // ── Gender (optional) ──
    {
      id: 'gender',
      type: 'Select',
      label: t('profile.fields.gender'),
      placeholder: t('profile.fields.genderPlaceholder'),
      colSpan: 12,
      initialValue: user?.gender ?? '',
      list: [
        {label: t('profile.gender.male'), value: 'male'},
        {label: t('profile.gender.female'), value: 'female'},
      ],
      labelKey: 'label',
      valueKey: 'value',
    },
    // ── Date of Birth (optional) ──
    {
      id: 'birthDate',
      type: 'Date',
      label: t('profile.fields.birthDate'),
      placeholder: t('profile.fields.birthDatePlaceholder'),
      colSpan: 12,
      initialValue: user?.birthDate ? new Date(user.birthDate) : null,
    },
    // ── Nationality (optional) — Select dropdown with filter, sends iso2 code ──
    {
      id: 'nationalityRef',
      type: 'Select',
      label: t('profile.fields.nationality') || 'Nationality (optional)',
      placeholder: t('profile.fields.nationalityPlaceholder') || 'Select nationality',
      colSpan: 12,
      initialValue: user?.nationalityRef ?? '',
      list: options.nationalities,
      labelKey: 'label',
      valueKey: 'value',
      withFilter: true,
    },
    // ── Languages — repeatable Group (optional) ──
    {
      type: 'Group',
      id: 'languages',
      label: (f, fc, a, group) => {
        return (
            <Flex gap={10} alignItems={'center'} w={'full'}>
              <Text>{t('profile.fields.languages')}</Text>
              <Button
                  severity="brand"
                  aspectRatio={1}
                  outlined
                  size={'sm'}
                  onClick={() => addLanguageRef.current?.()}
                  icon={<Icon name="plus" color={'brand.500'} />}
              />
            </Flex>
        );
      },
      colSpan: 12,
      initialValue: (user?.languages ?? []).map(l => ({
        ref: l.ref,
        proficiencyLevel: l.proficiencyLevel ?? 'intermediate',
        isNative: l.isNative ?? false,
      })),
      groupsSettings: {
        repeatable: {
          plusButton: (total: number, addOne: () => void) => {
            addLanguageRef.current = addOne;
            return null;
          },
          maxRepeats: 5,
          minRepeats: 0,
        },
        grid: {columns: 12},
      },
      elements: [
        {
          id: 'ref',
          type: 'Select',
          label: t('profile.fields.languageName'),
          placeholder: t('profile.fields.languageNamePlaceholder'),
          colSpan: 6,
          initialValue: '',
          list: options.languageOptions,
          labelKey: 'label',
          valueKey: 'value',
          withFilter: true,
        },
        {
          id: 'proficiencyLevel',
          type: 'Select',
          label: t('profile.fields.proficiency'),
          colSpan: 5,
          initialValue: 'intermediate',
          list: [
            {label: t('profile.proficiency.beginner'), value: 'beginner'},
            {label: t('profile.proficiency.intermediate'), value: 'intermediate'},
            {label: t('profile.proficiency.advanced'), value: 'advanced'},
            {label: t('profile.proficiency.fluent'), value: 'fluent'},
          ],
          labelKey: 'label',
          valueKey: 'value',
        },
        {
          id: 'minusButton',
          type: 'Container',
          colSpan: 1,
          children:(value, context, group)=>{
            return <Flex mt={28}>
              <Button
                  severity="danger"
                  aspectRatio={1}
                  onClick={() => group?.remove()}
                  icon={<Icon name="trash" color={'white'} />}
              />
            </Flex>
          }
        },
        {
          id: 'isNative',
          type: 'Switch',
          displayAs: 'checkbox',
          label: t('profile.fields.isNative'),
          colSpan: 2,
          initialValue: false,
        },
      ],
    },
    // ── Addresses — repeatable Group ──
    {
      type: 'Group',
      id: 'addresses',
      label: () => {
        return (
          <Flex gap={10} alignItems={'center'} w={'full'}>
            <Text>{t('profile.address.title')}</Text>
            <Button
              severity="brand"
              aspectRatio={1}
              outlined
              size={'sm'}
              onClick={() => addAddressRef.current?.()}
              icon={<Icon name="plus" color={'brand.500'} />}
            />
          </Flex>
        );
      },
      colSpan: 12,
      initialValue: initialAddresses,
      groupsSettings: {
        repeatable: {
          plusButton: (total: number, addOne: () => void) => {
            addAddressRef.current = addOne;
            return null;
          },
          maxRepeats: 5,
          minRepeats: 0,
        },
        grid: {columns: 12},
      },
      elements: [
        {
          type: 'Select',
          id: 'addressType',
          label: t('profile.address.type'),
          initialValue: 'home',
          list: ADDRESS_TYPE_OPTIONS.map(o => ({...o, label: t(o.label)})),
          schema: Yup.string().required(t('profile.address.typeRequired')),
          colSpan: 12,
        },
        {
          type: 'Location',
          id: 'fullAddress',
          label: t('profile.address.address'),
          placeholder: t('profile.address.searchPlaceholder'),
          initialValue: '',
          provider: 'google',
          apiKey: Config.GOOGLE_MAPS_API_KEY,
          deps: ['addresses.current.manualEntry'],
          isDisabled: ([manualEntry]: any[]) => manualEntry === true,
          onAddressClick: (address: any, group) => {
            if (!group) return;
            const prefix = `addresses.${group.index}` as `addresses.${number}`;
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
          colSpan: 11,
        },
        {
          id: 'minusButton',
          type: 'Container',
          colSpan: 1,
          children:(value, context, group)=>{
            return <Flex mt={28}>
              <Button
                  severity="danger"
                  aspectRatio={1}
                  onClick={() => group?.remove()}
                  icon={<Icon name="trash" color={'white'} />}
              />
            </Flex>
          }
        },
        {
          type: 'Switch',
          id: 'manualEntry',
          displayAs: 'checkbox',
          label: t('profile.address.manualEntry'),
          initialValue: false,
          colSpan: 12,
        },
        {
          type: 'Text',
          id: 'line1',
          label: t('profile.address.street'),
          placeholder: t('profile.address.streetPlaceholder'),
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          schema: Yup.string().when('manualEntry', {
            is: true,
            then: (s) => s.required(t('profile.address.streetRequired')),
          }),
          colSpan: 12,
        },
        {
          type: 'Text',
          id: 'stateName',
          label: t('profile.address.state'),
          placeholder: t('profile.address.statePlaceholder'),
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          colSpan: 12,
        },
        {
          type: 'Text',
          id: 'cityName',
          label: t('profile.address.city'),
          placeholder: t('profile.address.cityPlaceholder'),
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          schema: Yup.string().when('manualEntry', {
            is: true,
            then: (s) => s.required(t('profile.address.cityRequired')),
          }),
          colSpan: 6,
        },
        {
          type: 'Text',
          id: 'zipCode',
          label: t('profile.address.postcode'),
          placeholder: t('profile.address.postcodePlaceholder'),
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          colSpan: 6,
        },
      ],
    },
  ];
}
