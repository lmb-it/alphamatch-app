import React, {useEffect, useRef} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {
  tradingAccountActions,
  selectCreatedAccount,
  selectTALoading,
} from '@src/modules/TradingAccount';
import {selectProfileUser} from '@src/modules/Profile';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

/**
 * TAConfirmationScreen — pure loading transition.
 *
 * Responsibilities:
 *   1. Dispatch finalizeAccount with accountName derived from the user profile.
 *   2. Wait for the API response (loading → false, createdAccount updated).
 *   3. Route based on careerModel from the response:
 *        Pro  → TAProConfirmation  (verification pending, no subscription ever)
 *        Flex → TAFlexActivation  (subscription activation, no verification)
 *
 * Business info fields (businessName, shortBio, contactPhone, fullAddress) are no
 * longer collected during creation — they will be managed from the Trading Account
 * Edit Profile page. accountName defaults to the user's full name.
 *
 * This screen has no visible UI other than a loading indicator.
 * It must never contain subscription, plan, or payment language.
 */
const TAConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();

  const profileUser = useSelector(selectProfileUser);
  const createdAccount = useSelector(selectCreatedAccount);
  const loading = useSelector(selectTALoading);

  const didFinalize = useRef(false);
  const didNavigate = useRef(false);
  // Snapshot of createdAccount before finalize — detects when
  // finalizeAccountSuccess updates it with a fresh object reference.
  const prevAccountRef = useRef(createdAccount);

  // Dispatch finalizeAccount exactly once on mount.
  useEffect(() => {
    if (didFinalize.current || !createdAccount?.identifier) return;
    prevAccountRef.current = createdAccount;
    didFinalize.current = true;

    const accountName = `${profileUser?.displayName ?? ''} ${profileUser?.familyName ?? ''}`.trim() || null;

    dispatch(
      tradingAccountActions.finalizeAccount({
        tradingAccountRef: createdAccount.identifier,
        accountName,
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate once finalizeAccountSuccess fires.
  // Guards:
  //   didFinalize     — must have dispatched first
  //   !loading        — request must be complete
  //   !didNavigate    — fire exactly once (screen stays mounted in native stack)
  //   createdAccount !== prev — account was actually refreshed by the response
  useEffect(() => {
    if (
      !didFinalize.current ||
      loading ||
      didNavigate.current ||
      !createdAccount ||
      createdAccount === prevAccountRef.current
    ) return;

    didNavigate.current = true;

    if (createdAccount.careerModel?.toLowerCase() === 'pro') {
      navigation.navigate('TAProConfirmation');
    } else {
      navigation.navigate('TAFlexActivation');
    }
  }, [createdAccount, loading, navigation]);

  return (
    <AlphaLayout>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    </AlphaLayout>
  );
};

export default TAConfirmationScreen;
