import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {ShieldCheck, Zap, Check} from 'lucide-react-native';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {useDispatch} from 'react-redux';
import {tradingAccountActions} from '../../store/tradingAccount.slice';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

const IntroScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const primaryColor = resolveToken('primary');

  // Clear any stale creation state from a previous flow
  useEffect(() => {
    dispatch(tradingAccountActions.resetCreationFlow());
  }, [dispatch]);

  const handleContinue = useCallback(() => {
    navigation.navigate('TAInput');
  }, [navigation]);

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} pt={32} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.intro.title')}
          </Heading>

          {/* Alpha Pro explanation */}
          <View style={styles.modelCard}>
            <View style={styles.modelHeader}>
              <ShieldCheck color={primaryColor} size={22} />
              <Text fontSize={16} fontWeight="700" color="text-primary" ml={10}>
                {t('trading.intro.proTitle')}
              </Text>
            </View>
            <Text fontSize={13} color="text-subtle" lineHeight={20} mt={8}>
              {t('trading.intro.proDescription')}
            </Text>
          </View>

          {/* Alpha Flex explanation */}
          <View style={styles.modelCard}>
            <View style={styles.modelHeader}>
              <Zap color={primaryColor} size={22} />
              <Text fontSize={16} fontWeight="700" color="text-primary" ml={10}>
                {t('trading.intro.flexTitle')}
              </Text>
            </View>
            <Text fontSize={13} color="text-subtle" lineHeight={20} mt={8}>
              {t('trading.intro.flexDescription')}
            </Text>
          </View>

          {/* How it works note */}
          <Text fontSize={13} color="text-subtle" lineHeight={20} mt={16} px={4}>
            {t('trading.intro.howItWorks')}
          </Text>

          {/* Terms and conditions checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setTermsAccepted(prev => !prev)}
            activeOpacity={0.7}
            accessible
            accessibilityRole="checkbox"
            accessibilityState={{checked: termsAccepted}}
            accessibilityLabel={t('trading.intro.termsCheckbox')}>
            <View
              style={[
                styles.checkboxBox,
                termsAccepted && {backgroundColor: primaryColor, borderColor: primaryColor},
              ]}>
              {termsAccepted && <Check color="#FFFFFF" size={14} />}
            </View>
            <Text fontSize={13} color="text-primary" lineHeight={18} style={styles.checkboxLabel}>
              {t('trading.intro.termsCheckbox')}
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          label={t('trading.intro.continueButton')}
          severity="brand"
          w="full"
          onClick={handleContinue}
          disabled={!termsAccepted}
        />
      </Flex>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    lineHeight: 34,
    marginBottom: 24,
  },
  modelCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 4,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  checkboxLabel: {
    flex: 1,
  },
});

export default IntroScreen;
