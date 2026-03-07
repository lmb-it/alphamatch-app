/**
 * Payments module types
 */
export interface IPaymentMethod {
  ref: string;
  type: 'card' | 'bank';
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface ITransaction {
  ref: string;
  type: 'deposit' | 'payout' | 'refund' | 'fee';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  jobRef?: string;
  createdAt: string;
}

export interface IPaymentsState {
  methods: IPaymentMethod[];
  transactions: ITransaction[];
  earnings: {
    total: number;
    pending: number;
    available: number;
    currency: string;
  } | null;
  loading: boolean;
  error: string | null;
}
