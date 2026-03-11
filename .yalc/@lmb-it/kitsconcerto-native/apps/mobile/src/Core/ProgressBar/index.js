import { jsxs, jsx } from 'react/jsx-runtime';
import { forwardRef, useRef, useImperativeHandle, useEffect, useMemo } from 'react';
import { Animated, Easing, Text } from 'react-native';
import '../../ui/accordion/index.js';
import '../../ui/actionsheet/index.js';
import '../../ui/alert/index.js';
import '../../ui/alert-dialog/index.js';
import '../../ui/avatar/index.js';
import '../../ui/badge/index.js';
import '../../ui/bottomsheet/index.js';
import { Box } from '../../ui/box/index.js';
import '../../ui/button/index.js';
import '../../ui/card/index.js';
import '../../ui/center/index.js';
import '../../ui/checkbox/index.js';
import '../../ui/divider/index.js';
import '../../ui/drawer/index.js';
import '../../ui/fab/index.js';
import '../../ui/form-control/index.js';
import '../../ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../ui/grid/index.js';
import '../../ui/heading/index.js';
import '../../ui/hstack/index.js';
import '../../ui/icon/index.js';
import '../../ui/image/index.js';
import '../../ui/image-background/index.js';
import '../../ui/input/index.js';
import '../../ui/link/index.js';
import '../../ui/menu/index.js';
import '../../ui/modal/index.js';
import '../../ui/popover/index.js';
import '../../ui/portal/index.js';
import '../../ui/pressable/index.js';
import '../../ui/progress/index.js';
import '../../ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../ui/select/index.js';
import '../../ui/skeleton/index.js';
import '../../ui/slider/index.js';
import '../../ui/spinner/index.js';
import '../../ui/switch/index.js';
import '../../ui/table/index.js';
import '../../ui/text/index.js';
import '../../ui/textarea/index.js';
import '../../ui/toast/index.js';
import '../../ui/tooltip/index.js';
import '../../ui/vstack/index.js';
import { resolveThemeTokenForNative } from '../../Factory/helpers/style.js';

const BAR_HEIGHT = 10;
const ProgressBar = forwardRef(
  (props, ref) => {
    const {
      value = null,
      color = resolveThemeTokenForNative("primary"),
      unit = "%",
      showValue = true,
      mode = "determinate",
      unstyled = false,
      displayValueTemplate,
      style,
      testID
    } = props;
    const rootRef = useRef(null);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const indeterminateAnim = useRef(new Animated.Value(0)).current;
    useImperativeHandle(ref, () => ({
      getElement: () => rootRef.current
    }));
    useEffect(() => {
      if (mode !== "determinate") return;
      if (value === null || value === void 0) return;
      const numeric = typeof value === "string" ? Number(value) : value;
      if (Number.isNaN(numeric)) return;
      Animated.timing(progressAnim, {
        toValue: Math.max(0, Math.min(100, numeric)),
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      }).start();
    }, [value, mode]);
    useEffect(() => {
      if (mode !== "indeterminate") return;
      indeterminateAnim.setValue(0);
      const loop = Animated.loop(
        Animated.timing(indeterminateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: false
        })
      );
      loop.start();
      return () => loop.stop();
    }, [mode]);
    const widthInterpolated = progressAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"]
    });
    const indeterminateTranslate = indeterminateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["-40%", "100%"]
    });
    const label = useMemo(() => {
      if (!showValue) return null;
      if (displayValueTemplate) {
        return displayValueTemplate(value);
      }
      if (value === null || value === void 0) return null;
      return `${value}${unit}`;
    }, [value, unit, showValue, displayValueTemplate]);
    return /* @__PURE__ */ jsxs(
      Box,
      {
        ref: rootRef,
        testID,
        style: {
          height: BAR_HEIGHT,
          overflow: "hidden",
          borderRadius: BAR_HEIGHT / 2,
          backgroundColor: unstyled ? void 0 : resolveThemeTokenForNative("gray.200"),
          ...style
        },
        children: [
          mode === "determinate" && /* @__PURE__ */ jsx(
            Animated.View,
            {
              style: {
                height: "100%",
                width: widthInterpolated,
                backgroundColor: color
              }
            }
          ),
          mode === "indeterminate" && /* @__PURE__ */ jsx(
            Animated.View,
            {
              style: {
                position: "absolute",
                height: "100%",
                width: "40%",
                backgroundColor: color,
                transform: [{ translateX: indeterminateTranslate }]
              }
            }
          ),
          label != null && /* @__PURE__ */ jsx(
            Box,
            {
              style: {
                position: "absolute",
                inset: 0,
                alignItems: "center",
                justifyContent: "center"
              },
              children: typeof label === "string" || typeof label === "number" ? /* @__PURE__ */ jsx(
                Text,
                {
                  style: {
                    fontSize: 11,
                    fontWeight: "600",
                    color: "#000"
                  },
                  children: label
                }
              ) : label
            }
          )
        ]
      }
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
//# sourceMappingURL=index.js.map
