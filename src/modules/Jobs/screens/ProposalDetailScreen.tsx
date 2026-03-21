/**
 * ProposalDetailScreen — stub
 */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {StatusBadge} from '@src/components/shared/StatusBadge';

const ProposalDetailScreen: React.FC = () => {
  return (
    <AlphaLayout
      title="Bid Detail"
      showDecorations={false}
      headerStyle="solid"
      scrollEnabled={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.jobTitle}>Mobile app UI design</Text>
        <StatusBadge status="awarded" size="md" />
        <View style={styles.infoCard}>
          <Row label="Bid Amount" value="$2,200" />
          <Row label="Submitted" value="Mar 8, 2026" />
          <Row label="Status" value="Awarded" />
        </View>
        <Text style={styles.sectionTitle}>Your Proposal</Text>
        <Text style={styles.body}>
          I have extensive experience in mobile UI design using Figma and React Native. I can deliver pixel-perfect screens based on your requirements within 2 weeks.
        </Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusBoxText}>Waiting for client to pay deposit</Text>
        </View>
      </ScrollView>
    </AlphaLayout>
  );
};

const Row: React.FC<{label: string; value: string}> = ({label, value}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

export default ProposalDetailScreen;

const styles = StyleSheet.create({
  content: {padding: 20, gap: 14},
  jobTitle: {fontSize: 20, fontWeight: '700', color: '#111827'},
  infoCard: {backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, gap: 10},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  rowLabel: {fontSize: 14, color: '#6B7280'},
  rowValue: {fontSize: 14, fontWeight: '600', color: '#111827'},
  sectionTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  body: {fontSize: 14, color: '#374151', lineHeight: 22},
  statusBox: {backgroundColor: '#FEF9C3', borderRadius: 12, padding: 14},
  statusBoxText: {fontSize: 14, color: '#92400E'},
});
