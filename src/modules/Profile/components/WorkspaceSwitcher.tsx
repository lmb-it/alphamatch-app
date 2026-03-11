import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Text, useKitsTheme, useLanguage} from '@lmb-it/kitsconcerto';
import {X, Check, Plus} from 'lucide-react-native';
import type {ITradingAccountSummary} from '../models/profile.types';

interface WorkspaceSwitcherProps {
  visible: boolean;
  onClose: () => void;
  personalName: string;
  personalAvatar?: string | null;
  activeWorkspace: string | null;
  tradingAccounts: ITradingAccountSummary[];
  onSwitchPersonal: () => void;
  onSwitchAccount: (ref: string, name: string, avatar: string | null) => void;
  onAddAccount: () => void;
  hasIncomplete?: boolean;
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  visible,
  onClose,
  personalName,
  personalAvatar,
  activeWorkspace,
  tradingAccounts,
  onSwitchPersonal,
  onSwitchAccount,
  onAddAccount,
  hasIncomplete,
}) => {
  const {resolveToken} = useKitsTheme();
  const {t} = useLanguage();
  const primaryColor = resolveToken('primary');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text fontSize={18} fontWeight="700" color="text-primary">{t('profile.account')}</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.6}>
              <X color={resolveToken('text-primary')} size={22} />
            </TouchableOpacity>
          </View>

          {/* Personal account */}
          <TouchableOpacity
            style={styles.accountRow}
            onPress={onSwitchPersonal}
            activeOpacity={0.7}>
            {personalAvatar ? (
              <Image source={{uri: personalAvatar}} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text fontSize={16} fontWeight="600" color="text-subtle">
                  {personalName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text fontSize={15} fontWeight="500" color="text-primary" style={styles.accountName}>
              {personalName}
            </Text>
            {!activeWorkspace && (
              <View style={[styles.checkCircle, {backgroundColor: primaryColor}]}>
                <Check color="#FFFFFF" size={14} />
              </View>
            )}
          </TouchableOpacity>

          {/* Trading accounts */}
          {tradingAccounts.map(account => {
            const isActive = activeWorkspace === account.identifier;
            const initial = (account.accountName || account.careerName || '?').charAt(0).toUpperCase();
            const colors = ['#14B8A6', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6'];
            const colorIndex = account.identifier.charCodeAt(0) % colors.length;
            const bgColor = colors[colorIndex];

            return (
              <TouchableOpacity
                key={account.identifier}
                style={styles.accountRow}
                onPress={() => onSwitchAccount(account.identifier, account.accountName || account.careerName || '', account.avatar || null)}
                activeOpacity={0.7}>
                {account.avatar ? (
                  <Image source={{uri: account.avatar}} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, {backgroundColor: bgColor}]}>
                    <Text fontSize={16} fontWeight="700" color="white">{initial}</Text>
                  </View>
                )}
                <Text fontSize={15} fontWeight="500" color="text-primary" style={styles.accountName}>
                  {account.accountName || account.careerName}
                </Text>
                {isActive && (
                  <View style={[styles.checkCircle, {backgroundColor: primaryColor}]}>
                    <Check color="#FFFFFF" size={14} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Add Account */}
          <TouchableOpacity
            style={[styles.addButton, hasIncomplete && {opacity: 0.5}]}
            onPress={onAddAccount}
            activeOpacity={0.7}
            disabled={hasIncomplete}>
            <Plus color={primaryColor} size={18} />
            <Text fontSize={15} fontWeight="600" color="primary">{t('profile.addAccount')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  avatarPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountName: {
    flex: 1,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 6,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#14B8A6',
  },
});

export default WorkspaceSwitcher;
