/**
 * MessagesScreen — context-aware
 * Shows a list of chat rooms for the current workspace:
 *  - Personal: chats with workers I hired
 *  - Trading account: chats with clients as a worker
 *
 * [REF-ARCH-003]
 */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectActiveWorkspaceType} from '@src/modules/Workspace';
import {ChatListItem} from '@src/components/shared/ChatListItem';
import type {MessagesStackNavigationProp} from '@src/routes/MessagesStackNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

// ── Constants ────────────────────────────────────────────────────────────────

const TITLE_MESSAGES = 'Messages';

// ── Fixtures ─────────────────────────────────────────────────────────────────

const FIXTURE_CLIENT_CHATS = [
  {roomId: 'r1', jobTitle: 'Bathroom renovation', counterpartFirstName: 'Sam', lastMessage: 'I can start Monday morning', lastMessageTime: '2h', unreadCount: 3, isLocked: false},
  {roomId: 'r2', jobTitle: 'Logo design', counterpartFirstName: 'Riley', lastMessage: 'Please pay the deposit to continue', lastMessageTime: '1d', unreadCount: 0, isLocked: true},
  {roomId: 'r3', jobTitle: 'React Native app', counterpartFirstName: 'Casey', lastMessage: 'Here is my portfolio', lastMessageTime: 'Mar 9', unreadCount: 1, isLocked: false},
];

const FIXTURE_WORKER_CHATS = [
  {roomId: 'r4', jobTitle: 'E-commerce store setup', counterpartFirstName: 'Jordan', lastMessage: 'Can you start this week?', lastMessageTime: '30m', unreadCount: 2, isLocked: false},
  {roomId: 'r5', jobTitle: 'Brand identity', counterpartFirstName: 'Morgan', lastMessage: 'Chat unlocks after deposit', lastMessageTime: '3d', unreadCount: 0, isLocked: true},
];

// ── Component ────────────────────────────────────────────────────────────────

const MessagesScreen: React.FC = () => {
  const navigation = useNavigation<MessagesStackNavigationProp>();
  const activeType = useSelector(selectActiveWorkspaceType);
  const isTradeMode = activeType === 'trading_account';
  const chats = isTradeMode ? FIXTURE_WORKER_CHATS : FIXTURE_CLIENT_CHATS;

  return (
    <AlphaLayout showDecorations={false} scrollEnabled={false} showBackButton={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{TITLE_MESSAGES}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {chats.map(chat => (
          <ChatListItem
            key={chat.roomId}
            {...chat}
            onPress={() =>
              navigation.navigate('ChatRoom', {
                roomId: chat.roomId,
                jobRef: chat.jobTitle,
                isLocked: chat.isLocked,
              })
            }
          />
        ))}
        <View style={styles.bottomPad} />
      </ScrollView>
    </AlphaLayout>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  header: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8},
  title: {fontSize: 22, fontWeight: '700', color: '#111827'},
  bottomPad: {height: 100},
});
