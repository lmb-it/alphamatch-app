/**
 * VerificationRow
 * SectionMenuRow variant that shows a verified/unverified badge on the right.
 * Used in Trust Verification and Verification Status sections.
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckCircle, AlertCircle} from 'lucide-react-native';
import {SectionMenuRow, type SectionMenuRowProps} from '../SectionMenuRow';
import type {LucideIcon} from 'lucide-react-native';

// ── Types ────────────────────────────────────────────────────────────────────

interface VerificationRowProps extends Omit<SectionMenuRowProps, 'rightBadge'> {
  isVerified: boolean;
  verifiedLabel?: string;
  unverifiedLabel?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export const VerificationRow: React.FC<VerificationRowProps> = ({
  isVerified,
  verifiedLabel = 'Verified',
  unverifiedLabel = 'Not verified',
  ...rowProps
}) => {
  const badge = (
    <View style={[styles.badge, isVerified ? styles.verified : styles.unverified]}>
      {isVerified ? (
        <CheckCircle size={12} color="#16A34A" />
      ) : (
        <AlertCircle size={12} color="#D97706" />
      )}
      <Text style={[styles.badgeText, isVerified ? styles.verifiedText : styles.unverifiedText]}>
        {isVerified ? verifiedLabel : unverifiedLabel}
      </Text>
    </View>
  );

  return <SectionMenuRow {...rowProps} rightBadge={badge} />;
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  verified: {
    backgroundColor: '#DCFCE7',
  },
  unverified: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  verifiedText: {
    color: '#16A34A',
  },
  unverifiedText: {
    color: '#D97706',
  },
});
