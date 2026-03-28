/**
 * ProfileStackNavigator
 * Profile tab root is now MyAccountScreen directly (no account hub menu).
 * Settings absorbs Support, InviteFriends, LanguageSettings, TermsAndConditions.
 * Portfolio section screens added for trading account context.
 *
 * [REF-ARCH-003]
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MyAccountScreen from '@src/modules/Profile/screens/MyAccountScreen';
import WorkspaceSwitchingScreen from '@src/modules/Profile/screens/WorkspaceSwitchingScreen';
import EditProfileScreen from '@src/modules/Profile/screens/EditProfile';
import SettingsScreen from '@src/modules/Profile/screens/SettingsScreen';
import WalletScreen from '@src/modules/Payments/screens/WalletScreen';
import TransactionHistoryScreen from '@src/modules/Payments/screens/TransactionHistoryScreen';
import EarningsScreen from '@src/modules/Payments/screens/EarningsScreen';
import DocumentsScreen from '@src/modules/Profile/screens/DocumentsScreen';
import TierStatusScreen from '@src/modules/TradingAccount/screens/TierStatus';
// Portfolio section screens
import ExperienceScreen from '@src/modules/Profile/screens/ExperienceScreen';
import EducationScreen from '@src/modules/Profile/screens/EducationScreen';
import PortfolioScreen from '@src/modules/Profile/screens/PortfolioScreen';
import QualificationsScreen from '@src/modules/Profile/screens/QualificationsScreen';
import ReferencesScreen from '@src/modules/Profile/screens/ReferencesScreen';
import ReviewsScreen from '@src/modules/Profile/screens/ReviewsScreen';
// Screens accessed from Settings (absorbed)
import SupportScreen from '@src/modules/Profile/screens/SupportScreen';
import InviteFriendsScreen from '@src/modules/Profile/screens/InviteFriendsScreen';
import TermsAndConditionsScreen from '@src/modules/Profile/screens/TermsAndConditionsScreen';
import LanguageSettingsScreen from '@src/modules/Profile/screens/LanguageSettingsScreen';
import {TradingAccountCreationNavigator} from './TradingAccountCreationNavigator';

export type ProfileStackParamList = {
  Profile: undefined;
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
  TierStatus: {accountRef: string};
  // Portfolio section screens
  Experience: undefined;
  Education: undefined;
  Portfolio: undefined;
  Qualifications: undefined;
  References: undefined;
  Reviews: undefined;
  // Settings sub-screens (navigated from within Settings)
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
      {/* Tab root — actual profile screen, no hub menu */}
      <Stack.Screen name="Profile" component={MyAccountScreen} />
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
        name="TierStatus"
        component={TierStatusScreen}
        options={{animation: 'slide_from_right'}}
      />
      {/* Portfolio section screens */}
      <Stack.Screen
        name="Experience"
        component={ExperienceScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Education"
        component={EducationScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Qualifications"
        component={QualificationsScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="References"
        component={ReferencesScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{animation: 'slide_from_right'}}
      />
      {/* Settings sub-screens */}
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
