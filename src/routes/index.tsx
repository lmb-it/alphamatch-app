import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';
import { AuthNavigator } from './AuthNavigator';
import { CustomerNavigator } from './CustomerNavigator';
import { WorkerNavigator } from './WorkerNavigator';

export default function Routes() {
  const isDarkMode = useColorScheme() === 'dark';
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);

  const getNavigator = () => {
    // If we have a token and are authenticated, route to specific role
    if (isAuthenticated && token && user) {
      if (user.userType === 'customer') {
        return <CustomerNavigator />;
      } else if (user.userType === 'worker') {
        return <WorkerNavigator />;
      }
    }
    // Default to Auth Flow
    return <AuthNavigator />;
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        {getNavigator()}
      </NavigationContainer>
    </>
  );
}
