/**
 * AnimatedPlaceholder — extracted from HomeScreen.
 * Cycles through example phrases when the input is not focused and empty.
 */
import React, {useState, useRef, useEffect} from 'react';
import {Text, Animated} from 'react-native';

interface AnimatedPlaceholderProps {
  focused: boolean;
  value: string;
  examples: string[];
}

const AnimatedPlaceholder = ({focused, value, examples}: AnimatedPlaceholderProps) => {
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
      <Text style={{fontSize: 15, color: '#9CA3AF', lineHeight: 22}}>
        {examples[index]}
      </Text>
    </Animated.View>
  );
};

export default AnimatedPlaceholder;
