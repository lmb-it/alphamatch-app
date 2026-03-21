'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var Animated = require('react-native-reanimated');
var index_native = require('../../../primitives/Text/index.cjs');

function FloatLabelNative({ label, value, isFocused, disabled, onFocusRequest, children }) {
  const raised = isFocused || !!value;
  const t = Animated.useSharedValue(raised ? 1 : 0);
  React.useEffect(() => {
    t.value = Animated.withTiming(raised ? 1 : 0, { duration: 140 });
  }, [raised]);
  const anim = Animated.useAnimatedStyle(() => {
    return {
      transform: [{ translateY: (1 - t.value) * 25 }, { translateX: (1 - t.value) * 11 }, { scale: 1 - t.value * 0.12 }],
      opacity: 0.9
    };
  });
  if (!label) return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { disabled, onPress: onFocusRequest, style: { width: "100%" }, children: /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: { width: "100%", position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(Animated.View, { style: [{ position: "absolute", left: 0, top: -5, zIndex: 2 }, anim], children: /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { fontSize: 12, children: label }) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { paddingTop: 14 }, children })
  ] }) });
}

exports.FloatLabelNative = FloatLabelNative;
//# sourceMappingURL=FloatLabel.cjs.map
