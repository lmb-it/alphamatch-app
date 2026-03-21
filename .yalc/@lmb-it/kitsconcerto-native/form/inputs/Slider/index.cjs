'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var Slider = require('@react-native-community/slider');
var reactNative = require('react-native');
var index = require('../../../layout/Flex/index.cjs');

const KitsSliders = ({
  minValue = 0,
  maxValue = 100,
  prefix,
  step,
  disabled,
  value,
  isRange = false,
  onChange,
  onSlideEnd,
  className
}) => {
  const isControlled = value !== void 0;
  const [localValue, setLocalValue] = React.useState(
    isRange ? [minValue, maxValue] : minValue
  );
  const currentValue = isControlled ? value : localValue;
  React.useEffect(() => {
    if (!isControlled) {
      setLocalValue(isRange ? [minValue, maxValue] : minValue);
    }
  }, [minValue, maxValue, isRange, isControlled]);
  if (isRange) {
    const [start, end] = Array.isArray(currentValue) ? currentValue : [minValue, maxValue];
    return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", flexDirection: "column", gap: 2, className, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Slider,
        {
          minimumValue: minValue,
          maximumValue: end,
          value: start,
          step,
          disabled,
          onValueChange: (v) => {
            const next = [v, end];
            isControlled ? onChange?.({ value: next }) : setLocalValue(next);
          },
          onSlidingComplete: (v) => {
            onSlideEnd?.({
              value: [v, end]
            });
          }
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        Slider,
        {
          minimumValue: start,
          maximumValue: maxValue,
          value: end,
          step,
          disabled,
          onValueChange: (v) => {
            const next = [start, v];
            isControlled ? onChange?.({ value: next }) : setLocalValue(next);
          },
          onSlidingComplete: (v) => {
            onSlideEnd?.({
              value: [start, v]
            });
          }
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(index.default, { justifyContent: "space-between", children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { children: prefix ? `${prefix}${start}` : start }),
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { children: prefix ? `${prefix}${end}` : end })
      ] })
    ] });
  }
  const numericValue = typeof currentValue === "number" ? currentValue : minValue;
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", flexDirection: "column", gap: 2, className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Slider,
      {
        minimumValue: minValue,
        maximumValue: maxValue,
        step,
        disabled,
        value: numericValue,
        onValueChange: (v) => {
          isControlled ? onChange?.({ value: v }) : setLocalValue(v);
        },
        onSlidingComplete: (v) => {
          onSlideEnd?.({
            value: v
          });
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(index.default, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { children: prefix ? `${prefix}${numericValue}` : numericValue }) })
  ] });
};

exports.default = KitsSliders;
//# sourceMappingURL=index.cjs.map
