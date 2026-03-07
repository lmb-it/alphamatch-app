import { jsxs, jsx } from 'react/jsx-runtime';
import { useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';
import { Check, Minus } from 'lucide-react-native';

const TriStateCheckbox = ({
  value = null,
  disabled = false,
  readOnly = false,
  invalid = false,
  variant = "outlined",
  unstyled = false,
  checkIcon: CheckIcon = Check,
  uncheckIcon: UncheckIcon = Minus,
  onChange,
  children
}) => {
  const nextValue = useCallback((current) => {
    if (current === null) return true;
    if (current === true) return false;
    return null;
  }, []);
  const handlePress = useCallback(() => {
    if (disabled || readOnly) return;
    const newValue = nextValue(value);
    onChange?.({
      value: newValue,
      checked: newValue === true
    });
  }, [disabled, readOnly, value, nextValue, onChange]);
  const Icon = useMemo(() => {
    if (value === true) return CheckIcon;
    if (value === null) return UncheckIcon;
    return null;
  }, [value, CheckIcon, UncheckIcon]);
  if (unstyled) {
    return /* @__PURE__ */ jsxs(Pressable, { onPress: handlePress, disabled, children: [
      Icon && /* @__PURE__ */ jsx(Icon, {}),
      children
    ] });
  }
  return /* @__PURE__ */ jsxs(
    Pressable,
    {
      onPress: handlePress,
      disabled,
      accessibilityRole: "checkbox",
      accessibilityState: {
        disabled,
        checked: value === true ? true : value === false ? false : "mixed"
      },
      className: [
        "w-5 h-5 items-center justify-center rounded",
        variant === "outlined" ? "border border-gray-400" : "bg-gray-200",
        invalid && "border-red-500",
        disabled && "opacity-50"
      ].join(" "),
      children: [
        Icon && /* @__PURE__ */ jsx(Icon, { size: 14 }),
        children
      ]
    }
  );
};

export { TriStateCheckbox };
//# sourceMappingURL=index.js.map
