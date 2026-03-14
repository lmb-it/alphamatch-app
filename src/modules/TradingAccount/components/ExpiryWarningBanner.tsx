/**
 * ExpiryWarningBanner
 *
 * Warning banner displayed when a document is expiring soon.
 * Color intensity increases as expiry approaches.
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useLanguage} from '@lmb-it/kitsconcerto';
import {AlertTriangle} from 'lucide-react-native';

export interface ExpiryWarningBannerProps {
  documentName: string;
  daysUntilExpiry: number;
  onRenew: () => void;
}

function getBannerColors(days: number) {
  if (days < 30) {
    return {bg: '#FEE2E2', border: '#FCA5A5', icon: '#EF4444', text: '#991B1B'};
  }
  if (days < 60) {
    return {bg: '#FFF7ED', border: '#FDBA74', icon: '#F97316', text: '#9A3412'};
  }
  return {bg: '#FFFBEB', border: '#FCD34D', icon: '#F59E0B', text: '#92400E'};
}

export const ExpiryWarningBanner: React.FC<ExpiryWarningBannerProps> = ({
  documentName,
  daysUntilExpiry,
  onRenew,
}) => {
  const {t} = useLanguage();
  const colors = getBannerColors(daysUntilExpiry);

  return (
    <View
      style={[
        styles.banner,
        {backgroundColor: colors.bg, borderColor: colors.border},
      ]}
      accessible
      accessibilityLabel={`Warning: ${documentName} expires in ${daysUntilExpiry} days`}
      accessibilityRole="alert">
      <View style={styles.iconRow}>
        <AlertTriangle color={colors.icon} size={20} />
        <Text
          fontSize={14}
          fontWeight="700"
          style={{color: colors.text}}
          ml={8}>
          {t('trading.expiry.title')}
        </Text>
      </View>
      <Text fontSize={13} style={{color: colors.text}} mt={4}>
        {t('trading.expiry.message')
          .replace('{documentName}', documentName)
          .replace('{days}', String(daysUntilExpiry))}
      </Text>
      <TouchableOpacity
        style={[styles.renewBtn, {borderColor: colors.icon}]}
        onPress={onRenew}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Renew ${documentName}`}>
        <Text fontSize={13} fontWeight="600" style={{color: colors.icon}}>
          {t('trading.expiry.renewNow')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renewBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
