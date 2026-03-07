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

export interface IProfileState {
  profile: IProfile | null;
  viewedProfile: IProfile | null;
  loading: boolean;
  error: string | null;
}
