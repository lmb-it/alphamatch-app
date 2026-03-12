/**
 * DocumentsScreen — stub
 * Library of uploaded documents with add/delete actions and expiry alerts.
 */
import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Plus} from 'lucide-react-native';
import {DocumentCard} from '@src/components/shared/DocumentCard';

const TITLE = 'Documents';
const LABEL_ADD = 'Upload Document';

const FIXTURE_DOCS = [
  {name: 'Driver Licence', expiryDate: 'Jun 2025', status: 'verified' as const, isExpiringSoon: false},
  {name: 'Working with Children Check', expiryDate: 'Apr 2026', status: 'verified' as const, isExpiringSoon: true},
  {name: 'Public Liability Insurance', expiryDate: 'Dec 2024', status: 'pending' as const, isExpiringSoon: false},
];

const DocumentsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [docs, setDocs] = useState(FIXTURE_DOCS);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{TITLE}</Text>
        <TouchableOpacity>
          <Plus size={22} color="#00A8B1" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {docs.map((doc, i) => (
            <DocumentCard
              key={i}
              {...doc}
              onDelete={() => setDocs(d => d.filter((_, idx) => idx !== i))}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Plus size={18} color="#00A8B1" />
          <Text style={styles.addBtnText}>{LABEL_ADD}</Text>
        </TouchableOpacity>
        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  list: {marginTop: 12},
  addBtn: {flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 16, padding: 16, borderRadius: 14, borderWidth: 1.5, borderColor: '#00A8B1', borderStyle: 'dashed', justifyContent: 'center'},
  addBtnText: {fontSize: 14, fontWeight: '600', color: '#00A8B1'},
  bottomPad: {height: 100},
});
