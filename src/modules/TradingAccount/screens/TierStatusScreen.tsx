/**
 * TierStatusScreen
 *
 * Displays the current verification tier status for a trading account,
 * including achieved date, calculation method, points progress, and next tier info.
 */
import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Heading, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Award, ChevronRight} from 'lucide-react-native';
import {
  tradingAccountActions,
  selectTierStatus,
  selectTierStatusLoading,
} from '@src/modules/TradingAccount';
import {TierBadge} from '../components/TierBadge';
import {TierProgressBar} from '../components/TierProgressBar';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {ProfileStackParamList} from '@src/routes/ProfileStackNavigator';

type ScreenNav = NativeStackNavigationProp<ProfileStackParamList, 'TierStatus'>;
type ScreenRoute = RouteProp<ProfileStackParamList, 'TierStatus'>;

export default function TierStatusScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');
  const navigation = useNavigation<ScreenNav>();
  const route = useRoute<ScreenRoute>();
  const dispatch = useDispatch();

  const tierStatus = useSelector(selectTierStatus);
  const loading = useSelector(selectTierStatusLoading);

  const {accountRef} = route.params;

  useEffect(() => {
    dispatch(tradingAccountActions.fetchTierStatus(accountRef));
  }, [accountRef, dispatch]);

  const formatDate = (iso: string | null) => {
    if (!iso) return '\u2014';
    try {
      return new Date(iso).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const formatMethod = (method: string | null) => {
    if (!method) return '\u2014';
    const labels: Record<string, string> = {
      document_points: 'Document Verification',
      electronic_verification: 'Electronic Verification',
      hybrid: 'Hybrid (Documents + Electronic)',
      manual_approval: 'Manual Approval',
    };
    return labels[method] ?? method;
  };

  return (
    <AlphaLayout
      title={t('trading.tier.tierStatus')}
      showDecorations={false}
      headerStyle="solid"
      scrollEnabled={false}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {/* Current Tier Card */}
          <View style={styles.card}>
            <Text fontSize={13} fontWeight="600" color="text-subtle" mb={12}>
              {t('trading.tier.currentTier')}
            </Text>
            <TierBadge
              tier={tierStatus?.currentTier ?? null}
              size="large"
              showLabel
            />

            {tierStatus?.achievedAt && (
              <View style={styles.infoRow}>
                <Text fontSize={13} color="text-subtle">
                  {t('trading.tier.achievedOn')}
                </Text>
                <Text fontSize={13} fontWeight="600" color="text-primary">
                  {formatDate(tierStatus.achievedAt)}
                </Text>
              </View>
            )}

            {tierStatus?.calculationMethod && (
              <View style={styles.infoRow}>
                <Text fontSize={13} color="text-subtle">
                  {t('trading.tier.method')}
                </Text>
                <Text fontSize={13} fontWeight="600" color="text-primary">
                  {formatMethod(tierStatus.calculationMethod)}
                </Text>
              </View>
            )}
          </View>

          {/* Points Progress (if enabled) */}
          {tierStatus?.points?.enabled && (
            <View style={styles.card}>
              <Text fontSize={13} fontWeight="600" color="text-subtle" mb={8}>
                Verification Points
              </Text>
              <TierProgressBar
                currentTierName={
                  tierStatus.currentTier?.badgeLabel ??
                  t('trading.tier.unverified')
                }
                badgeColor={tierStatus.currentTier?.badgeColor ?? '#9CA3AF'}
                progress={
                  tierStatus.points.required
                    ? (tierStatus.points.current / tierStatus.points.required) *
                      100
                    : 0
                }
                progressLabel={t('trading.tier.pointsProgress')
                  .replace('{current}', String(tierStatus.points.current))
                  .replace(
                    '{required}',
                    String(tierStatus.points.required ?? '\u2014'),
                  )}
                showLabel={false}
              />
            </View>
          )}

          {/* Next Tier */}
          {tierStatus?.nextTier ? (
            <View style={styles.card}>
              <View style={styles.nextTierHeader}>
                <Award color={primaryColor} size={20} />
                <Text
                  fontSize={14}
                  fontWeight="700"
                  color="text-primary"
                  ml={8}>
                  {t('trading.tier.nextTier')}: {tierStatus.nextTier.name}
                </Text>
              </View>
              <Text fontSize={13} color="text-subtle" mt={8}>
                Complete the remaining requirements to unlock the next tier and
                gain additional benefits.
              </Text>
              <TouchableOpacity
                style={[styles.viewBtn, {borderColor: primaryColor}]}
                onPress={() => navigation.navigate('Documents')}
                accessible
                accessibilityRole="button"
                accessibilityLabel="View document requirements">
                <Text fontSize={13} fontWeight="600" style={{color: primaryColor}}>
                  View Requirements
                </Text>
                <ChevronRight color={primaryColor} size={16} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.card}>
              <Text
                fontSize={14}
                fontWeight="600"
                color="text-primary"
                textAlign="center">
                {t('trading.tier.noNextTier')}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </AlphaLayout>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F3F4F6',
  },
  nextTierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderRadius: 10,
  },
});
