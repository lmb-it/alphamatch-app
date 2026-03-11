import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useKitsTheme} from '@lmb-it/kitsconcerto';
import {ChevronDown} from 'lucide-react-native';

interface ProfileHeaderProps {
  displayName: string;
  avatar?: string | null;
  /** When a workspace is active, show the trading account info instead */
  activeAccount?: {
    accountName: string | null;
    careerName: string | null;
    avatar: string | null;
  } | null;
  onWorkspacePress?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  avatar,
  activeAccount,
  onWorkspacePress,
}) => {
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

  // When a trading account is active, show its info
  const showName = activeAccount
    ? activeAccount.accountName || activeAccount.careerName || displayName
    : displayName;
  const showAvatar = activeAccount ? activeAccount.avatar : avatar;
  const avatarBgColor = activeAccount ? primaryColor : '#E5E7EB';
  const avatarTextColor = activeAccount ? 'white' : 'text-subtle';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onWorkspacePress}
      activeOpacity={0.7}
      disabled={!onWorkspacePress}>
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          {showAvatar ? (
            <Image source={{uri: showAvatar}} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder, {backgroundColor: avatarBgColor}]}>
              <Text fontSize={20} color={avatarTextColor} fontWeight="600">
                {showName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.nameColumn}>
          <Text fontSize={16} fontWeight="600" color="text-primary">
            {showName}
          </Text>
          {activeAccount && (
            <Text fontSize={12} color="text-subtle">
              {activeAccount.careerName}
            </Text>
          )}
        </View>
        <ChevronDown color={resolveToken('text-subtle')} size={18} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameColumn: {
    flex: 1,
    gap: 2,
  },
});

export default ProfileHeader;
