import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {tradingAccountActions, selectAnalyzing, selectAIResult, selectTAError} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import {Sparkles} from 'lucide-react-native';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;
const MAX_CHARS = 2000;
// TODO: Replace with actual form_types.reference_id from DB
const PROVIDER_PROFILE_FORM_TYPE_REF = 'FOR-Y1JAJIHT';

export default function AIInputScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const analyzing = useSelector(selectAnalyzing);
  const aiResult = useSelector(selectAIResult);
  const error = useSelector(selectTAError);
  const [description, setDescription] = useState('');
  const didSubmit = useRef(false);
  const primaryColor = resolveToken('primary');

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
      formTypeRef: PROVIDER_PROFILE_FORM_TYPE_REF,
    }));
  }, [description, dispatch]);

  const handleManual = useCallback(() => {
    // Navigate straight to manual form, bypassing AI processing
    navigation.navigate('TACareerSelection');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
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
            />
            <Text fontSize={12} color="text-subtle" textAlign="right" mt={8}>
              {description.length}/{MAX_CHARS}
            </Text>
            {error && didSubmit.current && (
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

            <TouchableOpacity onPress={handleManual} activeOpacity={0.6} style={styles.manualButton}>
              <Text fontSize={15} color="text-primary" fontWeight="600" textAlign="center">
                {t('trading.profile.manualMode')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
