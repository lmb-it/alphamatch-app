/**
 * MyAccountScreen — Profile tab root
 *
 * Context-aware:
 * - Personal workspace: no tabs, profile card + account items + optional "Create Trading Account"
 * - Trading account workspace: profile card + 2 tabs (Account + Portfolio)
 */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Text, Flex, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {
  Wallet, Clock, Plus, Camera, Pen, Settings, Share2,
  Briefcase, GraduationCap, FolderOpen, Award, Users, Star,
  FileCheck, ShieldCheck, CreditCard,
} from 'lucide-react-native';
import {
  selectProfileData, selectActiveWorkspace, selectTradingAccounts, profileActions,
  selectExperiences, selectEducation, selectQualifications, selectReferences, selectPortfolioItems,
} from '@src/modules/Profile';
import {selectIsTradeMode} from '@src/modules/Workspace';
// Photo uploads now go through sagas (profileActions.uploadAvatar / uploadCover)
import {fetchRequiredDocumentsApi} from '@src/modules/TradingAccount/api/tradingAccount.service';
import type {IDocumentRequirement} from '@src/modules/TradingAccount';
import type {ProfileStackNavigationProp} from '@src/routes/ProfileStackNavigator';
import MenuItem from '../components/MenuItem';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {Grid, GridItem} from "@lmb-it/kitsconcerto-native";

const COVER_HEIGHT = 180;
const AVATAR_SIZE = 100;

type TabKey = 'account' | 'portfolio';

// ── Portfolio Summary Card ──────────────────────────────────────────────────

interface SummaryCardProps {
  icon: React.ComponentType<any>;
  label: string;
  count: number;
  subtitle?: string;
  onPress: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({icon: IconComp, label, count, subtitle, onPress}) => {
  const {resolveToken} = useKitsTheme();
  return (
    <TouchableOpacity style={styles.summaryCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.summaryIcon, {backgroundColor: resolveToken('primary') + '15'}]}>
        <IconComp color={resolveToken('primary')} size={20} />
      </View>
      <View style={styles.summaryContent}>
        <Text fontSize={15} fontWeight="600" color="text-primary">{label}</Text>
        <Text fontSize={13} color="text-subtle">
          {count > 0 ? `${count} item${count !== 1 ? 's' : ''}` : subtitle || 'None yet'}
        </Text>
      </View>
      <Text fontSize={18} color="text-subtle">›</Text>
    </TouchableOpacity>
  );
};

// ── Main Screen ─────────────────────────────────────────────────────────────

const MyAccountScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const dispatch = useDispatch();
  const profileData = useSelector(selectProfileData);
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const tradingAccounts = useSelector(selectTradingAccounts);
  const isTradeMode = useSelector(selectIsTradeMode);
  const experiences = useSelector(selectExperiences);
  const education = useSelector(selectEducation);
  const qualifications = useSelector(selectQualifications);
  const references = useSelector(selectReferences);
  const portfolioItems = useSelector(selectPortfolioItems);

  const [activeTab, setActiveTab] = useState<TabKey>('account');
  const [requiredDocs, setRequiredDocs] = useState<IDocumentRequirement[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);

  // Resolve active trading account details
  const activeTradingAccount = useMemo(() => {
    if (!activeWorkspace) return null;
    return tradingAccounts.find(a => a.identifier === activeWorkspace) ?? null;
  }, [activeWorkspace, tradingAccounts]);

  const careerRef = activeTradingAccount?.careerRef ?? null;

  // Load all portfolio sections when in trading account context
  useEffect(() => {
    if (isTradeMode && activeWorkspace) {
      dispatch(profileActions.loadExperiences(activeWorkspace));
      dispatch(profileActions.loadEducation(activeWorkspace));
      dispatch(profileActions.loadQualifications(activeWorkspace));
      dispatch(profileActions.loadReferences(activeWorkspace));
      dispatch(profileActions.loadPortfolioItems(activeWorkspace));
    }
  }, [isTradeMode, activeWorkspace, dispatch]);

  // Fetch required documents when in trading account context
  useEffect(() => {
    if (careerRef) {
      setDocsLoading(true);
      fetchRequiredDocumentsApi('provider', careerRef, 14)
        .then(setRequiredDocs)
        .catch(() => setRequiredDocs([]))
        .finally(() => setDocsLoading(false));
    } else {
      setRequiredDocs([]);
    }
  }, [careerRef]);


  const displayName = useMemo(() => {
    if (isTradeMode && activeTradingAccount) {
      return activeTradingAccount.accountName || activeTradingAccount.careerName || '';
    }
    return profileData?.user
      ? `${profileData.user.displayName || ''} ${profileData.user.familyName || ''}`.trim()
      : '';
  }, [isTradeMode, activeTradingAccount, profileData]);

  const subtitle = useMemo(() => {
    if (isTradeMode && activeTradingAccount) {
      return activeTradingAccount.careerName || '';
    }
    return profileData?.user?.shortBio || '';
  }, [isTradeMode, activeTradingAccount, profileData]);

  const hasNoTradingAccounts = tradingAccounts.length === 0;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AlphaLayout showBackButton={false} fullScreen>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Cover Image */}
      <View style={styles.coverContainer}>
        {profileData?.user?.coverImage ? (
          <Image source={{uri: profileData.user.coverImage}} style={styles.coverImage} />
        ) : (
          <View style={[styles.coverImage, {backgroundColor: primaryColor}]} />
        )}

      </View>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        {profileData?.user?.avatar ? (
            <Image source={{uri: profileData.user.avatar}} style={styles.avatar} />
        ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text fontSize={32} fontWeight="700" color="text-subtle">
                {displayName.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
        )}
      </View>


{/*      <Grid columns={12} gap={15} p={10} backgroundColor={'red'}>
        <GridItem colSpan={3} backgroundColor="red" className="p-6 border-round"><Text>Grid</Text></GridItem>
        <GridItem colSpan={3} backgroundColor="green" className="p-6 border-round"><Text>Grid</Text></GridItem>
        <GridItem colSpan={3} backgroundColor="blue" className="p-6 border-round"><Text>Grid</Text></GridItem>
        <GridItem colSpan={3} backgroundColor="black" className="p-6 border-round"><Text>Grid</Text></GridItem>
      </Grid>*/}

      {/* Name + subtitle */}
      <Text fontSize={20} fontWeight="700" color="text-primary" textAlign="center" mt={8}>
        {displayName || t('user')}
      </Text>
      {subtitle ? (
        <Text fontSize={13} color="text-subtle" textAlign="center" mt={4} mx={32} numberOfLines={2}>
          {subtitle}
        </Text>
      ) : null}

      {/* Action buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.editProfileBtn, {borderColor: primaryColor}]}
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.7}>
          <Pen color={primaryColor} size={14} />
          <Text fontSize={13} fontWeight="600" color="primary" ml={6}>
            {t('profile.editProfile')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}>
          <Settings color="#374151" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Share2 color="#374151" size={20} />
        </TouchableOpacity>
      </View>

      {/* ═══ PERSONAL WORKSPACE — No tabs ═══ */}
      {!isTradeMode && (
        <View style={styles.personalContent}>
          {/* Create Trading Account card — only if user has ZERO accounts */}
          {hasNoTradingAccounts && (
            <TouchableOpacity
              style={[styles.createAccountCard, {borderColor: primaryColor}]}
              onPress={() => navigation.navigate('TradingAccountCreation')}
              activeOpacity={0.7}>
              <View style={[styles.createAccountIcon, {backgroundColor: primaryColor + '15'}]}>
                <Plus color={primaryColor} size={24} />
              </View>
              <View style={styles.createAccountText}>
                <Text fontSize={16} fontWeight="700" color="primary">
                  Create Trading Account
                </Text>
                <Text fontSize={13} color="text-subtle" mt={4}>
                  Start offering your services and earning money
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Account items */}
          <View style={styles.menuList}>
            <MenuItem
              icon={Wallet}
              label={t('profile.myWallet')}
              onPress={() => navigation.navigate('Wallet')}
            />
            <MenuItem
              icon={Clock}
              label={t('profile.transactionHistory')}
              onPress={() => navigation.navigate('TransactionHistory')}
            />
            <MenuItem
              icon={FileCheck}
              label={t('profile.documents')}
              onPress={() => navigation.navigate('Documents')}
            />
          </View>
        </View>
      )}

      {/* ═══ TRADING ACCOUNT WORKSPACE — 2 tabs ═══ */}
      {isTradeMode && (
        <>
          {/* Tab Bar */}
          <View style={styles.tabBar}>
            {(['account', 'portfolio'] as TabKey[]).map(tab => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabItem, isActive && {borderBottomColor: primaryColor}]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.7}>
                  <Text
                    fontSize={14}
                    fontWeight={isActive ? '600' : '400'}
                    color={isActive ? 'primary' : 'text-subtle'}>
                    {tab === 'account' ? t('profile.accountTab') : t('profile.portfolioTab')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Account Tab ── */}
          {activeTab === 'account' && (
            <View style={styles.menuList}>
              <MenuItem
                icon={Wallet}
                label={t('profile.myWallet')}
                onPress={() => navigation.navigate('Wallet')}
              />
              <MenuItem
                icon={Clock}
                label={t('profile.transactionHistory')}
                onPress={() => navigation.navigate('TransactionHistory')}
              />
              <MenuItem
                icon={FileCheck}
                label={t('profile.documents')}
                onPress={() => navigation.navigate('Documents')}
              />

              {/* Subscription status (Flex) or Verification status (Pro) */}
              {activeTradingAccount?.careerModel === 'flex' && (
                <MenuItem
                  icon={CreditCard}
                  label="Subscription Status"
                />
              )}
              {activeTradingAccount?.careerModel === 'pro' && (
                <MenuItem
                  icon={ShieldCheck}
                  label="Verification Status"
                  onPress={() => {
                    if (activeTradingAccount?.identifier) {
                      navigation.navigate('TierStatus', {accountRef: activeTradingAccount.identifier});
                    }
                  }}
                />
              )}
            </View>
          )}

          {/* ── Portfolio Tab — Summary Cards with real counts ── */}
          {activeTab === 'portfolio' && (
            <View style={styles.portfolioCards}>
              <SummaryCard
                icon={Briefcase}
                label="Experience"
                count={experiences.items.length}
                subtitle="Add your work history"
                onPress={() => navigation.navigate('Experience' as any)}
              />
              <SummaryCard
                icon={GraduationCap}
                label="Education"
                count={education.items.length}
                subtitle="Add your education"
                onPress={() => navigation.navigate('Education' as any)}
              />
              <SummaryCard
                icon={FolderOpen}
                label="Portfolio"
                count={portfolioItems.items.length}
                subtitle="Showcase your projects"
                onPress={() => navigation.navigate('Portfolio' as any)}
              />
              <SummaryCard
                icon={Award}
                label="Qualifications"
                count={qualifications.items.length}
                subtitle="Add certificates & awards"
                onPress={() => navigation.navigate('Qualifications' as any)}
              />
              <SummaryCard
                icon={Users}
                label="References"
                count={references.items.length}
                subtitle="Add professional references"
                onPress={() => navigation.navigate('References' as any)}
              />
              <SummaryCard
                icon={Star}
                label="Reviews"
                count={0}
                subtitle="No reviews yet"
                onPress={() => navigation.navigate('Reviews' as any)}
              />
            </View>
          )}
        </>
      )}

    </AlphaLayout>
  );
};

export default MyAccountScreen;

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  coverContainer: {
    height: COVER_HEIGHT,
    marginHorizontal: -24,
    marginTop: -20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  changeCoverBtn: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
    marginBottom: 4,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1.5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalContent: {
    marginTop: 20,
  },
  createAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    backgroundColor: '#F9FAFB',
  },
  createAccountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  createAccountText: {
    flex: 1,
  },
  menuList: {
    gap: 8,
    marginTop: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginHorizontal: 20,
    marginTop: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  portfolioCards: {
    gap: 10,
    marginTop: 16,
    marginHorizontal: 20,
    paddingBottom: 100,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  summaryContent: {
    flex: 1,
  },
});
