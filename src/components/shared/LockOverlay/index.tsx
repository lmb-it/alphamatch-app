/**
 * LockOverlay
 * Blurred overlay shown on locked chat screens.
 * Appears when deposit has not been paid (Alpha Pro) or
 * proposal not yet accepted (Alpha Flex).
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Lock} from 'lucide-react-native';

// ── Types ────────────────────────────────────────────────────────────────────

interface LockOverlayProps {
  message: string;
  actionLabel: string;
  onAction: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export const LockOverlay: React.FC<LockOverlayProps> = ({
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Lock size={28} color="#00A8B1" />
        </View>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.actionBtn} onPress={onAction} activeOpacity={0.8}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(249, 250, 252, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    maxWidth: 320,
    width: '100%',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0F7F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  message: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionBtn: {
    backgroundColor: '#00A8B1',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 8,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
