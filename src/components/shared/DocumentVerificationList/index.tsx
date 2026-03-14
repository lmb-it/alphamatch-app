/**
 * DocumentVerificationList
 *
 * Shared component that renders a list of required compliance documents
 * with upload status indicators and action buttons.
 * Used both in the trading-account creation flow and in the standalone
 * profile verification screen.
 *
 * Statuses: pending | approved | rejected | expiring_soon | expired | undefined (not submitted)
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Upload, FileCheck, CheckCircle2, AlertCircle, Clock, XCircle} from 'lucide-react-native';
import type {IDocumentRequirement} from '@src/modules/TradingAccount/models/tradingAccount.types';

export interface DocumentVerificationListProps {
  documents: IDocumentRequirement[];
  loading?: boolean;
  onUpload: (doc: IDocumentRequirement) => void;
}

type DocStatus = 'pending' | 'approved' | 'rejected' | 'expiring_soon' | 'expired' | undefined;

const STATUS_CONFIG: Record<string, {icon: 'check' | 'clock' | 'x' | 'alert'; color: string; bgTint: string; labelKey: string}> = {
  approved: {icon: 'check', color: '#10B981', bgTint: '#D1FAE515', labelKey: 'trading.verify.approved'},
  pending: {icon: 'clock', color: '#F59E0B', bgTint: '#FEF3C715', labelKey: 'trading.verify.pending'},
  rejected: {icon: 'x', color: '#EF4444', bgTint: '#FEE2E215', labelKey: 'trading.verify.rejected'},
  expiring_soon: {icon: 'alert', color: '#F59E0B', bgTint: '#FEF3C715', labelKey: 'trading.verify.expiringSoon'},
  expired: {icon: 'x', color: '#EF4444', bgTint: '#FEE2E215', labelKey: 'trading.verify.expired'},
};

const StatusIcon: React.FC<{status: DocStatus; primaryColor: string}> = ({status, primaryColor}) => {
  if (!status) {
    return <FileCheck color={primaryColor} size={20} />;
  }
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return <FileCheck color={primaryColor} size={20} />;

  switch (cfg.icon) {
    case 'check': return <CheckCircle2 color={cfg.color} size={20} />;
    case 'clock': return <Clock color={cfg.color} size={20} />;
    case 'x': return <XCircle color={cfg.color} size={20} />;
    case 'alert': return <AlertCircle color={cfg.color} size={20} />;
    default: return <FileCheck color={primaryColor} size={20} />;
  }
};

export const DocumentVerificationList: React.FC<DocumentVerificationListProps> = ({
  documents,
  loading = false,
  onUpload,
}) => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

  const completedCount = documents.filter(
    d => d.uploadStatus === 'approved',
  ).length;
  const submittedCount = documents.filter(
    d => d.uploadStatus === 'pending' || d.uploadStatus === 'approved',
  ).length;
  const totalCount = documents.length;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={styles.emptyState}>
        <AlertCircle color="#9CA3AF" size={24} />
        <Text fontSize={14} color="text-subtle" mt={8}>
          {t('trading.verify.noDocumentsRequired')}
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* Progress indicator */}
      {totalCount > 0 && (
        <View style={styles.progressBar}>
          <Text fontSize={13} fontWeight="600" color="text-primary">
            {completedCount}/{totalCount} {t('trading.verify.documentsApproved')}
          </Text>
          {submittedCount > completedCount && (
            <Text fontSize={12} color="#F59E0B" mt={2}>
              {submittedCount - completedCount} {t('trading.verify.pendingReview')}
            </Text>
          )}
        </View>
      )}

      <View style={styles.docsList}>
        <Text fontSize={16} fontWeight="700" color="text-primary" mb={16}>
          {t('trading.verify.requiredDocuments')}
        </Text>

        {documents.map(doc => {
          const status = doc.uploadStatus as DocStatus;
          const cfg = status ? STATUS_CONFIG[status] : null;
          const canUpload = !status || status === 'rejected';

          return (
            <View
              key={doc.identifier}
              style={styles.docRow}
              accessible
              accessibilityLabel={`${doc.name}, ${status || 'not submitted'}`}>
              <View
                style={[
                  styles.docIcon,
                  {backgroundColor: cfg?.bgTint || (primaryColor + '15')},
                ]}>
                <StatusIcon status={status} primaryColor={primaryColor} />
              </View>
              <View style={styles.docInfo}>
                <Text fontSize={15} fontWeight="600" color="text-primary">
                  {doc.name}
                </Text>
                <Text
                  fontSize={13}
                  color={cfg?.color || '#EF4444'}>
                  {cfg ? t(cfg.labelKey) : t('required')}
                </Text>
              </View>
              {canUpload && (
                <TouchableOpacity
                  style={[styles.uploadBtn, {borderColor: primaryColor}]}
                  activeOpacity={0.7}
                  onPress={() => onUpload(doc)}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={`Upload ${doc.name}`}
                  accessibilityHint="Opens the document upload form">
                  <Upload color={primaryColor} size={16} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  progressBar: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    alignItems: 'center',
  },
  docsList: {
    marginTop: 24,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  docIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  docInfo: {
    flex: 1,
    gap: 4,
  },
  uploadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
