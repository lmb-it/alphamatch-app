import React, {useEffect, useCallback, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {CheckCircle2} from 'lucide-react-native';
import {useStripe} from '@stripe/stripe-react-native';
import {
  tradingAccountActions,
  selectPlans,
  selectCreatedAccount,
  selectSelectedCareerRef,
  selectTALoading,
  selectStripeClientSecret,
  selectStripeEphemeralKey,
  selectStripeCustomerId,
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
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const plans = useSelector(selectPlans);
  const createdAccount = useSelector(selectCreatedAccount);
  const careerRef = useSelector(selectSelectedCareerRef);
  const loading = useSelector(selectTALoading);
  const stripeClientSecret = useSelector(selectStripeClientSecret);
  const stripeEphemeralKey = useSelector(selectStripeEphemeralKey);
  const stripeCustomerId = useSelector(selectStripeCustomerId);
  const primaryColor = resolveToken('primary');
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(null);
  const [paymentReady, setPaymentReady] = useState(false);
  const didSubmit = useRef(false);

  useEffect(() => {
    if (careerRef) {
      dispatch(tradingAccountActions.fetchPlans(careerRef));
      dispatch(tradingAccountActions.fetchSetupIntent());
    }
  }, [careerRef, dispatch]);

  // Initialize PaymentSheet when Stripe secrets arrive
  useEffect(() => {
    if (!stripeClientSecret || !stripeEphemeralKey || !stripeCustomerId) return;

    const init = async () => {
      const {error} = await initPaymentSheet({
        customerId: stripeCustomerId,
        customerEphemeralKeySecret: stripeEphemeralKey,
        setupIntentClientSecret: stripeClientSecret,
        merchantDisplayName: 'AlphaMatch',
      });
      if (!error) {
        setPaymentReady(true);
      }
    };
    init();
  }, [stripeClientSecret, stripeEphemeralKey, stripeCustomerId, initPaymentSheet]);

  // Navigate to completion after successful subscription
  const prevAccountRef = useRef(createdAccount);
  useEffect(() => {
    if (
      didSubmit.current &&
      createdAccount &&
      createdAccount !== prevAccountRef.current
    ) {
      didSubmit.current = false;
      navigation.navigate('TACompletion');
    }
    prevAccountRef.current = createdAccount;
  }, [createdAccount, navigation]);

  const handleSubscribe = useCallback(async () => {
    if (!selectedPlan || !createdAccount) return;

    // Free plans or trial plans skip payment sheet
    if (selectedPlan.cost === 0 || selectedPlan.trialDays > 0) {
      didSubmit.current = true;
      dispatch(
        tradingAccountActions.subscribe({
          tradingAccountRef: createdAccount.identifier,
          planRef: selectedPlan.identifier,
          paymentMethodId: 'free',
        }),
      );
      return;
    }

    // Present Stripe PaymentSheet for paid plans
    const {error} = await presentPaymentSheet();
    if (error) {
      Alert.alert(error.code, error.message);
      return;
    }

    didSubmit.current = true;
    dispatch(
      tradingAccountActions.subscribe({
        tradingAccountRef: createdAccount.identifier,
        planRef: selectedPlan.identifier,
        paymentMethodId: 'setup_intent_confirmed',
      }),
    );
  }, [selectedPlan, createdAccount, dispatch, presentPaymentSheet]);

  const handlePayLater = useCallback(() => {
    Alert.alert(
      t('trading.sub.payLaterTitle'),
      t('trading.sub.payLaterMessage'),
      [
        {text: t('cancel'), style: 'cancel'},
        {
          text: t('trading.sub.payLaterConfirm'),
          onPress: () => navigation.navigate('TACompletion'),
        },
      ],
    );
  }, [navigation, t]);

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.sub.pickAPlan')}
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8}>
            {t('trading.sub.subtitle')}
          </Text>

          <View style={styles.plansList}>
            {plans.map(plan => {
              const isSelected = selectedPlan?.identifier === plan.identifier;
              const priceDisplay =
                plan.cost === 0
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
                    <View style={{flex: 1}}>
                      <Text fontSize={16} fontWeight="700" color="text-primary">
                        {plan.title}
                      </Text>
                      <Text fontSize={13} color="text-subtle" mt={4} lineHeight={18}>
                        {plan.summary}
                      </Text>
                    </View>
                    <View style={styles.priceBlock}>
                      <Text fontSize={20} fontWeight="800" color="primary">
                        {priceDisplay}
                      </Text>
                      {plan.cost > 0 && (
                        <Text fontSize={11} color="text-subtle">/{plan.cycle}</Text>
                      )}
                    </View>
                  </View>
                  {plan.perks?.length > 0 && isSelected && (
                    <View style={styles.perksList}>
                      {plan.perks.map((perk, i) => (
                        <View key={i} style={styles.perkRow}>
                          <CheckCircle2 color={primaryColor} size={16} />
                          <Text fontSize={13} color="text-primary" ml={8}>{perk}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {plan.trialDays > 0 && (
                    <View style={[styles.trialBadge, {backgroundColor: `${primaryColor}10`}]}>
                      <Text fontSize={12} fontWeight="600" color="primary">
                        {plan.trialDays} {t('trading.sub.daysTrial')}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomActions}>
          <Button
            label={t('trading.sub.subscribeNow')}
            severity="brand"
            w="full"
            loading={loading}
            disabled={!selectedPlan}
            onClick={handleSubscribe}
          />
          <TouchableOpacity style={styles.payLaterButton} onPress={handlePayLater}>
            <Text fontSize={15} color="text-subtle" fontWeight="600" textAlign="center">
              {t('trading.sub.payLater')}
            </Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'flex-start',
  },
  priceBlock: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  perksList: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 10,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trialBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bottomActions: {
    gap: 16,
  },
  payLaterButton: {
    paddingVertical: 14,
  },
});

export default SubscriptionScreen;
