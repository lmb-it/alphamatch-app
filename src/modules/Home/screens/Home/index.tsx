/**
 * HomeScreen — context-aware
 *
 * Personal workspace: AI job input + active jobs summary
 * Trading account workspace: balance card + active projects + available jobs feed
 *
 * [REF-ARCH-003]
 */
import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Form,
  type IUseFormReturn,
  useLanguage,
  useKitsTheme,
} from '@lmb-it/kitsconcerto';
import {createImageUploaderTemplate} from './components/ImageUploader';
import {createTextareaTemplate} from './components/TextareaTemplate';
import {
  selectActiveWorkspaceType,
  selectActiveWorkspaceItem,
} from '@src/modules/Workspace';
import {tradingAccountActions} from '@src/modules/TradingAccount';
import {profileActions} from '@src/modules/Profile';
import {authActions, selectWelcomeIntent} from '@src/modules/Auth';
import {JobCard} from '@src/components/shared/JobCard';
import {WorkspaceBadge} from '@src/components/shared/WorkspaceBadge';
import {WorkspaceSwitcherSheet} from '@src/components/shared/WorkspaceSwitcherSheet';
import {WalletHeader} from '@src/components/shared/WalletHeader';
import type {HomeStackNavigationProp} from '@src/routes/HomeStackNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {getHomeFormElements} from './home.elements';

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_DESCRIBE_JOB = 'Describe your job';
const LABEL_ACTIVE_JOBS = 'Active Jobs';
const LABEL_NEARBY_JOBS = 'Available Jobs';
const LABEL_ACTIVE_PROJECTS = 'Active Projects';

// ── Fixtures ─────────────────────────────────────────────────────────────────

const FIXTURE_ACTIVE_JOBS = [
  {
    jobRef: 'job-1',
    title: 'Fix leaking kitchen tap — urgent',
    clientFirstName: 'Alex',
    budgetMin: 80,
    budgetMax: 150,
    location: 'Sydney, NSW',
    postedAt: '2h ago',
    status: 'active' as const,
  },
  {
    jobRef: 'job-2',
    title: 'React Native mobile app UI design',
    clientFirstName: 'You',
    budgetMin: 500,
    budgetMax: 1200,
    location: 'Remote',
    postedAt: '1d ago',
    status: 'pending' as const,
  },
];

const FIXTURE_NEARBY_JOBS = [
  {
    jobRef: 'job-3',
    title: 'Garden maintenance and lawn mowing',
    clientFirstName: 'Jordan',
    budgetMin: 120,
    budgetMax: 200,
    location: '3.2 km away',
    postedAt: '30m ago',
  },
  {
    jobRef: 'job-4',
    title: 'Electrical switchboard upgrade',
    clientFirstName: 'Taylor',
    budgetMin: 400,
    budgetMax: 800,
    location: '5.1 km away',
    postedAt: '1h ago',
  },
];

const FIXTURE_ACTIVE_PROJECTS = [
  {
    jobRef: 'proj-1',
    title: 'Website redesign milestone 2',
    clientFirstName: 'Morgan',
    location: 'Remote',
    postedAt: 'Due in 3 days',
    status: 'active' as const,
  },
];

const SUGGESTIONS = ['Plumbing', 'Cleaning', 'Graphic Design', 'Electrical'];

