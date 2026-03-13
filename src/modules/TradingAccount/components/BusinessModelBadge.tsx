import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@lmb-it/kitsconcerto';

interface BusinessModelBadgeProps {
  model: 'pro' | 'flex' | string;
  label?: string;
}

/**
 * Colored badge indicating Alpha Pro or Alpha Flex business model.
 * Used on career cards and confirmation screens.
 */
export function BusinessModelBadge({model, label}: BusinessModelBadgeProps) {
  const isPro = model === 'pro';
  return (
    <View style={[styles.badge, isPro ? styles.badgePro : styles.badgeFlex]}>
      <Text fontSize={11} fontWeight="700" color={isPro ? '#B45309' : '#1D4ED8'}>
        {label ?? (isPro ? 'Alpha Pro' : 'Alpha Flex')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgePro: {
    backgroundColor: '#FEF3C7',
  },
  badgeFlex: {
    backgroundColor: '#DBEAFE',
  },
});
