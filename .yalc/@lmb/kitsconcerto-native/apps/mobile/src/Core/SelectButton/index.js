import { jsx, jsxs } from 'react/jsx-runtime';
import { memo, useCallback } from 'react';
import { View, Pressable, Text } from 'react-native';
import { resolveThemeTokenForNative } from '../../Factory/helpers/style.js';

const SelectButton = memo(function SelectButton2({
  value,
  options,
  multiple = false,
  allowEmpty = true,
  unselectable = true,
  disabled = false,
  invalid = false,
  optionLabel = "label",
  optionValue = "value",
  optionDisabled,
  itemTemplate,
  onChange,
  style,
  unstyled = false
}) {
  const isSelected = useCallback(
    (optionValue2) => {
      if (multiple && Array.isArray(value)) {
        return value.some((v) => v === optionValue2);
      }
      return value === optionValue2;
    },
    [value, multiple]
  );
  const resolveDisabled = (option) => {
    if (typeof optionDisabled === "function") {
      return optionDisabled(option);
    }
    if (typeof optionDisabled === "string") {
      return !!option?.[optionDisabled];
    }
    return !!option?.disabled;
  };
  const handlePress = (option) => {
    if (disabled || resolveDisabled(option)) return;
    const optionVal = option?.[optionValue];
    const selected = isSelected(optionVal);
    let nextValue;
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      if (selected) {
        if (!unselectable || !allowEmpty && current.length === 1) return;
        nextValue = current.filter((v) => v !== optionVal);
      } else {
        nextValue = [...current, optionVal];
      }
    } else {
      if (selected) {
        if (!unselectable || !allowEmpty) return;
        nextValue = null;
      } else {
        nextValue = optionVal;
      }
    }
    onChange?.({
      value: nextValue,
      checked: !selected
    });
  };
  return /* @__PURE__ */ jsx(
    View,
    {
      style: [
        !unstyled && {
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 6,
          borderColor: invalid ? resolveThemeTokenForNative("red.500") : resolveThemeTokenForNative("gray.300"),
          overflow: "hidden"
        },
        style
      ],
      children: options.map((option, index) => {
        const optionVal = option?.[optionValue];
        const selected = isSelected(optionVal);
        const optionIsDisabled = disabled || resolveDisabled(option);
        return /* @__PURE__ */ jsx(
          Pressable,
          {
            onPress: () => handlePress(option),
            disabled: optionIsDisabled,
            style: [
              !unstyled && {
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: selected ? resolveThemeTokenForNative("primary") : "transparent",
                opacity: optionIsDisabled ? 0.5 : 1,
                borderRightWidth: index < options.length - 1 ? 1 : 0,
                borderColor: resolveThemeTokenForNative("gray.300")
              }
            ],
            children: itemTemplate ? itemTemplate(option, selected) : /* @__PURE__ */ jsxs(View, { style: { flexDirection: "row", alignItems: "center", gap: 6 }, children: [
              option.icon,
              /* @__PURE__ */ jsx(
                Text,
                {
                  style: {
                    color: selected ? "#fff" : resolveThemeTokenForNative("gray.900"),
                    fontWeight: selected ? "600" : "400"
                  },
                  children: option?.[optionLabel]
                }
              )
            ] })
          },
          optionVal ?? index
        );
      })
    }
  );
});

export { SelectButton };
//# sourceMappingURL=index.js.map
