/**
 * WalletHeader
 * Balance card with quick action buttons: Top Up, Withdraw, Download Statement.
 * Used on Wallet and Earnings screens.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ArrowDownLeft, ArrowUpRight, Download} from 'lucide-react-native';

// ── Types ────────────────────────────────────────────────────────────────────

interface WalletHeaderProps {
  balance: number;
  currency?: string;
  onTopUp?: () => void;
  onWithdraw?: () => void;
  onDownloadStatement?: () => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_TOP_UP = 'Top Up';
const LABEL_WITHDRAW = 'Withdraw';
const LABEL_STATEMENT = 'Statement';
const LABEL_BALANCE = 'Available Balance';

// ── Component ────────────────────────────────────────────────────────────────

export const WalletHeader: React.FC<WalletHeaderProps> = ({
  balance,
  currency = 'USD',
  onTopUp,
  onWithdraw,
  onDownloadStatement,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{LABEL_BALANCE}</Text>
      <Text style={styles.balance}>
        {balance.toLocaleString('en-US', {style: 'currency', currency})}
      </Text>
      <View style={styles.actions}>
        <ActionButton
          icon={<ArrowDownLeft size={16} color="#00A8B1" />}
          label={LABEL_TOP_UP}
          onPress={onTopUp}
        />
        <ActionButton
          icon={<ArrowUpRight size={16} color="#00A8B1" />}
          label={LABEL_WITHDRAW}
          onPress={onWithdraw}
        />
        <ActionButton
          icon={<Download size={16} color="#00A8B1" />}
          label={LABEL_STATEMENT}
          onPress={onDownloadStatement}
        />
      </View>
    </View>
  );
};

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}> = ({icon, label, onPress}) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.actionIcon}>{icon}</View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: '#00A8B1',
    padding: 24,
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
