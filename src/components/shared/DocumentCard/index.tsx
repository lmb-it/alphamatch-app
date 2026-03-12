/**
 * DocumentCard
 * Shows a document name, expiry date, status badge, and delete action.
 * Used in the Documents screen and verification flows.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FileText, Trash2, AlertTriangle} from 'lucide-react-native';
import {StatusBadge, type StatusType} from '../StatusBadge';

// ── Types ────────────────────────────────────────────────────────────────────

export interface DocumentCardProps {
  name: string;
  expiryDate?: string;
  status: StatusType;
  isExpiringSoon?: boolean;
  onDelete?: () => void;
  onPress?: () => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_EXPIRES = 'Expires';
const LABEL_EXPIRING_SOON = 'Expiring soon';

// ── Component ────────────────────────────────────────────────────────────────

export const DocumentCard: React.FC<DocumentCardProps> = ({
  name,
  expiryDate,
  status,
  isExpiringSoon = false,
  onDelete,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <FileText size={24} color="#00A8B1" />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {expiryDate && (
          <View style={styles.expiryRow}>
            {isExpiringSoon && (
              <AlertTriangle size={12} color="#D97706" />
            )}
            <Text
              style={[styles.expiry, isExpiringSoon && styles.expiryWarning]}>
              {isExpiringSoon ? LABEL_EXPIRING_SOON : LABEL_EXPIRES}: {expiryDate}
            </Text>
          </View>
        )}
        <StatusBadge status={status} size="sm" />
      </View>
      {onDelete && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={onDelete}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 20,
    marginVertical: 6,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E0F7F8',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expiry: {
    fontSize: 12,
    color: '#6B7280',
  },
  expiryWarning: {
    color: '#D97706',
  },
  deleteBtn: {
    padding: 4,
    flexShrink: 0,
  },
});
