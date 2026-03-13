import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Upload, FileCheck, CheckCircle2} from 'lucide-react-native';

interface DocumentRowProps {
  documentName: string;
  uploadStatus: string;
  isMandatory: boolean;
  onUpload?: () => void;
  uploadedLabel?: string;
  requiredLabel?: string;
  optionalLabel?: string;
}

/**
 * Reusable document row for verification and profile screens.
 * Shows document name, status icon/text, and an upload button if not yet uploaded.
 */
export function DocumentRow({
  documentName,
  uploadStatus,
  isMandatory,
  onUpload,
  uploadedLabel = 'Uploaded',
  requiredLabel = 'Required',
  optionalLabel = 'Optional',
}: DocumentRowProps) {
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const isUploaded = uploadStatus === 'uploaded' || uploadStatus === 'approved';

  return (
    <View
      style={styles.docRow}
      accessible
      accessibilityLabel={`${documentName}, ${isUploaded ? uploadedLabel : isMandatory ? requiredLabel : optionalLabel}`}>
      <View
        style={[
          styles.docIcon,
          {backgroundColor: isUploaded ? '#D1FAE515' : primaryColor + '15'},
        ]}>
        {isUploaded ? (
          <CheckCircle2 color="#10B981" size={20} />
        ) : (
          <FileCheck color={primaryColor} size={20} />
        )}
      </View>
      <View style={styles.docInfo}>
        <Text fontSize={15} fontWeight="600" color="text-primary">
          {documentName}
        </Text>
        <Text
          fontSize={13}
          color={
            isUploaded ? '#10B981' : isMandatory ? '#EF4444' : 'text-subtle'
          }>
          {isUploaded ? uploadedLabel : isMandatory ? requiredLabel : optionalLabel}
        </Text>
      </View>
      {!isUploaded && onUpload && (
        <TouchableOpacity
          style={[styles.uploadBtn, {borderColor: primaryColor}]}
          activeOpacity={0.7}
          onPress={onUpload}
          accessible
          accessibilityRole="button"
          accessibilityLabel={`Upload ${documentName}`}>
          <Upload color={primaryColor} size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
