import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '@src/modules/TradingAccount/screens/IntroScreen';
import BasicInformationScreen from '@src/modules/TradingAccount/screens/BasicInformationScreen';
import AIInputScreen from '@src/modules/TradingAccount/screens/AIInputScreen';
import CareerSelectionScreen from '@src/modules/TradingAccount/screens/CareerSelectionScreen';
import CareerConfirmationScreen from '@src/modules/TradingAccount/screens/CareerConfirmationScreen';
import MissingQuestionsScreen from '@src/modules/TradingAccount/screens/MissingQuestionsScreen';
import AccountDetailsScreen from '@src/modules/TradingAccount/screens/AccountDetailsScreen';
import VerificationScreen from '@src/modules/TradingAccount/screens/VerificationScreen';
import SubscriptionScreen from '@src/modules/TradingAccount/screens/SubscriptionScreen';
import CompletionScreen from '@src/modules/TradingAccount/screens/CompletionScreen';

export type TradingAccountCreationParamList = {
  TAIntro: undefined;
  TABasicInfo: undefined;
  TAInput: undefined;
  TACareerSelection: undefined;
  TACareerConfirmation: undefined;
  TAMissingQuestions: undefined;
  TAAccountDetails: undefined;
  TAVerification: undefined;
  TASubscription: undefined;
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
      <Stack.Screen name="TAAccountDetails" component={AccountDetailsScreen} />
      <Stack.Screen name="TAVerification" component={VerificationScreen} />
      <Stack.Screen name="TASubscription" component={SubscriptionScreen} />
      <Stack.Screen name="TACompletion" component={CompletionScreen} />
    </Stack.Navigator>
  );
}
