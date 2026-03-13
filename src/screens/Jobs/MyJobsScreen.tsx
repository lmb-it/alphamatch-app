import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {ArrowLeft, Search} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {MyJobCard} from '../../components/MyJobCard';
import {useKitsTheme, useLanguage} from '@lmb-it/kitsconcerto';
import {tradingAccountActions} from '@src/modules/TradingAccount';
import {profileActions} from '@src/modules/Profile';

type TabKey = 'all' | 'pending' | 'active' | 'completed' | 'cancelled';

export default function MyJobsScreen() {
  const {t} = useLanguage();
  const navigation = useNavigation();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(tradingAccountActions.fetchMyAccounts());
    dispatch(profileActions.fetchProfile());
    // TODO: dispatch job-specific refresh when jobs slice is built
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch]);

  const tabs: {key: TabKey; label: string}[] = [
    {key: 'all', label: t('jobs.tabs.all')},
    {key: 'pending', label: t('jobs.tabs.pending')},
    {key: 'active', label: t('jobs.tabs.active')},
    {key: 'completed', label: t('jobs.tabs.completed')},
    {key: 'cancelled', label: t('jobs.tabs.cancelled')}, // Sometimes hidden in mocks but available
  ];

  // Dummy data representing projects
  const dummyJobs = [
    {
      id: '1',
      dateRange: '2 Aug, 2025-10 Aug, 2025',
      title: 'Sr. Graphic Designer',
      subtitle: 'Client : Robin Elbert',
      status: 'active',
      price: '$500.00',
    },
    {
      id: '2',
      dateRange: '2 Aug, 2025-10 Aug, 2025',
      title: 'Sr. Graphic Designer',
      subtitle: 'Client : Robin Elbert',
      status: 'pending',
      price: '$500.00',
    },
    {
      id: '3',
      dateRange: '2 Aug, 2025-10 Aug, 2025',
      title: 'Sr. Graphic Designer',
      subtitle: 'Client : Robin Elbert',
      status: 'completed',
      price: '$500.00',
    },
  ];

  const filteredJobs = dummyJobs.filter(job => {
    // Basic filter by tab
    if (activeTab !== 'all' && job.status !== activeTab) return false;
    // Basic search
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Go back">
            <ArrowLeft color="#263238" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('jobs.myJob')}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                  onPress={() => setActiveTab(tab.key)}
                  accessible
                  accessibilityRole="tab"
                  accessibilityLabel={tab.label}
                  accessibilityState={{selected: isActive}}>
                  <Text
                    style={[
                      styles.tabText,
                      isActive && {color: primaryColor, fontWeight: '600'},
                    ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search color="#9CA3AF" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessible
            accessibilityLabel="Search jobs"
            accessibilityHint="Filter jobs by title"
          />
        </View>

        {/* List */}
        <FlatList
          data={filteredJobs}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <MyJobCard
              style={styles.cardMargin}
              dateRange={item.dateRange}
              title={item.title}
              subtitle={item.subtitle}
              price={item.price}
              primaryAction={{
                label: t('jobs.viewDetails'),
                onPress: () => {},
              }}
              secondaryAction={
                item.status === 'pending'
                  ? undefined
                  : {label: t('chat.rooms'), onPress: () => {}}
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 18,
    color: '#263238',
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabsScrollContent: {
    paddingHorizontal: 20,
  },
  tabItem: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#00A8B1',
  },
  tabText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#75808E',
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFC', // light grey input bg
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 50,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 52,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#263238',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // accommodate bottom tab bar
  },
  cardMargin: {
    marginBottom: 16,
  },
});
