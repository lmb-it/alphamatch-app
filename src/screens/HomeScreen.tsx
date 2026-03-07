import React from 'react';
import {Box, Text, Heading, VStack, HStack, Button, Card, Center, Badge, useDialog} from '@lmb/kitsconcerto';

export default function HomeScreen() {
  const {alert, confirm} = useDialog()
  return (
    <Box flex={1} bgColor="#f5f5f5" p={16}>
      <Center flex={1}>
        <Card w={250} p={24} borderRadius={12} bgColor="#ffffff">
          <VStack gap={16} alignItems="center">
            <Heading fontSize={24} fontWeight="bold" color="#20AAB0">
              AlphaMatch
            </Heading>
            <Text fontSize={14} color="#666666">
              Welcome to AlphaMatch Mobile
            </Text>


            <Button icon={'pi pi-times'} severity={'danger'} onPress={() =>
            {
              alert('Your session has expired. Please log in again.', {
                header: 'Session Expired',
                type: 'success',
              })
            }}>
              Test Button
            </Button>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
