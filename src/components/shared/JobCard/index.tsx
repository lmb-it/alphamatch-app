/**
 * JobCard
 * Job summary card used in:
 *  - Home screen active jobs list (personal workspace)
 *  - Browse/feed (trading account workspace)
 *
 * Privacy rule: Shows first name only until deposit/acceptance.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MapPin, Clock, DollarSign} from 'lucide-react-native';
import {StatusBadge, type StatusType} from '../StatusBadge';

// ── Types ────────────────────────────────────────────────────────────────────

export interface JobCardProps {
  jobRef: string;
  title: string;
  /** First name only (privacy rule — no surname) */
  clientFirstName: string;
  clientAvatar?: string | null;
  budgetMin?: number;
  budgetMax?: number;
  location?: string;
  postedAt?: string;
  status?: StatusType;
  /** If omitted, shows as a browse card (no status badge) */
  onPress: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export const JobCard: React.FC<JobCardProps> = ({
  title,
  clientFirstName,
  budgetMin,
  budgetMax,
  location,
  postedAt,
  status,
  onPress,
}) => {
  const budgetText =
    budgetMin != null && budgetMax != null
      ? `$${budgetMin} – $${budgetMax}`
      : budgetMin != null
      ? `$${budgetMin}+`
      : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {status && <StatusBadge status={status} size="sm" />}
      </View>

      {/* Client */}
      <Text style={styles.client}>{clientFirstName}</Text>

      {/* Meta row */}
      <View style={styles.metaRow}>
        {budgetText && (
          <View style={styles.metaItem}>
            <DollarSign size={13} color="#6B7280" />
            <Text style={styles.metaText}>{budgetText}</Text>
          </View>
        )}
        {location && (
          <View style={styles.metaItem}>
            <MapPin size={13} color="#6B7280" />
            <Text style={styles.metaText} numberOfLines={1}>
              {location}
            </Text>
          </View>
        )}
        {postedAt && (
          <View style={styles.metaItem}>
            <Clock size={13} color="#6B7280" />
            <Text style={styles.metaText}>{postedAt}</Text>
          </View>
        )}
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
    gap: 6,
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
    lineHeight: 20,
  },
  client: {
    fontSize: 13,
    color: '#6B7280',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
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
