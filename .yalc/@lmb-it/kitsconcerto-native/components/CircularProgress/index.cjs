'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var Svg = require('react-native-svg');
var reactNative = require('react-native');
var index = require('../../primitives/Box/index.cjs');

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
  const rotateAnim = React.useRef(new reactNative.Animated.Value(0)).current;
  React.useEffect(() => {
    if (loading) {
      rotateAnim.setValue(0);
      reactNative.Animated.loop(
        reactNative.Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          easing: reactNative.Easing.linear,
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    reactNative.View,
    {
      style: {
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center"
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(Svg, { width: size, height: size, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Svg.Circle,
            {
              cx: size / 2,
              cy: size / 2,
              r: radius,
              stroke: trackColor,
              strokeWidth,
              fill: "none"
            }
          ),
          !loading && /* @__PURE__ */ jsxRuntime.jsx(
            Svg.Circle,
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
        loading && /* @__PURE__ */ jsxRuntime.jsx(
          reactNative.Animated.View,
          {
            style: {
              position: "absolute",
              transform: [
                { rotate: rotation }
              ]
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(Svg, { width: size, height: size, children: /* @__PURE__ */ jsxRuntime.jsx(
              Svg.Circle,
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
        children && /* @__PURE__ */ jsxRuntime.jsx(
          index.default,
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

exports.default = CircularProgress;
//# sourceMappingURL=index.cjs.map
