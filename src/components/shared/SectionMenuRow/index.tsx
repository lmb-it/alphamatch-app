/**
 * SectionMenuRow
 * Tappable list row used in Profile tab and Settings screens.
 * Accepts a label, optional left icon, optional right badge, and a chevron.
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ChevronRight} from 'lucide-react-native';
import type {LucideIcon} from 'lucide-react-native';

// ── Types ────────────────────────────────────────────────────────────────────

export interface SectionMenuRowProps {
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
  rightBadge?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  destructive?: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

export const SectionMenuRow: React.FC<SectionMenuRowProps> = ({
  label,
  sublabel,
  icon: Icon,
  rightBadge,
  onPress,
  showChevron = true,
  destructive = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.7}
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}>
      {/* Left icon */}
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon size={20} color={destructive ? '#EF4444' : '#374151'} />
        </View>
      )}

      {/* Label block */}
      <View style={styles.labelBlock}>
        <Text style={[styles.label, destructive && styles.labelDestructive]}>
          {label}
        </Text>
        {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
      </View>

      {/* Right side: badge + chevron */}
      <View style={styles.right}>
        {rightBadge}
        {showChevron && (
          <ChevronRight size={18} color="#9CA3AF" style={styles.chevron} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  labelBlock: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  labelDestructive: {
    color: '#EF4444',
  },
  sublabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chevron: {
    marginLeft: 4,
  },
});
