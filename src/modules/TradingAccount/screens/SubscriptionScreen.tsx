import React, {useEffect, useCallback, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {
  tradingAccountActions,
  selectPlans,
  selectCreatedAccount,
  selectSelectedCareerRef,
  selectTALoading,
} from '@src/modules/TradingAccount';
import type {ISubscriptionPlan} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

const SubscriptionScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const plans = useSelector(selectPlans);
  const createdAccount = useSelector(selectCreatedAccount);
  const careerRef = useSelector(selectSelectedCareerRef);
  const loading = useSelector(selectTALoading);
  const primaryColor = resolveToken('primary');
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(null);
  const didSubmit = useRef(false);

  useEffect(() => {
    if (careerRef) {
      dispatch(tradingAccountActions.fetchPlans(careerRef));
    }
  }, [careerRef, dispatch]);

  // Navigate to completion after successful subscription
  useEffect(() => {
    if (createdAccount?.isActive && didSubmit.current) {
      didSubmit.current = false;
      navigation.navigate('TACompletion');
    }
  }, [createdAccount, navigation]);

  const handleSubscribe = useCallback(() => {
    if (!selectedPlan || !createdAccount) return;
    didSubmit.current = true;
    // In production, this would trigger Stripe PaymentSheet first
    dispatch(
      tradingAccountActions.subscribe({
        tradingAccountRef: createdAccount.identifier,
        planRef: selectedPlan.identifier,
        paymentMethodId: 'pm_placeholder', // Stripe PM from PaymentSheet
      }),
    );
  }, [selectedPlan, createdAccount, dispatch]);

  const modelBadgeColor = (model: string) => {
    switch (model?.toLowerCase()) {
      case 'pro':
        return '#F59E0B';
      case 'flex':
        return primaryColor;
      default:
        return '#6B7280';
    }
  };

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.sub.pickAPlan')}
          </Heading>

          <View style={styles.plansList}>
            {plans.map(plan => {
              const isSelected = selectedPlan?.identifier === plan.identifier;
              const badgeColor = modelBadgeColor(plan.cycle);
              const priceDisplay =
                plan.cost === 0 || plan.cost === '0'
                  ? t('trading.sub.free')
                  : `$${Number(plan.cost).toFixed(2)}`;

              return (
                <TouchableOpacity
                  key={plan.identifier}
                  style={[
                    styles.planCard,
                    isSelected && {borderColor: primaryColor, borderWidth: 2},
                  ]}
                  onPress={() => setSelectedPlan(plan)}
                  activeOpacity={0.7}>
                  <View style={styles.planHeader}>
                    <View style={styles.planTitleRow}>
                      <View style={[styles.modelBadge, {backgroundColor: badgeColor + '20'}]}>
                        <Text fontSize={10} fontWeight="700" style={{color: badgeColor}}>
                          {plan.cycle?.charAt(0).toUpperCase() + plan.cycle?.slice(1) || 'Plan'}
                        </Text>
                      </View>
                      <Text fontSize={16} fontWeight="700" color="text-primary">
                        {plan.title}
                      </Text>
                    </View>
                    <Text fontSize={16} fontWeight="700" color="primary">
                      {priceDisplay}
                    </Text>
                  </View>
                  <Text fontSize={13} color="text-subtle" mt={6} lineHeight={18}>
                    {plan.summary}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Button
          label={t('ta.continue')}
          severity="brand"
          w="full"
          loading={loading}
          onClick={handleSubscribe}
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
  plansList: {
    marginTop: 28,
    gap: 14,
  },
  planCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default SubscriptionScreen;
