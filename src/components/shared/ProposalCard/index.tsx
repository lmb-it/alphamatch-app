/**
 * ProposalCard
 * Bid/proposal summary card used in My Bids (trading account mode).
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar, DollarSign} from 'lucide-react-native';
import {StatusBadge, type StatusType} from '../StatusBadge';

// ── Types ────────────────────────────────────────────────────────────────────

export interface ProposalCardProps {
  proposalRef: string;
  jobTitle: string;
  bidAmount: number;
  bidDate: string;
  status: StatusType;
  onPress: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export const ProposalCard: React.FC<ProposalCardProps> = ({
  jobTitle,
  bidAmount,
  bidDate,
  status,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {jobTitle}
        </Text>
        <StatusBadge status={status} size="sm" />
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <DollarSign size={13} color="#6B7280" />
          <Text style={styles.metaText}>${bidAmount}</Text>
        </View>
        <View style={styles.metaItem}>
          <Calendar size={13} color="#6B7280" />
          <Text style={styles.metaText}>{bidDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
