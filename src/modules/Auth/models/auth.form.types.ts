/**
 * Auth form types — extracted from ForgotPasswordScreen
 */

export interface IForgotPasswordForm {
  identifier: string;
}

export interface INewPasswordForm {
  newSecret: string;
  newSecret_confirmation: string;
}

export type Step = 'request' | 'verifyCode' | 'newPassword';
