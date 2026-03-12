/**
 * WorkspaceBadge
 * Small pill displayed in screen headers showing the current workspace name.
 * Tappable — opens WorkspaceSwitcherSheet.
 */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {ChevronDown} from 'lucide-react-native';
import {useSelector} from 'react-redux';
import {selectActiveWorkspaceItem, selectActiveWorkspaceType} from '@src/modules/Workspace';

// ── Types ────────────────────────────────────────────────────────────────────

interface WorkspaceBadgeProps {
  onPress: () => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_PERSONAL = 'Client';

// ── Component ────────────────────────────────────────────────────────────────

export const WorkspaceBadge: React.FC<WorkspaceBadgeProps> = ({onPress}) => {
  const activeItem = useSelector(selectActiveWorkspaceItem);
  const activeType = useSelector(selectActiveWorkspaceType);

  const label =
    activeType === 'personal'
      ? LABEL_PERSONAL
      : activeItem?.label ?? 'Trading';

  return (
    <TouchableOpacity style={styles.badge} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.dot, activeType === 'personal' ? styles.dotClient : styles.dotTrade]} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <ChevronDown size={12} color="#374151" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F3F4F6',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: 160,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dotClient: {
    backgroundColor: '#00A8B1',
  },
  dotTrade: {
    backgroundColor: '#9333EA',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
});
