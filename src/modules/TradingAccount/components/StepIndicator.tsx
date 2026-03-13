import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@lmb-it/kitsconcerto';

interface StepIndicatorProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  stepNumber: number;
}

/**
 * A single step row with an icon circle and label text.
 * Used on the Pro Confirmation "what happens next" flow.
 */
export function StepIndicator({icon, iconBg, label, stepNumber}: StepIndicatorProps) {
  return (
    <View style={styles.stepRow} accessible accessibilityLabel={`Step ${stepNumber}: ${label}`}>
      <View style={[styles.stepIcon, {backgroundColor: iconBg}]}>
        {icon}
      </View>
      <Text fontSize={14} color="text-primary" lineHeight={20} style={styles.stepLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepLabel: {
    flex: 1,
  },
});
