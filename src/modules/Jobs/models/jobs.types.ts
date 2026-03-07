/**
 * Jobs module types
 */
export interface IJob {
  ref: string;
  title: string;
  description: string;
  maxBudget: number;
  currency: string;
  location: {
    country: string;
    city: string;
    countryEmoji?: string;
  };
  careers: string[];
  skills: string[];
  biddingType: 'reverse_auction' | 'standard';
  modelType: 'alpha_pro' | 'alpha_flex';
  teamRequired: boolean;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  totalBids: number;
  lowestBid: number | null;
  postedBy: {
    firstName: string;
    avatar: string | null;
  };
  postedAt: string;
  duration: string | null;
  isAiRecommended?: boolean;
}

export interface IJobsState {
  feed: IJob[];
  myJobs: IJob[];
  selectedJob: IJob | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    total: number;
  };
}

export interface ICreateJobPayload {
  title: string;
  description: string;
  maxBudget: number;
  currency: string;
  countryRef: string;
  cityRef?: string;
  careerRefs: string[];
  skillRefs?: string[];
  modelType: 'alpha_pro' | 'alpha_flex';
  biddingType?: 'reverse_auction' | 'standard';
  teamRequired: boolean;
  duration?: string;
}
