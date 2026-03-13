import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Briefcase, Star, CreditCard} from 'lucide-react-native';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {useDispatch} from 'react-redux';
import {tradingAccountActions} from '../store/tradingAccount.slice';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

const IntroScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const primaryColor = resolveToken('primary');

  // Clear any stale creation state from a previous flow
  useEffect(() => {
    dispatch(tradingAccountActions.resetCreationFlow());
  }, [dispatch]);

  const benefits = [
    {icon: Briefcase, text: t('ta.introBenefit1')},
    {icon: Star, text: t('ta.introBenefit2')},
    {icon: CreditCard, text: t('ta.introBenefit3')},
  ];

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={40} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('ta.introTitle')}{' '}
            <Heading as="h2" bold color="primary">{t('ta.introTitleAccent')}</Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8}>
            {t('ta.introSubtitle')}
          </Text>

          <View style={styles.benefitsList}>
            {benefits.map((item, index) => (
              <View key={index} style={styles.benefitRow} accessible accessibilityLabel={item.text}>
                <View style={[styles.iconCircle, {backgroundColor: primaryColor + '15'}]}>
                  <item.icon color={primaryColor} size={20} accessibilityElementsHidden />
                </View>
                <Text fontSize={14} color="text-primary" style={styles.benefitText}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          label="ta.getStarted"
          severity="brand"
          w="full"
          onClick={() => navigation.navigate('TABasicInfo')}
        />
      </Flex>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  benefitsList: {
    marginTop: 40,
    gap: 20,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    flex: 1,
  },
});

export default IntroScreen;
