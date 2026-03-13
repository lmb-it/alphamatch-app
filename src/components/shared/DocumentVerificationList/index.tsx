/**
 * DocumentVerificationList
 *
 * Shared component that renders a list of required compliance documents
 * with upload status indicators and action buttons.
 * Used both in the trading-account creation flow and in the standalone
 * profile verification screen.
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Upload, FileCheck, CheckCircle2, AlertCircle} from 'lucide-react-native';
import type {IDocumentRequirement} from '@src/modules/TradingAccount/models/tradingAccount.types';

export interface DocumentVerificationListProps {
  documents: IDocumentRequirement[];
  loading?: boolean;
  onUpload: (doc: IDocumentRequirement) => void;
}

export const DocumentVerificationList: React.FC<DocumentVerificationListProps> = ({
  documents,
  loading = false,
  onUpload,
}) => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

  const uploadedCount = documents.filter(
    d => d.uploadStatus === 'uploaded' || d.uploadStatus === 'approved',
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
            {uploadedCount}/{totalCount} {t('trading.verify.documentsUploaded')}
          </Text>
        </View>
      )}

      <View style={styles.docsList}>
        <Text fontSize={16} fontWeight="700" color="text-primary" mb={16}>
          {t('trading.verify.requiredDocuments')}
        </Text>

        {documents.map(doc => {
          const isUploaded =
            doc.uploadStatus === 'uploaded' || doc.uploadStatus === 'approved';

          return (
            <View
              key={doc.identifier}
              style={styles.docRow}
              accessible
              accessibilityLabel={`${doc.name}, ${isUploaded ? 'uploaded' : 'required'}`}>
              <View
                style={[
                  styles.docIcon,
                  {
                    backgroundColor: isUploaded
                      ? '#D1FAE515'
                      : primaryColor + '15',
                  },
                ]}>
                {isUploaded ? (
                  <CheckCircle2 color="#10B981" size={20} />
                ) : (
                  <FileCheck color={primaryColor} size={20} />
                )}
              </View>
              <View style={styles.docInfo}>
                <Text fontSize={15} fontWeight="600" color="text-primary">
                  {doc.name}
                </Text>
                <Text
                  fontSize={13}
                  color={isUploaded ? '#10B981' : '#EF4444'}>
                  {isUploaded
                    ? t('trading.verify.uploaded')
                    : t('required')}
                </Text>
              </View>
              {!isUploaded && (
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
