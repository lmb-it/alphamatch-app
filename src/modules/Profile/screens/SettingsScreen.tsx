/**
 * SettingsScreen
 * Full settings with absorbed items: Support, Invite Friends, App Language,
 * Terms & Conditions, Logout.
 *
 * Order: Account → Notifications → More → Danger (Logout in red)
 */
import React, {useState, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {
  Shield, CreditCard, MapPin, Globe, Mail, Lock, Bell, Smartphone,
  CheckCircle, HeadphonesIcon, UserPlus, Languages, FileText, LogOut,
  UserX, Trash2,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SectionMenuRow} from '@src/components/shared/SectionMenuRow';
import {ToggleRow} from '@src/components/shared/ToggleRow';
import {ConfirmSheet} from '@src/components/shared/ConfirmSheet';
import {authActions} from '@src/modules/Auth';
import type {ProfileStackNavigationProp} from '@src/routes/ProfileStackNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

const stub = () => {};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const dispatch = useDispatch();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const [confirmSheet, setConfirmSheet] = useState<'deactivate' | 'delete' | 'logout' | null>(null);

  const handleLogout = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <AlphaLayout title="Settings" headerStyle="solid" scrollEnabled={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account */}
        <Text style={styles.section}>Account</Text>
        <SectionMenuRow icon={Shield} label="Privacy" sublabel="Who can see your details" onPress={stub} />
        <SectionMenuRow icon={CreditCard} label="Payment Methods" onPress={stub} />
        <SectionMenuRow icon={MapPin} label="Address" onPress={stub} />
        <SectionMenuRow icon={Globe} label="Languages Spoken" onPress={stub} />
        <SectionMenuRow icon={Mail} label="Email" sublabel="Change your email address" onPress={stub} />
        <SectionMenuRow icon={Lock} label="Password" sublabel="Change your password" onPress={stub} />
        <SectionMenuRow icon={CheckCircle} label="Trust & Verification" onPress={stub} />
        <ToggleRow icon={Smartphone} label="Two-Factor Authentication" value={twoFa} onToggle={setTwoFa} />

        {/* Notifications */}
        <Text style={styles.section}>Notifications</Text>
        <ToggleRow icon={Mail} label="Email Notifications" value={emailNotifications} onToggle={setEmailNotifications} />
        <ToggleRow icon={Bell} label="Push Notifications" value={pushNotifications} onToggle={setPushNotifications} />
        <ToggleRow icon={Mail} label="Marketing Emails" value={marketingEmails} onToggle={setMarketingEmails} />

        {/* More — absorbed from profile menu */}
        <Text style={styles.section}>More</Text>
        <SectionMenuRow
          icon={HeadphonesIcon}
          label="Support"
          sublabel="Get help from our team"
          onPress={() => navigation.navigate('Support')}
        />
        <SectionMenuRow
          icon={UserPlus}
          label="Invite Friends"
          onPress={() => navigation.navigate('InviteFriends')}
        />
        <SectionMenuRow
          icon={Languages}
          label="App Language"
          onPress={() => navigation.navigate('LanguageSettings')}
        />
        <SectionMenuRow
          icon={FileText}
          label="Terms & Conditions"
          onPress={() => navigation.navigate('TermsAndConditions')}
        />

        {/* Danger Zone */}
        <Text style={[styles.section, styles.dangerSection]}>Danger Zone</Text>
        <SectionMenuRow icon={LogOut} label="Log Out" destructive onPress={() => setConfirmSheet('logout')} />
        <SectionMenuRow icon={UserX} label="Deactivate Account" destructive onPress={() => setConfirmSheet('deactivate')} />
        <SectionMenuRow icon={Trash2} label="Delete Account" destructive onPress={() => setConfirmSheet('delete')} />

        <View style={styles.bottomPad} />
      </ScrollView>

      <ConfirmSheet
        visible={confirmSheet === 'logout'}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmLabel="Log Out"
        onConfirm={() => {
          setConfirmSheet(null);
          handleLogout();
        }}
        onCancel={() => setConfirmSheet(null)}
      />
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
