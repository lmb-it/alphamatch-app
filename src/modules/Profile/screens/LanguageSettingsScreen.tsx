/**
 * LanguageSettingsScreen — stub
 */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Check} from 'lucide-react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';

const LANGUAGES = [
  {code: 'en', label: 'English', nativeLabel: 'English'},
  {code: 'ar', label: 'Arabic', nativeLabel: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629'},
  {code: 'es', label: 'Spanish', nativeLabel: 'Espa\u00F1ol'},
  {code: 'de', label: 'German', nativeLabel: 'Deutsch'},
  {code: 'fr', label: 'French', nativeLabel: 'Fran\u00E7ais'},
  {code: 'bn', label: 'Bengali', nativeLabel: '\u09AC\u09BE\u0982\u09B2\u09BE'},
  {code: 'hi', label: 'Hindi', nativeLabel: '\u0939\u093F\u0928\u094D\u0926\u0940'},
] as const;

const LanguageSettingsScreen: React.FC = () => {
  const [selected, setSelected] = useState<string>('en');

  return (
    <AlphaLayout title="App Language" headerStyle="solid" scrollEnabled={false}>
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
    </AlphaLayout>
  );
};

export default LanguageSettingsScreen;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  rowSelected: {backgroundColor: '#F0FDFA'},
  rowContent: {gap: 2},
  rowLabel: {fontSize: 15, fontWeight: '500', color: '#111827'},
  rowNative: {fontSize: 13, color: '#6B7280'},
});
