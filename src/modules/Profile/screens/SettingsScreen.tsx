/**
 * SettingsScreen
 * Full settings menu with all items from the spec.
 * Each item navigates to its own stack screen or toggles inline.
 *
 * NOTE: Most sub-screens are stubs — inline navigation will be wired when screens are built.
 */
import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {Shield, CreditCard, MapPin, Globe, Mail, Lock, Bell, Smartphone, CheckCircle, Monitor, UserX, Trash2} from 'lucide-react-native';
import {SectionMenuRow} from '@src/components/shared/SectionMenuRow';
import {ToggleRow} from '@src/components/shared/ToggleRow';
import {ConfirmSheet} from '@src/components/shared/ConfirmSheet';
import AlphaLayout from '@src/layouts/AlphaLayout';

// ── Constants ────────────────────────────────────────────────────────────────

const SECTION_ACCOUNT = 'Account';
const SECTION_NOTIFICATIONS = 'Notifications';
const SECTION_APPEARANCE = 'Appearance';
const SECTION_DANGER = 'Danger Zone';

// ── Component ────────────────────────────────────────────────────────────────

const SettingsScreen: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const [confirmSheet, setConfirmSheet] = useState<'deactivate' | 'delete' | null>(null);

  const stub = () => Alert.alert('Coming Soon', 'This settings screen is under construction.');

  return (
    <AlphaLayout title="Settings" headerStyle="solid" scrollEnabled={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account */}
        <Text style={styles.section}>{SECTION_ACCOUNT}</Text>
        <SectionMenuRow icon={Shield} label="Privacy" sublabel="Who can see your details" onPress={stub} />
        <SectionMenuRow icon={CreditCard} label="Payment Methods" onPress={stub} />
        <SectionMenuRow icon={MapPin} label="Address" onPress={stub} />
        <SectionMenuRow icon={Globe} label="Languages Spoken" onPress={stub} />
        <SectionMenuRow icon={Mail} label="Email" sublabel="Change your email address" onPress={stub} />
        <SectionMenuRow icon={Lock} label="Password" sublabel="Change your password" onPress={stub} />
        <SectionMenuRow icon={CheckCircle} label="Trust & Verification" onPress={stub} />
        <ToggleRow icon={Smartphone} label="Two-Factor Authentication" value={twoFa} onToggle={setTwoFa} />

        {/* Notifications */}
        <Text style={styles.section}>{SECTION_NOTIFICATIONS}</Text>
        <ToggleRow icon={Mail} label="Email Notifications" value={emailNotifications} onToggle={setEmailNotifications} />
        <ToggleRow icon={Bell} label="Push Notifications" value={pushNotifications} onToggle={setPushNotifications} />
        <ToggleRow icon={Mail} label="Marketing Emails" value={marketingEmails} onToggle={setMarketingEmails} />

        {/* Appearance */}
        <Text style={styles.section}>{SECTION_APPEARANCE}</Text>
        <SectionMenuRow icon={Monitor} label="App Theme" sublabel="Dark / Light / Auto" onPress={stub} />

        {/* Danger zone */}
        <Text style={[styles.section, styles.dangerSection]}>{SECTION_DANGER}</Text>
        <SectionMenuRow icon={UserX} label="Deactivate Account" destructive onPress={() => setConfirmSheet('deactivate')} />
        <SectionMenuRow icon={Trash2} label="Delete Account" destructive onPress={() => setConfirmSheet('delete')} />

        <View style={styles.bottomPad} />
      </ScrollView>

      <ConfirmSheet
        visible={confirmSheet === 'deactivate'}
        title="Deactivate Account"
        message="Your account will be temporarily deactivated. You can reactivate it anytime by logging back in."
        confirmLabel="Deactivate"
        onConfirm={() => setConfirmSheet(null)}
        onCancel={() => setConfirmSheet(null)}
      />
      <ConfirmSheet
        visible={confirmSheet === 'delete'}
        title="Delete Account"
        message="This action is permanent and cannot be undone. All your data will be permanently deleted."
        confirmLabel="Delete My Account"
        onConfirm={() => setConfirmSheet(null)}
        onCancel={() => setConfirmSheet(null)}
        isHighRisk
      />
    </AlphaLayout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  section: {fontSize: 12, fontWeight: '700', color: '#6B7280', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 24, marginBottom: 4, marginHorizontal: 20},
  dangerSection: {color: '#EF4444'},
  bottomPad: {height: 40},
});
