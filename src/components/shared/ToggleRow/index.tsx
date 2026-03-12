/**
 * ToggleRow
 * SectionMenuRow variant with an inline Switch on the right.
 * Used in Email Preferences, Notification Preferences, and App Theme sections.
 */
import React from 'react';
import {Switch, View} from 'react-native';
import {SectionMenuRow, type SectionMenuRowProps} from '../SectionMenuRow';

// ── Types ────────────────────────────────────────────────────────────────────

interface ToggleRowProps extends Omit<SectionMenuRowProps, 'rightBadge' | 'showChevron' | 'onPress'> {
  value: boolean;
  onToggle: (value: boolean) => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export const ToggleRow: React.FC<ToggleRowProps> = ({
  value,
  onToggle,
  ...rowProps
}) => {
  const toggle = (
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{false: '#E5E7EB', true: '#00A8B1'}}
      thumbColor="#FFFFFF"
    />
  );

  return (
    <SectionMenuRow
      {...rowProps}
      rightBadge={toggle}
      showChevron={false}
      onPress={() => onToggle(!value)}
    />
  );
};
