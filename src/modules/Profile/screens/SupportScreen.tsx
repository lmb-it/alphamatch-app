/**
 * SupportScreen — stub
 */
import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, MessageCircle, Mail, PhoneCall, BookOpen} from 'lucide-react-native';
import {SectionMenuRow} from '@src/components/shared/SectionMenuRow';

const TITLE = 'Support';

const SupportScreen: React.FC = () => {
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
      <ScrollView>
        <SectionMenuRow icon={MessageCircle} label="Live Chat" sublabel="Chat with support now" />
        <SectionMenuRow icon={Mail} label="Email Support" sublabel="support@alphamatch.com" />
        <SectionMenuRow icon={PhoneCall} label="Call Support" sublabel="Mon–Fri, 9am–5pm AEST" />
        <SectionMenuRow icon={BookOpen} label="Help Centre" sublabel="Browse articles and FAQs" />
      </ScrollView>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#F3F4F6'},
  headerTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
});
