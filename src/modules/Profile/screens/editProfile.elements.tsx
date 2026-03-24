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
import type {IEditProfileForm, IEditProfileElementOptions} from '../models/profile.component.types';

export function getEditProfileElements(
  options: IEditProfileElementOptions,
): IFormElement<IEditProfileForm>[] {
  const {user, initialAddresses, t, formRef, addAddressRef, googleMapsApiKey} = options;

  return [
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
      label: () => {
        return (
          <Flex gap={10} alignItems={'center'} w={'full'}>
            <Text>Addresses</Text>
            <Button
              severity="brand"
              aspectRatio={1}
              outlined
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
          minusButton: (_total: number, removeOne: () => void) => (
            <Button
              severity="danger"
              aspectRatio={1}
              onClick={() => removeOne()}
              icon={<Icon name="trash" color={'white'} />}
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
          colSpan: 6,
        },
        {
          type: 'Location',
          id: 'fullAddress',
          label: 'Address',
          placeholder: 'Search for address',
          initialValue: '',
          provider: 'google',
          apiKey: googleMapsApiKey,
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
          colSpan: 12,
        },
        {
          type: 'Switch',
          id: 'manualEntry',
          displayAs: 'checkbox',
          label: 'Enter address manually',
          initialValue: false,
          colSpan: 12,
        },
        {
          type: 'Text',
          id: 'line1',
          label: 'Street Address',
          placeholder: 'Enter street address',
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          schema: Yup.string().when('manualEntry', {
            is: true,
            then: (s) => s.required('Street is required'),
          }),
          colSpan: 12,
        },
        {
          type: 'Text',
          id: 'stateName',
          label: 'State / Region',
          placeholder: 'Enter state',
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          colSpan: 12,
        },
        {
          type: 'Text',
          id: 'cityName',
          label: 'City',
          placeholder: 'Enter city',
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          schema: Yup.string().when('manualEntry', {
            is: true,
            then: (s) => s.required('City is required'),
          }),
          colSpan: 6,
        },
        {
          type: 'Text',
          id: 'zipCode',
          label: 'Postcode',
          placeholder: 'Postcode',
          initialValue: '',
          deps: ['addresses.current.manualEntry'],
          show: ([manualEntry]: any[]) => manualEntry === true,
          colSpan: 6,
        },
      ],
    },
  ];
}
