/**
 * ProjectDetailScreen — stub
 * Inner 4-tab screen: Overview / Files / Milestones / Feedback
 */
import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';

const TABS = ['Overview', 'Files', 'Milestones', 'Feedback'] as const;
type Tab = typeof TABS[number];

const ProjectDetailScreen: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Overview');

  return (
    <AlphaLayout
      title="Project Detail"
      showDecorations={false}
      headerStyle="solid"
      scrollEnabled={false}>
      <View style={styles.tabsRow}>
        {TABS.map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.tabItem, tab === t && styles.tabItemActive]}
            onPress={() => setTab(t)}>
            <Text style={[styles.tabLabel, tab === t && styles.tabLabelActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{tab} content</Text>
          <Text style={styles.placeholderSub}>Project {tab} will be implemented here.</Text>
        </View>
      </ScrollView>
    </AlphaLayout>
  );
};

export default ProjectDetailScreen;

const styles = StyleSheet.create({
  tabsRow: {flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  tabItem: {flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent'},
  tabItemActive: {borderBottomColor: '#00A8B1'},
  tabLabel: {fontSize: 13, color: '#6B7280', fontWeight: '500'},
  tabLabelActive: {color: '#00A8B1', fontWeight: '700'},
  content: {flex: 1, padding: 24},
  placeholder: {alignItems: 'center', paddingTop: 60, gap: 8},
  placeholderText: {fontSize: 20, fontWeight: '700', color: '#D1D5DB'},
  placeholderSub: {fontSize: 14, color: '#9CA3AF'},
});
