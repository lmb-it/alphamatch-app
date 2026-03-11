'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
require('../../ui/accordion/index.cjs');
require('../../ui/actionsheet/index.cjs');
require('../../ui/alert/index.cjs');
require('../../ui/alert-dialog/index.cjs');
require('../../ui/avatar/index.cjs');
require('../../ui/badge/index.cjs');
require('../../ui/bottomsheet/index.cjs');
var index = require('../../ui/box/index.cjs');
require('../../ui/button/index.cjs');
require('../../ui/card/index.cjs');
require('../../ui/center/index.cjs');
require('../../ui/checkbox/index.cjs');
require('../../ui/divider/index.cjs');
require('../../ui/drawer/index.cjs');
require('../../ui/fab/index.cjs');
require('../../ui/form-control/index.cjs');
require('../../ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../ui/grid/index.cjs');
require('../../ui/heading/index.cjs');
require('../../ui/hstack/index.cjs');
require('../../ui/icon/index.cjs');
require('../../ui/image/index.cjs');
require('../../ui/image-background/index.cjs');
require('../../ui/input/index.cjs');
require('../../ui/link/index.cjs');
require('../../ui/menu/index.cjs');
require('../../ui/modal/index.cjs');
require('../../ui/popover/index.cjs');
require('../../ui/portal/index.cjs');
require('../../ui/pressable/index.cjs');
require('../../ui/progress/index.cjs');
require('../../ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../ui/select/index.cjs');
require('../../ui/skeleton/index.cjs');
require('../../ui/slider/index.cjs');
require('../../ui/spinner/index.cjs');
require('../../ui/switch/index.cjs');
require('../../ui/table/index.cjs');
require('../../ui/text/index.cjs');
require('../../ui/textarea/index.cjs');
require('../../ui/toast/index.cjs');
require('../../ui/tooltip/index.cjs');
require('../../ui/vstack/index.cjs');
var style = require('../../Factory/helpers/style.cjs');

const BAR_HEIGHT = 10;
const ProgressBar = React.forwardRef(
  (props, ref) => {
    const {
      value = null,
      color = style.resolveThemeTokenForNative("primary"),
      unit = "%",
      showValue = true,
      mode = "determinate",
      unstyled = false,
      displayValueTemplate,
      style: style$1,
      testID
    } = props;
    const rootRef = React.useRef(null);
    const progressAnim = React.useRef(new reactNative.Animated.Value(0)).current;
    const indeterminateAnim = React.useRef(new reactNative.Animated.Value(0)).current;
    React.useImperativeHandle(ref, () => ({
      getElement: () => rootRef.current
    }));
    React.useEffect(() => {
      if (mode !== "determinate") return;
      if (value === null || value === void 0) return;
      const numeric = typeof value === "string" ? Number(value) : value;
      if (Number.isNaN(numeric)) return;
      reactNative.Animated.timing(progressAnim, {
        toValue: Math.max(0, Math.min(100, numeric)),
        duration: 400,
        easing: reactNative.Easing.out(reactNative.Easing.cubic),
        useNativeDriver: false
      }).start();
    }, [value, mode]);
    React.useEffect(() => {
      if (mode !== "indeterminate") return;
      indeterminateAnim.setValue(0);
      const loop = reactNative.Animated.loop(
        reactNative.Animated.timing(indeterminateAnim, {
          toValue: 1,
          duration: 1200,
          easing: reactNative.Easing.linear,
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
    const label = React.useMemo(() => {
      if (!showValue) return null;
      if (displayValueTemplate) {
        return displayValueTemplate(value);
      }
      if (value === null || value === void 0) return null;
      return `${value}${unit}`;
    }, [value, unit, showValue, displayValueTemplate]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      index.Box,
      {
        ref: rootRef,
        testID,
        style: {
          height: BAR_HEIGHT,
          overflow: "hidden",
          borderRadius: BAR_HEIGHT / 2,
          backgroundColor: unstyled ? void 0 : style.resolveThemeTokenForNative("gray.200"),
          ...style$1
        },
        children: [
          mode === "determinate" && /* @__PURE__ */ jsxRuntime.jsx(
            reactNative.Animated.View,
            {
              style: {
                height: "100%",
                width: widthInterpolated,
                backgroundColor: color
              }
            }
          ),
          mode === "indeterminate" && /* @__PURE__ */ jsxRuntime.jsx(
            reactNative.Animated.View,
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
          label != null && /* @__PURE__ */ jsxRuntime.jsx(
            index.Box,
            {
              style: {
                position: "absolute",
                inset: 0,
                alignItems: "center",
                justifyContent: "center"
              },
              children: typeof label === "string" || typeof label === "number" ? /* @__PURE__ */ jsxRuntime.jsx(
                reactNative.Text,
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

exports.ProgressBar = ProgressBar;
//# sourceMappingURL=index.cjs.map
