/**
 * WalletScreen — stub
 */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {WalletHeader} from '@src/components/shared/WalletHeader';
import {StatusBadge} from '@src/components/shared/StatusBadge';
import AlphaLayout from '@src/layouts/AlphaLayout';

const FIXTURE_TXN = [
  {id: 't1', label: 'Top Up', amount: '+$500.00', date: 'Mar 10', type: 'credit'},
  {id: 't2', label: 'Job Payment — Logo Design', amount: '-$200.00', date: 'Mar 9', type: 'debit'},
  {id: 't3', label: 'Top Up', amount: '+$300.00', date: 'Mar 7', type: 'credit'},
  {id: 't4', label: 'Job Payment — App UI', amount: '-$450.00', date: 'Mar 5', type: 'debit'},
];

const WalletScreen: React.FC = () => {
  return (
    <AlphaLayout title="Wallet" showDecorations={false} headerStyle="solid" scrollEnabled={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletHeader balance={400} currency="USD" />
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {FIXTURE_TXN.map(txn => (
          <View key={txn.id} style={styles.txnRow}>
            <View style={styles.txnInfo}>
              <Text style={styles.txnLabel}>{txn.label}</Text>
              <Text style={styles.txnDate}>{txn.date}</Text>
            </View>
            <Text style={[styles.txnAmount, txn.type === 'credit' ? styles.credit : styles.debit]}>
              {txn.amount}
            </Text>
          </View>
        ))}
        <View style={styles.bottomPad} />
      </ScrollView>
    </AlphaLayout>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  sectionTitle: {fontSize: 17, fontWeight: '700', color: '#111827', marginHorizontal: 20, marginTop: 8, marginBottom: 8},
  txnRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 13, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F9FAFC'},
  txnInfo: {gap: 2},
  txnLabel: {fontSize: 14, fontWeight: '500', color: '#111827'},
  txnDate: {fontSize: 12, color: '#9CA3AF'},
  txnAmount: {fontSize: 15, fontWeight: '700'},
  credit: {color: '#16A34A'},
  debit: {color: '#111827'},
  bottomPad: {height: 100},
});
