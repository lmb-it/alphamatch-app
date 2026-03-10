import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@src/modules/Auth/screens/SplashScreen';
import LoginScreen from '@src/modules/Auth/screens/LoginScreen';
import RegisterScreen from '@src/modules/Auth/screens/RegisterScreen';
import ForgotPasswordScreen from '@src/modules/Auth/screens/ForgotPasswordScreen';
import LanguageSelectionScreen from '@src/modules/Auth/screens/LanguageSelectionScreen';

export type AuthStackParamList = {
  Splash: undefined;
  LanguageSelection: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
