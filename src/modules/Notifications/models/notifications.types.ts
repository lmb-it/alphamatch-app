/**
 * Notifications module types
 */
export interface INotification {
  ref: string;
  type: 'bid_received' | 'bid_accepted' | 'bid_rejected' | 'deposit_paid' | 'message' | 'milestone' | 'system';
  title: string;
  body: string;
  data: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface INotificationsState {
  items: INotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}
