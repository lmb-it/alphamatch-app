import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Flex,
  Text,
  Heading,
  Icon,
  useLanguage,
  useKitsTheme, IIconProps,
} from '@lmb-it/kitsconcerto';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, selectAuthLoading} from '@src/modules/Auth';
import {useAuthErrorToast} from '@src/hooks/useErrorToast';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {WelcomeIntent} from '../models/auth.types';

type IntentChoice = 'findWork' | 'postJob' | 'both' | null;

interface IntentOption {
  key: IntentChoice;
  icon: IIconProps['name'];
  labelKey: string;
  descKey: string;
}

const OPTIONS: IntentOption[] = [
  {key: 'findWork', icon: 'briefcase', labelKey: 'auth.findWork', descKey: 'auth.findWorkDesc'},
  {key: 'postJob', icon: 'forward', labelKey: 'auth.postJob', descKey: 'auth.postJobDesc'},
  {key: 'both', icon: 'th-large', labelKey: 'auth.both', descKey: 'auth.bothDesc'},
];

const WelcomeScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  useAuthErrorToast();

  const [selected, setSelected] = useState<IntentChoice>(null);

  const primaryColor = resolveToken('primary');
  const borderColor = resolveToken('border');

  const handleContinue = useCallback(() => {
    if (!selected) return;
    dispatch(authActions.setWelcomeIntent(selected as WelcomeIntent));
    dispatch(authActions.markWelcomeSeen());
  }, [selected, dispatch]);

  return (
    <AlphaLayout>
      <Flex flex={1} px={22} mt={79} pb={32} flexDirection="column" gap={32}>
        {/* Header */}
        <Flex flexDirection="column" gap={8}>
          <Heading
            as="h2"
            bold
            color="text-primary"
            style={{fontSize: 24, lineHeight: 32}}>
            {t('auth.intentTitle')}{' '}
            <Heading
              as="h2"
              bold
              color="primary"
              style={{fontSize: 24, lineHeight: 32}}>
              {t('auth.intentTitleAccent')}
            </Heading>
          </Heading>
          <Text fontSize={14} color="text-subtle" lineHeight={20}>
            {t('auth.intentSubtitle')}
          </Text>
        </Flex>

        {/* Option Cards */}
        <Flex flexDirection="column" gap={12}>
          {OPTIONS.map(option => {
            const isSelected = selected === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                activeOpacity={0.7}
                onPress={() => setSelected(option.key)}>
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  gap={16}
                  p={20}
                  borderRadius={16}
                  style={[
                    styles.card,
                    {
                      borderColor: isSelected ? primaryColor : borderColor,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}>
                  <Flex
                    w={48}
                    h={48}
                    borderRadius={24}
                    borderWidth={1}
                    borderColor={'brand.500'}
                    borderStyle={'solid'}
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={
                      isSelected ? 'brand.500' : 'trasnparent'
                    }>
                    <Icon
                      name={option.icon}
                      size={'xl'}
                      color={isSelected ? 'white' : 'brand.500'}
                    />
                  </Flex>
                  <Flex flex={1} flexDirection="column" gap={4}>
                    <Text fontSize={16} fontWeight="600" color="text-primary">
                      {t(option.labelKey)}
                    </Text>
                    <Text fontSize={13} color="text-subtle" lineHeight={18}>
                      {t(option.descKey)}
                    </Text>
                  </Flex>
                </Flex>
              </TouchableOpacity>
            );
          })}
        </Flex>

        {/* Continue button */}
        <Flex flex={1} justifyContent="flex-end">
          <Button
            label="auth.continue"
            w="full"
            severity="brand"
            loading={loading}
            disabled={!selected}
            onClick={handleContinue}
          />
        </Flex>
      </Flex>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
  },
});

export default WelcomeScreen;