// ── Component ────────────────────────────────────────────────────────────────

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const dispatch = useDispatch();
  const activeType = useSelector(selectActiveWorkspaceType);
  const activeItem = useSelector(selectActiveWorkspaceItem);
  const isTradeMode = activeType === 'trading_account';
  const welcomeIntent = useSelector(selectWelcomeIntent);
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

  // Auto-navigate to TA creation if user chose "findWork" or "both" on welcome
  useEffect(() => {
    if (welcomeIntent === 'findWork' || welcomeIntent === 'both') {
      dispatch(authActions.clearWelcomeIntent());
      (navigation as any).navigate('ProfileTab', {
        screen: 'TradingAccountCreation',
      });
    } else if (welcomeIntent === 'postJob') {
      dispatch(authActions.clearWelcomeIntent());
    }
  }, [welcomeIntent, dispatch, navigation]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(tradingAccountActions.fetchMyAccounts());
    dispatch(profileActions.fetchProfile());
    // TODO: dispatch job feed refresh when jobs slice is built
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch]);

  const formRef = useRef<IUseFormReturn<any>>(null);

  const [jobDescription, setJobDescription] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const examples = [
    t('jobs.example1') || "Tell us what you need done — e.g. 'I need a plumber to fix a leaking tap'",
    t('jobs.example2') || "I need a graphic designer to create a modern logo for my startup",
    t('jobs.example3') || "Looking for someone to clean a 3-bedroom house this Friday",
    t('jobs.example4') || "Need an electrician to install 4 new downlights in the living room",
  ];

  const imageUploaderTemplate = useMemo(
    () => createImageUploaderTemplate({primaryColor}),
    [primaryColor],
  );

  const textareaTemplate = useMemo(
    () => createTextareaTemplate({
      jobDescription,
      setJobDescription,
      isFocused,
      setIsFocused,
      primaryColor,
      examples,
      onSubmit: () => formRef.current?.onFormSubmit(),
    }),
    [jobDescription, isFocused, primaryColor, examples],
  );

  const formElements = useMemo(
    () => getHomeFormElements({textareaTemplate, imageUploaderTemplate}),
    [textareaTemplate, imageUploaderTemplate],
  );

  return (
    <AlphaLayout showDecorations={false} scrollEnabled={false} showBackButton={false}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {isTradeMode
              ? `${activeItem?.label ?? 'Trading'} Mode`
              : 'Find the right pro'}
          </Text>
          <WorkspaceBadge onPress={() => setShowSwitcher(true)} />
        </View>

        {/* ── Personal workspace: AI job input ── */}
        {!isTradeMode && (
          <View style={styles.aiSection}>
            <Text style={styles.aiLabel}>{LABEL_DESCRIBE_JOB}</Text>

            <Form
              ref={formRef}
              elements={formElements as any}
              onSubmit={() => {
                navigation.navigate('JobPosting');
              }}
              outputFormat="Json"
              submitButtonProps="none"
            />

            {/* Suggestion pills */}
            <View style={styles.suggestions}>
              {SUGGESTIONS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={styles.pill}
                  onPress={() => setJobDescription(s)}
                  activeOpacity={0.75}>
                  <Text style={styles.pillText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ── Trade mode: balance card ── */}
        {isTradeMode && (
          <WalletHeader balance={700} currency="USD" />
        )}

        {/* ── Trade mode: active projects ── */}
        {isTradeMode && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{LABEL_ACTIVE_PROJECTS}</Text>
            {FIXTURE_ACTIVE_PROJECTS.map(job => (
              <JobCard
                key={job.jobRef}
                {...job}
                onPress={() =>
                  navigation.navigate('JobDetailWorker', {jobRef: job.jobRef})
                }
              />
            ))}
          </View>
        )}

        {/* ── Shared: active jobs / nearby jobs ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isTradeMode ? LABEL_NEARBY_JOBS : LABEL_ACTIVE_JOBS}
          </Text>
          {(isTradeMode ? FIXTURE_NEARBY_JOBS : FIXTURE_ACTIVE_JOBS).map(job => (
            <JobCard
              key={job.jobRef}
              {...job}
              onPress={() => {
                if (isTradeMode) {
                  navigation.navigate('JobDetailWorker', {jobRef: job.jobRef});
                } else {
                  (navigation as any).navigate('JobDetailClient', {jobRef: job.jobRef});
                }
              }}
            />
          ))}
        </View>

        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPad} />
      </ScrollView>

      <WorkspaceSwitcherSheet
        visible={showSwitcher}
        onClose={() => setShowSwitcher(false)}
        onCreateTradingAccount={() => navigation.navigate('JobPosting')}
      />
    </AlphaLayout>
  );
};

// ── Module ───────────────────────────────────────────────────────────────────

export default HomeScreen;

const styles = StyleSheet.create({
  scroll: {paddingTop: 8, paddingBottom: 16},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  aiSection: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  aiLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#E0F7F8',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  pillText: {
    fontSize: 13,
    color: '#00A8B1',
    fontWeight: '500',
  },
  section: {marginTop: 20},
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 4,
  },
  bottomPad: {height: 100},
});
