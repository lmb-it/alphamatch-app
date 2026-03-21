/**
 * RootNavigator
 * Top-level navigator that switches between AuthNavigator (unauthenticated)
 * and MainTabNavigator (authenticated). No inner app stack — all stack screens
 * live inside their respective tab stack navigators.
 *
 * [REF-ARCH-003]
 */
import React from 'react';
import {StatusBar, useColorScheme, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '@src/redux';
import {persistor} from '@src/redux/store';
import {AuthNavigator} from './AuthNavigator';
import {MainTabNavigator} from './MainTabNavigator';
import WelcomeScreen from '@src/modules/Auth/screens/WelcomeScreen';
import {Text} from '@lmb-it/kitsconcerto';

const WelcomeStack = createNativeStackNavigator();

function WelcomeNavigator() {
  return (
    <WelcomeStack.Navigator screenOptions={{headerShown: false}}>
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} />
    </WelcomeStack.Navigator>
  );
}

export default function Routes() {
  const isDarkMode = useColorScheme() === 'dark';
  const {isAuthenticated, token, user} = useSelector((state: RootState) => state.auth);

  const showWelcome = isAuthenticated && !!token && !!user && !user.welcomeSeen;
  const showMain = isAuthenticated && !!token && !!user?.welcomeSeen;

  const handleReset = () => {
    Alert.alert('Reset All', 'Clear redux, persisted state & AsyncStorage?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await persistor.purge();
          await AsyncStorage.clear();
          Alert.alert('Done', 'All data cleared. Restart the app to see the effect.');
        },
      },
    ]);
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        {showMain ? (
          <MainTabNavigator />
        ) : showWelcome ? (
          <WelcomeNavigator />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
      {/*{__DEV__ && (*/}
      {/*  <TouchableOpacity style={styles.fab} onPress={handleReset} activeOpacity={0.8}>*/}
      {/*    <Text fontSize={18} color="white">R</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 9999,
  },
});
