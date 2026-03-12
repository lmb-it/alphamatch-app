/**
 * EditProfileScreen — stub
 */
import React from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'lucide-react-native';

const LABEL_TITLE = 'Edit Profile';
const LABEL_SAVE = 'Save Changes';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{LABEL_TITLE}</Text>
        <View style={{width: 22}} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {(['First Name', 'Last Name', 'Email', 'Phone', 'Bio'] as const).map(f => (
          <View key={f}>
            <Text style={styles.label}>{f}</Text>
            <TextInput
              style={[styles.input, f === 'Bio' && styles.multiline]}
              placeholder={`Enter ${f}`}
              placeholderTextColor="#9CA3AF"
              multiline={f === 'Bio'}
              numberOfLines={f === 'Bio' ? 4 : 1}
            />
          </View>
        ))}
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>{LABEL_SAVE}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  content: {padding: 20, gap: 4},
  label: {fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 12},
  input: {backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, fontSize: 15, color: '#111827', borderWidth: 1.5, borderColor: '#E5E7EB'},
  multiline: {minHeight: 100, textAlignVertical: 'top'},
  footer: {paddingHorizontal: 20, paddingBottom: 8},
  saveBtn: {backgroundColor: '#00A8B1', borderRadius: 14, paddingVertical: 15, alignItems: 'center'},
  saveBtnText: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
});
