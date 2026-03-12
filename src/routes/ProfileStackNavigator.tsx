/**
 * ProfileStackNavigator
 * Wraps the Profile tab. Contains all settings, account management,
 * and trading account creation screens.
 *
 * [REF-ARCH-003]
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ProfileScreen from '@src/modules/Profile/screens/ProfileScreen';
import MyAccountScreen from '@src/modules/Profile/screens/MyAccountScreen';
import WorkspaceSwitchingScreen from '@src/modules/Profile/screens/WorkspaceSwitchingScreen';
import EditProfileScreen from '@src/modules/Profile/screens/EditProfileScreen';
import SettingsScreen from '@src/modules/Profile/screens/SettingsScreen';
import WalletScreen from '@src/modules/Payments/screens/WalletScreen';
import TransactionHistoryScreen from '@src/modules/Payments/screens/TransactionHistoryScreen';
import EarningsScreen from '@src/modules/Payments/screens/EarningsScreen';
import DocumentsScreen from '@src/modules/Profile/screens/DocumentsScreen';
import SupportScreen from '@src/modules/Profile/screens/SupportScreen';
import InviteFriendsScreen from '@src/modules/Profile/screens/InviteFriendsScreen';
import TermsAndConditionsScreen from '@src/modules/Profile/screens/TermsAndConditionsScreen';
import LanguageSettingsScreen from '@src/modules/Profile/screens/LanguageSettingsScreen';
import {TradingAccountCreationNavigator} from './TradingAccountCreationNavigator';

export type ProfileStackParamList = {
  Profile: undefined;
  MyAccount: undefined;
  EditProfile: undefined;
  WorkspaceSwitching: {
    accountIdentifier: string;
    accountName: string;
    accountAvatar: string | null;
  };
  Settings: undefined;
  Wallet: undefined;
  TransactionHistory: undefined;
  Earnings: undefined;
  Documents: undefined;
  Support: undefined;
  InviteFriends: undefined;
  TermsAndConditions: undefined;
  LanguageSettings: undefined;
  TradingAccountCreation: {screen?: string} | undefined;
};

export type ProfileStackNavigationProp =
  NativeStackNavigationProp<ProfileStackParamList>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="WorkspaceSwitching"
        component={WorkspaceSwitchingScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Earnings"
        component={EarningsScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Documents"
        component={DocumentsScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriendsScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={LanguageSettingsScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="TradingAccountCreation"
        component={TradingAccountCreationNavigator}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}
