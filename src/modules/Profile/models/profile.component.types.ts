/**
 * Profile component types — EditProfileScreen
 *
 * Types extracted from EditProfileScreen to follow module structure rules.
 * No inline type definitions in screen files.
 */
import type {MutableRefObject} from 'react';
import type {IUseFormReturn} from '@lmb-it/kitsconcerto';
import type {IProfileUser} from './profile.types';

/** Shape of a single address entry inside the edit profile form. */
export interface IAddressEntry {
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

/** Top-level form data shape for the edit profile form. */
export interface IEditProfileForm {
  displayName: string;
  middleName: string;
  familyName: string;
  contactPhone: string;
  shortBio: string;
  addresses: IAddressEntry[];
}

/** Options passed to the form elements builder function. */
export interface IEditProfileElementOptions {
  user: IProfileUser | null;
  initialAddresses: IAddressEntry[];
  t: (key: string) => string;
  formRef: MutableRefObject<IUseFormReturn<IEditProfileForm> | null>;
  addAddressRef: MutableRefObject<(() => void) | null>;
  googleMapsApiKey: string;
}
