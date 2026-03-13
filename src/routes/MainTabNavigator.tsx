/**
 * MainTabNavigator
 * The single, unified bottom tab navigator.
 * All 4 tabs are context-aware — they render different content based on the
 * active workspace (personal vs trading account) from the Workspace Redux slice.
 *
 * This replaces CustomerNavigator and WorkerNavigator.
 *
 * [REF-ARCH-003]
 */
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useLanguage} from '@lmb-it/kitsconcerto';
import {Home, Briefcase, MessageSquare, User} from 'lucide-react-native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {HomeStackNavigator} from './HomeStackNavigator';
import {MyJobsStackNavigator} from './MyJobsStackNavigator';
import {MessagesStackNavigator} from './MessagesStackNavigator';
import {ProfileStackNavigator} from './ProfileStackNavigator';
import {
  selectLastActiveTab,
  workspaceActions,
} from '@src/modules/Workspace';
import type {WorkspaceTab} from '@src/modules/Workspace';

// ── Param list ───────────────────────────────────────────────────────────────

export type MainTabParamList = {
  HomeTab: undefined;
  MyJobsTab: undefined;
  MessagesTab: undefined;
  ProfileTab: undefined;
};

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// ── Tab → WorkspaceTab mapping ───────────────────────────────────────────────

const TAB_NAME_MAP: Record<keyof MainTabParamList, WorkspaceTab> = {
  HomeTab: 'Home',
  MyJobsTab: 'MyJobs',
  MessagesTab: 'Messages',
  ProfileTab: 'Profile',
};

// ── Screens that should hide the bottom tab bar ─────────────────────────────
const HIDE_TAB_BAR_ROUTES = ['TradingAccountCreation', 'EditProfile'];

// ── Navigator ────────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator<MainTabParamList>();

const ACTIVE_TINT = '#00A8B1';
const INACTIVE_TINT = '#75808E';

export function MainTabNavigator() {
  const {t} = useLanguage();
  const dispatch = useDispatch();
  const lastTab = useSelector(selectLastActiveTab);

  // Map lastActiveTab back to tab screen name
  const initialRoute = (
    Object.entries(TAB_NAME_MAP) as Array<
      [keyof MainTabParamList, WorkspaceTab]
    >
  ).find(([, v]) => v === lastTab)?.[0] ?? 'HomeTab';

  const handleTabPress = useCallback(
    (tabName: keyof MainTabParamList) => {
      dispatch(workspaceActions.setLastActiveTab(TAB_NAME_MAP[tabName]));
    },
    [dispatch],
  );

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenListeners={{
        tabPress: e => {
          const tabName = e.target?.split('-')[0] as keyof MainTabParamList | undefined;
          if (tabName && TAB_NAME_MAP[tabName]) {
            handleTabPress(tabName);
          }
        },
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_TINT,
        tabBarInactiveTintColor: INACTIVE_TINT,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case 'HomeTab':
              return <Home color={color} size={size} />;
            case 'MyJobsTab':
              return <Briefcase color={color} size={size} />;
            case 'MessagesTab':
              return <MessageSquare color={color} size={size} />;
            case 'ProfileTab':
              return <User color={color} size={size} />;
          }
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{title: t('nav.home')}}
      />
      <Tab.Screen
        name="MyJobsTab"
        component={MyJobsStackNavigator}
        options={{title: t('nav.myJobs')}}
      />
      <Tab.Screen
        name="MessagesTab"
        component={MessagesStackNavigator}
        options={{title: t('nav.messages')}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={({route}) => {
          const focusedRoute = getFocusedRouteNameFromRoute(route);
          const shouldHide = focusedRoute && HIDE_TAB_BAR_ROUTES.includes(focusedRoute);
          return {
            title: t('nav.profile'),
            ...(shouldHide && {tabBarStyle: {display: 'none' as const}}),
          };
        }}
      />
    </Tab.Navigator>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

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
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
