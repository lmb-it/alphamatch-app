import React, {useState, useCallback} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Plus} from 'lucide-react-native';
import {selectCreatedAccount} from '@src/modules/TradingAccount';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

const PortfolioScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const createdAccount = useSelector(selectCreatedAccount);
  const primaryColor = resolveToken('primary');
  const [projectName, setProjectName] = useState('');

  const handleContinue = useCallback(() => {
    // Determine next screen based on career model
    const model = createdAccount?.careerModel;
    if (model === 'pro') {
      navigation.navigate('TAVerification');
    } else {
      navigation.navigate('TASubscription');
    }
  }, [createdAccount, navigation]);

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={20} pb={32} flexDirection="column" justifyContent="space-between">
        <View>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('ta.portfolioTitle')}{' '}
            <Heading as="h2" bold color="primary">{t('ta.portfolioTitleAccent')}</Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20} mt={8}>
            {t('ta.portfolioSubtitle')}
          </Text>

          {/* Project Name */}
          <View style={styles.field}>
            <Text fontSize={14} fontWeight="600" color="text-primary" mb={8}>
              {t('ta.projectName')}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t('ta.projectNamePlaceholder')}
              placeholderTextColor="#9CA3AF"
              value={projectName}
              onChangeText={setProjectName}
            />
          </View>

          {/* Upload Area */}
          <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
            <View style={[styles.uploadIcon, {borderColor: primaryColor}]}>
              <Plus color={primaryColor} size={20} />
            </View>
            <Text fontSize={14} color="text-subtle">
              {t('ta.chooseFile')}{' '}
              <Text fontSize={14} color="primary" fontWeight="600">{t('ta.upload')}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          label={t('ta.continue')}
          severity="brand"
          w="full"
          onClick={handleContinue}
        />
      </Flex>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  field: {
    marginTop: 28,
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
    marginTop: 20,
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
});

export default PortfolioScreen;
