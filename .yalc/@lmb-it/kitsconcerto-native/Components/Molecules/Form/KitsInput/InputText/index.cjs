'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../../Helpers/FormContainer/index.cjs');
var keyfilter = require('../../Helpers/native/keyfilter.cjs');
var FloatLabel_native = require('../../Helpers/native/FloatLabel.cjs');
require('../../../../../apps/mobile/src/ui/accordion/index.cjs');
require('../../../../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../../../../apps/mobile/src/ui/alert/index.cjs');
require('../../../../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../../../../apps/mobile/src/ui/avatar/index.cjs');
require('../../../../../apps/mobile/src/ui/badge/index.cjs');
require('../../../../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../../../../apps/mobile/src/ui/box/index.cjs');
require('../../../../../apps/mobile/src/ui/button/index.cjs');
require('../../../../../apps/mobile/src/ui/card/index.cjs');
require('../../../../../apps/mobile/src/ui/center/index.cjs');
require('../../../../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../../../apps/mobile/src/ui/fab/index.cjs');
var reactNative = require('react-native');
require('../../../../../apps/mobile/src/ui/form-control/index.cjs');
require('../../../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../../../../apps/mobile/src/ui/grid/index.cjs');
require('../../../../../apps/mobile/src/ui/heading/index.cjs');
require('../../../../../apps/mobile/src/ui/hstack/index.cjs');
require('../../../../../apps/mobile/src/ui/icon/index.cjs');
require('../../../../../apps/mobile/src/ui/image/index.cjs');
require('../../../../../apps/mobile/src/ui/image-background/index.cjs');
var index = require('../../../../../apps/mobile/src/ui/input/index.cjs');
require('../../../../../apps/mobile/src/ui/link/index.cjs');
require('../../../../../apps/mobile/src/ui/menu/index.cjs');
require('../../../../../apps/mobile/src/ui/modal/index.cjs');
require('../../../../../apps/mobile/src/ui/popover/index.cjs');
require('../../../../../apps/mobile/src/ui/portal/index.cjs');
require('../../../../../apps/mobile/src/ui/pressable/index.cjs');
require('../../../../../apps/mobile/src/ui/progress/index.cjs');
require('../../../../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../../../../apps/mobile/src/ui/select/index.cjs');
require('../../../../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../../../../apps/mobile/src/ui/slider/index.cjs');
require('../../../../../apps/mobile/src/ui/spinner/index.cjs');
require('../../../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../../../apps/mobile/src/ui/table/index.cjs');
require('../../../../../apps/mobile/src/ui/text/index.cjs');
require('../../../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../../packages/types/src/Css/map/index.cjs');
require('../../../../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('i18next');
require('react-i18next');
require('../../../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../../../apps/mobile/src/Core/RadioButton/index.cjs');
var index$1 = require('../../Helpers/Addons/index.cjs');
require('../../../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../../../Hooks/useComponentDefaults.cjs');
var useFocusStyles_native = require('../../../../../Hooks/useFocusStyles.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
var useFormFieldKeyboardNav = require('../../../../../Hooks/useFormFieldKeyboardNav.cjs');
var mergeRefs = require('../../../../../Utils/mergeRefs.cjs');

const KitsInputText = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("InputText", rawProps, "Input");
  const {
    id,
    label,
    rightAddon,
    leftAddon,
    errors,
    invalid,
    hideError,
    required,
    keyFilter,
    value,
    defaultValue,
    attached,
    onChange,
    disabled,
    helperText,
    isFloatedLabel,
    placeholder,
    containerStyle,
    localProps,
    keyboardNavId,
    ...rest
  } = props;
  const { inputRef, navProps } = useFormFieldKeyboardNav.useFormFieldKeyboardNav();
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? "")
  );
  const [isFocused, setFocused] = React.useState(false);
  const focusResolvedStyle = useFocusStyles_native.useFocusStyles(themeStyle, isFocused);
  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(String(value ?? ""));
    }
  }, [isControlled, value]);
  const handleChangeText = (nextRaw) => {
    const prev = isControlled ? String(value ?? "") : internalValue;
    const filtered = keyFilter ? keyfilter.applyKeyFilterKeepPrev(prev, nextRaw, keyFilter) : nextRaw;
    if (!isControlled) {
      setInternalValue(filtered);
    }
    onChange?.({
      target: { value: filtered }
    });
  };
  const displayValue = isControlled ? String(value ?? "") : internalValue;
  const inputEl = /* @__PURE__ */ jsxRuntime.jsx(
    index.Input,
    {
      ...localProps,
      isDisabled: !!disabled,
      isInvalid: !!invalid,
      style: { width: "100%", ...focusResolvedStyle },
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index.InputField,
        {
          ref: mergeRefs.mergeRefs(inputRef, ref),
          value: displayValue,
          placeholder: isFloatedLabel ? void 0 : placeholder,
          editable: !disabled,
          onChangeText: handleChangeText,
          onFocus: (e) => {
            setFocused(true);
            rest?.onFocus?.(e);
          },
          onBlur: (e) => {
            setFocused(false);
            rest?.onBlur?.(e);
          },
          ...navProps
        }
      )
    }
  );
  if (attached) {
    const attachedEl = leftAddon || rightAddon ? /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { leftAddon, rightAddon, invalid: !!invalid, children: inputEl }) : inputEl;
    return isFloatedLabel ? /* @__PURE__ */ jsxRuntime.jsx(
      FloatLabel_native.FloatLabelNative,
      {
        label: typeof label === "string" ? label : label?.text ?? "",
        value: displayValue,
        isFocused,
        disabled,
        onFocusRequest: () => setFocused(true),
        children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { width: "100%" }, children: attachedEl })
      }
    ) : attachedEl;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      disabled,
      hideError,
      isFloatedLabel,
      helperText,
      rightAddon,
      leftAddon,
      required,
      errors,
      invalid,
      label,
      containerStyle,
      children: isFloatedLabel ? /* @__PURE__ */ jsxRuntime.jsx(
        FloatLabel_native.FloatLabelNative,
        {
          label: typeof label === "string" ? label : label?.text ?? "",
          value: displayValue,
          isFocused,
          disabled,
          onFocusRequest: () => setFocused(true),
          children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { width: "100%" }, children: inputEl })
        }
      ) : inputEl
    }
  );
};

exports.default = KitsInputText;
//# sourceMappingURL=index.cjs.map
