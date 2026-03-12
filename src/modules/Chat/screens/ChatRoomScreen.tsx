/**
 * ChatRoomScreen
 * Message thread with text input and attachment option.
 * Shows LockOverlay if the chat is locked (deposit not yet paid).
 *
 * [REF-ARCH-003]
 */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import {ArrowLeft, Paperclip, Send} from 'lucide-react-native';
import {LockOverlay} from '@src/components/shared/LockOverlay';
import type {MessagesStackParamList} from '@src/routes/MessagesStackNavigator';

// ── Types ────────────────────────────────────────────────────────────────────

type ChatRoomRouteProp = RouteProp<MessagesStackParamList, 'ChatRoom'>;

interface IMessage {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_TYPE_MESSAGE = 'Type a message…';
const LABEL_PAY_DEPOSIT = 'Pay Deposit';
const LABEL_LOCK_MESSAGE =
  'This conversation is locked. Pay the deposit to start chatting and reveal the provider\'s full identity.';

// ── Fixtures ─────────────────────────────────────────────────────────────────

const FIXTURE_MESSAGES: IMessage[] = [
  {id: 'm1', text: 'Hi! I\'ve reviewed your job post and I\'m interested.', fromMe: false, time: '10:30'},
  {id: 'm2', text: 'Great! Can you tell me more about your experience?', fromMe: true, time: '10:32'},
  {id: 'm3', text: 'I have 8 years of experience in this field. Here\'s my portfolio.', fromMe: false, time: '10:35'},
  {id: 'm4', text: 'Looks perfect. What\'s your availability?', fromMe: true, time: '10:38'},
];

// ── Component ────────────────────────────────────────────────────────────────

const ChatRoomScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatRoomRouteProp>();
  const {isLocked} = route.params;
  const [message, setMessage] = useState('');

  const renderMessage = ({item}: {item: IMessage}) => (
    <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
      <Text style={[styles.bubbleText, item.fromMe && styles.bubbleTextMe]}>
        {item.text}
      </Text>
      <Text style={[styles.bubbleTime, item.fromMe && styles.bubbleTimeMe]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safeTop} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Sam</Text>
          <Text style={styles.headerJob} numberOfLines={1}>
            {route.params.jobRef}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        {/* Message list */}
        <FlatList
          data={FIXTURE_MESSAGES}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Paperclip size={20} color="#6B7280" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={LABEL_TYPE_MESSAGE}
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !message.trim() && styles.sendBtnDisabled]}
            disabled={!message.trim()}>
            <Send size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Lock overlay */}
      {isLocked && (
        <LockOverlay
          message={LABEL_LOCK_MESSAGE}
          actionLabel={LABEL_PAY_DEPOSIT}
          onAction={() => {}}
        />
      )}
    </View>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safeTop: {backgroundColor: '#FFFFFF'},
  flex: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  headerInfo: {flex: 1, gap: 2},
  headerName: {fontSize: 16, fontWeight: '700', color: '#111827'},
  headerJob: {fontSize: 12, color: '#6B7280'},
  messagesList: {padding: 16, gap: 8},
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    padding: 12,
    marginVertical: 3,
    gap: 4,
  },
  bubbleThem: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#00A8B1',
    borderBottomRightRadius: 4,
  },
  bubbleText: {fontSize: 14, color: '#111827', lineHeight: 20},
  bubbleTextMe: {color: '#FFFFFF'},
  bubbleTime: {fontSize: 10, color: '#9CA3AF', alignSelf: 'flex-end'},
  bubbleTimeMe: {color: 'rgba(255,255,255,0.7)'},
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F3F4F6',
    gap: 8,
  },
  attachBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
    maxHeight: 120,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00A8B1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#D1D5DB',
  },
});
