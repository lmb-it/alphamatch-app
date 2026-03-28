/**
 * Profile module types
 *
 * Field names match Backend appMap() aliases exactly.
 * Source of truth: GET /app/profile/me response.
 */

/**
 * The `user` object within the profile API response.
 * Every field name matches the Backend appMap() alias.
 */
export interface IProfileUser {
  identifier: string;
  uid: string;
  contactEmail: string;
  active: boolean;
  emailConfirmed: boolean;
  confirmed: boolean;
  registeredAt: string;
  modifiedAt: string;
  authMethod: string;
  welcomeSeen: boolean;
  displayName: string | null;
  familyName: string | null;
  middleName: string | null;
  nationalityRef: string | null;
  gender: string | null;
  birthDate: string | null;
  shortBio: string | null;
  avatar: string | null;
  coverImage: string | null;
  contactPhone: string | null;
  phoneCountryId: number | null;
  phoneVerified: boolean;
  addresses: IAddress[];
  languages: IUserLanguage[];
}

export interface IUserLanguage {
  ref: string;
  name: string;
  nameNative: string;
  iso2: string;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
  isNative: boolean;
}

/**
 * Full profile API response from GET /app/profile/me.
 * Top-level shape: { user, activeWorkspace, tradingAccounts }.
 */
export interface IProfileData {
  user: IProfileUser;
  activeWorkspace: string | null;
  tradingAccounts: ITradingAccountSummary[];
}

/**
 * Payload for switching the active workspace.
 */
export interface ISwitchWorkspacePayload {
  workspaceRef: string;
}

/**
 * Compact trading-account summary shown in profile lists and
 * workspace switcher.
 */
export interface ITradingAccountSummary {
  identifier: string;
  accountName: string | null;
  shortBio: string | null;
  contactPhone: string | null;
  locationType: string | null;
  fullAddress: string | null;
  zipCode: string | null;
  isActive: boolean;
  isVerified: boolean;
  setupStatus: string | null;
  createdAt: string;
  careerRef: string | null;
  careerName: string | null;
  careerModel: string | null;
  avatar: string | null;
  countryName: string | null;
  stateName: string | null;
  cityName: string | null;
}

/**
 * Payload for updating basic user details.
 */
export interface IUpdateProfilePayload {
  displayName?: string;
  middleName?: string;
  familyName?: string;
  contactPhone?: string;
  phoneCountryId?: number;
  shortBio?: string;
  nationalityRef?: string;
  gender?: 'male' | 'female' | string;
  birthDate?: string;
  languages?: Array<{ref: string; proficiencyLevel: string; isNative: boolean}>;
}

export interface IProfileState {
  data: IProfileData | null;
  activeWorkspace: string | null;
  loading: boolean;
  error: string | null;
  // Portfolio sections — per trading account
  experiences: ISectionState<IExperience>;
  education: ISectionState<IEducation>;
  qualifications: ISectionState<IQualification>;
  references: ISectionState<IReference>;
  portfolioItems: ISectionState<IPortfolioItemDetail>;
}

/** Generic section state for portfolio sub-sections */
export interface ISectionState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}

// ── Portfolio Section Types ──────────────────────────────────────────────────
// Field names match Backend Map appMap() aliases exactly.

export interface IExperience {
  identifier: string;
  jobTitle: string;
  company: string;
  countryRef: string | null;
  countryName?: string | null;
  city: string | null;
  startMonth: number;
  startYear: number;
  endMonth: number | null;
  endYear: number | null;
  isCurrent: boolean;
  description: string | null;
  createdAt: string;
}

export interface IEducation {
  identifier: string;
  countryRef: string | null;
  countryName?: string | null;
  institution: string;
  degree: string;
  startYear: number;
  endYear: number | null;
  createdAt: string;
}

export interface IQualification {
  identifier: string;
  title: string;
  organisation: string;
  summary: string | null;
  year: number;
  createdAt: string;
}

export interface IReference {
  identifier: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  jobTitle: string | null;
  relationship: 'manager' | 'colleague' | 'client' | 'friend' | 'other';
  knownSince: string | null;
  createdAt: string;
}

export interface IPortfolioItemDetail {
  identifier: string;
  heading: string;
  summary: string | null;
  startedOn: string | null;
  endedOn: string | null;
  externalLink: string | null;
  isActive: boolean;
  images: IPortfolioImage[];
  createdAt: string;
}

export interface IPortfolioImage {
  identifier: string;
  caption: string | null;
  isPrimary: boolean;
}

// ── Address Types ────────────────────────────────────────────────────────────
// Field names match Backend AddressMap::appMap() aliases exactly.

export type AddressType = 'home' | 'office' | 'warehouse' | 'site' | 'other';
export type EntryMode = 'autocomplete' | 'manual';

export interface IAddress {
  identifier: string;
  addressType: AddressType;
  addressLabel: string | null;
  fullAddress: string;
  line1: string | null;
  line2: string | null;
  stateName: string | null;
  cityName: string | null;
  zipCode: string | null;
  lat: number | null;
  lng: number | null;
  googlePlaceId: string | null;
  entryMode: EntryMode;
  isPrimary: boolean;
}

export interface ICreateAddress {
  addressType: AddressType;
  addressLabel?: string | null;
  fullAddress: string;
  line1?: string | null;
  line2?: string | null;
  stateName?: string | null;
  cityName?: string | null;
  zipCode?: string | null;
  lat?: number | null;
  lng?: number | null;
  googlePlaceId?: string | null;
  entryMode: EntryMode;
  isPrimary?: boolean;
}

// ── Create/Update payloads ───────────────────────────────────────────────────

export interface ICreateExperience {
  jobTitle: string;
  company: string;
  countryRef?: string | null;
  city?: string | null;
  startMonth: number;
  startYear: number;
  endMonth?: number | null;
  endYear?: number | null;
  isCurrent: boolean;
  description?: string | null;
}

export interface ICreateEducation {
  countryRef?: string | null;
  institution: string;
  degree: string;
  startYear: number;
  endYear?: number | null;
}

export interface ICreateQualification {
  title: string;
  organisation: string;
  summary?: string | null;
  year: number;
}

export interface ICreateReference {
  fullName: string;
  relationship: 'manager' | 'colleague' | 'client' | 'friend' | 'other';
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  knownSince?: string | null;
}

export interface ICreatePortfolioItem {
  heading: string;
  summary?: string | null;
  startedOn?: string | null;
  endedOn?: string | null;
  externalLink?: string | null;
}
