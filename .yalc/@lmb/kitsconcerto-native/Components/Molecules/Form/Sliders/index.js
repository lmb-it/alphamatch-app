import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { Text } from 'react-native';
import 'axios';
import '../../../../Contexts/DialogContext.js';
import '../KitsSelect/SelectContext.js';
import Flex from '../../UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
  const [localValue, setLocalValue] = useState(
    isRange ? [minValue, maxValue] : minValue
  );
  const currentValue = isControlled ? value : localValue;
  useEffect(() => {
    if (!isControlled) {
      setLocalValue(isRange ? [minValue, maxValue] : minValue);
    }
  }, [minValue, maxValue, isRange, isControlled]);
  if (isRange) {
    const [start, end] = Array.isArray(currentValue) ? currentValue : [minValue, maxValue];
    return /* @__PURE__ */ jsxs(Flex, { w: "full", flexDirection: "column", gap: 2, className, children: [
      /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
        /* @__PURE__ */ jsx(Text, { children: prefix ? `${prefix}${start}` : start }),
        /* @__PURE__ */ jsx(Text, { children: prefix ? `${prefix}${end}` : end })
      ] })
    ] });
  }
  const numericValue = typeof currentValue === "number" ? currentValue : minValue;
  return /* @__PURE__ */ jsxs(Flex, { w: "full", flexDirection: "column", gap: 2, className, children: [
    /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Text, { children: prefix ? `${prefix}${numericValue}` : numericValue }) })
  ] });
};

export { KitsSliders as default };
//# sourceMappingURL=index.js.map
