/**
 * DocumentsScreen
 * Standalone verification screen accessible from the Profile.
 * Resolves careerRef from the active workspace's trading account,
 * then fetches required documents with tier information.
 */
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Text} from '@lmb-it/kitsconcerto';
import {ArrowLeft, RefreshCw, Shield} from 'lucide-react-native';
import {selectActiveWorkspaceId, selectIsTradeMode} from '@src/modules/Workspace';
import {fetchRequiredDocumentsWithTierApi} from '@src/modules/TradingAccount/api/tradingAccount.service';
import type {IDocumentRequirement} from '@src/modules/TradingAccount/models/tradingAccount.types';
import type {IRequiredDocumentsResponse} from '@src/modules/TradingAccount/models/tier.types';
import {DocumentVerificationList} from '@src/components/shared/DocumentVerificationList';
import {TierBadge} from '@src/modules/TradingAccount/components/TierBadge';
import {ExpiryWarningBanner} from '@src/modules/TradingAccount/components/ExpiryWarningBanner';
import type {ProfileStackNavigationProp} from '@src/routes/ProfileStackNavigator';

const DocumentsScreen: React.FC = () => {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const activeWorkspaceId = useSelector(selectActiveWorkspaceId);
  const isTradeMode = useSelector(selectIsTradeMode);

  const [tierResponse, setTierResponse] =
    useState<IRequiredDocumentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Use workspace module's active ID directly — it's the trading account identifier
  const accountIdentifier = useMemo(() => {
    if (!isTradeMode || !activeWorkspaceId || activeWorkspaceId === 'personal') {
      return null;
    }
    return activeWorkspaceId;
  }, [activeWorkspaceId, isTradeMode]);

  const fetchDocs = useCallback(async () => {
    if (!accountIdentifier) {
      setTierResponse(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const result = await fetchRequiredDocumentsWithTierApi(accountIdentifier);
      setTierResponse(result);
    } catch {
      setError(true);
      setTierResponse(null);
    } finally {
      setLoading(false);
    }
  }, [accountIdentifier]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  // Convert tier documents to IDocumentRequirement for DocumentVerificationList
  const docs: IDocumentRequirement[] = useMemo(() => {
    if (!tierResponse?.documents) return [];
    return tierResponse.documents.map(doc => ({
      id: 0,
      uuid: '',
      identifier: doc.ref,
      name: doc.name,
      description: null,
      category: null,
      reviewRequired: true,
      expiryRules: null,
      form: null,
      uploadStatus: doc.status !== 'not_submitted' ? doc.status : undefined,
    }));
  }, [tierResponse]);

  // Find documents that are expiring soon
  const expiringDocs = useMemo(() => {
    if (!tierResponse?.documents) return [];
    return tierResponse.documents.filter(d => d.status === 'expiring_soon');
  }, [tierResponse]);

  const handleUpload = (doc: IDocumentRequirement) => {
    navigation.navigate('TradingAccountCreation', {
      screen: 'TADocumentForm',
      params: {
        documentRef: doc.identifier,
        documentName: doc.name,
        accountRef: accountIdentifier ?? undefined,
      },
    } as any);
  };

  const handleTierStatus = () => {
    if (accountIdentifier) {
      navigation.navigate('TierStatus', {accountRef: accountIdentifier});
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text fontSize={16} fontWeight="700" color="text-primary">
          Documents
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleTierStatus} style={styles.headerBtn}>
            <Shield size={18} color="#00A8B1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchDocs} style={styles.headerBtn}>
            <RefreshCw size={18} color="#00A8B1" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {error ? (
          <View style={styles.center}>
            <Text fontSize={14} color="#EF4444" mb={12}>
              Failed to load documents
            </Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchDocs}>
              <Text fontSize={14} fontWeight="600" color="#FFFFFF">
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Tier badge at top */}
            {tierResponse?.currentTier && (
              <View style={styles.tierHeader}>
                <TierBadge
                  tier={tierResponse.currentTier}
                  size="large"
                  showLabel
                />
              </View>
            )}

            {/* Expiry warning banners */}
            {expiringDocs.map(doc => (
              <ExpiryWarningBanner
                key={doc.ref}
                documentName={doc.name}
                daysUntilExpiry={30}
                onRenew={() =>
                  handleUpload({
                    id: 0,
                    uuid: '',
                    identifier: doc.ref,
                    name: doc.name,
                    description: null,
                    category: null,
                    reviewRequired: true,
                    expiryRules: null,
                    form: null,
                  })
                }
              />
            ))}

            <DocumentVerificationList
              documents={docs}
              loading={loading}
              onUpload={handleUpload}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DocumentsScreen;

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
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerBtn: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tierHeader: {
    marginTop: 16,
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#00A8B1',
  },
});
