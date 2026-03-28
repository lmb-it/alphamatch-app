/**
 * TextareaTemplate — extracted from HomeScreen.
 * Template for the description textarea form element.
 */
import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';
import {Sparkles} from 'lucide-react-native';
import AnimatedPlaceholder from '../AnimatedPlaceholder';

interface TextareaTemplateProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  primaryColor: string;
  examples: string[];
  onSubmit: () => void;
}

const LABEL_LETS_GO = "Let's Go";

export function createTextareaTemplate(props: TextareaTemplateProps) {
  const {jobDescription, setJobDescription, isFocused, setIsFocused, primaryColor, examples, onSubmit} = props;

  return ({setValue}: any) => {
    return (
      <View style={styles.inputOuterWrap}>
        <View style={[styles.inputContainer, isFocused ? {borderColor: primaryColor} : {}]}>
          <TextInput
            style={styles.textInput}
            multiline
            textAlignVertical="top"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => {
              setJobDescription(text);
              setValue(text);
            }}
            value={jobDescription}
          />
          <AnimatedPlaceholder focused={isFocused} value={jobDescription} examples={examples} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSubmit}
            style={[
              styles.letsGoBtn,
              {backgroundColor: jobDescription.trim().length > 5 ? primaryColor : '#E5E7EB'}
            ]}
            disabled={jobDescription.trim().length <= 5}
          >
            <Sparkles color="#FFFFFF" size={16} />
            <Text style={styles.letsGoBtnText}>{LABEL_LETS_GO}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  inputOuterWrap: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    minHeight: 140,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    padding: 16,
    paddingBottom: 50,
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  letsGoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  letsGoBtnText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
