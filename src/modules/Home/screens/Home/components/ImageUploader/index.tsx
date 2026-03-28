/**
 * ImageUploader — extracted from HomeScreen.
 * Template for the image uploader form element.
 */
import React, {useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {ImagePlus, X} from 'lucide-react-native';
import {launchImageLibrary, type ImageLibraryOptions} from 'react-native-image-picker';

interface ImageUploaderProps {
  primaryColor: string;
}

export function createImageUploaderTemplate({primaryColor}: ImageUploaderProps) {
  return ({browse, values = [], remove}: any) => {
    const handlePick = () => {
      if (values.length >= 5) return;
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 5 - values.length,
        includeBase64: true,
      };

      launchImageLibrary(options, (res) => {
        if (res.didCancel || res.errorCode || !res.assets) return;
        const newImages = res.assets.map(a => ({
          uri: a.uri,
          base64: a.base64 ? `data:${a.type || 'image/jpeg'};base64,${a.base64}` : null
        }));
        browse([...values, ...newImages].slice(0, 5));
      });
    };

    return (
      <View style={styles.imageUploaderWrap}>
        {values.map((img: any, idx: number) => (
          <View key={idx} style={styles.imageThumbnailWrap}>
            <Image source={{uri: img.uri}} style={styles.imageThumbnail} />
            <TouchableOpacity style={styles.removeImageBtn} onPress={() => {
              const newVals = [...values];
              newVals.splice(idx, 1);
              remove(newVals);
            }}>
              <X color="#FFFFFF" size={12} />
            </TouchableOpacity>
          </View>
        ))}

        {values.length < 5 && (
          <TouchableOpacity onPress={handlePick} style={[styles.attachButton, {borderColor: primaryColor}]} activeOpacity={0.7}>
            <ImagePlus color={primaryColor} size={20} />
            <Text style={[styles.attachButtonText, {color: primaryColor}]}>Attach photos ({values.length}/5)</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  imageUploaderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: '#FAFAFA',
  },
  attachButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  imageThumbnailWrap: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  imageThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  removeImageBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
