/**
 * SupportScreen — stub
 */
import React from 'react';
import {ScrollView} from 'react-native';
import {MessageCircle, Mail, PhoneCall, BookOpen} from 'lucide-react-native';
import {SectionMenuRow} from '@src/components/shared/SectionMenuRow';
import AlphaLayout from '@src/layouts/AlphaLayout';

const SupportScreen: React.FC = () => {
  return (
    <AlphaLayout title="Support" headerStyle="solid" scrollEnabled={false}>
      <ScrollView>
        <SectionMenuRow icon={MessageCircle} label="Live Chat" sublabel="Chat with support now" />
        <SectionMenuRow icon={Mail} label="Email Support" sublabel="support@alphamatch.com" />
        <SectionMenuRow icon={PhoneCall} label="Call Support" sublabel="Mon-Fri, 9am-5pm AEST" />
        <SectionMenuRow icon={BookOpen} label="Help Centre" sublabel="Browse articles and FAQs" />
      </ScrollView>
    </AlphaLayout>
  );
};

export default SupportScreen;
