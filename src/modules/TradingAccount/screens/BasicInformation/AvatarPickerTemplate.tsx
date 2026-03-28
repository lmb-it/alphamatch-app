/**
 * AvatarPickerTemplate — extracted JSX template for the profile image form element.
 * Used as the `template` prop for the Image form element in BasicInformation.
 */
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Flex, Text} from '@lmb-it/kitsconcerto';
import {Camera} from 'lucide-react-native';

interface AvatarPickerTemplateProps {
  primaryColor: string;
}

export function createAvatarPickerTemplate({primaryColor}: AvatarPickerTemplateProps) {
  return ({values, browse}: any) => (
    <Flex justifyContent="center" w="full" style={styles.avatarSection}>
      <TouchableOpacity
        style={styles.avatarContainer}
        activeOpacity={0.7}
        onPress={() => browse()}>
        {values?.length > 0 ? (
          <Image
            source={{uri: values[0].uri || values[0]}}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Camera color="#9CA3AF" size={32} />
          </View>
        )}
        <View style={[styles.cameraIcon, {backgroundColor: primaryColor}]}>
          <Text fontSize={18} color="white" style={{lineHeight: 22}}>
            +
          </Text>
        </View>
      </TouchableOpacity>
    </Flex>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
