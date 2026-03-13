/**
 * DocumentsScreen
 * Standalone verification screen accessible from the Profile.
 * Resolves careerRef from the active workspace's trading account,
 * then fetches required compliance documents from the new endpoint.
 */
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Text} from '@lmb-it/kitsconcerto';
import {ArrowLeft, RefreshCw} from 'lucide-react-native';
import {selectActiveWorkspace, selectTradingAccounts} from '@src/modules/Profile';
import {fetchRequiredDocumentsApi} from '@src/modules/TradingAccount/api/tradingAccount.service';
import type {IDocumentRequirement} from '@src/modules/TradingAccount/models/tradingAccount.types';
import {DocumentVerificationList} from '@src/components/shared/DocumentVerificationList';
import type {ProfileStackNavigationProp} from '@src/routes/ProfileStackNavigator';

const DocumentsScreen: React.FC = () => {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const tradingAccounts = useSelector(selectTradingAccounts);

  const [docs, setDocs] = useState<IDocumentRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Resolve careerRef from the active trading account
  const careerRef = useMemo(() => {
    if (!activeWorkspace) return null;
    const account = tradingAccounts.find(a => a.identifier === activeWorkspace);
    return account?.careerRef ?? null;
  }, [activeWorkspace, tradingAccounts]);

  const fetchDocs = useCallback(async () => {
    if (!careerRef) {
      setDocs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const result = await fetchRequiredDocumentsApi('provider', careerRef, 14);
      setDocs(result);
    } catch {
      setError(true);
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }, [careerRef]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const handleUpload = (doc: IDocumentRequirement) => {
    // Navigate to trading account creation flow's document form screen
    navigation.navigate('TradingAccountCreation', {
      screen: 'TADocumentForm',
      params: {documentRef: doc.identifier, documentName: doc.name},
    } as any);
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
        <TouchableOpacity onPress={fetchDocs}>
          <RefreshCw size={20} color="#00A8B1" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
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
          <DocumentVerificationList
            documents={docs}
            loading={loading}
            onUpload={handleUpload}
          />
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
