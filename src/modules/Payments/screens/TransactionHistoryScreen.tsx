/**
 * TransactionHistoryScreen — stub
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';

const TransactionHistoryScreen: React.FC = () => {
  return (
    <AlphaLayout
      title="Transaction History"
      showDecorations={false}
      headerStyle="solid"
      scrollEnabled={false}>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Transaction History</Text>
        <Text style={styles.placeholderSub}>Full filterable transaction list coming soon.</Text>
      </View>
    </AlphaLayout>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  placeholder: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8},
  placeholderText: {fontSize: 20, fontWeight: '700', color: '#D1D5DB'},
  placeholderSub: {fontSize: 14, color: '#9CA3AF'},
});
