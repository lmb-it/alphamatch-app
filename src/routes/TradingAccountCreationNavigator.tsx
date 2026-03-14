import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '@src/modules/TradingAccount/screens/IntroScreen';
import BasicInformationScreen from '@src/modules/TradingAccount/screens/BasicInformationScreen';
import AIInputScreen from '@src/modules/TradingAccount/screens/AIInputScreen';
import CareerSelectionScreen from '@src/modules/TradingAccount/screens/CareerSelectionScreen';
import CareerConfirmationScreen from '@src/modules/TradingAccount/screens/CareerConfirmationScreen';
import MissingQuestionsScreen from '@src/modules/TradingAccount/screens/MissingQuestionsScreen';
import TAConfirmationScreen from '@src/modules/TradingAccount/screens/TAConfirmationScreen';
import TAProConfirmationScreen from '@src/modules/TradingAccount/screens/TAProConfirmationScreen';
import FlexSubscriptionScreen from '@src/modules/TradingAccount/screens/FlexSubscriptionScreen';
import VerificationScreen from '@src/modules/TradingAccount/screens/VerificationScreen';
import DocumentFormScreen from '@src/modules/TradingAccount/screens/DocumentFormScreen';
import CompletionScreen from '@src/modules/TradingAccount/screens/CompletionScreen';

/**
 * Route map — business model rules enforced here:
 *
 * Alpha Pro:  TAConfirmation → TAProConfirmation → TAVerification → TACompletion
 * Alpha Flex: TAConfirmation → TAFlexActivation  → TACompletion
 *
 * TASubscription (multi-plan picker) is intentionally absent.
 * Alpha Pro has no subscription. Alpha Flex has a single fixed plan rendered by TAFlexActivation.
 */
export type TradingAccountCreationParamList = {
  TAIntro: undefined;
  TABasicInfo: undefined;
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
      <Stack.Screen name="TABasicInfo" component={BasicInformationScreen} />
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
