/**
 * MyJobsScreen — context-aware
 *
 * Personal workspace: jobs posted by the user as a client
 *   Filters: Active, Pending, Completed, Cancelled
 *
 * Trading account workspace: proposals/bids submitted by this trading account
 *   Filters: Pending, Awarded, Active, Completed, Declined
 *
 * [REF-ARCH-003]
 */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectActiveWorkspaceType} from '@src/modules/Workspace';
import {JobCard} from '@src/components/shared/JobCard';
import {ProposalCard} from '@src/components/shared/ProposalCard';
import type {MyJobsStackNavigationProp} from '@src/routes/MyJobsStackNavigator';

// ── Constants ────────────────────────────────────────────────────────────────

const TITLE_CLIENT = 'My Jobs';
const TITLE_WORKER = 'My Bids';

const CLIENT_FILTERS = ['Active', 'Pending', 'Completed', 'Cancelled'] as const;
const WORKER_FILTERS = ['Pending', 'Awarded', 'Active', 'Completed', 'Declined'] as const;

type ClientFilter = typeof CLIENT_FILTERS[number];
type WorkerFilter = typeof WORKER_FILTERS[number];

// ── Fixtures ─────────────────────────────────────────────────────────────────

const FIXTURE_CLIENT_JOBS = {
  Active: [
    {jobRef: 'j1', title: 'Bathroom renovation planning', clientFirstName: 'You', budgetMin: 3000, budgetMax: 6000, location: 'Sydney', postedAt: '3d ago', status: 'active' as const},
    {jobRef: 'j2', title: 'Logo design for new startup', clientFirstName: 'You', budgetMin: 200, budgetMax: 500, location: 'Remote', postedAt: '1d ago', status: 'active' as const},
  ],
  Pending: [
    {jobRef: 'j3', title: 'React Native app development', clientFirstName: 'You', budgetMin: 5000, budgetMax: 12000, location: 'Remote', postedAt: '2h ago', status: 'pending' as const},
  ],
  Completed: [
    {jobRef: 'j4', title: 'Office deep cleaning', clientFirstName: 'You', budgetMin: 300, budgetMax: 300, location: 'Melbourne', postedAt: '1w ago', status: 'completed' as const},
  ],
  Cancelled: [],
};

const FIXTURE_WORKER_PROPOSALS = {
  Pending: [
    {proposalRef: 'p1', jobTitle: 'WordPress website fixes', bidAmount: 450, bidDate: 'Mar 10', status: 'pending' as const},
    {proposalRef: 'p2', jobTitle: 'Social media content creation', bidAmount: 800, bidDate: 'Mar 9', status: 'pending' as const},
  ],
  Awarded: [
    {proposalRef: 'p3', jobTitle: 'Mobile app UI design', bidAmount: 2200, bidDate: 'Mar 8', status: 'awarded' as const},
  ],
  Active: [
    {proposalRef: 'p4', jobTitle: 'E-commerce store setup', bidAmount: 3500, bidDate: 'Feb 28', status: 'active' as const},
  ],
  Completed: [
    {proposalRef: 'p5', jobTitle: 'Brand identity package', bidAmount: 1200, bidDate: 'Feb 15', status: 'completed' as const},
  ],
  Declined: [],
};

// ── Component ────────────────────────────────────────────────────────────────

const MyJobsScreen: React.FC = () => {
  const navigation = useNavigation<MyJobsStackNavigationProp>();
  const activeType = useSelector(selectActiveWorkspaceType);
  const isTradeMode = activeType === 'trading_account';

  const [clientFilter, setClientFilter] = useState<ClientFilter>('Active');
  const [workerFilter, setWorkerFilter] = useState<WorkerFilter>('Pending');
  const [refreshing, setRefreshing] = useState(false);

  const filters = isTradeMode ? WORKER_FILTERS : CLIENT_FILTERS;
  const activeFilter = isTradeMode ? workerFilter : clientFilter;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const clientJobs = FIXTURE_CLIENT_JOBS[clientFilter] ?? [];
  const workerProposals = FIXTURE_WORKER_PROPOSALS[workerFilter] ?? [];

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safeTop} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{isTradeMode ? TITLE_WORKER : TITLE_CLIENT}</Text>
      </View>

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContainer}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
            onPress={() => {
              if (isTradeMode) setWorkerFilter(f as WorkerFilter);
              else setClientFilter(f as ClientFilter);
            }}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.filterLabel,
                activeFilter === f && styles.filterLabelActive,
              ]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content list */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00A8B1" colors={['#00A8B1']} />
        }>
        {isTradeMode
          ? workerProposals.map(p => (
              <ProposalCard
                key={p.proposalRef}
                {...p}
                onPress={() =>
                  navigation.navigate('ProposalDetail', {
                    proposalRef: p.proposalRef,
                  })
                }
              />
            ))
          : clientJobs.map(j => (
              <JobCard
                key={j.jobRef}
                {...j}
                onPress={() =>
                  navigation.navigate('JobDetailClient', {jobRef: j.jobRef})
                }
              />
            ))}

        {/* Empty state */}
        {(isTradeMode ? workerProposals : clientJobs).length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No {activeFilter.toLowerCase()} items</Text>
          </View>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
};

export default MyJobsScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safeTop: {backgroundColor: '#F9FAFC'},
  header: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4},
  title: {fontSize: 22, fontWeight: '700', color: '#111827'},
  filtersScroll: {
    flexGrow: 0,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    alignItems: 'center',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#00A8B1',
    borderColor: '#00A8B1',
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  filterLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  list: {paddingTop: 4},
  empty: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
  },
  bottomPad: {height: 100},
});
