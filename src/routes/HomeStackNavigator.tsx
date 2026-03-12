/**
 * HomeStackNavigator
 * Wraps the Home tab with a stack so job detail screens can be pushed
 * without leaving the tab.
 *
 * [REF-ARCH-003]
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import HomeScreen from '@src/modules/Home/screens/HomeScreen';
import JobDetailWorkerScreen from '@src/modules/Jobs/screens/JobDetailWorkerScreen';
import SubmitProposalScreen from '@src/modules/Jobs/screens/SubmitProposalScreen';
import {CustomerJobPostingNavigator} from './CustomerJobPostingNavigator';

export type HomeStackParamList = {
  Home: undefined;
  JobPosting: undefined;
  JobDetailWorker: {jobRef: string};
  SubmitProposal: {jobRef: string};
};

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="JobPosting"
        component={CustomerJobPostingNavigator}
        options={{animation: 'slide_from_bottom', presentation: 'modal'}}
      />
      <Stack.Screen
        name="JobDetailWorker"
        component={JobDetailWorkerScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="SubmitProposal"
        component={SubmitProposalScreen}
        options={{animation: 'slide_from_bottom', presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
}
