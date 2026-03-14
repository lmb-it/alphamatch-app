/**
 * Notifications module types
 */
export type NotificationType =
  | 'bid_received'
  | 'bid_accepted'
  | 'bid_rejected'
  | 'deposit_paid'
  | 'message'
  | 'milestone'
  | 'system'
  | 'document_expiry_reminder'
  | 'account_suspended'
  | 'document_renewed'
  | 'tier_upgraded';

export type NotificationAction =
  | 'navigate_to_documents'
  | 'navigate_to_tier_status';

export interface INotification {
  ref: string;
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, any>;
  action?: NotificationAction;
  isRead: boolean;
  createdAt: string;
}

export interface INotificationsState {
  items: INotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}
