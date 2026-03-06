import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background-0">
      <Text className="text-xl font-bold text-typography-950">
        AlphaMatch
      </Text>
      <Text className="mt-2 text-sm text-typography-500">
        Welcome to AlphaMatch Mobile
      </Text>
    </View>
  );
}
