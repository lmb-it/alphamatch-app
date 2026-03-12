/**
 * WorkspaceSwitcherSheet
 * Bottom sheet listing all workspaces (personal + trading accounts).
 * Triggered from WorkspaceBadge in the header or the ModeCard in Profile tab.
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {User, Briefcase, Plus, Check} from 'lucide-react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectWorkspaceList,
  selectActiveWorkspaceId,
  workspaceActions,
} from '@src/modules/Workspace';

// ── Types ────────────────────────────────────────────────────────────────────

interface WorkspaceSwitcherSheetProps {
  visible: boolean;
  onClose: () => void;
  onCreateTradingAccount?: () => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

const LABEL_TITLE = 'Switch Workspace';
const LABEL_CLIENT = 'Client Mode';
const LABEL_CLIENT_SUB = 'Post jobs & hire professionals';
const LABEL_ADD_ACCOUNT = 'Add Trading Account';

// ── Component ────────────────────────────────────────────────────────────────

export const WorkspaceSwitcherSheet: React.FC<WorkspaceSwitcherSheetProps> = ({
  visible,
  onClose,
  onCreateTradingAccount,
}) => {
  const dispatch = useDispatch();
  const workspaceList = useSelector(selectWorkspaceList);
  const activeId = useSelector(selectActiveWorkspaceId);

  const handleSelect = (id: string, type: 'personal' | 'trading_account') => {
    dispatch(workspaceActions.setActiveWorkspace({workspaceId: id, workspaceType: type}));
    onClose();
  };

  const tradingWorkspaces = workspaceList.filter(w => w.type === 'trading_account');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>{LABEL_TITLE}</Text>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
          {/* Personal workspace row */}
          <WorkspaceRow
            label={LABEL_CLIENT}
            sublabel={LABEL_CLIENT_SUB}
            icon={<User size={20} color="#00A8B1" />}
            iconBg="#E0F7F8"
            isActive={activeId === 'personal'}
            onPress={() => handleSelect('personal', 'personal')}
          />

          {/* Trading account rows */}
          {tradingWorkspaces.map(workspace => (
            <WorkspaceRow
              key={workspace.id}
              label={workspace.label}
              sublabel={workspace.isVerified ? 'Verified' : 'Pending verification'}
              icon={<Briefcase size={20} color="#9333EA" />}
              iconBg="#F3E8FF"
              isActive={activeId === workspace.id}
              onPress={() => handleSelect(workspace.id, 'trading_account')}
            />
          ))}

          {/* Add account */}
          <TouchableOpacity
            style={styles.addRow}
            onPress={() => {
              onClose();
              onCreateTradingAccount?.();
            }}
            activeOpacity={0.7}>
            <View style={[styles.iconWrap, {backgroundColor: '#F3F4F6'}]}>
              <Plus size={20} color="#374151" />
            </View>
            <Text style={styles.addLabel}>{LABEL_ADD_ACCOUNT}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

// ── WorkspaceRow sub-component ────────────────────────────────────────────────

const WorkspaceRow: React.FC<{
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  iconBg: string;
  isActive: boolean;
  onPress: () => void;
}> = ({label, sublabel, icon, iconBg, isActive, onPress}) => (
  <TouchableOpacity style={[styles.row, isActive && styles.rowActive]} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.iconWrap, {backgroundColor: iconBg}]}>{icon}</View>
    <View style={styles.rowContent}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowSublabel}>{sublabel}</Text>
    </View>
    {isActive && <Check size={18} color="#00A8B1" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  list: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
    marginBottom: 8,
  },
  rowActive: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1.5,
    borderColor: '#00A8B1',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  rowSublabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginTop: 4,
  },
  addLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});
