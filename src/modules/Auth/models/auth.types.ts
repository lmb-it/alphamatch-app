/**
 * Auth module types
 *
 * IUser mirrors the appMap output from Backend UserResource:
 *   identifier, uid, contactEmail, active, emailConfirmed, confirmed,
 *   registeredAt, modifiedAt + profile fields (displayName, familyName, avatar, accountType)
 */
export interface IUser {
  identifier: string;
  uid: string;
  contactEmail: string;
  active: boolean;
  emailConfirmed: boolean;
  confirmed: boolean;
  displayName: string | null;
  familyName: string | null;
  avatar: string | null;
  accountType: 'customer' | 'worker';
  registeredAt: string;
  modifiedAt: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ILoginPayload {
  contactEmail: string;
  secret: string;
}

export interface IRegisterPayload {
  contactEmail: string;
  secret: string;
  secret_confirmation: string;
}
