/**
 * MessagesStackNavigator
 * Wraps the Messages/Chat tab. Context-aware: client chats vs worker chats.
 *
 * [REF-ARCH-003]
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MessagesScreen from '@src/modules/Chat/screens/MessagesScreen';
import ChatRoomScreen from '@src/modules/Chat/screens/ChatRoomScreen';

export type MessagesStackParamList = {
  Messages: undefined;
  ChatRoom: {roomId: string; jobRef: string; isLocked: boolean};
};

export type MessagesStackNavigationProp =
  NativeStackNavigationProp<MessagesStackParamList>;

const Stack = createNativeStackNavigator<MessagesStackParamList>();

export function MessagesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}
