import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage} from '@lmb-it/kitsconcerto';
import {
  tradingAccountActions,
  selectRequiredDocuments,
  selectSelectedCareerRef,
  selectTALoading,
} from '@src/modules/TradingAccount';
import type {IDocumentRequirement} from '@src/modules/TradingAccount';
import {DocumentVerificationList} from '@src/components/shared/DocumentVerificationList';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

export default function VerificationScreen() {
  const {t} = useLanguage();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();

  const requiredDocuments = useSelector(selectRequiredDocuments);
  const selectedCareerRef = useSelector(selectSelectedCareerRef);
  const loading = useSelector(selectTALoading);

  // Fetch required documents on mount using new compliance-documents endpoint
  useEffect(() => {
    if (selectedCareerRef) {
      dispatch(tradingAccountActions.fetchDocuments({
        type: 'provider',
        careerRef: selectedCareerRef,
        countryId: 14,
      }));
    }
  }, [selectedCareerRef, dispatch]);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        <ScrollView contentContainerStyle={styles.container}>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.verify.title')}
          </Heading>
          <Text fontSize={15} color="text-subtle" lineHeight={22} mt={12}>
            {t('trading.verify.desc')}
          </Text>

          <DocumentVerificationList
            documents={requiredDocuments}
            loading={loading}
            onUpload={handleUploadDocument}
          />

          <Button
            label={t('trading.verify.done')}
            severity="brand"
            w="full"
            loading={loading}
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
  },
  doneBtn: {
    marginTop: 40,
  },
  skipButton: {
    paddingVertical: 14,
  },
});
