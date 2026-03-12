/**
 * ConfirmSheet
 * Reusable bottom sheet for destructive confirmation dialogs.
 * Used for: Deactivate Account, Delete Account, Logout.
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {AlertTriangle} from 'lucide-react-native';

// ── Types ────────────────────────────────────────────────────────────────────

interface ConfirmSheetProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** If true, shows warning styling for double-confirm destructive actions */
  isHighRisk?: boolean;
}

// ── Constants ────────────────────────────────────────────────────────────────

const CANCEL_DEFAULT = 'Cancel';

// ── Component ────────────────────────────────────────────────────────────────

export const ConfirmSheet: React.FC<ConfirmSheetProps> = ({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = CANCEL_DEFAULT,
  onConfirm,
  onCancel,
  isHighRisk = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        {isHighRisk && (
          <View style={styles.warningIcon}>
            <AlertTriangle size={32} color="#EF4444" />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity
          style={[styles.confirmBtn, isHighRisk && styles.highRiskBtn]}
          onPress={onConfirm}
          activeOpacity={0.8}>
          <Text style={styles.confirmLabel}>{confirmLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCancel}
          activeOpacity={0.7}>
          <Text style={styles.cancelLabel}>{cancelLabel}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    gap: 12,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  warningIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  confirmBtn: {
    width: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  highRiskBtn: {
    backgroundColor: '#7F1D1D',
  },
  confirmLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelBtn: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
});
