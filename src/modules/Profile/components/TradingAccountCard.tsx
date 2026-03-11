import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useKitsTheme, useLanguage} from '@lmb-it/kitsconcerto';
import {ChevronRight} from 'lucide-react-native';
import type {ITradingAccountSummary} from '../models/profile.types';

interface TradingAccountCardProps {
  account: ITradingAccountSummary;
  isActive?: boolean;
  onPress?: () => void;
}

const TradingAccountCard: React.FC<TradingAccountCardProps> = ({
  account,
  isActive,
  onPress,
}) => {
  const {resolveToken} = useKitsTheme();
  const {t} = useLanguage();
  const primaryColor = resolveToken('primary');

  const initial = (account.accountName || account.careerName || '?').charAt(0).toUpperCase();
  const modelColor = account.careerModel === 'pro' ? '#F59E0B' : primaryColor;

  return (
    <TouchableOpacity
      style={[styles.container, isActive && {borderColor: primaryColor, borderWidth: 1.5}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.row}>
        {account.avatar ? (
          <Image source={{uri: account.avatar}} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, {backgroundColor: modelColor + '20'}]}>
            <Text fontSize={16} fontWeight="700" style={{color: modelColor}}>
              {initial}
            </Text>
          </View>
        )}
        <View style={styles.info}>
          <Text fontSize={15} fontWeight="600" color="text-primary">
            {account.accountName || account.careerName}
          </Text>
          <Text fontSize={12} color="text-subtle">
            {account.careerName} · {account.careerModel?.toUpperCase()}
          </Text>
        </View>
        {isActive && (
          <View style={[styles.activeBadge, {backgroundColor: primaryColor}]}>
            <Text fontSize={10} color="white" fontWeight="600">{t('active')}</Text>
          </View>
        )}
        <ChevronRight color="#9CA3AF" size={18} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
});

export default TradingAccountCard;
