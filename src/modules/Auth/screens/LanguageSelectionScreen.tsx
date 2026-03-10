import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  useLanguage,
  useKitsTheme,
} from '@lmb/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '@src/routes/AuthNavigator';
import AlphaLayout from '@src/layouts/AlphaLayout';

const LANGUAGES = [
  {code: 'en', labelKey: 'auth.lang.en'},
  {code: 'bn', labelKey: 'auth.lang.bn'},
  {code: 'hi', labelKey: 'auth.lang.hi'},
  {code: 'fr', labelKey: 'auth.lang.fr'},
  {code: 'es', labelKey: 'auth.lang.es'},
  {code: 'ar', labelKey: 'auth.lang.ar'},
  {code: 'de', labelKey: 'auth.lang.de'},
];

export default function LanguageSelectionScreen() {
  const {t, changeLanguage} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [selected, setSelected] = useState('en');

  const primaryColor = resolveToken('primary');
  const borderColor = resolveToken('border-default');

  const handleContinue = () => {
    changeLanguage(selected);
    navigation.replace('Login');
  };

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={40} pb={32} flexDirection="column" justifyContent="space-between">
        <Flex flexDirection="column" gap={20}>
          {/* Header */}
          <Flex flexDirection="column" gap={8}>
            <Heading as="h2" bold color="text-primary" style={{fontSize: 24, lineHeight: 32}}>
              {t('auth.selectLanguage').replace(t('auth.lang.en'), '')}{' '}
              <Heading as="h2" bold color="primary" style={{fontSize: 24, lineHeight: 32}}>
                {t('auth.selectLanguage').split(' ').pop()}
              </Heading>
            </Heading>
            <Text fontSize={14} color="text-subtle" lineHeight={20}>
              {t('auth.selectLanguageSubtitle')}
            </Text>
          </Flex>

          {/* Language list */}
          <Flex flexDirection="column" gap={12}>
            {LANGUAGES.map(lang => {
              const isActive = selected === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  activeOpacity={0.7}
                  onPress={() => setSelected(lang.code)}
                  style={[
                    styles.langRow,
                    {
                      borderColor: isActive ? primaryColor : borderColor,
                      borderWidth: isActive ? 1.5 : 1,
                    },
                  ]}>
                  <Text fontSize={16} color="text-primary" fontWeight={isActive ? '600' : '400'}>
                    {t(lang.labelKey)}
                  </Text>
                  <Flex
                    w={22}
                    h={22}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={11}
                    borderWidth={1.5}
                    borderColor={isActive ? primaryColor : resolveToken('gray.300')}>
                    {isActive && (
                      <Flex
                        w={12}
                        h={12}
                        borderRadius={6}
                        backgroundColor={primaryColor}
                      />
                    )}
                  </Flex>
                </TouchableOpacity>
              );
            })}
          </Flex>
        </Flex>

        {/* Continue button */}
        <Button
          label="auth.continue"
          w="full"
          severity="brand"
          onClick={handleContinue}
        />
      </Flex>
    </AlphaLayout>
  );
}

const styles = StyleSheet.create({
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
});
