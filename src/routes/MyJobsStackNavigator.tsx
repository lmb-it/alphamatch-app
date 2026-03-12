/**
 * MyJobsStackNavigator
 * Wraps the My Jobs tab. Context-aware: client jobs list vs worker proposals list.
 *
 * [REF-ARCH-003]
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MyJobsScreen from '@src/modules/Jobs/screens/MyJobsScreen';
import JobDetailClientScreen from '@src/modules/Jobs/screens/JobDetailClientScreen';
import JobDetailWorkerScreen from '@src/modules/Jobs/screens/JobDetailWorkerScreen';
import ProposalDetailScreen from '@src/modules/Jobs/screens/ProposalDetailScreen';
import PayDepositScreen from '@src/modules/Jobs/screens/PayDepositScreen';
import ProjectDetailScreen from '@src/modules/Jobs/screens/ProjectDetailScreen';

export type MyJobsStackParamList = {
  MyJobs: undefined;
  JobDetailClient: {jobRef: string};
  JobDetailWorker: {jobRef: string};
  ProposalDetail: {proposalRef: string};
  PayDeposit: {jobRef: string; proposalRef: string; amount: number};
  ProjectDetail: {projectRef: string};
};

export type MyJobsStackNavigationProp =
  NativeStackNavigationProp<MyJobsStackParamList>;

const Stack = createNativeStackNavigator<MyJobsStackParamList>();

export function MyJobsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyJobs" component={MyJobsScreen} />
      <Stack.Screen
        name="JobDetailClient"
        component={JobDetailClientScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="JobDetailWorker"
        component={JobDetailWorkerScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="ProposalDetail"
        component={ProposalDetailScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="PayDeposit"
        component={PayDepositScreen}
        options={{animation: 'slide_from_bottom', presentation: 'modal'}}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}
