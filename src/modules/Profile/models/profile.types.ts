/**
 * Profile module types
 */
export interface IProfile {
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  coverImage: string | null;
  bio: string | null;
  location: {
    country: string;
    city: string;
  } | null;
  careers: string[];
  rating: number | null;
  totalJobs: number;
  totalEarnings: number;
  portfolio: IPortfolioItem[];
  isVerified: boolean;
}

export interface IPortfolioItem {
  ref: string;
  title: string;
  description: string;
  images: string[];
  careerRef: string;
  createdAt: string;
}

/**
 * Extended profile data returned by the API — includes display fields
 * and workspace context used by the profile slice.
 */
export interface IProfileData extends IProfile {
  displayName: string | null;
  familyName: string | null;
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
  careerRef: string | null;
  careerName: string | null;
  careerModel: string | null;
  avatar: string | null;
  isActive: boolean;
}

/**
 * Payload for updating basic user details.
 */
export interface IUpdateProfilePayload {
  displayName?: string;
  familyName?: string;
  contactPhone?: string;
  shortBio?: string;
  nationality?: string;
  gender?: 'male' | 'female';
  birthDate?: string;
}

export interface IProfileState {
  data: IProfileData | null;
  activeWorkspace: string | null;
  loading: boolean;
  error: string | null;
}
