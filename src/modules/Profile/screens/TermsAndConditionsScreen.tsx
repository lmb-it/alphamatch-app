/**
 * TermsAndConditionsScreen — stub (WebView placeholder)
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FileText} from 'lucide-react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';

const TermsAndConditionsScreen: React.FC = () => {
  return (
    <AlphaLayout title="Terms & Conditions" headerStyle="solid" scrollEnabled={false}>
      <View style={styles.placeholder}>
        <FileText size={48} color="#9CA3AF" />
        <Text style={styles.placeholderText}>Terms & Conditions</Text>
        <Text style={styles.placeholderSub}>WebView loading https://alphamatch.com/terms</Text>
      </View>
    </AlphaLayout>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  placeholder: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12},
  placeholderText: {fontSize: 18, fontWeight: '700', color: '#D1D5DB'},
  placeholderSub: {fontSize: 13, color: '#9CA3AF'},
});
