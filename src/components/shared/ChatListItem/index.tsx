/**
 * ChatListItem
 * Single row in the Chat tab list.
 * Shows job title, provider/client first name, last message preview,
 * unread badge, and lock icon when chat is not yet unlocked.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Lock, MessageCircle} from 'lucide-react-native';

// ── Types ────────────────────────────────────────────────────────────────────

export interface ChatListItemProps {
  roomId: string;
  jobTitle: string;
  /** First name only — surname only revealed after deposit/acceptance */
  counterpartFirstName: string;
  lastMessage: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isLocked: boolean;
  onPress: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export const ChatListItem: React.FC<ChatListItemProps> = ({
  jobTitle,
  counterpartFirstName,
  lastMessage,
  lastMessageTime,
  unreadCount = 0,
  isLocked,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.7}>
      {/* Avatar placeholder */}
      <View style={styles.avatar}>
        <Text style={styles.avatarInitial}>
          {counterpartFirstName.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {counterpartFirstName}
          </Text>
          {lastMessageTime && (
            <Text style={styles.time}>{lastMessageTime}</Text>
          )}
        </View>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {jobTitle}
        </Text>
        <View style={styles.bottomRow}>
          {isLocked ? (
            <View style={styles.lockedRow}>
              <Lock size={12} color="#9CA3AF" />
              <Text style={styles.lockedText}>Locked — pay deposit to unlock</Text>
            </View>
          ) : (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage}
            </Text>
          )}
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0F7F8',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00A8B1',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  jobTitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  lastMessage: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
  },
  lockedRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lockedText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00A8B1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
