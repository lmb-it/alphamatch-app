/**
 * @deprecated WorkerNavigator is replaced by MainTabNavigator (src/routes/MainTabNavigator.tsx).
 * Kept for reference only — do not use or modify. Will be removed once MainTabNavigator is stable.
 * [REF-ARCH-003]
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useKitsTheme} from '@lmb-it/kitsconcerto';
import {useTranslation} from 'react-i18next';
import WorkerHomeScreen from '@src/screens/Worker/WorkerHomeScreen';
import MyJobsScreen from '@src/screens/Jobs/MyJobsScreen';
import ProfileScreen from '@src/modules/Profile/screens/ProfileScreen';
import {Home, Briefcase, MessageSquare, User, Plus} from 'lucide-react-native';

export type WorkerTabParamList = {
  WorkerHome: undefined;
  WorkerJobs: undefined;
  WorkerCreate: undefined;
  WorkerChat: undefined;
  WorkerProfile: undefined;
};

const Tab = createBottomTabNavigator<WorkerTabParamList>();

export function WorkerNavigator() {
  const {resolveToken} = useKitsTheme();
  const {t} = useTranslation();
  const primaryColor = resolveToken('primary');

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00A8B1',
        tabBarInactiveTintColor: '#75808E',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case 'WorkerHome':
              return <Home color={color} size={size} />;
            case 'WorkerJobs':
              return <Briefcase color={color} size={size} />;
            case 'WorkerCreate':
              return null;
            case 'WorkerChat':
              return <MessageSquare color={color} size={size} />;
            case 'WorkerProfile':
              return <User color={color} size={size} />;
          }
        },
      })}>
      <Tab.Screen
        name="WorkerHome"
        component={WorkerHomeScreen}
        options={{title: t('nav.home')}}
      />
      <Tab.Screen
        name="WorkerJobs"
        component={MyJobsScreen}
        options={{title: t('nav.myJobs')}}
      />
      <Tab.Screen
        name="WorkerCreate"
        component={WorkerHomeScreen}
        options={{
          title: '',
          tabBarButton: ({onPress, onLongPress, testID}) => (
            <TouchableOpacity
              onPress={onPress}
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
        name="WorkerChat"
        component={WorkerHomeScreen}
        options={{title: t('nav.chat')}}
      />
      <Tab.Screen
        name="WorkerProfile"
        component={ProfileScreen}
        options={{title: t('nav.profile')}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingBottom: 25,
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
    top: -20,
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
    backgroundColor: '#E0F7F8',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
  },
});
