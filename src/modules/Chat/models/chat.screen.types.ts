/**
 * Chat screen types — extracted from ChatRoomScreen
 */
import type {RouteProp} from '@react-navigation/native';
import type {MessagesStackParamList} from '@src/routes/MessagesStackNavigator';

export type ChatRoomRouteProp = RouteProp<MessagesStackParamList, 'ChatRoom'>;

export interface IMessage {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
}
