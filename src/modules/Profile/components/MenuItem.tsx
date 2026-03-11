import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useKitsTheme} from '@lmb-it/kitsconcerto';
import {ChevronRight, type LucideIcon} from 'lucide-react-native';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({icon: IconComponent, label, onPress}) => {
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.6}>
      <IconComponent color={primaryColor} size={20} style={styles.icon} />
      <Text fontSize={15} color="text-primary" fontWeight="500" style={styles.label}>
        {label}
      </Text>
      <ChevronRight color="#9CA3AF" size={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 14,
  },
  label: {
    flex: 1,
  },
});

export default MenuItem;
