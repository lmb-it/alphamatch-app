/**
 * EarningsScreen — stub (trading account only)
 */
import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'lucide-react-native';
import {WalletHeader} from '@src/components/shared/WalletHeader';

const TITLE = 'Earnings & Wallet';

const EarningsScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{TITLE}</Text>
        <View style={{width: 22}} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletHeader balance={1250} currency="USD" />
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>$3,200</Text>
            <Text style={styles.summaryLabel}>Total Earned</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>12%</Text>
            <Text style={styles.summaryLabel}>Commission Rate</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>$384</Text>
            <Text style={styles.summaryLabel}>Fees Paid</Text>
          </View>
        </View>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Earnings history and payout settings will be implemented here.</Text>
        </View>
        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
};

export default EarningsScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  summaryRow: {flexDirection: 'row', gap: 12, marginHorizontal: 20, marginTop: 4, marginBottom: 20},
  summaryCard: {flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, alignItems: 'center', gap: 4},
  summaryValue: {fontSize: 18, fontWeight: '700', color: '#111827'},
  summaryLabel: {fontSize: 11, color: '#6B7280', textAlign: 'center'},
  placeholder: {marginHorizontal: 20},
  placeholderText: {fontSize: 14, color: '#9CA3AF', textAlign: 'center', lineHeight: 20},
  bottomPad: {height: 100},
});
