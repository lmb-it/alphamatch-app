import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Animated, Image} from 'react-native';
import {
  Flex,
  Box,
  Text,
  Form,
  useKitsTheme,
  useLanguage,
  type IUseFormReturn,
  type IFormElement,
} from '@lmb-it/kitsconcerto';
import {Sparkles, ImagePlus, X, Video, Wind, PenTool, Wrench} from 'lucide-react-native';
import {launchImageLibrary, type ImageLibraryOptions} from 'react-native-image-picker';
import * as Yup from 'yup'

const AnimatedPlaceholder = ({focused, value, examples}: {focused: boolean, value: string, examples: string[]}) => {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused || value.length > 0) return;

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(opacity, {toValue: 0, duration: 500, useNativeDriver: true}),
        Animated.timing(opacity, {toValue: 1, duration: 500, useNativeDriver: true}),
      ]).start();

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % examples.length);
      }, 500);

    }, 4000);

    return () => clearInterval(interval);
  }, [focused, value, opacity, examples.length]);

  if (focused || value.length > 0) return null;

  return (
    <Animated.View style={[{position: 'absolute', top: 16, left: 16, right: 16}, {opacity}]} pointerEvents="none">
      <Text fontSize={15} color="#9CA3AF" lineHeight={22}>
        {examples[index]}
      </Text>
    </Animated.View>
  );
};

export const AIJobInput = ({onSubmit}: {onSubmit: (data: any) => void}) => {
  const {resolveToken} = useKitsTheme();
  const {t} = useLanguage();
  const primaryColor = resolveToken('primary');
  const formRef = useRef<IUseFormReturn<any>>(null);

  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const examples = [
    t('jobs.example1'),
    t('jobs.example2'),
    t('jobs.example3'),
    t('jobs.example4'),
  ];


  // Image Uploader custom template as requested
  const imageUploaderTemplate = useCallback(({browse, values, remove}: any) => {
    const handlePick = () => {
      if (values.length >= 5) return;

      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 5 - values.length, // allow multiple selection if library supports it, or limit available clicks
        includeBase64: true,
      };

      launchImageLibrary(options, (res) => {
        if (res.didCancel || res.errorCode || !res.assets) return;
        const newImages = res.assets.map(a => ({
          uri: a.uri,
          base64: a.base64 ? `data:${a.type || 'image/jpeg'};base64,${a.base64}` : null
        }));
        // 'browse' here is theoretically a setter/merger if KitsConcerto allows it,
        // For generic implementation expecting an array:
        browse([...values, ...newImages].slice(0, 5));
      });
    };

    return (
      <Flex flexDirection="row" alignItems="center" mt={-16} mb={16} flexWrap="wrap" gap={8} style={{zIndex: 10}}>
        {values.map((img: any, idx: number) => (
          <Box key={idx} style={styles.imageThumbnailWrap}>
            <Image source={{uri: img.uri}} style={styles.imageThumbnail} />
            <TouchableOpacity style={styles.removeImageBtn} onPress={() => {
              const newVals = [...values];
              newVals.splice(idx, 1);
              remove(newVals); // Ensure remove sets the new array
            }}>
              <X color="#FFFFFF" size={12} />
            </TouchableOpacity>
          </Box>
        ))}

        {values.length < 5 && (
          <TouchableOpacity onPress={handlePick} style={[styles.attachButton, {borderColor: primaryColor}]} activeOpacity={0.7}>
            <ImagePlus color={primaryColor} size={20} />
            <Text fontSize={13} color="primary" ml={6}>{t('jobs.attachPhotos')} ({values.length}/5)</Text>
          </TouchableOpacity>
        )}
      </Flex>
    );
  }, [primaryColor]);

  const textareaTemplate = useCallback(({setValue}: any) => {
    return (
      <Box style={styles.inputOuterWrap}>
        <Box style={[styles.inputContainer, isFocused ? {borderColor: primaryColor} : {}]}>
          <TextInput
            style={styles.textInput}
            multiline
            textAlignVertical="top"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => {
              setDescription(text);
              setValue(text);
            }}
            value={description}
          />
          <AnimatedPlaceholder focused={isFocused} value={description} examples={examples} />

          {/* Overlaid Let's Go Button (Positive) triggers the KitsConcerto Form ref */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => formRef.current?.onFormSubmit()}
            style={[
              styles.submitButton,
              {backgroundColor: description.trim().length > 10 ? primaryColor : '#E5E7EB'}
            ]}
            disabled={description.trim().length <= 10}
          >
            <Sparkles color="#FFFFFF" size={16} />
            <Text style={styles.btnText}>{t('jobs.letsGo')}</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  }, [description, isFocused, primaryColor]);

  const formElements: IFormElement[] = [
    {
      id: 'description',
      type: 'Container',
      children: textareaTemplate,
      colSpan: 12,
      schema:Yup.string()
    },
    {
       id: 'attachments',
       type: 'Image',
       initialUri: [],
       template: imageUploaderTemplate,
       colSpan: 12,
    }
  ];

  return (
    <Box mt={24}>
      <Flex flexDirection="column" alignItems="center" gap={24} style={styles.mainContainer}>

        {/* Title */}
        <Text style={styles.headingTitle}>
          {t('jobs.projectRequirements')}
        </Text>

        <Form
          ref={formRef}
          elements={formElements as any}
          onSubmit={(data) => onSubmit({
            description: data.description || description,
            attachments: data.attachments || attachments
          })}
          outputFormat="Json"
          submitButtonProps="none"
        />

      </Flex>
    </Box>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 332,
    alignSelf: 'center',
    marginTop: 24, // Visual clearance
  },
  headingTitle: {
    width: 332,
    minHeight: 64,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: '#263238',
  },
  inputOuterWrap: {
    width: 332,
    height: 132,
  },
  inputContainer: {
    width: 332,
    height: 132,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    backgroundColor: '#F9FAFC',
    position: 'relative',
  },
  textInput: {
    flex: 1,
    padding: 16,
    paddingRight: 16, // room for button? It's absolute so it layers on top
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#263238',
    lineHeight: 20,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 114,
    height: 34,
    left: 201, // CSS specs
    top: 82, // CSS specs
    borderRadius: 50,
    backgroundColor: '#00A8B1',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 10,
    zIndex: 1,
  },
  btnText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginLeft: 6,
  },
  pillsContainer: {
    width: 291,
  },
  pillOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  pillFilled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#F9FAFC',
  },
  pillText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#263238',
    marginLeft: 8,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: '#FAFAFA',
  },
  imageThumbnailWrap: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  imageThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  removeImageBtn: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
