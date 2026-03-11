import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Upload, FileCheck, CheckCircle2} from 'lucide-react-native';
import {
  tradingAccountActions,
  selectCreatedAccount,
  selectRequiredDocuments,
  selectTALoading,
} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

export default function VerificationScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const primaryColor = resolveToken('primary');

  const createdAccount = useSelector(selectCreatedAccount);
  const requiredDocuments = useSelector(selectRequiredDocuments);
  const loading = useSelector(selectTALoading);
  const isFlex = createdAccount?.careerModel?.toLowerCase() === 'flex';

  // Fetch required documents on mount
  useEffect(() => {
    if (createdAccount?.identifier) {
      dispatch(tradingAccountActions.fetchDocuments(createdAccount.identifier));
    }
  }, [createdAccount?.identifier, dispatch]);

  const handleContinue = () => {
    navigation.navigate('TACompletion');
  };

  /**
   * Pro Verification UI
   */
  const renderProView = () => (
    <View style={styles.contentBlock}>
      <Heading as="h2" bold color="text-primary" style={styles.heading}>
        {t('trading.verify.title')}
      </Heading>
      <Text fontSize={15} color="text-subtle" lineHeight={22} mt={12}>
        {t('trading.verify.desc')}
      </Text>

      <View style={styles.docsList}>
        <Text fontSize={16} fontWeight="700" color="text-primary" mb={16}>
          {t('trading.verify.requiredDocuments')}
        </Text>
        {requiredDocuments.map((doc) => (
          <View key={doc.identifier} style={styles.docRow}>
            <View style={[styles.docIcon, {backgroundColor: primaryColor + '15'}]}>
              <FileCheck color={primaryColor} size={20} />
            </View>
            <View style={styles.docInfo}>
              <Text fontSize={15} fontWeight="600" color="text-primary">
                {doc.documentName}
              </Text>
              <Text fontSize={13} color={doc.isMandatory ? '#EF4444' : 'text-subtle'}>
                {doc.isMandatory ? t('required') : t('optional')}
              </Text>
            </View>
            <TouchableOpacity style={[styles.uploadBtn, {borderColor: primaryColor}]} activeOpacity={0.7}>
              <Upload color={primaryColor} size={16} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.bottomActions}>
        <Button
          label={t('trading.verify.uploadNow')}
          severity="brand"
          w="full"
          onClick={handleContinue}
        />
        <TouchableOpacity style={styles.skipButton} onPress={handleContinue}>
          <Text fontSize={15} color="text-subtle" fontWeight="600" textAlign="center">
            {t('trading.verify.skip')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  /**
   * Flex Subscription UI
   */
  const renderFlexView = () => (
    <View style={styles.contentBlock}>
      <Heading as="h2" bold color="text-primary" style={styles.heading}>
        {t('trading.verify.flexTitle')}
      </Heading>
      <Text fontSize={15} color="text-subtle" lineHeight={22} mt={12}>
        {t('trading.verify.flexSubtitle')}
      </Text>

      <View style={styles.pricingCard}>
        <Text fontSize={36} fontWeight="800" color="text-primary">
          {t('trading.verify.priceAmount')}<Text fontSize={16} color="text-subtle" fontWeight="500">{t('trading.verify.perMonth')}</Text>
        </Text>
        <View style={styles.featuresList}>
          {[t('trading.verify.feature1'), t('trading.verify.feature2'), t('trading.verify.feature3'), t('trading.verify.feature4')].map((feat, i) => (
             <View key={i} style={styles.featureRow}>
               <CheckCircle2 color={primaryColor} size={20} />
               <Text fontSize={15} color="text-primary" ml={12}>{feat}</Text>
             </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomActions}>
         <Button
            label={t('trading.sub.subscribeNow')}
            severity="brand"
            w="full"
            onClick={handleContinue}
          />
          <TouchableOpacity style={styles.skipButton} onPress={handleContinue}>
            <Text fontSize={15} color="text-subtle" fontWeight="600" textAlign="center">
              {t('trading.verify.skip')}
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        <ScrollView contentContainerStyle={styles.container}>
          
          {isFlex ? renderFlexView() : renderProView()}

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
    paddingTop: 16,
    paddingBottom: 40,
  },
  contentBlock: {
    flex: 1,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
  },
  docsList: {
    marginTop: 32,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  docIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  docInfo: {
    flex: 1,
    gap: 4,
  },
  uploadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActions: {
    marginTop: 40,
    gap: 16,
  },
  skipButton: {
    paddingVertical: 14,
  },
  pricingCard: {
    marginTop: 32,
    padding: 24,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
  },
  featuresList: {
    marginTop: 24,
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
