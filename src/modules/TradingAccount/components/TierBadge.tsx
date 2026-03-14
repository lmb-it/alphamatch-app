/**
 * TierBadge
 *
 * Reusable badge showing the user's current verification tier.
 * Renders a colored badge with a Shield icon and the tier label.
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useLanguage} from '@lmb-it/kitsconcerto';
import {Shield} from 'lucide-react-native';
import type {IVerificationTier} from '../models/tier.types';

export interface TierBadgeProps {
  tier: IVerificationTier | null;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const SIZES = {
  small: {icon: 16, container: 28, fontSize: 0},
  medium: {icon: 18, container: 36, fontSize: 13},
  large: {icon: 24, container: 48, fontSize: 15},
} as const;

export const TierBadge: React.FC<TierBadgeProps> = ({
  tier,
  size = 'medium',
  showLabel = true,
}) => {
  const {t} = useLanguage();
  const config = SIZES[size];

  const badgeColor = tier?.badgeColor ?? '#9CA3AF';
  const label = tier?.badgeLabel ?? t('trading.tier.unverified');
  const bgColor = badgeColor + '20';

  if (size === 'small' || !showLabel) {
    return (
      <View
        style={[
          styles.iconOnly,
          {
            width: config.container,
            height: config.container,
            borderRadius: config.container / 2,
            backgroundColor: bgColor,
          },
        ]}
        accessible
        accessibilityLabel={label}
        accessibilityRole="image">
        <Shield color={badgeColor} size={config.icon} />
      </View>
    );
  }

  return (
    <View
      style={[styles.badge, {backgroundColor: bgColor}]}
      accessible
      accessibilityLabel={`Tier badge: ${label}`}
      accessibilityRole="text">
      <View
        style={[
          styles.iconCircle,
          {
            width: config.container,
            height: config.container,
            borderRadius: config.container / 2,
            backgroundColor: badgeColor + '30',
          },
        ]}>
        <Shield color={badgeColor} size={config.icon} />
      </View>
      <Text
        fontSize={config.fontSize}
        fontWeight="700"
        color="text-primary"
        ml={10}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconOnly: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
