import React, {useCallback} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Flex, Box, Center } from '@lmb-it/kitsconcerto';
import { AIJobInput } from './components/AIJobInputComponent';

export default function CustomerHomeScreen() {
  const navigation = useNavigation<any>();

  const handleJobSubmit = useCallback((data: any) => {
    // Navigate strictly to the root stack navigator handling the Client Journey flow
    navigation.navigate('CustomerJobPosting', {
      screen: 'JobPostingBasicInfo',
      params: {
        description: data.description || '',
        attachments: data.attachments || [],
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg" justifyContent="center">
        <Center flex={1} px={20}>
          <Box w="full" style={{ transform: [{ translateY: -40 }] }}>
             <AIJobInput onSubmit={handleJobSubmit} />
          </Box>
        </Center>
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
});
