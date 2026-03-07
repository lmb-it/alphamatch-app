import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Animated, Easing, Platform, View } from 'react-native';
import { skeletonStyle, skeletonTextStyle } from './styles.js';

const Skeleton = forwardRef(function Skeleton2({
  className,
  variant,
  children,
  startColor = "bg-background-200",
  isLoaded = false,
  speed = 2,
  ...props
}, ref) {
  const pulseAnim = new Animated.Value(1);
  const customTimingFunction = Easing.bezier(0.4, 0, 0.6, 1);
  const fadeDuration = 0.6;
  const animationDuration = fadeDuration * 1e4 / Number(speed);
  const pulse = Animated.sequence([
    Animated.timing(pulseAnim, {
      toValue: 1,
      // Start with opacity 1
      duration: animationDuration / 2,
      // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: Platform.OS !== "web"
    }),
    Animated.timing(pulseAnim, {
      toValue: 0.75,
      duration: animationDuration / 2,
      // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: Platform.OS !== "web"
    }),
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: animationDuration / 2,
      // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: Platform.OS !== "web"
    })
  ]);
  if (!isLoaded) {
    Animated.loop(pulse).start();
    return /* @__PURE__ */ jsx(
      Animated.View,
      {
        style: { opacity: pulseAnim },
        className: `${startColor} ${skeletonStyle({
          variant,
          class: className
        })}`,
        ...props,
        ref
      }
    );
  } else {
    Animated.loop(pulse).stop();
    return children;
  }
});
const SkeletonText = forwardRef(function SkeletonText2({
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
      return /* @__PURE__ */ jsx(
        View,
        {
          className: `${skeletonTextStyle({
            gap
          })}`,
          ref,
          children: Array.from({ length: _lines }).map((_, index) => /* @__PURE__ */ jsx(
            Skeleton,
            {
              className: `${startColor} ${skeletonTextStyle({
                class: className
              })}`,
              ...props
            },
            index
          ))
        }
      );
    } else {
      return /* @__PURE__ */ jsx(
        Skeleton,
        {
          className: `${startColor} ${skeletonTextStyle({
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

export { Skeleton, SkeletonText };
//# sourceMappingURL=index.js.map
