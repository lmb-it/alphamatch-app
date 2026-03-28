/**
 * BasicInformation form elements — extracted from BasicInformationScreen.
 * The avatar template is passed in as an option since it contains JSX.
 */
import type {IFormElement} from '@lmb-it/kitsconcerto';
import * as Yup from 'yup';
import type {IBasicInfoForm} from '../../models/tradingAccount.form.types';

export interface IBasicInfoElementOptions {
  t: (key: string) => string;
  user: {displayName?: string | null; familyName?: string | null; contactEmail?: string | null} | null;
  avatarTemplate: (props: any) => any;
  onImageChange: (value: Record<string, unknown>) => void;
  googleMapsApiKey: string;
}

const PRIVACY_NOTE =
  'This information will not be visible to anyone unless you choose to grant access.';

export function getBasicInfoElements(
  options: IBasicInfoElementOptions,
): IFormElement[] {
  const {t, user, avatarTemplate, onImageChange, googleMapsApiKey} = options;

  return [
    // ── Profile image (scoped to trading account; does NOT update global profile) ──
    {
      id: 'profileImage',
      type: 'Image',
      colSpan: 12,
      multiple: false,
      limit: 1,
      onChangeValue: onImageChange,
      schema: Yup.object(),
      template: avatarTemplate,
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
      apiKey: googleMapsApiKey,
      provider: 'google',
      countryISO: 'aus',
      forceSelection: true,
    } as any,
  ];
}
