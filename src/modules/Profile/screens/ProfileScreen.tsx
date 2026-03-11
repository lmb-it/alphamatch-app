import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {
  UserCircle,
  Wallet,
  Clock,
  Settings,
  HelpCircle,
  FileText,
  ArrowRight,
} from 'lucide-react-native';
import {
  profileActions,
  selectProfileData,
  selectActiveWorkspace,
  selectTradingAccounts,
} from '@src/modules/Profile';
import {authActions} from '@src/modules/Auth';
import {
  tradingAccountActions,
  selectMyAccounts,
} from '@src/modules/TradingAccount';
import type {AppStackParamList} from '@src/routes';
import ProfileHeader from '../components/ProfileHeader';
import MenuItem from '../components/MenuItem';
import WorkspaceSwitcher from '../components/WorkspaceSwitcher';
import AlphaLayout from '@src/layouts/AlphaLayout';

const ProfileScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const profileData = useSelector(selectProfileData);
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const tradingAccounts = useSelector(selectTradingAccounts);
  const myAccounts = useSelector(selectMyAccounts);
  const [showSwitcher, setShowSwitcher] = useState(false);

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
    dispatch(tradingAccountActions.fetchMyAccounts());
  }, [dispatch]);

  // Find incomplete trading account
  const incompleteAccount = useMemo(
    () =>
      myAccounts.find(
        a =>
          a.setupStatus === 'incomplete' ||
          a.setupStatus === 'pending_verification' ||
          a.setupStatus === 'pending_subscription',
      ),
    [myAccounts],
  );

  const handleSwitchPersonal = useCallback(() => {
    dispatch(profileActions.switchWorkspace({workspaceRef: null}));
    setShowSwitcher(false);
  }, [dispatch]);

  const handleSwitchAccount = useCallback(
    (ref: string, name: string, avatar: string | null) => {
      setShowSwitcher(false);
      navigation.navigate('WorkspaceSwitching', {
        accountIdentifier: ref,
        accountName: name,
        accountAvatar: avatar,
      });
    },
    [navigation],
  );

  const handleCreateAccount = useCallback(() => {
    setShowSwitcher(false);
    if (incompleteAccount) {
      // Resume the incomplete account
      dispatch(tradingAccountActions.createAccountSuccess(incompleteAccount));
      if (incompleteAccount.setupStatus === 'pending_subscription') {
        navigation.navigate('TradingAccountCreation', {screen: 'TASubscription'} as any);
      } else if (incompleteAccount.setupStatus === 'pending_verification') {
        navigation.navigate('TradingAccountCreation', {screen: 'TAVerification'} as any);
      } else {
        navigation.navigate('TradingAccountCreation', {screen: 'TAAccountDetails'} as any);
      }
    } else {
      navigation.navigate('TradingAccountCreation');
    }
  }, [incompleteAccount, dispatch, navigation]);

  const handleResumeIncomplete = useCallback(() => {
    if (!incompleteAccount) return;
    dispatch(tradingAccountActions.createAccountSuccess(incompleteAccount));
    if (incompleteAccount.setupStatus === 'pending_subscription') {
      navigation.navigate('TradingAccountCreation', {screen: 'TASubscription'} as any);
    } else if (incompleteAccount.setupStatus === 'pending_verification') {
      navigation.navigate('TradingAccountCreation', {screen: 'TAVerification'} as any);
    } else {
      navigation.navigate('TradingAccountCreation', {screen: 'TAAccountDetails'} as any);
    }
  }, [incompleteAccount, dispatch, navigation]);

  const handleLogout = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  const displayName = profileData
    ? `${profileData.displayName || ''} ${profileData.familyName || ''}`.trim()
    : '';

  const activeAccount = tradingAccounts.find(a => a.identifier === activeWorkspace);

  return (
    <AlphaLayout>
      <View style={styles.content}>
        {/* Title */}
        <Text fontSize={18} fontWeight="700" color="text-primary" style={styles.title}>
          {t('profile.title')}
        </Text>

        {/* Profile Header Card — shows active trading account when workspace is set */}
        <ProfileHeader
          displayName={displayName || t('user')}
          avatar={profileData?.avatar}
          activeAccount={activeAccount ? {
            accountName: activeAccount.accountName,
            careerName: activeAccount.careerName,
            avatar: activeAccount.avatar,
          } : null}
          onWorkspacePress={() => setShowSwitcher(true)}
        />

        {/* Menu Items */}
        <View style={styles.menuList}>
          <MenuItem
            icon={UserCircle}
            label={t('profile.myAccount')}
            onPress={() => navigation.navigate('MyAccount')}
          />
          <MenuItem icon={Wallet} label={t('profile.myWallet')} />
          <MenuItem icon={Clock} label={t('profile.transactionHistory')} />
        </View>

        {/* Incomplete Account — "Continue your application" CTA */}
        {incompleteAccount && (
          <TouchableOpacity
            style={[styles.resumeCard, {borderColor: primaryColor}]}
            onPress={handleResumeIncomplete}
            activeOpacity={0.7}>
            <View style={styles.resumeRow}>
              <View style={[styles.resumeAvatar, {backgroundColor: `${primaryColor}20`}]}>
                <Text fontSize={16} fontWeight="700" style={{color: primaryColor}}>
                  {(incompleteAccount.accountName || incompleteAccount.careerName || '?').charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.resumeInfo}>
                <Text fontSize={15} fontWeight="600" color="text-primary">
                  {incompleteAccount.accountName || incompleteAccount.careerName}
                </Text>
                <Text fontSize={12} color="primary">
                  {t('profile.continueApplication')}
                </Text>
              </View>
              <ArrowRight color={primaryColor} size={18} />
            </View>
          </TouchableOpacity>
        )}

        {/* Create Account Button */}
        <View style={styles.createButtonContainer}>
          <Button
            label={t('profile.createAccount')}
            severity="brand"
            w="full"
            disabled={!!incompleteAccount}
            onClick={handleCreateAccount}
          />
        </View>

        {/* Settings Menu */}
        <View style={[styles.menuList, {marginTop: 24}]}>
          <MenuItem icon={Settings} label={t('profile.settings')} />
          <MenuItem icon={HelpCircle} label={t('profile.helpCenter')} />
          <MenuItem icon={FileText} label={t('profile.termsAndConditions')} />
        </View>

        {/* Logout */}
        <Button
          label={t('profile.logout')}
          severity="secondary"
          outlined
          w="full"
          onClick={handleLogout}
          style={styles.logoutButton}
        />
      </View>

      {/* Workspace Switcher Bottom Sheet */}
      <WorkspaceSwitcher
        visible={showSwitcher}
        onClose={() => setShowSwitcher(false)}
        personalName={displayName || t('personal')}
        personalAvatar={profileData?.avatar}
        activeWorkspace={activeWorkspace}
        tradingAccounts={tradingAccounts}
        onSwitchPersonal={handleSwitchPersonal}
        onSwitchAccount={handleSwitchAccount}
        onAddAccount={handleCreateAccount}
        hasIncomplete={!!incompleteAccount}
      />
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 24,
  },
  title: {
    marginLeft: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  menuList: {
    gap: 8,
    marginTop: 16,
  },
  resumeCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#F0FDFA',
  },
  resumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumeAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resumeInfo: {
    flex: 1,
    gap: 2,
  },
  createButtonContainer: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 16,
  },
});

export default ProfileScreen;
