import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '@src/modules/TradingAccount/screens/Intro';
import AIInputScreen from '@src/modules/TradingAccount/screens/AIInput';
import CareerSelectionScreen from '@src/modules/TradingAccount/screens/CareerSelection';
import CareerConfirmationScreen from '@src/modules/TradingAccount/screens/CareerConfirmation';
import MissingQuestionsScreen from '@src/modules/TradingAccount/screens/MissingQuestions';
import TAConfirmationScreen from '@src/modules/TradingAccount/screens/TAConfirmation';
import TAProConfirmationScreen from '@src/modules/TradingAccount/screens/TAProConfirmation';
import FlexSubscriptionScreen from '@src/modules/TradingAccount/screens/FlexSubscription';
import VerificationScreen from '@src/modules/TradingAccount/screens/Verification';
import DocumentFormScreen from '@src/modules/TradingAccount/screens/DocumentForm';
import CompletionScreen from '@src/modules/TradingAccount/screens/Completion';

/**
 * Route map — business model rules enforced here:
 *
 * Flow: TAIntro (Pro/Flex explanation + T&C) → TAInput (AI textarea) → ...
 *
 * Alpha Pro:  TAConfirmation → TAProConfirmation → TAVerification → TACompletion
 * Alpha Flex: TAConfirmation → TAFlexActivation  → TACompletion
 *
 * TABasicInfo has been removed — profile completeness is now checked via a gate
 * modal before entering the flow. Business info fields are managed from the
 * Trading Account Edit Profile page separately.
 */
export type TradingAccountCreationParamList = {
  TAIntro: undefined;
  TAInput: undefined;
  TACareerSelection: undefined;
  TACareerConfirmation: undefined;
  TAMissingQuestions: undefined;
  // Loading transition — dispatches finalizeAccount, then routes by careerModel
  TAConfirmation: undefined;
  // Alpha Pro only — verification pending, no subscription
  TAProConfirmation: undefined;
  TAVerification: undefined;
  TADocumentForm: {documentRef: string; documentName: string; accountRef?: string};
  // Alpha Flex only — subscription activation, no verification
  TAFlexActivation: undefined;
  TACompletion: undefined;
};

const Stack = createNativeStackNavigator<TradingAccountCreationParamList>();

export function TradingAccountCreationNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="TAIntro"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TAIntro" component={IntroScreen} />
      <Stack.Screen name="TAInput" component={AIInputScreen} />
      <Stack.Screen name="TACareerSelection" component={CareerSelectionScreen} />
      <Stack.Screen name="TACareerConfirmation" component={CareerConfirmationScreen} />
      <Stack.Screen name="TAMissingQuestions" component={MissingQuestionsScreen} />
      <Stack.Screen name="TAConfirmation" component={TAConfirmationScreen} />
      <Stack.Screen name="TAProConfirmation" component={TAProConfirmationScreen} />
      <Stack.Screen name="TAVerification" component={VerificationScreen} />
      <Stack.Screen name="TADocumentForm" component={DocumentFormScreen} />
      <Stack.Screen name="TAFlexActivation" component={FlexSubscriptionScreen} />
      <Stack.Screen name="TACompletion" component={CompletionScreen} />
    </Stack.Navigator>
  );
}
