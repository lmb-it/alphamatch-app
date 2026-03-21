/**
 * Auth module types
 *
 * IUser mirrors the appMap output from Backend UserResource:
 *   identifier, uid, contactEmail, active, emailConfirmed, confirmed,
 *   registeredAt, modifiedAt + profile fields (displayName, familyName, avatar)
 *   + relation fields (contactPhone, phoneVerified)
 */
export interface IUser {
  identifier: string;
  uid: string;
  contactEmail: string;
  authMethod: 'email' | 'phone' | 'google' | 'apple';
  active: boolean;
  emailConfirmed: boolean;
  confirmed: boolean;
  welcomeSeen: boolean;
  displayName: string | null;
  familyName: string | null;
  avatar: string | null;
  contactPhone: string | null;
  phoneVerified: boolean;
  registeredAt: string;
  modifiedAt: string;
}

export type WelcomeIntent = 'findWork' | 'postJob' | 'both' | null;

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  pendingVerification: IPendingVerification | null;
  resetContact: string | null;
  welcomeIntent: WelcomeIntent;
}

export interface IPendingVerification {
  contactEmail: string;
  context: 'emailVerification' | 'phoneVerification' | 'passwordReset';
}

export interface ILoginPayload {
  contactEmail?: string;
  contactPhone?: string;
  secret: string;
}

export interface IRegisterPayload {
  contactEmail: string;
  secret: string;
  secret_confirmation: string;
}

export interface IVerifyEmailPayload {
  contactEmail: string;
  verificationCode: string;
}

export interface IResendCodePayload {
  contactEmail: string;
}

export interface ISocialLoginPayload {
  providerName: 'google' | 'apple';
  providerToken: string;
}

export interface IPhoneLoginPayload {
  firebaseToken: string;
}

export interface IForgotPasswordPayload {
  contactInfo: string;
}

export interface IVerifyResetCodePayload {
  contactInfo: string;
  resetCode: string;
}

export interface IResetPasswordPayload {
  contactInfo: string;
  resetToken: string;
  newSecret: string;
  newSecret_confirmation: string;
}
