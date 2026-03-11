import { jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, StyleSheet } from 'react-native';

const Collapse = ({ isOpen, children, duration = 300 }) => {
  const [contentHeight, setContentHeight] = useState(0);
  const [measured, setMeasured] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (measured) {
      Animated.timing(animatedHeight, {
        toValue: isOpen ? contentHeight : 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: false
      }).start();
    }
  }, [isOpen, contentHeight, duration, measured]);
  const onLayoutContent = (e) => {
    const height = e.nativeEvent.layout.height;
    if (!measured || height !== contentHeight) {
      setContentHeight(height);
      if (!measured) setMeasured(true);
    }
  };
  const isText = typeof children === "string";
  return /* @__PURE__ */ jsx(Animated.View, { style: [styles.container, { height: animatedHeight }], children: /* @__PURE__ */ jsx(View, { style: styles.inner, onLayout: onLayoutContent, children: isText ? /* @__PURE__ */ jsx(Text, { children }) : children }) });
};
const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  },
  inner: {
    position: "absolute",
    width: "100%"
  }
});

export { Collapse as default };
//# sourceMappingURL=index.js.map
