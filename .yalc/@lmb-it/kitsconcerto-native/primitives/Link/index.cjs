'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var index_native = require('../Text/index.cjs');

const Link = ({
  children,
  href,
  onPress,
  isExternal,
  to,
  ...props
}) => {
  const handlePress = (event) => {
    if (onPress) {
      onPress(event);
    } else if (href) {
      reactNative.Linking.openURL(href);
    } else if (to) {
      reactNative.Linking.openURL(to);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { onPress: handlePress, accessibilityRole: "link", children: typeof children === "string" ? /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { color: "primary", underline: true, children }) : children });
};

exports.default = Link;
//# sourceMappingURL=index.cjs.map
