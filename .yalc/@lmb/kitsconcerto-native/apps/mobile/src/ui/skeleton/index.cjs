'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var styles = require('./styles.cjs');

const Skeleton = React.forwardRef(function Skeleton2({
  className,
  variant,
  children,
  startColor = "bg-background-200",
  isLoaded = false,
  speed = 2,
  ...props
}, ref) {
  const pulseAnim = new reactNative.Animated.Value(1);
  const customTimingFunction = reactNative.Easing.bezier(0.4, 0, 0.6, 1);
  const fadeDuration = 0.6;
  const animationDuration = fadeDuration * 1e4 / Number(speed);
  const pulse = reactNative.Animated.sequence([
    reactNative.Animated.timing(pulseAnim, {
      toValue: 1,
      // Start with opacity 1
      duration: animationDuration / 2,
      // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: reactNative.Platform.OS !== "web"
    }),
    reactNative.Animated.timing(pulseAnim, {
      toValue: 0.75,
      duration: animationDuration / 2,
      // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: reactNative.Platform.OS !== "web"
    }),
    reactNative.Animated.timing(pulseAnim, {
      toValue: 1,
      duration: animationDuration / 2,
      // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: reactNative.Platform.OS !== "web"
    })
  ]);
  if (!isLoaded) {
    reactNative.Animated.loop(pulse).start();
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Animated.View,
      {
        style: { opacity: pulseAnim },
        className: `${startColor} ${styles.skeletonStyle({
          variant,
          class: className
        })}`,
        ...props,
        ref
      }
    );
  } else {
    reactNative.Animated.loop(pulse).stop();
    return children;
  }
});
const SkeletonText = React.forwardRef(function SkeletonText2({
  className,
  _lines,
  isLoaded = false,
  startColor = "bg-background-200",
  gap = 2,
  children,
  ...props
}, ref) {
  if (!isLoaded) {
    if (_lines) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        reactNative.View,
        {
          className: `${styles.skeletonTextStyle({
            gap
          })}`,
          ref,
          children: Array.from({ length: _lines }).map((_, index) => /* @__PURE__ */ jsxRuntime.jsx(
            Skeleton,
            {
              className: `${startColor} ${styles.skeletonTextStyle({
                class: className
              })}`,
              ...props
            },
            index
          ))
        }
      );
    } else {
      return /* @__PURE__ */ jsxRuntime.jsx(
        Skeleton,
        {
          className: `${startColor} ${styles.skeletonTextStyle({
            class: className
          })}`,
          ...props,
          ref
        }
      );
    }
  } else {
    return children;
  }
});
Skeleton.displayName = "Skeleton";
SkeletonText.displayName = "SkeletonText";

exports.Skeleton = Skeleton;
exports.SkeletonText = SkeletonText;
//# sourceMappingURL=index.cjs.map
