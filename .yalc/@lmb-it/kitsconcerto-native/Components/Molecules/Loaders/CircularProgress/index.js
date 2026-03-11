import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Animated, Easing, View } from 'react-native';
import 'axios';
import '../../../../Contexts/DialogContext.js';
import '../../../../Hooks/useKeyboardNavigation.js';
import '../../Form/KitsSelect/SelectContext.js';
import '../../UI/Flex/index.js';
import Box from '../../UI/Box/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const CircularProgress = ({
  size = 100,
  strokeWidth = 8,
  value,
  color = "blue",
  trackColor = "lightgray",
  loading = false,
  children
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - value / 100 * circumference;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (loading) {
      rotateAnim.setValue(0);
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
    }
  }, [loading]);
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return /* @__PURE__ */ jsxs(
    View,
    {
      style: {
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center"
      },
      children: [
        /* @__PURE__ */ jsxs(Svg, { width: size, height: size, children: [
          /* @__PURE__ */ jsx(
            Circle,
            {
              cx: size / 2,
              cy: size / 2,
              r: radius,
              stroke: trackColor,
              strokeWidth,
              fill: "none"
            }
          ),
          !loading && /* @__PURE__ */ jsx(
            Circle,
            {
              cx: size / 2,
              cy: size / 2,
              r: radius,
              stroke: color,
              strokeWidth,
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              strokeLinecap: "round",
              fill: "none"
            }
          )
        ] }),
        loading && /* @__PURE__ */ jsx(
          Animated.View,
          {
            style: {
              position: "absolute",
              transform: [
                { rotate: rotation }
              ]
            },
            children: /* @__PURE__ */ jsx(Svg, { width: size, height: size, children: /* @__PURE__ */ jsx(
              Circle,
              {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                stroke: color,
                strokeWidth,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                strokeLinecap: "round",
                fill: "none"
              }
            ) })
          }
        ),
        children && /* @__PURE__ */ jsx(
          Box,
          {
            style: {
              position: "absolute",
              justifyContent: "center",
              alignItems: "center"
            },
            children
          }
        )
      ]
    }
  );
};

export { CircularProgress as default };
//# sourceMappingURL=index.js.map
