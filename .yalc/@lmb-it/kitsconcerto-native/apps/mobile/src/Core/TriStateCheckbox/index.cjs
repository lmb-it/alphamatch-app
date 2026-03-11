'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var lucideReactNative = require('lucide-react-native');

const TriStateCheckbox = ({
  value = null,
  disabled = false,
  readOnly = false,
  invalid = false,
  variant = "outlined",
  unstyled = false,
  checkIcon: CheckIcon = lucideReactNative.Check,
  uncheckIcon: UncheckIcon = lucideReactNative.Minus,
  onChange,
  children
}) => {
  const nextValue = React.useCallback((current) => {
    if (current === null) return true;
    if (current === true) return false;
    return null;
  }, []);
  const handlePress = React.useCallback(() => {
    if (disabled || readOnly) return;
    const newValue = nextValue(value);
    onChange?.({
      value: newValue,
      checked: newValue === true
    });
  }, [disabled, readOnly, value, nextValue, onChange]);
  const Icon = React.useMemo(() => {
    if (value === true) return CheckIcon;
    if (value === null) return UncheckIcon;
    return null;
  }, [value, CheckIcon, UncheckIcon]);
  if (unstyled) {
    return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.Pressable, { onPress: handlePress, disabled, children: [
      Icon && /* @__PURE__ */ jsxRuntime.jsx(Icon, {}),
      children
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    reactNative.Pressable,
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
        Icon && /* @__PURE__ */ jsxRuntime.jsx(Icon, { size: 14 }),
        children
      ]
    }
  );
};

exports.TriStateCheckbox = TriStateCheckbox;
//# sourceMappingURL=index.cjs.map
