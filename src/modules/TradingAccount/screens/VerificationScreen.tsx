import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage} from '@lmb-it/kitsconcerto';
import {
  tradingAccountActions,
  selectRequiredDocuments,
  selectSelectedCareerRef,
  selectTALoading,
  selectCreatedAccount,
  selectRequiredDocsWithTier,
  selectRequiredDocsWithTierLoading,
} from '@src/modules/TradingAccount';
import type {IDocumentRequirement} from '@src/modules/TradingAccount';
import {DocumentVerificationList} from '@src/components/shared/DocumentVerificationList';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import {TierBadge} from '../components/TierBadge';
import {TierProgressBar} from '../components/TierProgressBar';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

export default function VerificationScreen() {
  const {t} = useLanguage();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();

  const requiredDocuments = useSelector(selectRequiredDocuments);
  const selectedCareerRef = useSelector(selectSelectedCareerRef);
  const loading = useSelector(selectTALoading);
  const createdAccount = useSelector(selectCreatedAccount);
  const tierData = useSelector(selectRequiredDocsWithTier);
  const tierLoading = useSelector(selectRequiredDocsWithTierLoading);

  // If the account is created, use the tier-aware endpoint; otherwise fall back
  useEffect(() => {
    if (createdAccount?.identifier) {
      dispatch(
        tradingAccountActions.fetchRequiredDocsWithTier(
          createdAccount.identifier,
        ),
      );
    } else if (selectedCareerRef) {
      dispatch(
        tradingAccountActions.fetchDocuments({
          type: 'provider',
          careerRef: selectedCareerRef,
          countryId: 14,
        }),
      );
    }
  }, [createdAccount?.identifier, selectedCareerRef, dispatch]);

  // Calculate progress from tier data
  const progress = useMemo(() => {
    if (!tierData?.documents?.length) return {percent: 0, approved: 0, total: 0};
    const total = tierData.documents.length;
    const approved = tierData.documents.filter(
      d => d.status === 'approved',
    ).length;
    return {percent: total > 0 ? (approved / total) * 100 : 0, approved, total};
  }, [tierData]);

  // Build document list compatible with DocumentVerificationList
  const displayDocuments: IDocumentRequirement[] = useMemo(() => {
    if (tierData?.documents) {
      return tierData.documents.map(doc => ({
        id: 0,
        uuid: '',
        identifier: doc.ref,
        name: doc.name,
        description: null,
        category: null,
        reviewRequired: true,
        expiryRules: null,
        form: null,
        uploadStatus:
          doc.status === 'approved'
            ? 'approved'
            : doc.status === 'pending'
              ? 'uploaded'
              : undefined,
      }));
    }
    return requiredDocuments;
  }, [tierData, requiredDocuments]);

  const handleUploadDocument = (doc: IDocumentRequirement) => {
    navigation.navigate('TADocumentForm', {
      documentRef: doc.identifier,
      documentName: doc.name,
    });
  };

  const handleContinue = () => {
    navigation.navigate('TACompletion');
  };

  const handleSkip = () => {
    navigation.navigate('TACompletion');
  };

  const isLoading = loading || tierLoading;
  const hasTierData = !!tierData;

  return (
    <AlphaLayout showDecorations={false} scrollEnabled={false}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        <ScrollView contentContainerStyle={styles.container}>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.verify.title')}
          </Heading>
          <Text fontSize={15} color="text-subtle" lineHeight={22} mt={12}>
            {t('trading.verify.desc')}
          </Text>

          {/* Tier info header — shown when tier data is available */}
          {hasTierData && (
            <View style={styles.tierSection}>
              <TierBadge
                tier={tierData.currentTier}
                size="large"
                showLabel
              />

              <TierProgressBar
                currentTierName={
                  tierData.currentTier?.badgeLabel ??
                  t('trading.tier.unverified')
                }
                badgeColor={tierData.currentTier?.badgeColor ?? '#9CA3AF'}
                progress={progress.percent}
                progressLabel={t('trading.tier.docsProgress')
                  .replace('{approved}', String(progress.approved))
                  .replace('{total}', String(progress.total))}
              />

              {tierData.requiredTier && (
                <Text fontSize={13} color="text-subtle" mt={4}>
                  {t('trading.tier.requiredTier')}:{' '}
                  <Text fontSize={13} fontWeight="700" color="text-primary">
                    {tierData.requiredTier.name}
                  </Text>
                </Text>
              )}

              {/* Points progress (if enabled) */}
              {tierData.pointsSystem.enabled && (
                <View style={styles.pointsRow}>
                  <Text fontSize={13} color="text-subtle">
                    {t('trading.tier.pointsProgress')
                      .replace(
                        '{current}',
                        String(tierData.pointsSystem.currentPoints),
                      )
                      .replace(
                        '{required}',
                        String(tierData.pointsSystem.requiredPoints ?? '—'),
                      )}
                  </Text>
                </View>
              )}
            </View>
          )}

          <DocumentVerificationList
            documents={displayDocuments}
            loading={isLoading}
            onUpload={handleUploadDocument}
          />

          <Button
            label={t('trading.verify.done')}
            severity="brand"
            w="full"
            loading={isLoading}
            onClick={handleContinue}
            style={styles.doneBtn}
          />
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Skip document verification"
            accessibilityHint="Complete setup without uploading documents now">
            <Text
              fontSize={15}
              color="text-subtle"
              fontWeight="600"
              textAlign="center">
              {t('trading.verify.skip')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Flex>
    </AlphaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
  },
  tierSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pointsRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  doneBtn: {
    marginTop: 40,
  },
  skipButton: {
    paddingVertical: 14,
  },
});
