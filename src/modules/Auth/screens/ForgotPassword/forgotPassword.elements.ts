/**
 * ForgotPassword form elements — extracted from ForgotPasswordScreen.
 */
import type {IFormElement} from '@lmb-it/kitsconcerto';
import * as Yup from 'yup';
import type {IForgotPasswordForm, INewPasswordForm} from '../../models/auth.form.types';

export interface IForgotPasswordElementOptions {
  t: (key: string) => string;
}

export function getRequestElements(
  options: IForgotPasswordElementOptions,
): IFormElement<IForgotPasswordForm>[] {
  const {t} = options;
  return [
    {
      id: 'identifier',
      type: 'Text',
      label: t('auth.emailOrPhone'),
      placeholder: t('auth.emailOrPhonePlaceholder'),
      colSpan: 12,
      schema: Yup.string().required(t('auth.emailRequired')),
    },
  ];
}

export function getPasswordElements(
  options: IForgotPasswordElementOptions,
): IFormElement<INewPasswordForm>[] {
  const {t} = options;
  return [
    {
      id: 'newSecret',
      type: 'Password',
      label: t('auth.newPassword'),
      placeholder: t('auth.newPasswordPlaceholder'),
      colSpan: 12,
      toggleEye: true,
      schema: Yup.string()
        .required(t('auth.passwordRequired'))
        .min(6, t('auth.passwordMin6')),
    },
    {
      id: 'newSecret_confirmation',
      type: 'Password',
      label: t('auth.confirmPassword'),
      placeholder: t('auth.confirmPasswordPlaceholder'),
      colSpan: 12,
      toggleEye: true,
      schema: Yup.string()
        .required(t('auth.confirmPasswordRequired'))
        .oneOf([Yup.ref('newSecret')], t('auth.passwordsMustMatch')),
    },
  ];
}
