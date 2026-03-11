import React from 'react';
import {StatusBar, useColorScheme, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '@src/redux';
import {persistor} from '@src/redux/store';
import {selectActiveWorkspace} from '@src/modules/Profile';
import {AuthNavigator} from './AuthNavigator';
import {CustomerNavigator} from './CustomerNavigator';
import {WorkerNavigator} from './WorkerNavigator';
import {TradingAccountCreationNavigator} from './TradingAccountCreationNavigator';
import {CustomerJobPostingNavigator} from './CustomerJobPostingNavigator';
import MyAccountScreen from '@src/modules/Profile/screens/MyAccountScreen';
import WorkspaceSwitchingScreen from '@src/modules/Profile/screens/WorkspaceSwitchingScreen';
import {Text} from '@lmb-it/kitsconcerto';

export type AppStackParamList = {
  MainTabs: undefined;
  TradingAccountCreation: undefined;
  CustomerJobPosting: undefined;
  MyAccount: undefined;
  WorkspaceSwitching: {
    accountIdentifier: string;
    accountName: string;
    accountAvatar: string | null;
  };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

function AppNavigator() {
  const activeWorkspace = useSelector(selectActiveWorkspace);

  const MainTabs = activeWorkspace ? WorkerNavigator : CustomerNavigator;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="TradingAccountCreation"
        component={TradingAccountCreationNavigator}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="CustomerJobPosting"
        component={CustomerJobPostingNavigator}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="WorkspaceSwitching"
        component={WorkspaceSwitchingScreen}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const isDarkMode = useColorScheme() === 'dark';
  const {isAuthenticated, token} = useSelector((state: RootState) => state.auth);

  const getNavigator = () => {
    if (isAuthenticated && token) {
      return <AppNavigator />;
    }
    return <AuthNavigator />;
  };

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
        {getNavigator()}
      </NavigationContainer>
      {__DEV__ && (
        <TouchableOpacity style={styles.fab} onPress={handleReset} activeOpacity={0.8}>
          <Text fontSize={18} color="white">R</Text>
        </TouchableOpacity>
      )}
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
