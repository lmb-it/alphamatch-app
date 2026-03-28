import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {CheckCircle2, FileCheck, Clock, ShieldCheck} from 'lucide-react-native';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

/**
 * Alpha Pro post-form confirmation screen.
 *
 * Shown only for Alpha Pro careers. Informs the worker that their
 * trading account has been created and document verification is the
 * final step before activation.
 *
 * There is no subscription, no plan selection, and no payment at any
 * point in the Alpha Pro flow. Do not add any of those concepts here.
 */
const TAProConfirmationScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const primaryColor = resolveToken('primary');

  const steps = [
    {
      icon: <CheckCircle2 color="#10B981" size={20} />,
      bg: '#D1FAE5',
      label: t('trading.proConfirm.step1'),
    },
    {
      icon: <FileCheck color={primaryColor} size={20} />,
      bg: `${primaryColor}20`,
      label: t('trading.proConfirm.step2'),
    },
    {
      icon: <Clock color="#F59E0B" size={20} />,
      bg: '#FEF3C7',
      label: t('trading.proConfirm.step3'),
    },
    {
      icon: <ShieldCheck color="#6366F1" size={20} />,
      bg: '#E0E7FF',
      label: t('trading.proConfirm.step4'),
    },
  ];

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.proConfirm.title')}{' '}
            <Heading as="h2" bold color="primary">
              {t('trading.proConfirm.titleAccent')}
            </Heading>
          </Heading>

          <Text fontSize={15} color="text-subtle" lineHeight={22} mt={12}>
            {t('trading.proConfirm.subtitle')}
          </Text>

          {/* What happens next */}
          <View style={styles.stepsContainer}>
            <Text fontSize={14} fontWeight="700" color="text-primary" mb={16}>
              {t('trading.proConfirm.whatHappensNext')}
            </Text>
            {steps.map((step, i) => (
              <View key={i} style={styles.stepRow} accessible accessibilityLabel={`Step ${i + 1}: ${step.label}`}>
                <View style={[styles.stepIcon, {backgroundColor: step.bg}]}>
                  {step.icon}
                </View>
                <Text fontSize={14} color="text-primary" lineHeight={20} style={styles.stepLabel}>
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            label={t('trading.proConfirm.uploadDocuments')}
            severity="brand"
            w="full"
            onClick={() => navigation.navigate('TAVerification')}
          />
          <Button
            label={t('trading.proConfirm.doItLater')}
            severity="secondary"
            outlined
            w="full"
            onClick={() => navigation.navigate('TACompletion')}
          />
        </View>
      </Flex>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  stepsContainer: {
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepLabel: {
    flex: 1,
  },
  actions: {
    gap: 14,
  },
});

export default TAProConfirmationScreen;
