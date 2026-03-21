/**
 * InviteFriendsScreen — stub
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Share} from 'react-native';
import {Share2} from 'lucide-react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';

const LABEL_SHARE = 'Share Invite Link';
const INVITE_CODE = 'ALPHA2026';

const InviteFriendsScreen: React.FC = () => {
  const handleShare = () => Share.share({message: `Join AlphaMatch with my invite code ${INVITE_CODE}: https://alphamatch.com/invite/${INVITE_CODE}`});

  return (
    <AlphaLayout title="Invite Friends" headerStyle="solid" scrollEnabled={false}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <Share2 size={48} color="#00A8B1" />
        </View>
        <Text style={styles.heading}>Give $20, Get $20</Text>
        <Text style={styles.body}>Invite friends to AlphaMatch. When they complete their first job, you both get $20 credit.</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Your Invite Code</Text>
          <Text style={styles.code}>{INVITE_CODE}</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.85}>
          <Text style={styles.shareBtnText}>{LABEL_SHARE}</Text>
        </TouchableOpacity>
      </View>
    </AlphaLayout>
  );
};

export default InviteFriendsScreen;

const styles = StyleSheet.create({
  content: {flex: 1, padding: 24, alignItems: 'center', gap: 16, justifyContent: 'center'},
  illustration: {width: 96, height: 96, borderRadius: 48, backgroundColor: '#E0F7F8', justifyContent: 'center', alignItems: 'center'},
  heading: {fontSize: 24, fontWeight: '700', color: '#111827'},
  body: {fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22},
  codeBox: {backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, alignItems: 'center', gap: 6, width: '100%', borderWidth: 1.5, borderColor: '#E5E7EB'},
  codeLabel: {fontSize: 12, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8},
  code: {fontSize: 28, fontWeight: '800', color: '#00A8B1', letterSpacing: 4},
  shareBtn: {backgroundColor: '#00A8B1', borderRadius: 14, paddingVertical: 15, paddingHorizontal: 32, width: '100%', alignItems: 'center'},
  shareBtnText: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
});
