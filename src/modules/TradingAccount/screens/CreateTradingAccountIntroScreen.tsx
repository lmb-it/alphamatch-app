import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Flex, Text, Heading, Button, useKitsTheme, useLanguage} from '@lmb-it/kitsconcerto';
import {useNavigation} from '@react-navigation/native';
import {CheckCircle2, ArrowLeft, ShieldCheck} from 'lucide-react-native';

export default function CreateTradingAccountIntroScreen() {
  const {t} = useLanguage();
  const navigation = useNavigation<any>();
  const {resolveToken} = useKitsTheme();
  const primaryColor = resolveToken('primary');

  const benefits = [
    t('trading.intro.benefit1'),
    t('trading.intro.benefit2'),
    t('trading.intro.benefit3'),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        {/* Header Spacer / Back Button */}
        <Flex px={20} py={16}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <ArrowLeft color="#263238" size={24} />
          </TouchableOpacity>
        </Flex>

        <View style={styles.container}>
          <Flex flexDirection="column" gap={32} mt={32}>
            {/* Title Block */}
            <Flex flexDirection="column" gap={12}>
              <Heading
                as="h1"
                bold
                color="text-primary"
                style={styles.mainTitle}>
                {t('trading.intro.title')}
              </Heading>
              <Text fontSize={16} color="text-subtle" lineHeight={24}>
                {t('trading.intro.subtitle')}
              </Text>
            </Flex>

            {/* Benefits List */}
            <Flex flexDirection="column" gap={20} my={16}>
              {benefits.map((benefit, index) => (
                <Flex key={index} flexDirection="row" alignItems="center" gap={16}>
                  <Flex
                    w={40}
                    h={40}
                    borderRadius={20}
                    backgroundColor={`${primaryColor}15`}
                    justifyContent="center"
                    alignItems="center">
                    <CheckCircle2 color={primaryColor} size={24} />
                  </Flex>
                  <Text fontSize={16} color="text-primary" fontWeight="500" style={{flex: 1}}>
                    {benefit}
                  </Text>
                </Flex>
              ))}
            </Flex>

            {/* Privacy Note */}
            <Flex
              flexDirection="row"
              backgroundColor={`${resolveToken('info.main')}10`}
              p={16}
              borderRadius={12}
              alignItems="flex-start"
              gap={12}>
              <ShieldCheck color={resolveToken('info.main')} size={24} />
              <Text fontSize={14} color="text-primary" lineHeight={20} style={{flex: 1}}>
                {t('trading.intro.privacyNote')}
              </Text>
            </Flex>
          </Flex>

          {/* Bottom Action */}
          <Flex pb={32}>
            <Button
              label={t('trading.intro.getStarted')}
              w="full"
              severity="brand"
              onClick={() => navigation.navigate('BasicInformation')}
            />
          </Flex>
        </View>
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
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  mainTitle: {
    fontSize: 28,
    lineHeight: 36,
  },
});
