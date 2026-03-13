import React, {useCallback, useState} from 'react';
import {View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {ArrowLeft} from 'lucide-react-native';
import {Text, useLanguage} from '@lmb-it/kitsconcerto';
import {selectProfileData, profileActions} from '@src/modules/Profile';
import {updateProfileApi} from '../api/profile.service';

const EditProfileScreen: React.FC = () => {
  const {t} = useLanguage();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileData = useSelector(selectProfileData);

  const [firstName, setFirstName] = useState(profileData?.displayName ?? '');
  const [lastName, setLastName] = useState(profileData?.familyName ?? '');
  const [phone, setPhone] = useState(profileData?.phone ?? '');
  const [bio, setBio] = useState(profileData?.bio ?? '');
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await updateProfileApi({
        displayName: firstName,
        familyName: lastName,
        contactPhone: phone || undefined,
        shortBio: bio || undefined,
      });
      dispatch(profileActions.fetchProfile());
      navigation.goBack();
    } catch (err: any) {
      Alert.alert(t('error'), err?.message ?? t('profile.updateFailed'));
    } finally {
      setSaving(false);
    }
  }, [firstName, lastName, phone, bio, dispatch, navigation, t]);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text fontSize={16} fontWeight="700" color="text-primary">
          {t('profile.editProfile')}
        </Text>
        <View style={{width: 22}} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text fontSize={13} fontWeight="600" color="text-primary" style={styles.label}>
          {t('profile.firstName')}
        </Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder={t('profile.firstName')}
          placeholderTextColor="#9CA3AF"
        />

        <Text fontSize={13} fontWeight="600" color="text-primary" style={styles.label}>
          {t('profile.lastName')}
        </Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder={t('profile.lastName')}
          placeholderTextColor="#9CA3AF"
        />

        <Text fontSize={13} fontWeight="600" color="text-primary" style={styles.label}>
          {t('profile.email')}
        </Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={profileData?.email ?? ''}
          editable={false}
          placeholderTextColor="#9CA3AF"
        />

        <Text fontSize={13} fontWeight="600" color="text-primary" style={styles.label}>
          {t('profile.phone')}
        </Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder={t('profile.phone')}
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
        />

        <Text fontSize={13} fontWeight="600" color="text-primary" style={styles.label}>
          {t('profile.bio')}
        </Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={bio}
          onChangeText={setBio}
          placeholder={t('profile.bioPlaceholder')}
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
        />
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <TouchableOpacity
          style={styles.saveBtn}
          activeOpacity={0.85}
          onPress={handleSave}
          disabled={saving}>
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text fontSize={16} fontWeight="700" color="#FFFFFF">
              {t('profile.saveChanges')}
            </Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F9FAFC'},
  safe: {backgroundColor: '#FFFFFF'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
  },
  content: {padding: 20, paddingBottom: 40},
  label: {marginBottom: 6, marginTop: 16},
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  multiline: {minHeight: 100, textAlignVertical: 'top'},
  disabled: {backgroundColor: '#F3F4F6', color: '#9CA3AF'},
  footer: {paddingHorizontal: 20, paddingBottom: 8},
  saveBtn: {
    backgroundColor: '#00A8B1',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
