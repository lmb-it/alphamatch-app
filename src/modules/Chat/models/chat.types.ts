/**
 * Chat module types
 */
export interface IChatRoom {
  ref: string;
  name: string;
  type: 'direct' | 'team' | 'job';
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
  participants: {
    ref: string;
    firstName: string;
    avatar: string | null;
  }[];
  jobRef?: string;
}

export interface IChatMessage {
  ref: string;
  roomRef: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  sender: {
    ref: string;
    firstName: string;
    avatar: string | null;
  };
  createdAt: string;
  readBy: string[];
}

export interface IChatState {
  rooms: IChatRoom[];
  activeRoom: IChatRoom | null;
  messages: Record<string, IChatMessage[]>; // roomRef → messages
  loading: boolean;
  error: string | null;
}
