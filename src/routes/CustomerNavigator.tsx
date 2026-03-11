import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useKitsTheme} from '@lmb-it/kitsconcerto';
import {useTranslation} from 'react-i18next';
import CustomerHomeScreen from '@src/screens/Customer/CustomerHomeScreen';
import MyJobsScreen from '@src/screens/Jobs/MyJobsScreen';
import ProfileScreen from '@src/modules/Profile/screens/ProfileScreen';
import {Home, Briefcase, MessageSquare, User, Plus} from 'lucide-react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from './index';

export type CustomerTabParamList = {
  CustomerHome: undefined;
  CustomerJobs: undefined;
  CustomerCreate: undefined;
  CustomerChat: undefined;
  CustomerProfile: undefined;
};

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export function CustomerNavigator() {
  const {resolveToken} = useKitsTheme();
  const {t} = useTranslation();
  const primaryColor = resolveToken('primary');
  const navigation = useNavigation<
    CompositeNavigationProp<
      BottomTabNavigationProp<CustomerTabParamList, 'CustomerCreate'>,
      NativeStackNavigationProp<AppStackParamList>
    >
  >();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00A8B1',
        tabBarInactiveTintColor: '#75808E',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case 'CustomerHome':
              return <Home color={color} size={size} />;
            case 'CustomerJobs':
              return <Briefcase color={color} size={size} />;
            case 'CustomerCreate':
              return null;
            case 'CustomerChat':
              return <MessageSquare color={color} size={size} />;
            case 'CustomerProfile':
              return <User color={color} size={size} />;
          }
        },
      })}>
      <Tab.Screen
        name="CustomerHome"
        component={CustomerHomeScreen}
        options={{title: t('nav.home')}}
      />
      <Tab.Screen
        name="CustomerJobs"
        component={MyJobsScreen}
        options={{title: t('nav.myJobs')}}
      />
      <Tab.Screen
        name="CustomerCreate"
        component={CustomerHomeScreen} // Dummy component, handled by button onPress
        options={{
          title: '',
          tabBarButton: ({onLongPress, testID}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TradingAccountCreation')}
              onLongPress={onLongPress ?? undefined}
              testID={testID}
              activeOpacity={0.8}
              style={styles.fabContainer}>
              <View style={[styles.fab, {backgroundColor: '#E0F7F8'}]}>
                <Plus color={primaryColor} size={28} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="CustomerChat"
        component={CustomerHomeScreen}
        options={{title: t('nav.chat')}}
      />
      <Tab.Screen
        name="CustomerProfile"
        component={ProfileScreen}
        options={{title: t('nav.profile')}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingBottom: 25, // Extracted from Figma padding logic for safe areas / text
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    backgroundColor: '#F9FAFC',
    elevation: 0,
    shadowColor: 'transparent',
  },
  fabContainer: {
    top: -20, // To make the FAB pop up properly
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7F8', // rgba(0, 168, 177, 0.1) from figma
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
  },
});
