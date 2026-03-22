/**
 * ReviewsScreen
 * Portfolio tab — ratings and reviews received for this trading account.
 *
 * Read-only — ratings received for this trading account.
 * No "Add" button — reviews are submitted by other users after jobs.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Flex, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Star} from 'lucide-react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';

const ReviewsScreen: React.FC = () => {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();

  return (
    <AlphaLayout title="Reviews" headerStyle="solid">
      <Flex
        flex={1}
        justifyContent="center"
        alignItems="center"
        px={20}
        py={40}>
        <Star color={resolveToken('text-subtle')} size={48} />
        <Text
          fontSize={16}
          fontWeight="600"
          color="text-primary"
          mt={16}>
          No reviews yet
        </Text>
        <Text
          fontSize={14}
          color="text-subtle"
          textAlign="center"
          mt={8}>
          Reviews will appear here once clients rate your completed work.
        </Text>
      </Flex>
    </AlphaLayout>
  );
};

export default ReviewsScreen;
