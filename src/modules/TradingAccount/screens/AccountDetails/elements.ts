/**
 * AccountDetails form elements — extracted from AccountDetailsScreen.
 */
import type {IFormElement} from '@lmb-it/kitsconcerto';

export interface IAccountDetailsElementOptions {
  t: (key: string) => string;
  basicInfo: {businessPhone?: string; fullAddress?: string} | null;
}

export function getAccountDetailsElements(
  options: IAccountDetailsElementOptions,
): any[] {
  const {t, basicInfo} = options;

  return [
    {
      id: 'shortBio',
      label: t('ta.bio'),
      type: 'Textarea',
      placeholder: t('ta.bioPlaceholder'),
      section: t('ta.general'),
    },
    {
      id: 'contactEmail',
      label: t('ta.email'),
      type: 'Text',
      placeholder: t('trading.details.emailPlaceholder'),
      section: t('ta.contact'),
      disabled: true,
    },
    {
      id: 'contactPhone',
      label: t('ta.phone'),
      type: 'Text',
      placeholder: t('ta.phonePlaceholder'),
      defaultValue: basicInfo?.businessPhone || '',
      section: t('ta.contact'),
    },
    {
      id: 'fullAddress',
      label: t('ta.addressField'),
      type: 'Text',
      placeholder: t('ta.addressPlaceholder'),
      defaultValue: basicInfo?.fullAddress || '',
      section: t('ta.address'),
    },
    {
      id: 'zipCode',
      label: t('ta.postalCode'),
      type: 'Text',
      placeholder: t('ta.postalCodePlaceholder'),
      section: t('ta.address'),
    },
  ];
}
