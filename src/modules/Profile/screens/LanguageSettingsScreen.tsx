/**
 * LanguageSettingsScreen — stub
 */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Check} from 'lucide-react-native';

const TITLE = 'App Language';

const LANGUAGES = [
  {code: 'en', label: 'English', nativeLabel: 'English'},
  {code: 'ar', label: 'Arabic', nativeLabel: 'العربية'},
  {code: 'es', label: 'Spanish', nativeLabel: 'Español'},
  {code: 'de', label: 'German', nativeLabel: 'Deutsch'},
  {code: 'fr', label: 'French', nativeLabel: 'Français'},
  {code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা'},
  {code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी'},
] as const;

const LanguageSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string>('en');

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
      <ScrollView>
        {LANGUAGES.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[styles.row, selected === lang.code && styles.rowSelected]}
            onPress={() => setSelected(lang.code)}
            activeOpacity={0.7}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>{lang.label}</Text>
              <Text style={styles.rowNative}>{lang.nativeLabel}</Text>
            </View>
            {selected === lang.code && <Check size={18} color="#00A8B1" />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default LanguageSettingsScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  rowSelected: {backgroundColor: '#F0FDFA'},
  rowContent: {gap: 2},
  rowLabel: {fontSize: 15, fontWeight: '500', color: '#111827'},
  rowNative: {fontSize: 13, color: '#6B7280'},
});
