import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Text, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Wallet, Clock, Plus, Camera, Pen, Settings, Share2} from 'lucide-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {selectProfileData, selectActiveWorkspace, selectTradingAccounts, profileActions} from '@src/modules/Profile';
import {uploadAvatarApi, uploadCoverApi} from '../api/profile.service';
import {fetchRequiredDocumentsApi} from '@src/modules/TradingAccount/api/tradingAccount.service';
import type {IDocumentRequirement} from '@src/modules/TradingAccount';
import type {ProfileStackNavigationProp} from '@src/routes/ProfileStackNavigator';
import {DocumentVerificationList} from '@src/components/shared/DocumentVerificationList';
import MenuItem from '../components/MenuItem';
import AlphaLayout from '@src/layouts/AlphaLayout';

const COVER_HEIGHT = 180;
const AVATAR_SIZE = 100;

type TabKey = 'account' | 'portfolio' | 'documents';

const MyAccountScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const dispatch = useDispatch();
  const profileData = useSelector(selectProfileData);
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const tradingAccounts = useSelector(selectTradingAccounts);

  const [activeTab, setActiveTab] = useState<TabKey>('account');
  const [requiredDocs, setRequiredDocs] = useState<IDocumentRequirement[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [projectName, setProjectName] = useState('');

  // Resolve careerRef from the active trading account
  const careerRef = useMemo(() => {
    if (!activeWorkspace) return null;
    const account = tradingAccounts.find(a => a.identifier === activeWorkspace);
    return account?.careerRef ?? null;
  }, [activeWorkspace, tradingAccounts]);

  useEffect(() => {
    if (careerRef) {
      setDocsLoading(true);
      fetchRequiredDocumentsApi('provider', careerRef, 14)
        .then(setRequiredDocs)
        .catch(() => setRequiredDocs([]))
        .finally(() => setDocsLoading(false));
    } else {
      setRequiredDocs([]);
    }
  }, [careerRef]);

  const handlePickAvatar = useCallback(async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 0.8});
    if (result.assets?.[0]?.uri) {
      try {
        await uploadAvatarApi(result.assets[0].uri);
        dispatch(profileActions.fetchProfile());
      } catch {
        Alert.alert(t('error'), t('profile.uploadFailed'));
      }
    }
  }, [dispatch, t]);

  const handlePickCover = useCallback(async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 0.8});
    if (result.assets?.[0]?.uri) {
      try {
        await uploadCoverApi(result.assets[0].uri);
        dispatch(profileActions.fetchProfile());
      } catch {
        Alert.alert(t('error'), t('profile.uploadFailed'));
      }
    }
  }, [dispatch, t]);

  const handleUploadDocument = useCallback(
    (doc: IDocumentRequirement) => {
      navigation.navigate('TradingAccountCreation', {
        screen: 'TADocumentForm',
        params: {documentRef: doc.identifier, documentName: doc.name},
      } as any);
    },
    [navigation],
  );

  const displayName = profileData
    ? `${profileData.displayName || ''} ${profileData.familyName || ''}`.trim()
    : '';

  const availableTabs = useMemo(() => {
    const tabs: TabKey[] = ['account', 'portfolio'];
    if (careerRef) {
      tabs.push('documents');
    }
    return tabs;
  }, [careerRef]);

  const tabLabelKey = (tab: TabKey) => {
    switch (tab) {
      case 'account':
        return 'profile.accountTab';
      case 'portfolio':
        return 'profile.portfolioTab';
      case 'documents':
        return 'profile.documentsTab';
    }
  };

  return (
    <AlphaLayout>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Cover Image */}
      <View style={styles.coverContainer}>
        {profileData?.coverImage ? (
          <Image source={{uri: profileData.coverImage}} style={styles.coverImage} />
        ) : (
          <View style={[styles.coverImage, {backgroundColor: primaryColor}]} />
        )}

        {/* Bottom fade */}
        <LinearGradient
          colors={['transparent', 'rgba(249,250,252,0.6)']}
          style={styles.coverGradientBottom}
        />
        {/* Change cover button */}
        <TouchableOpacity
          style={styles.changeCoverBtn}
          onPress={handlePickCover}
          activeOpacity={0.7}>
          <Camera color="#FFFFFF" size={16} />
        </TouchableOpacity>
      </View>

      {/* Profile Avatar with camera badge */}
      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={handlePickAvatar} activeOpacity={0.8}>
          {profileData?.avatar ? (
            <Image source={{uri: profileData.avatar}} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text fontSize={32} fontWeight="700" color="text-subtle">
                {displayName.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
          )}
          <View style={[styles.cameraBadge, {backgroundColor: primaryColor}]}>
            <Camera color="#FFFFFF" size={14} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Name + subtitle */}
      <Text fontSize={20} fontWeight="700" color="text-primary" textAlign="center" mt={8}>
        {displayName || t('user')}
      </Text>
      {profileData?.bio ? (
        <Text fontSize={13} color="text-subtle" textAlign="center" mt={4} mx={32} numberOfLines={2}>
          {profileData.bio}
        </Text>
      ) : null}

      {/* Action buttons row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.editProfileBtn, {borderColor: primaryColor}]}
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.7}>
          <Pen color={primaryColor} size={14} />
          <Text fontSize={13} fontWeight="600" color="primary" ml={6}>
            {t('profile.editProfile')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}>
          <Settings color="#374151" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Share2 color="#374151" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {availableTabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, isActive && {borderBottomColor: primaryColor}]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}>
              <Text
                fontSize={14}
                fontWeight={isActive ? '600' : '400'}
                color={isActive ? 'primary' : 'text-subtle'}>
                {t(tabLabelKey(tab))}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* === Account Tab === */}
      {activeTab === 'account' && (
        <View style={styles.menuList}>
          <MenuItem icon={Wallet} label={t('profile.myWallet')} />
          <MenuItem icon={Clock} label={t('profile.transactionHistory')} />
        </View>
      )}

      {/* === Portfolio Tab === */}
      {activeTab === 'portfolio' && (
        <View style={styles.portfolioContainer}>
          {!showPortfolioForm ? (
            <View style={styles.portfolioEmpty}>
              <Text fontSize={14} color="text-subtle" textAlign="center" mb={16}>
                {t('profile.noPortfolio')}
              </Text>
              <TouchableOpacity
                style={[styles.addProjectBtn, {borderColor: primaryColor}]}
                onPress={() => setShowPortfolioForm(true)}
                activeOpacity={0.7}>
                <Plus color={primaryColor} size={16} />
                <Text fontSize={14} fontWeight="600" color="primary" ml={6}>
                  {t('profile.addPortfolio')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.portfolioForm}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={8}>
                {t('profile.projectName')}
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder={t('profile.projectNamePlaceholder')}
                placeholderTextColor="#9CA3AF"
                value={projectName}
                onChangeText={setProjectName}
              />
              <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
                <View style={[styles.uploadIcon, {borderColor: primaryColor}]}>
                  <Plus color={primaryColor} size={20} />
                </View>
                <Text fontSize={14} color="text-subtle">
                  {t('ta.chooseFile')}{' '}
                  <Text fontSize={14} color="primary" fontWeight="600">
                    {t('ta.upload')}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* === Documents Tab === */}
      {activeTab === 'documents' && (
        <View style={styles.docsContainer}>
          <DocumentVerificationList
            documents={requiredDocs}
            loading={docsLoading}
            onUpload={handleUploadDocument}
          />
        </View>
      )}
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  coverContainer: {
    height: COVER_HEIGHT,
    marginHorizontal: -24,
    marginTop: -20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  coverGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  changeCoverBtn: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
    marginBottom: 4,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1.5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginHorizontal: 20,
    marginTop: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  menuList: {
    gap: 8,
    marginTop: 16,
  },
  portfolioContainer: {marginTop: 16, marginHorizontal: 20},
  portfolioEmpty: {alignItems: 'center', paddingVertical: 32},
  addProjectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  portfolioForm: {gap: 4},
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  uploadArea: {
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 14,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  uploadIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docsContainer: {marginTop: 16, marginHorizontal: 20},
});

export default MyAccountScreen;
