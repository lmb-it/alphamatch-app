/**
 * Register form field configuration – matches Sign Up mockup.
 * Labels must be pre-translated — KitsConcerto native Form does NOT auto-translate.
 * Additional profile fields (name, phone) are collected in onboarding.
 */
import {type IFormElement} from '@lmb/kitsconcerto';
import * as Yup from 'yup';

export interface IRegisterForm {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const getRegisterFormElements = (
  t: (key: string) => string,
): IFormElement<IRegisterForm>[] => [
  {
    id: 'email',
    type: 'Text',
    label: t('auth.emailOrPhone'),
    placeholder: t('auth.emailOrPhonePlaceholder'),
    colSpan: 12,
    schema: Yup.string().required(t('auth.emailRequired')),
  },
  {
    id: 'password',
    type: 'Password',
    label: t('auth.password'),
    placeholder: t('auth.passwordPlaceholder'),
    colSpan: 12,
    schema: Yup.string()
      .required(t('auth.passwordRequired'))
      .min(8, t('auth.passwordMin8')),
  },
  {
    id: 'passwordConfirmation',
    type: 'Password',
    label: t('auth.confirmPassword'),
    placeholder: t('auth.confirmPasswordPlaceholder'),
    colSpan: 12,
    schema: Yup.string()
      .required(t('auth.confirmPasswordRequired'))
      .oneOf([Yup.ref('password')], t('auth.passwordsMustMatch')),
  },
];
