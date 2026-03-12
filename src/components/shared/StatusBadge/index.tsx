/**
 * StatusBadge
 * Coloured pill label for job/bid status.
 * Used across job cards, bid cards, and detail screens.
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native';

// ── Types ────────────────────────────────────────────────────────────────────

export type StatusType =
  | 'active'
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'awarded'
  | 'declined'
  | 'locked'
  | 'unverified'
  | 'verified';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<StatusType, string> = {
  active: 'Active',
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
  awarded: 'Awarded',
  declined: 'Declined',
  locked: 'Locked',
  unverified: 'Unverified',
  verified: 'Verified',
};

const STATUS_COLORS: Record<StatusType, {bg: string; text: string}> = {
  active: {bg: '#DCFCE7', text: '#16A34A'},
  pending: {bg: '#FEF9C3', text: '#CA8A04'},
  completed: {bg: '#DBEAFE', text: '#2563EB'},
  cancelled: {bg: '#F3F4F6', text: '#6B7280'},
  awarded: {bg: '#F3E8FF', text: '#9333EA'},
  declined: {bg: '#FEE2E2', text: '#DC2626'},
  locked: {bg: '#F3F4F6', text: '#6B7280'},
  unverified: {bg: '#FEF3C7', text: '#D97706'},
  verified: {bg: '#DCFCE7', text: '#16A34A'},
};

// ── Component ────────────────────────────────────────────────────────────────

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
}) => {
  const {bg, text} = STATUS_COLORS[status];
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {backgroundColor: bg},
        isSmall ? styles.small : styles.medium,
      ]}>
      <Text
        style={[
          styles.label,
          {color: text},
          isSmall ? styles.labelSmall : styles.labelMedium,
        ]}>
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  label: {
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 11,
  },
  labelMedium: {
    fontSize: 13,
  },
});
