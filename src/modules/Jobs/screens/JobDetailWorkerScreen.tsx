/**
 * JobDetailWorkerScreen — stub
 * Worker view of a job before/after applying.
 * Shows full job description, budget, and Submit Bid CTA.
 */
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import {ArrowLeft, DollarSign, MapPin, Clock} from 'lucide-react-native';
import type {HomeStackParamList, HomeStackNavigationProp} from '@src/routes/HomeStackNavigator';

type RouteProps = RouteProp<HomeStackParamList, 'JobDetailWorker'>;

const LABEL_SUBMIT_BID = 'Submit a Bid';
const LABEL_DESCRIPTION = 'Job Description';
const LABEL_DETAILS = 'Details';

const JobDetailWorkerScreen: React.FC = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
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
        <Text style={styles.jobTitle}>Garden maintenance and lawn mowing</Text>
        <View style={styles.metaRow}>
          <DollarSign size={14} color="#6B7280" />
          <Text style={styles.meta}>$120 – $200</Text>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.meta}>3.2 km away</Text>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.meta}>Posted 30m ago</Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>{LABEL_DESCRIPTION}</Text>
          <Text style={styles.description}>
            Looking for an experienced gardener to do a full garden tidy-up including lawn mowing, hedge trimming, and removing weeds. The garden is approximately 400sqm. Please bring your own equipment.
          </Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>{LABEL_DETAILS}</Text>
          <Text style={styles.meta}>Posted by: Jordan (Client)</Text>
          <Text style={styles.meta}>Location: Eastern Suburbs, Sydney</Text>
          <Text style={styles.meta}>Estimated duration: Half day</Text>
        </View>
        <View style={styles.bottomPad} />
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.safeBottom}>
        <TouchableOpacity
          style={styles.bidBtn}
          onPress={() => navigation.navigate('SubmitProposal', {jobRef: route.params?.jobRef ?? ''})}
          activeOpacity={0.85}>
          <Text style={styles.bidBtnText}>{LABEL_SUBMIT_BID}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default JobDetailWorkerScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safeTop: {backgroundColor: '#FFFFFF'},
  safeBottom: {backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 12},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  content: {padding: 20, gap: 16},
  jobTitle: {fontSize: 20, fontWeight: '700', color: '#111827'},
  metaRow: {flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap'},
  meta: {fontSize: 13, color: '#6B7280'},
  sectionTitle: {fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6},
  description: {fontSize: 14, color: '#374151', lineHeight: 22},
  bottomPad: {height: 20},
  bidBtn: {backgroundColor: '#00A8B1', borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginBottom: 8},
  bidBtnText: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
});
