/**
 * TransactionHistoryScreen — stub
 */
import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'lucide-react-native';

const TITLE = 'Transaction History';

const TransactionHistoryScreen: React.FC = () => {
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
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Transaction History</Text>
        <Text style={styles.placeholderSub}>Full filterable transaction list coming soon.</Text>
      </View>
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  placeholder: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8},
  placeholderText: {fontSize: 20, fontWeight: '700', color: '#D1D5DB'},
  placeholderSub: {fontSize: 14, color: '#9CA3AF'},
});
