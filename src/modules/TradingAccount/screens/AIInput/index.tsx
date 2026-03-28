import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {tradingAccountActions, selectAnalyzing, selectAIResult, selectTAError, selectStepData} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import {Sparkles} from 'lucide-react-native';
import {FORM_TYPE_REFS} from '@src/config/api.config';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;
const MAX_CHARS = 2000;

export default function AIInputScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const analyzing = useSelector(selectAnalyzing);
  const aiResult = useSelector(selectAIResult);
  const error = useSelector(selectTAError);
  const stepData = useSelector(selectStepData);
  const [description, setDescription] = useState(stepData.aiDescription ?? '');
  const didSubmit = useRef(false);
  const primaryColor = resolveToken('primary');

  // Save description to Redux when leaving this screen (back button preservation)
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(tradingAccountActions.saveStepData({aiDescription: description}));
    });
    return unsubscribe;
  }, [navigation, dispatch, description]);

  // Navigate to career confirmation when AI result arrives
  useEffect(() => {
    if (aiResult && didSubmit.current) {
      didSubmit.current = false;
      navigation.navigate('TACareerConfirmation');
    }
  }, [aiResult, navigation]);

  const handleAnalyze = useCallback(() => {
    if (!description.trim()) return;
    didSubmit.current = true;
    dispatch(tradingAccountActions.aiAnalyze({
      description: description.trim(),
      formTypeRef: FORM_TYPE_REFS.provider,
      // country_id defaults to COUNTRY_AU (14) on the backend
    }));
  }, [description, dispatch]);

  const handleManual = useCallback(() => {
    // Navigate straight to manual form, bypassing AI processing
    navigation.navigate('TACareerSelection');
  }, [navigation]);

  return (
    <AlphaLayout showDecorations={false} scrollEnabled={false}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        <ScrollView contentContainerStyle={styles.container}>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.profile.title')}
          </Heading>

          <View style={styles.aiBadgeContainer}>
            <View style={[styles.aiBadge, {backgroundColor: `${primaryColor}15`}]}>
              <Sparkles color={primaryColor} size={16} />
              <Text fontSize={13} fontWeight="600" color="primary" ml={6}>
                {t('trading.profile.aiBadge')}
              </Text>
            </View>
          </View>

          <Text fontSize={15} color="text-subtle" lineHeight={22} mt={16}>
            {t('trading.profile.aiDescription')}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, {borderColor: resolveToken('gray.300')}]}
              placeholder={t('trading.profile.aiPlaceholder')}
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={text => setDescription(text.slice(0, MAX_CHARS))}
              multiline
              textAlignVertical="top"
              maxLength={MAX_CHARS}
              accessible
              accessibilityLabel="Describe your profession or services"
              accessibilityHint="Enter at least 10 characters to enable AI analysis"
            />
            <Text fontSize={12} color="text-subtle" textAlign="right" mt={8}>
              {description.length}/{MAX_CHARS}
            </Text>
            {error && (
              <Text fontSize={13} color="#EF4444" mt={8}>
                {error}
              </Text>
            )}
          </View>

          <View style={styles.bottomActions}>
            <Button
              label={t('trading.profile.aiButton')}
              severity="brand"
              w="full"
              loading={analyzing}
              onClick={handleAnalyze}
              disabled={description.length < 10}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text fontSize={13} color="text-subtle" px={12}>{t('or')}</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              onPress={handleManual}
              activeOpacity={0.6}
              style={styles.manualButton}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Select career manually"
              accessibilityHint="Skip AI analysis and browse careers yourself"
            >
              <Text fontSize={15} color="text-primary" fontWeight="600" textAlign="center">
                {t('trading.profile.manualMode')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Flex>
    </AlphaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
  },
  aiBadgeContainer: {
    alignItems: 'flex-start',
    marginTop: 12,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  inputContainer: {
    marginTop: 24,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    minHeight: 220,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    lineHeight: 24,
  },
  bottomActions: {
    marginTop: 40,
    gap: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  manualButton: {
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
});
