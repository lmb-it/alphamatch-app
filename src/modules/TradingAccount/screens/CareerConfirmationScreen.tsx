import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {CheckCircle2, AlertCircle, Briefcase} from 'lucide-react-native';
import {
  selectAIResult,
  selectCareers,
  selectCreatedAccount,
  selectSelectedCareerRef,
  selectTALoading,
  tradingAccountActions,
} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

export default function CareerConfirmationScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  
  const aiResult = useSelector(selectAIResult);
  const selectedCareerRef = useSelector(selectSelectedCareerRef);
  const allCareers = useSelector(selectCareers) || [];
  const createdAccount = useSelector(selectCreatedAccount);
  const loading = useSelector(selectTALoading);
  const didSubmit = useRef(false);

  const primaryColor = resolveToken('primary');

  // Navigate when account is created
  useEffect(() => {
    if (createdAccount && didSubmit.current) {
      didSubmit.current = false;
      navigation.navigate('TAMissingQuestions');
    }
  }, [createdAccount, navigation]);

  // Determine which career we are confirming (AI detected vs Manually selected)
  const careerToConfirm = useMemo(() => {
    if (aiResult?.detectedCareer) {
      return aiResult.detectedCareer;
    }
    // Fallback search through redux state or dummy data for manual flow
    const found = allCareers.find(c => c.identifier === selectedCareerRef);
    if (found) {
      return {
        name: found.title,
        categoryName: found.category || 'Trading Category',
        model: found.businessModel || 'flex',
        confidence: 1, // 100% since manually picked
      };
    }
    // Deep fallback if Redux was emptied for UI demo
    return {
      name: 'Electrician',
      categoryName: 'Construction & Trade',
      model: 'flex',
      confidence: 1,
    };
  }, [aiResult, selectedCareerRef, allCareers]);

  const isPro = careerToConfirm?.model?.toLowerCase() === 'pro';

  const handleContinue = useCallback(() => {
    const careerRef = aiResult?.detectedCareer?.identifier || selectedCareerRef;
    if (!careerRef) return;

    didSubmit.current = true;
    dispatch(tradingAccountActions.createAccount({
      careerRef,
      signupMethod: aiResult ? 'ai' : 'manual',
      answeredQuestions: aiResult?.answeredQuestions?.map(q => ({
        fieldRef: q.fieldRef,
        value: q.extractedValue,
      })),
      unmatchedContent: aiResult?.unmatchedContent,
    }));
  }, [dispatch, aiResult, selectedCareerRef]);

  const handleRetake = useCallback(() => {
    // If they don't agree with the detection, let them pick manually
    navigation.navigate('TACareerSelection');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        <ScrollView contentContainerStyle={styles.container}>
          
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {aiResult ? t('trading.confirm.aiTitle') : t('trading.confirm.manualTitle')}
          </Heading>
          
          <Text fontSize={15} color="text-subtle" lineHeight={22} mt={12}>
            {aiResult
              ? t('trading.confirm.aiSubtitle')
              : t('trading.confirm.manualSubtitle')}
          </Text>

          {/* Main Career Badge */}
          <View style={[styles.careerCard, {borderColor: primaryColor}]}>
             <View style={styles.careerRow}>
               <View style={[styles.careerIcon, {backgroundColor: `${primaryColor}15`}]}>
                 <Briefcase color={primaryColor} size={24} />
               </View>
               <View style={styles.careerInfo}>
                 <Text fontSize={18} fontWeight="700" color="text-primary">
                   {careerToConfirm.name}
                 </Text>
                 <Text fontSize={13} color="text-subtle" mt={2}>
                   {careerToConfirm.categoryName}
                 </Text>
               </View>
               {aiResult && (
                 <View style={styles.confidenceBadge}>
                   <CheckCircle2 color="#10B981" size={14} />
                   <Text fontSize={12} fontWeight="700" color="#059669" ml={4}>
                     {Math.round((careerToConfirm.confidence || 0) * 100)}% Match
                   </Text>
                 </View>
               )}
             </View>

             {/* PRO / FLEX Explainer Box */}
             <View style={[styles.modelExplainer, isPro ? styles.proBg : styles.flexBg]}>
               <Text fontSize={14} fontWeight="700" color={isPro ? '#B45309' : '#1D4ED8'} mb={4}>
                 {isPro ? t('trading.confirm.isAlphaPro') : t('trading.confirm.isAlphaFlex')}
               </Text>
               <Text fontSize={13} color={isPro ? '#B45309' : '#1D4ED8'} lineHeight={18}>
                 {isPro
                   ? t('trading.confirm.proExplainer')
                   : t('trading.confirm.flexExplainer')}
               </Text>
             </View>
          </View>

          {/* AI Extraction Summary */}
          {aiResult && (
            <View style={styles.extractionSummary}>
              <View style={styles.summaryItem}>
                <Text fontSize={24} fontWeight="800" color="text-primary">
                  {aiResult.answeredQuestions?.length || 0}
                </Text>
                <Text fontSize={13} color="text-subtle">{t('trading.confirm.savedFields')}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text fontSize={24} fontWeight="800" color="#F59E0B">
                  {aiResult.unansweredQuestions?.length || 0}
                </Text>
                <Text fontSize={13} color="text-subtle">{t('trading.confirm.remainingFields')}</Text>
              </View>
            </View>
          )}

          <View style={styles.bottomActions}>
            <Button
              label={t('trading.confirm.continueToForm')}
              severity="brand"
              w="full"
              loading={loading}
              onClick={handleContinue}
            />
            {aiResult && (
              <Button
                label={t('trading.confirm.pickManually')}
                severity="secondary"
                outlined
                w="full"
                onClick={handleRetake}
              />
            )}
          </View>

        </ScrollView>
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
  },
  careerCard: {
    borderWidth: 1.5,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    overflow: 'hidden',
  },
  careerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  careerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  careerInfo: {
    flex: 1,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  modelExplainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  proBg: {
    backgroundColor: '#FFFBEB',
  },
  flexBg: {
    backgroundColor: '#EFF6FF',
  },
  extractionSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingVertical: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#D1D5DB',
  },
  bottomActions: {
    marginTop: 40,
    gap: 16,
  },
});
