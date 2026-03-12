/**
 * TermsAndConditionsScreen — stub (WebView placeholder)
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, FileText} from 'lucide-react-native';

const TITLE = 'Terms & Conditions';

const TermsAndConditionsScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{TITLE}</Text>
        <View style={{width: 22}} />
      </View>
      <View style={styles.placeholder}>
        <FileText size={48} color="#9CA3AF" />
        <Text style={styles.placeholderText}>Terms & Conditions</Text>
        <Text style={styles.placeholderSub}>WebView loading https://alphamatch.com/terms</Text>
      </View>
    </View>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  placeholder: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12},
  placeholderText: {fontSize: 18, fontWeight: '700', color: '#D1D5DB'},
  placeholderSub: {fontSize: 13, color: '#9CA3AF'},
});
