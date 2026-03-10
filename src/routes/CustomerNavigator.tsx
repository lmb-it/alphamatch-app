import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerHomeScreen from '@src/screens/Customer/CustomerHomeScreen';
import { Home, Search, MessageSquare, User } from 'lucide-react-native';

export type CustomerTabParamList = {
  CustomerHome: undefined;
  CustomerSearch: undefined;
  CustomerMessages: undefined;
  CustomerProfile: undefined;
};

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export function CustomerNavigator() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'CustomerHome': return <Home color={color} size={size} />;
              case 'CustomerSearch': return <Search color={color} size={size} />;
              case 'CustomerMessages': return <MessageSquare color={color} size={size} />;
              case 'CustomerProfile': return <User color={color} size={size} />;
            }
          },
        })}
    >
      <Tab.Screen name="CustomerHome" component={CustomerHomeScreen} options={{ title: 'Home' }} />
      {/* Placeholders for other tabs, routing back to home for now */}
      <Tab.Screen name="CustomerSearch" component={CustomerHomeScreen} options={{ title: 'Search' }} />
      <Tab.Screen name="CustomerMessages" component={CustomerHomeScreen} options={{ title: 'Messages' }} />
      <Tab.Screen name="CustomerProfile" component={CustomerHomeScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
