import React from 'react';
import {Box, Text, Heading, VStack, Card, Center, useLanguage} from '@lmb-it/kitsconcerto';

export default function HomeScreen() {
  const {t} = useLanguage();

  return (
    <Box flex={1} bgColor="#f5f5f5" p={16}>
      <Center flex={1}>
        <Card w={250} p={24} borderRadius={12} bgColor="#ffffff">
          <VStack gap={16} alignItems="center">
            <Heading fontSize={24} fontWeight="bold" color="#20AAB0">
              {t('app.name')}
            </Heading>
            <Text fontSize={14} color="#666666">
              {t('app.tagline')}
            </Text>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
