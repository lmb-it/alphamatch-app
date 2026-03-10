import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkerHomeScreen from '@src/screens/Worker/WorkerHomeScreen';
import { Home, Briefcase, MessageSquare, User } from 'lucide-react-native';

export type WorkerTabParamList = {
  WorkerHome: undefined;
  WorkerJobs: undefined;
  WorkerMessages: undefined;
  WorkerProfile: undefined;
};

const Tab = createBottomTabNavigator<WorkerTabParamList>();

export function WorkerNavigator() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'WorkerHome': return <Home color={color} size={size} />;
              case 'WorkerJobs': return <Briefcase color={color} size={size} />;
              case 'WorkerMessages': return <MessageSquare color={color} size={size} />;
              case 'WorkerProfile': return <User color={color} size={size} />;
            }
          },
        })}
    >
      <Tab.Screen name="WorkerHome" component={WorkerHomeScreen} options={{ title: 'Dashboard' }} />
      {/* Placeholders for other tabs */}
      <Tab.Screen name="WorkerJobs" component={WorkerHomeScreen} options={{ title: 'My Jobs' }} />
      <Tab.Screen name="WorkerMessages" component={WorkerHomeScreen} options={{ title: 'Messages' }} />
      <Tab.Screen name="WorkerProfile" component={WorkerHomeScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
