/**
 * Login form field configuration.
 * Labels must be pre-translated — KitsConcerto native Form does NOT auto-translate.
 */
import {type IFormElement} from '@lmb-it/kitsconcerto';
import * as Yup from 'yup';

export interface ILoginForm {
  identifier: string;
  password: string;
}

export const getLoginFormElements = (
  t: (key: string) => string,
): IFormElement<ILoginForm>[] => [
  {
    id: 'identifier',
    type: 'Text',
    label: ([], values, formContext)=>{
      const value = formContext.getValues('identifier');
      if(/^\d/.test(value)){
        return t('auth.phone')
      }else if(!!value){
        return t('auth.email')
      }
      return t('auth.emailOrPhone')
    },
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
      .min(6, t('auth.passwordMin6')),
  },
];
