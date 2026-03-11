import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {Text, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Wallet, Clock, FileCheck, Upload, Plus} from 'lucide-react-native';
import DocumentPicker from 'react-native-document-picker';
import {selectProfileData, selectActiveWorkspace} from '@src/modules/Profile';
import {fetchRequiredDocumentsApi} from '@src/modules/TradingAccount/api/tradingAccount.service';
import type {IDocumentRequirement} from '@src/modules/TradingAccount';
import MenuItem from '../components/MenuItem';
import AlphaLayout from '@src/layouts/AlphaLayout';

const COVER_HEIGHT = 160;
const AVATAR_SIZE = 90;

type TabKey = 'account' | 'portfolio' | 'documents';

const MyAccountScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const profileData = useSelector(selectProfileData);
  const activeWorkspace = useSelector(selectActiveWorkspace);

  const [activeTab, setActiveTab] = useState<TabKey>('account');
  const [requiredDocs, setRequiredDocs] = useState<IDocumentRequirement[]>([]);
  const [pickedFiles, setPickedFiles] = useState<Record<string, string>>({});
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (activeWorkspace) {
      fetchRequiredDocumentsApi(activeWorkspace)
        .then(setRequiredDocs)
        .catch(() => setRequiredDocs([]));
    } else {
      setRequiredDocs([]);
    }
  }, [activeWorkspace]);

  const handlePickDocument = useCallback(async (docIdentifier: string) => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setPickedFiles(prev => ({...prev, [docIdentifier]: result.name || 'file'}));
      // TODO: Upload to backend when endpoint is available
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Document picker error:', err);
      }
    }
  }, []);

  const displayName = profileData
    ? `${profileData.displayName || ''} ${profileData.familyName || ''}`.trim()
    : '';

  // Build available tabs — only show Documents when there are requirements
  const availableTabs = useMemo(() => {
    const tabs: TabKey[] = ['account', 'portfolio'];
    if (requiredDocs.length > 0) {
      tabs.push('documents');
    }
    return tabs;
  }, [requiredDocs.length]);

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
      {/* Cover */}
      <View style={[styles.cover, {backgroundColor: primaryColor}]}>
        <View style={styles.coverOverlay} />
      </View>

      {/* Profile Avatar */}
      <View style={styles.avatarWrapper}>
        {profileData?.avatar ? (
          <Image source={{uri: profileData.avatar}} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text fontSize={28} fontWeight="700" color="text-subtle">
              {displayName.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
        )}
      </View>

      {/* Name */}
      <Text
        fontSize={20}
        fontWeight="700"
        color="text-primary"
        textAlign="center"
        mt={8}
        mb={4}>
        {displayName || t('user')}
      </Text>

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
          {/* TODO: render existing portfolio items from API here */}

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
              {/* Project Name */}
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

              {/* Upload Area */}
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
      {activeTab === 'documents' && requiredDocs.length > 0 && (
        <View style={styles.docsContainer}>
          <Text fontSize={16} fontWeight="700" color="text-primary" style={styles.sectionHeader}>
            {t('profile.requiredDocuments')}
          </Text>

          <View style={styles.docsList}>
            {requiredDocs.map(doc => {
              const picked = pickedFiles[doc.identifier];
              return (
                <View key={doc.identifier} style={styles.docCard}>
                  <View style={[styles.docIcon, {backgroundColor: `${primaryColor}15`}]}>
                    <FileCheck color={primaryColor} size={20} />
                  </View>
                  <View style={styles.docInfo}>
                    <Text fontSize={14} fontWeight="600" color="text-primary">
                      {doc.documentName}
                    </Text>
                    <Text fontSize={12} color={doc.isMandatory ? '#EF4444' : 'text-subtle'}>
                      {doc.isMandatory ? t('required') : t('optional')}
                    </Text>
                    {picked && (
                      <Text fontSize={11} color="primary" mt={2}>
                        {picked}
                      </Text>
                    )}
                  </View>
                  {doc.uploadStatus === 'uploaded' ? (
                    <View style={[styles.docStatusBadge, styles.docUploaded]}>
                      <Text fontSize={11} fontWeight="600" color="#059669">
                        {t('uploaded')}
                      </Text>
                    </View>
                  ) : picked ? (
                    <View style={[styles.docStatusBadge, {backgroundColor: '#DBEAFE'}]}>
                      <Text fontSize={11} fontWeight="600" color="#2563EB">
                        {t('profile.readyToUpload')}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[styles.uploadBtn, {borderColor: primaryColor}]}
                      onPress={() => handlePickDocument(doc.identifier)}
                      activeOpacity={0.7}>
                      <Upload color={primaryColor} size={14} />
                      <Text fontSize={12} fontWeight="600" color="primary" ml={4}>
                        {t('profile.uploadDocument')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: COVER_HEIGHT,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginHorizontal: -24,
    marginTop: -20,
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  // Portfolio
  portfolioContainer: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  portfolioEmpty: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  addProjectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  portfolioForm: {
    gap: 4,
  },
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
  // Documents
  docsContainer: {
    marginTop: 16,
  },
  sectionHeader: {
    marginLeft: 24,
    marginBottom: 12,
  },
  docsList: {
    gap: 10,
    marginHorizontal: 20,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
  },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  docInfo: {
    flex: 1,
    gap: 2,
  },
  docStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  docUploaded: {
    backgroundColor: '#D1FAE5',
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default MyAccountScreen;
