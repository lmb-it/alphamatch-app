/**
 * JobDetailClientScreen — stub
 * Client view of a single job: description, bids received, hire actions, deposit.
 */
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import {ArrowLeft, DollarSign, MapPin, Users} from 'lucide-react-native';
import {StatusBadge} from '@src/components/shared/StatusBadge';
import {ProposalCard} from '@src/components/shared/ProposalCard';
import type {MyJobsStackParamList, MyJobsStackNavigationProp} from '@src/routes/MyJobsStackNavigator';

type RouteProps = RouteProp<MyJobsStackParamList, 'JobDetailClient'>;

const FIXTURE_BIDS = [
  {proposalRef: 'p1', jobTitle: 'Fix kitchen tap', bidAmount: 120, bidDate: 'Mar 10', status: 'pending' as const},
  {proposalRef: 'p2', jobTitle: 'Fix kitchen tap', bidAmount: 95, bidDate: 'Mar 10', status: 'pending' as const},
];

const JobDetailClientScreen: React.FC = () => {
  const navigation = useNavigation<MyJobsStackNavigationProp>();
  const route = useRoute<RouteProps>();

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safeTop} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Detail</Text>
        <View style={{width: 22}} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.jobTitle}>Fix leaking kitchen tap</Text>
          <StatusBadge status="active" size="md" />
          <View style={styles.metaRow}>
            <DollarSign size={14} color="#6B7280" />
            <Text style={styles.meta}>$80 – $150</Text>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.meta}>Sydney, NSW</Text>
          </View>
          <Text style={styles.description}>
            I need a qualified plumber to fix a leaking tap in my kitchen. The tap has been dripping for 2 days and needs urgent attention. Please have your own tools.
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={16} color="#374151" />
            <Text style={styles.sectionTitle}>Bids Received ({FIXTURE_BIDS.length})</Text>
          </View>
          {FIXTURE_BIDS.map(bid => (
            <ProposalCard
              key={bid.proposalRef}
              {...bid}
              onPress={() => navigation.navigate('ProposalDetail', {proposalRef: bid.proposalRef})}
            />
          ))}
        </View>
        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
};

export default JobDetailClientScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safeTop: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  content: {padding: 20, gap: 16},
  section: {gap: 10},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', gap: 6},
  sectionTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  jobTitle: {fontSize: 20, fontWeight: '700', color: '#111827'},
  metaRow: {flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap'},
  meta: {fontSize: 13, color: '#6B7280'},
  description: {fontSize: 14, color: '#374151', lineHeight: 22},
  bottomPad: {height: 40},
});
