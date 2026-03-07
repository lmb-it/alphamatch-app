import React from 'react';
import {Box, Text, Heading, VStack, HStack, Button, Card, Center, Badge} from '@lmb/kitsconcerto';

export default function HomeScreen() {
  return (
    <Box flex={1} bgColor="#f5f5f5" p={16}>
      <Center flex={1}>
        <Card p={24} borderRadius={12} bgColor="#ffffff">
          <VStack gap={16} alignItems="center">
            <Heading fontSize={24} fontWeight="bold" color="#20AAB0">
              AlphaMatch
            </Heading>
            <Text fontSize={14} color="#666666">
              Welcome to AlphaMatch Mobile
            </Text>

            <HStack gap={8}>
              <Badge>v0.1.0</Badge>
              <Badge>Mobile</Badge>
            </HStack>

            <Button onPress={() => alert('KitsConcerto works!')}>
              Test Button
            </Button>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
