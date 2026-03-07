/**
 * Bids module types
 */
export interface IBid {
  ref: string;
  jobRef: string;
  jobTitle: string;
  amount: number;
  currency: string;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  portfolioSamples: string[];
  createdAt: string;
  bidder: {
    firstName: string;
    avatar: string | null;
    rating: number | null;
  };
}

export interface IBidsState {
  myBids: IBid[];
  jobBids: IBid[];
  loading: boolean;
  error: string | null;
}

export interface ICreateBidPayload {
  jobRef: string;
  amount: number;
  proposal: string;
  portfolioSamples?: string[];
}
