/**
 * ProfileScreen — context-aware
 *
 * Personal workspace: Profile header, My Profile, Trading Accounts,
 *   Wallet & Transactions, Documents, Settings, and global items.
 *
 * Trading account workspace: Public Profile, Verification Status,
 *   Earnings & Wallet, Teams, Settings, and global items + Switch to User Mode.
 *
 * ModeCard always at the top — shows active workspace and Switch button.
 *
 * [REF-ARCH-003]
 */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  UserCircle,
  Briefcase,
  Wallet,
  FileText,
  Settings,
  HelpCircle,
  Users,
  Gift,
  Globe,
  FileCheck,
  TrendingUp,
  ArrowLeftRight,
  LogOut,
} from 'lucide-react-native';
import {
  selectActiveWorkspaceType,
  selectActiveWorkspaceItem,
  workspaceActions,
} from '@src/modules/Workspace';
import {profileActions, selectProfileData} from '@src/modules/Profile';
import {authActions} from '@src/modules/Auth';
import {WorkspaceSwitcherSheet} from '@src/components/shared/WorkspaceSwitcherSheet';
import {SectionMenuRow} from '@src/components/shared/SectionMenuRow';
import {ConfirmSheet} from '@src/components/shared/ConfirmSheet';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {ProfileStackNavigationProp} from '@src/routes/ProfileStackNavigator';

// ── Constants ────────────────────────────────────────────────────────────────

const TITLE = 'Profile';
const LABEL_SWITCH_MODE = 'Switch Mode';
const LABEL_PERSONAL_MODE = 'Client Mode';
const LABEL_LOGOUT = 'Logout';
const LABEL_LOGOUT_MSG = 'Are you sure you want to log out?';
const LABEL_LOGOUT_CONFIRM = 'Log Out';
const SECTION_PERSONAL = 'My Account';
const SECTION_TRADE = 'Trading Account';
const SECTION_GLOBAL = 'More';

// ── Component ────────────────────────────────────────────────────────────────

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const dispatch = useDispatch();

  const activeType = useSelector(selectActiveWorkspaceType);
  const activeItem = useSelector(selectActiveWorkspaceItem);
  const profileData = useSelector(selectProfileData);
  const isTradeMode = activeType === 'trading_account';

  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(authActions.logout());
    dispatch(workspaceActions.resetWorkspace());
    setShowLogout(false);
  }, [dispatch]);

  const displayName = profileData
    ? `${profileData.displayName ?? ''} ${profileData.familyName ?? ''}`.trim()
    : 'You';
  const workspaceName = isTradeMode ? activeItem?.label ?? 'Trading Account' : LABEL_PERSONAL_MODE;

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safeTop} />
      <Text style={styles.pageTitle}>{TITLE}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Mode Card ── */}
        <View style={styles.modeCard}>
          <View style={styles.modeCardLeft}>
            <View style={[styles.modeDot, isTradeMode ? styles.modeDotTrade : styles.modeDotPersonal]} />
            <View style={styles.modeCardText}>
              <Text style={styles.modeLabel}>{workspaceName}</Text>
              <Text style={styles.modeSublabel}>
                {isTradeMode ? 'Trading account active' : 'Client mode active'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.switchModeBtn}
            onPress={() => setShowSwitcher(true)}
            activeOpacity={0.7}>
            <ArrowLeftRight size={14} color="#00A8B1" />
            <Text style={styles.switchModeBtnText}>{LABEL_SWITCH_MODE}</Text>
          </TouchableOpacity>
        </View>

        {/* ── Personal workspace menu ── */}
        {!isTradeMode && (
          <>
            <Text style={styles.sectionLabel}>{SECTION_PERSONAL}</Text>
            <SectionMenuRow
              icon={UserCircle}
              label="My Profile"
              sublabel={displayName || undefined}
              onPress={() => navigation.navigate('MyAccount')}
            />
            <SectionMenuRow
              icon={Briefcase}
              label="Trading Accounts"
              onPress={() => navigation.navigate('TradingAccountCreation')}
            />
            <SectionMenuRow
              icon={Wallet}
              label="Wallet & Transactions"
              onPress={() => navigation.navigate('Wallet')}
            />
            <SectionMenuRow
              icon={FileText}
              label="Documents"
              onPress={() => navigation.navigate('Documents')}
            />
          </>
        )}

        {/* ── Trading account workspace menu ── */}
        {isTradeMode && (
          <>
            <Text style={styles.sectionLabel}>{SECTION_TRADE}</Text>
            <SectionMenuRow
              icon={UserCircle}
              label="Public Profile"
              sublabel="What clients see"
              onPress={() => navigation.navigate('MyAccount')}
            />
            <SectionMenuRow
              icon={FileCheck}
              label="Verification Status"
              onPress={() => navigation.navigate('Documents')}
            />
            <SectionMenuRow
              icon={TrendingUp}
              label="Earnings & Wallet"
              onPress={() => navigation.navigate('Earnings')}
            />
            <SectionMenuRow
              icon={Users}
              label="Teams"
            />
            <SectionMenuRow
              icon={ArrowLeftRight}
              label="Switch to User Mode"
              onPress={() => {
                dispatch(workspaceActions.switchToPersonal());
              }}
            />
          </>
        )}

        {/* ── Settings ── */}
        <SectionMenuRow
          icon={Settings}
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />

        {/* ── Global items ── */}
        <Text style={styles.sectionLabel}>{SECTION_GLOBAL}</Text>
        <SectionMenuRow icon={HelpCircle} label="Support" onPress={() => navigation.navigate('Support')} />
        <SectionMenuRow icon={Gift} label="Invite Friends" onPress={() => navigation.navigate('InviteFriends')} />
        <SectionMenuRow icon={Globe} label="App Language" onPress={() => navigation.navigate('LanguageSettings')} />
        <SectionMenuRow icon={FileText} label="Terms & Conditions" onPress={() => navigation.navigate('TermsAndConditions')} />
        <SectionMenuRow icon={LogOut} label="Logout" destructive onPress={() => setShowLogout(true)} showChevron={false} />

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* Workspace switcher */}
      <WorkspaceSwitcherSheet
        visible={showSwitcher}
        onClose={() => setShowSwitcher(false)}
        onCreateTradingAccount={() => navigation.navigate('TradingAccountCreation')}
      />

      {/* Logout confirm */}
      <ConfirmSheet
        visible={showLogout}
        title={LABEL_LOGOUT}
        message={LABEL_LOGOUT_MSG}
        confirmLabel={LABEL_LOGOUT_CONFIRM}
        onConfirm={handleLogout}
        onCancel={() => setShowLogout(false)}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safeTop: {backgroundColor: '#F9FAFC'},
  pageTitle: {fontSize: 22, fontWeight: '700', color: '#111827', marginHorizontal: 20, marginTop: 12, marginBottom: 8},
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  modeCardLeft: {flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1},
  modeDot: {width: 10, height: 10, borderRadius: 5},
  modeDotPersonal: {backgroundColor: '#00A8B1'},
  modeDotTrade: {backgroundColor: '#9333EA'},
  modeCardText: {gap: 2, flex: 1},
  modeLabel: {fontSize: 15, fontWeight: '700', color: '#111827'},
  modeSublabel: {fontSize: 12, color: '#6B7280'},
  switchModeBtn: {flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#E0F7F8', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 100},
  switchModeBtnText: {fontSize: 12, fontWeight: '600', color: '#00A8B1'},
  sectionLabel: {fontSize: 12, fontWeight: '700', color: '#6B7280', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 20, marginBottom: 4, marginHorizontal: 20},
  bottomPad: {height: 100},
});
