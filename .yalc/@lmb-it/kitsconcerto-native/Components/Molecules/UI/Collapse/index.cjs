'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');

const Collapse = ({ isOpen, children, duration = 300 }) => {
  const [contentHeight, setContentHeight] = React.useState(0);
  const [measured, setMeasured] = React.useState(false);
  const animatedHeight = React.useRef(new reactNative.Animated.Value(0)).current;
  React.useEffect(() => {
    if (measured) {
      reactNative.Animated.timing(animatedHeight, {
        toValue: isOpen ? contentHeight : 0,
        duration,
        easing: reactNative.Easing.ease,
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
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Animated.View, { style: [styles.container, { height: animatedHeight }], children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: styles.inner, onLayout: onLayoutContent, children: isText ? /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { children }) : children }) });
};
const styles = reactNative.StyleSheet.create({
  container: {
    overflow: "hidden"
  },
  inner: {
    position: "absolute",
    width: "100%"
  }
});

exports.default = Collapse;
//# sourceMappingURL=index.cjs.map
