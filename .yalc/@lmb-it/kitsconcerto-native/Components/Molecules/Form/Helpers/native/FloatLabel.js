import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import '../../../UI/Flex/index.js';
import Text from '../../../UI/Text/index.js';
import '../../../../../Contexts/DialogContext.js';
import '../../../../../Hooks/useKeyboardNavigation.js';

function FloatLabelNative({ label, value, isFocused, disabled, onFocusRequest, children }) {
  const raised = isFocused || !!value;
  const t = useSharedValue(raised ? 1 : 0);
  React.useEffect(() => {
    t.value = withTiming(raised ? 1 : 0, { duration: 140 });
  }, [raised]);
  const anim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: (1 - t.value) * 25 }, { translateX: (1 - t.value) * 11 }, { scale: 1 - t.value * 0.12 }],
      opacity: 0.9
    };
  });
  if (!label) return /* @__PURE__ */ jsx(Fragment, { children });
  return /* @__PURE__ */ jsx(Pressable, { disabled, onPress: onFocusRequest, style: { width: "100%" }, children: /* @__PURE__ */ jsxs(View, { style: { width: "100%", position: "relative" }, children: [
    /* @__PURE__ */ jsx(Animated.View, { style: [{ position: "absolute", left: 0, top: -5, zIndex: 2 }, anim], children: /* @__PURE__ */ jsx(Text, { fontSize: 12, children: label }) }),
    /* @__PURE__ */ jsx(View, { style: { paddingTop: 14 }, children })
  ] }) });
}

export { FloatLabelNative };
//# sourceMappingURL=FloatLabel.js.map
