/**
 * SubmitProposalScreen — stub (modal bottom sheet style)
 */
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {X} from 'lucide-react-native';

const LABEL_TITLE = 'Submit a Bid';
const LABEL_PRICE = 'Your Bid Price (USD)';
const LABEL_PROPOSAL = 'Proposal Message';
const LABEL_PROPOSAL_PLACEHOLDER = 'Describe why you\'re the best fit for this job…';
const LABEL_SUBMIT = 'Submit Bid';
const LABEL_CANCEL = 'Cancel';

const SubmitProposalScreen: React.FC = () => {
  const navigation = useNavigation();
  const [price, setPrice] = useState('');
  const [proposal, setProposal] = useState('');

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <Text style={styles.title}>{LABEL_TITLE}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={22} color="#111827" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.fieldLabel}>{LABEL_PRICE}</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="0.00"
          placeholderTextColor="#9CA3AF"
          keyboardType="decimal-pad"
          value={price}
          onChangeText={setPrice}
        />
        <Text style={styles.fieldLabel}>{LABEL_PROPOSAL}</Text>
        <TextInput
          style={styles.proposalInput}
          placeholder={LABEL_PROPOSAL_PLACEHOLDER}
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={proposal}
          onChangeText={setProposal}
        />
        <TouchableOpacity style={styles.portfolioRow} activeOpacity={0.7}>
          <Text style={styles.portfolioText}>+ Attach Portfolio (optional)</Text>
        </TouchableOpacity>
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>{LABEL_SUBMIT}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn} activeOpacity={0.7}>
          <Text style={styles.cancelText}>{LABEL_CANCEL}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default SubmitProposalScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#FFFFFF'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  title: {fontSize: 18, fontWeight: '700', color: '#111827'},
  content: {padding: 20, gap: 8},
  fieldLabel: {fontSize: 13, fontWeight: '600', color: '#374151', marginTop: 12},
  priceInput: {backgroundColor: '#F9FAFB', borderRadius: 12, padding: 14, fontSize: 22, fontWeight: '700', color: '#111827', borderWidth: 1.5, borderColor: '#E5E7EB'},
  proposalInput: {backgroundColor: '#F9FAFB', borderRadius: 12, padding: 14, fontSize: 14, color: '#111827', minHeight: 130, borderWidth: 1.5, borderColor: '#E5E7EB'},
  portfolioRow: {paddingVertical: 12},
  portfolioText: {fontSize: 14, color: '#00A8B1', fontWeight: '500'},
  footer: {paddingHorizontal: 20, paddingBottom: 8, gap: 8},
  submitBtn: {backgroundColor: '#00A8B1', borderRadius: 14, paddingVertical: 15, alignItems: 'center'},
  submitBtnText: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
  cancelBtn: {paddingVertical: 12, alignItems: 'center'},
  cancelText: {fontSize: 15, color: '#6B7280'},
});
