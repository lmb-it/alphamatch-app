import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {CheckCircle2, Clock, AlertCircle, Briefcase} from 'lucide-react-native';
import {
  tradingAccountActions,
  selectCreatedAccount,
} from '@src/modules/TradingAccount';
import {profileActions} from '@src/modules/Profile';
import AlphaLayout from '@src/layouts/AlphaLayout';

type CompletionStatus = 'active' | 'pending_verification' | 'pending_subscription';

export default function CompletionScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const createdAccount = useSelector(selectCreatedAccount);
  const primaryColor = resolveToken('primary');

  const status: CompletionStatus = useMemo(() => {
    const s = createdAccount?.setupStatus;
    if (createdAccount?.isActive || s === 'active') return 'active';
    if (s === 'pending_verification') return 'pending_verification';
    return 'pending_subscription';
  }, [createdAccount]);

  const navigateHome = useCallback((screen?: string) => {
    if (createdAccount) {
      dispatch(profileActions.switchWorkspace({workspaceRef: createdAccount.identifier}));
    }
    // Refresh accounts list so workspace switcher is up-to-date
    dispatch(tradingAccountActions.fetchMyAccounts());
    dispatch(tradingAccountActions.resetCreationFlow());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainTabs', params: screen ? {screen} : undefined}],
      }),
    );
  }, [createdAccount, dispatch, navigation]);

  const statusConfig = useMemo(() => {
    switch (status) {
      case 'active':
        return {
          icon: <CheckCircle2 color="#10B981" size={48} />,
          iconBg: '#D1FAE5',
          title: t('trading.success.activeTitle'),
          subtitle: t('trading.success.activeSubtitle'),
          badge: t('trading.success.activeAccount'),
          primaryButton: {label: t('trading.success.browseJobs'), action: () => navigateHome('CustomerJobs')},
          secondaryButton: {label: t('trading.success.goToProfile'), action: () => navigateHome('CustomerProfile')},
        };
      case 'pending_verification':
        return {
          icon: <Clock color="#F59E0B" size={48} />,
          iconBg: '#FEF3C7',
          title: t('trading.success.proTitle'),
          subtitle: t('trading.success.proSubtitle'),
          badge: t('trading.success.proAccount'),
          primaryButton: {label: t('trading.success.goToProfileVerify'), action: () => navigateHome('CustomerProfile')},
          secondaryButton: {label: t('trading.success.doItLater'), action: () => navigateHome()},
        };
      case 'pending_subscription':
        return {
          icon: <AlertCircle color="#6366F1" size={48} />,
          iconBg: '#E0E7FF',
          title: t('trading.success.pendingSubTitle'),
          subtitle: t('trading.success.pendingSubSubtitle'),
          badge: t('trading.success.pendingSubAccount'),
          primaryButton: {label: t('trading.success.goToProfile'), action: () => navigateHome('CustomerProfile')},
          secondaryButton: {label: t('trading.success.browseJobs'), action: () => navigateHome('CustomerJobs')},
        };
    }
  }, [status, t, navigateHome]);

  return (
    <AlphaLayout showDecorations={false} scrollEnabled={false} showBackButton={false}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg" px={24} py={40} justifyContent="center" alignItems="center">

        <View style={[styles.iconCircle, {backgroundColor: statusConfig.iconBg}]} accessible accessibilityLabel={`Status: ${statusConfig.badge}`}>
          {statusConfig.icon}
        </View>

        <Heading as="h2" bold color="text-primary" textAlign="center" mt={32} style={styles.heading}>
          {statusConfig.title}
        </Heading>

        <Text
          fontSize={16}
          color="text-subtle"
          textAlign="center"
          lineHeight={24}
          mt={16}
          px={12}>
          {statusConfig.subtitle}
        </Text>

        <View style={styles.workspaceCard} accessible accessibilityLabel={`Workspace: ${createdAccount?.accountName || createdAccount?.careerName || 'Your business'}, ${statusConfig.badge}`}>
           <View style={[styles.avatarTemp, {backgroundColor: `${primaryColor}20`}]}>
             <Briefcase color={primaryColor} size={24} />
           </View>
           <View style={{flex: 1, marginLeft: 16}}>
             <Text fontSize={16} fontWeight="700" color="text-primary">
               {createdAccount?.accountName || createdAccount?.careerName || t('trading.success.yourBusinessName')}
             </Text>
             <Text fontSize={14} color="text-subtle" mt={2}>
               {statusConfig.badge}
             </Text>
           </View>
        </View>

        <View style={styles.buttons}>
          <Button
            label={statusConfig.primaryButton.label}
            severity="brand"
            w="full"
            onClick={statusConfig.primaryButton.action}
          />
          <Button
            label={statusConfig.secondaryButton.label}
            severity="secondary"
            outlined
            w="full"
            onClick={statusConfig.secondaryButton.action}
          />
        </View>
      </Flex>
    </AlphaLayout>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
  },
  workspaceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
  },
  avatarTemp: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
    marginTop: 48,
    gap: 16,
  },
});
