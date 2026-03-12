/**
 * PayDepositScreen — stub
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, CreditCard} from 'lucide-react-native';

const LABEL_PAY = 'Pay Deposit';
const LABEL_AMOUNT = '$120.00';
const LABEL_DESC = 'Paying the deposit unlocks the chat and reveals the provider\'s full identity.';

const PayDepositScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay Deposit</Text>
        <View style={{width: 22}} />
      </View>
      <View style={styles.content}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Deposit Amount</Text>
          <Text style={styles.amount}>{LABEL_AMOUNT}</Text>
        </View>
        <Text style={styles.desc}>{LABEL_DESC}</Text>
        <View style={styles.cardPlaceholder}>
          <CreditCard size={24} color="#6B7280" />
          <Text style={styles.cardText}>Stripe payment UI will be integrated here</Text>
        </View>
        <TouchableOpacity style={styles.payBtn} activeOpacity={0.85}>
          <Text style={styles.payBtnText}>{LABEL_PAY}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayDepositScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  content: {flex: 1, padding: 24, gap: 20},
  amountCard: {backgroundColor: '#00A8B1', borderRadius: 20, padding: 24, alignItems: 'center', gap: 6},
  amountLabel: {fontSize: 13, color: 'rgba(255,255,255,0.8)'},
  amount: {fontSize: 40, fontWeight: '700', color: '#FFFFFF'},
  desc: {fontSize: 14, color: '#374151', lineHeight: 20, textAlign: 'center'},
  cardPlaceholder: {backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center', gap: 8, borderWidth: 1.5, borderColor: '#E5E7EB', borderStyle: 'dashed'},
  cardText: {fontSize: 14, color: '#9CA3AF', textAlign: 'center'},
  payBtn: {backgroundColor: '#00A8B1', borderRadius: 14, paddingVertical: 15, alignItems: 'center'},
  payBtnText: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
});
