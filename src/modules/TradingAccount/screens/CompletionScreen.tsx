import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {CheckCircle2, Clock, Briefcase} from 'lucide-react-native';
import {
  tradingAccountActions, 
  selectCreatedAccount,
  selectAIResult,
  selectCareers,
  selectSelectedCareerRef
} from '@src/modules/TradingAccount';
import {profileActions} from '@src/modules/Profile';

export default function CompletionScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const createdAccount = useSelector(selectCreatedAccount);
  const aiResult = useSelector(selectAIResult);
  const selectedCareerRef = useSelector(selectSelectedCareerRef);
  const allCareers = useSelector(selectCareers) || [];
  const primaryColor = resolveToken('primary');

  const careerToConfirm = useMemo(() => {
    if (aiResult?.detectedCareer) return aiResult.detectedCareer;
    const found = allCareers.find(c => c.identifier === selectedCareerRef);
    if (found) return { model: found.businessModel || 'flex' };
    return { model: 'flex' };
  }, [aiResult, selectedCareerRef, allCareers]);

  const isFlex = careerToConfirm?.model?.toLowerCase() === 'flex';

  const handleGoToProfile = useCallback(() => {
    if (createdAccount) {
      dispatch(profileActions.switchWorkspace({workspaceRef: createdAccount.identifier}));
    }
    dispatch(tradingAccountActions.resetCreationFlow());
    // In a real app we might navigate explicitly to an exact tab, here assuming CustomerProfile
    navigation.dispatch(
      CommonActions.reset({
        index: 0, 
        routes: [
          {
            name: 'MainTabs', 
            // Attempt to deeply nest to customer profile tab if supported
            params: { screen: 'CustomerProfile' }
          }
        ]
      }),
    );
  }, [createdAccount, dispatch, navigation]);

  const handleGoToJobs = useCallback(() => {
    if (createdAccount) {
      dispatch(profileActions.switchWorkspace({workspaceRef: createdAccount.identifier}));
    }
    dispatch(tradingAccountActions.resetCreationFlow());
    navigation.dispatch(
      CommonActions.reset({
        index: 0, 
        routes: [
          {
            name: 'MainTabs',
            params: { screen: 'CustomerJobs' }
          }
        ]
      }),
    );
  }, [createdAccount, dispatch, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg" px={24} py={40} justifyContent="center" alignItems="center">
        
        {isFlex ? (
          <View style={styles.iconCircleFlex}>
            <CheckCircle2 color="#10B981" size={48} />
          </View>
        ) : (
          <View style={styles.iconCirclePro}>
            <Clock color="#F59E0B" size={48} />
          </View>
        )}

        <Heading as="h2" bold color="text-primary" textAlign="center" mt={32} style={styles.heading}>
          {isFlex ? t('trading.success.flexTitle') : t('trading.success.proTitle')}
        </Heading>

        <Text
          fontSize={16}
          color="text-subtle"
          textAlign="center"
          lineHeight={24}
          mt={16}
          px={12}>
          {isFlex
            ? t('trading.success.flexSubtitle')
            : t('trading.success.proSubtitle')}
        </Text>

        <View style={styles.workspaceCard}>
           <View style={[styles.avatarTemp, {backgroundColor: `${primaryColor}20`}]}>
             <Briefcase color={primaryColor} size={24} />
           </View>
           <View style={{flex: 1, marginLeft: 16}}>
             <Text fontSize={16} fontWeight="700" color="text-primary">
               {createdAccount?.accountName || t('trading.success.yourBusinessName')}
             </Text>
             <Text fontSize={14} color="text-subtle" mt={2}>
               {isFlex ? t('trading.success.flexAccount') : t('trading.success.proAccount')}
             </Text>
           </View>
        </View>

        <View style={styles.buttons}>
          {isFlex ? (
             <Button
               label={t('trading.success.browseJobs')}
               severity="brand"
               w="full"
               onClick={handleGoToJobs}
             />
          ) : (
             <Button
               label={t('trading.success.goToProfileVerify')}
               severity="brand"
               w="full"
               onClick={handleGoToProfile}
             />
          )}
          
          <Button
            label={isFlex ? t('trading.success.goToProfile') : t('trading.success.doItLater')}
            severity="secondary"
            outlined
            w="full"
            onClick={isFlex ? handleGoToProfile : handleGoToJobs}
          />
        </View>
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  iconCircleFlex: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCirclePro: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEF3C7',
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
