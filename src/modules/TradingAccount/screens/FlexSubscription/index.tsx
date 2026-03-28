import React, {useEffect, useCallback, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {CheckCircle2, Zap} from 'lucide-react-native';
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
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

/**
 * Alpha Flex Subscription Screen
 *
 * Flex careers have a single fixed plan — no plan picker required.
 * Uses the same /subscriptions/plans endpoint as Pro but renders
 * the first plan as a fixed offering with its own distinct visual style.
 */
const FlexSubscriptionScreen: React.FC = () => {
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

  const didSubscribe = useRef(false);
  const [paymentReady, setPaymentReady] = useState(false);

  // Fetch the single Flex plan + Stripe setup intent
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
      didSubscribe.current &&
      createdAccount &&
      createdAccount !== prevAccountRef.current
    ) {
      didSubscribe.current = false;
      navigation.navigate('TACompletion');
    }
    prevAccountRef.current = createdAccount;
  }, [createdAccount, navigation]);

  const plan = plans[0] ?? null;

  const priceDisplay = plan
    ? plan.cost === 0
      ? t('trading.sub.free')
      : `$${Number(plan.cost).toFixed(2)}`
    : null;

  const handleSubscribe = useCallback(async () => {
    if (!plan || !createdAccount) return;

    // Free plans skip payment sheet
    if (plan.cost === 0 || plan.trialDays > 0) {
      didSubscribe.current = true;
      dispatch(
        tradingAccountActions.subscribe({
          tradingAccountRef: createdAccount.identifier,
          planRef: plan.identifier,
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

    // Payment succeeded — subscribe via backend
    didSubscribe.current = true;
    dispatch(
      tradingAccountActions.subscribe({
        tradingAccountRef: createdAccount.identifier,
        planRef: plan.identifier,
        paymentMethodId: 'setup_intent_confirmed',
      }),
    );
  }, [plan, createdAccount, dispatch, presentPaymentSheet]);

  if (loading && !plan) {
    return (
      <AlphaLayout>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      </AlphaLayout>
    );
  }

  return (
    <AlphaLayout>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconWrap, {backgroundColor: `${primaryColor}15`}]}>
            <Zap color={primaryColor} size={32} />
          </View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.flex.title')}
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8} style={styles.subtitle}>
            {t('trading.flex.subtitle')}
          </Text>
        </View>

        {/* Single fixed-plan card */}
        {plan && (
          <View style={[styles.planCard, {borderColor: primaryColor}]} accessible accessibilityRole="summary" accessibilityLabel={`Subscription plan: ${plan.title}`}>
            {/* Badge */}
            <View style={[styles.badge, {backgroundColor: `${primaryColor}15`}]}>
              <Text fontSize={12} fontWeight="700" color="primary">
                {t('trading.flex.fixedPlan')}
              </Text>
            </View>

            <Text fontSize={22} fontWeight="800" color="text-primary" mt={16}>
              {plan.title}
            </Text>
            {plan.summary ? (
              <Text fontSize={14} color="text-subtle" lineHeight={20} mt={6}>
                {plan.summary}
              </Text>
            ) : null}

            {/* Price row */}
            <View style={styles.priceRow}>
              <Text fontSize={40} fontWeight="900" color="primary">
                {priceDisplay}
              </Text>
              {plan.cost > 0 && (
                <Text fontSize={14} color="text-subtle" ml={4} style={styles.cycle}>
                  /{plan.cycle}
                </Text>
              )}
            </View>

            {/* Billing details */}
            <View style={[styles.billingBox, {backgroundColor: '#F9FAFB'}]}>
              <View style={styles.billingRow}>
                <Text fontSize={13} color="text-subtle">{t('trading.flex.billingPeriod')}</Text>
                <Text fontSize={13} fontWeight="600" color="text-primary">
                  {plan.cycle ?? '-'}
                </Text>
              </View>
              {plan.trialDays > 0 && (
                <View style={styles.billingRow}>
                  <Text fontSize={13} color="text-subtle">{t('trading.flex.amountDueToday')}</Text>
                  <Text fontSize={13} fontWeight="600" color="#10B981">
                    {t('trading.sub.free')}
                  </Text>
                </View>
              )}
              {plan.trialDays === 0 && (
                <View style={styles.billingRow}>
                  <Text fontSize={13} color="text-subtle">{t('trading.flex.amountDueToday')}</Text>
                  <Text fontSize={13} fontWeight="600" color="text-primary">
                    {priceDisplay}
                  </Text>
                </View>
              )}
            </View>

            {/* Trial badge */}
            {plan.trialDays > 0 && (
              <View style={[styles.trialBadge, {backgroundColor: '#D1FAE5'}]}>
                <Text fontSize={13} fontWeight="600" color="#059669">
                  {plan.trialDays} {t('trading.sub.daysTrial')}
                </Text>
              </View>
            )}

            {/* Perks */}
            {plan.perks?.length > 0 && (
              <View style={styles.perksList}>
                {plan.perks.map((perk, i) => (
                  <View key={i} style={styles.perkRow} accessible accessibilityLabel={perk}>
                    <CheckCircle2 color={primaryColor} size={16} accessibilityElementsHidden />
                    <Text fontSize={13} color="text-primary" ml={10}>{perk}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <Button
          label={t('trading.flex.activate')}
          severity="brand"
          w="full"
          loading={loading}
          disabled={!plan}
          onClick={handleSubscribe}
          style={styles.cta}
        />

        <Text
          fontSize={12}
          color="text-subtle"
          textAlign="center"
          lineHeight={18}
          mt={12}>
          {t('trading.flex.noCommitment')}
        </Text>
      </ScrollView>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  planCard: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 22,
    backgroundColor: '#FFFFFF',
    marginBottom: 28,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
  },
  cycle: {
    marginBottom: 6,
  },
  billingBox: {
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 14,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trialBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
  },
  perksList: {
    gap: 10,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cta: {
    marginTop: 4,
  },
});

export default FlexSubscriptionScreen;
