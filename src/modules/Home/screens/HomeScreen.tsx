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
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Sparkles, ImagePlus, X} from 'lucide-react-native';
import {
  Form,
  type IUseFormReturn,
  type IFormElement,
  useLanguage,
  useKitsTheme,
} from '@lmb-it/kitsconcerto';
import {launchImageLibrary, type ImageLibraryOptions} from 'react-native-image-picker';
import {
  selectActiveWorkspaceType,
  selectActiveWorkspaceItem,
} from '@src/modules/Workspace';
import {tradingAccountActions} from '@src/modules/TradingAccount';
import {profileActions} from '@src/modules/Profile';
import {JobCard} from '@src/components/shared/JobCard';
import {WorkspaceBadge} from '@src/components/shared/WorkspaceBadge';
import {WorkspaceSwitcherSheet} from '@src/components/shared/WorkspaceSwitcherSheet';
import {WalletHeader} from '@src/components/shared/WalletHeader';
import type {HomeStackNavigationProp} from '@src/routes/HomeStackNavigator';

// ── Components ───────────────────────────────────────────────────────────────

const AnimatedPlaceholder = ({focused, value, examples}: {focused: boolean, value: string, examples: string[]}) => {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused || value.length > 0) return;

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(opacity, {toValue: 0, duration: 500, useNativeDriver: true}),
        Animated.timing(opacity, {toValue: 1, duration: 500, useNativeDriver: true}),
      ]).start();

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % examples.length);
      }, 500);

    }, 4000);

    return () => clearInterval(interval);
  }, [focused, value, opacity, examples.length]);

  if (focused || value.length > 0) return null;

  return (
    <Animated.View style={[{position: 'absolute', top: 16, left: 16, right: 16}, {opacity}]} pointerEvents="none">
      <Text style={{fontSize: 15, color: '#9CA3AF', lineHeight: 22}}>
        {examples[index]}
      </Text>
    </Animated.View>
  );
};

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_DESCRIBE_JOB = 'Describe your job';
const LABEL_LETS_GO = "Let's Go";
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
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

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

  const imageUploaderTemplate = useCallback(({browse, values = [], remove}: any) => {
    const handlePick = () => {
      if (values.length >= 5) return;
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 5 - values.length,
        includeBase64: true,
      };

      launchImageLibrary(options, (res) => {
        if (res.didCancel || res.errorCode || !res.assets) return;
        const newImages = res.assets.map(a => ({
          uri: a.uri,
          base64: a.base64 ? `data:${a.type || 'image/jpeg'};base64,${a.base64}` : null
        }));
        browse([...values, ...newImages].slice(0, 5));
      });
    };

    return (
      <View style={styles.imageUploaderWrap}>
        {values.map((img: any, idx: number) => (
          <View key={idx} style={styles.imageThumbnailWrap}>
            <Image source={{uri: img.uri}} style={styles.imageThumbnail} />
            <TouchableOpacity style={styles.removeImageBtn} onPress={() => {
              const newVals = [...values];
              newVals.splice(idx, 1);
              remove(newVals);
            }}>
              <X color="#FFFFFF" size={12} />
            </TouchableOpacity>
          </View>
        ))}

        {values.length < 5 && (
          <TouchableOpacity onPress={handlePick} style={[styles.attachButton, {borderColor: primaryColor}]} activeOpacity={0.7}>
            <ImagePlus color={primaryColor} size={20} />
            <Text style={[styles.attachButtonText, {color: primaryColor}]}>Attach photos ({values.length}/5)</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [primaryColor]);

  const textareaTemplate = useCallback(({setValue}: any) => {
    return (
      <View style={styles.inputOuterWrap}>
        <View style={[styles.inputContainer, isFocused ? {borderColor: primaryColor} : {}]}>
          <TextInput
            style={styles.textInput}
            multiline
            textAlignVertical="top"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => {
              setJobDescription(text);
              setValue(text);
            }}
            value={jobDescription}
          />
          <AnimatedPlaceholder focused={isFocused} value={jobDescription} examples={examples} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => formRef.current?.onFormSubmit()}
            style={[
              styles.letsGoBtn,
              {backgroundColor: jobDescription.trim().length > 5 ? primaryColor : '#E5E7EB'}
            ]}
            disabled={jobDescription.trim().length <= 5}
          >
            <Sparkles color="#FFFFFF" size={16} />
            <Text style={styles.letsGoBtnText}>{LABEL_LETS_GO}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [jobDescription, isFocused, primaryColor, examples]);

  const formElements: IFormElement[] = useMemo(() => [
    {
      id: 'description',
      name: 'description',
      type: 'Container',
      children: textareaTemplate,
      colSpan: 12,
    },
    {
       id: 'attachments',
       name: 'attachments',
       type: 'Image',
       initialUri: [],
       template: imageUploaderTemplate,
       colSpan: 12,
    }
  ], [textareaTemplate, imageUploaderTemplate]);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safeTop} />
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
    </View>
  );
};

// ── Module ───────────────────────────────────────────────────────────────────

export default HomeScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safeTop: {backgroundColor: '#F9FAFC'},
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
  inputOuterWrap: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    minHeight: 140,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    padding: 16,
    paddingBottom: 50,
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  letsGoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  letsGoBtnText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
  },
  imageUploaderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20, // push suggestions down
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: '#FAFAFA',
  },
  attachButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  imageThumbnailWrap: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  imageThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  removeImageBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
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
