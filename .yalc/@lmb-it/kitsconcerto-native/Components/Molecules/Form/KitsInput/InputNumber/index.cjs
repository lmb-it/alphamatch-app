'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../../Helpers/FormContainer/index.cjs');
var numberFormat = require('../../Helpers/native/numberFormat.cjs');
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
require('react-native');
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
require('../../../../../Hooks/useKeyboardNavigation.cjs');
var useFormFieldKeyboardNav = require('../../../../../Hooks/useFormFieldKeyboardNav.cjs');
var mergeRefs = require('../../../../../Utils/mergeRefs.cjs');

const KitsInputNumber = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("InputNumber", rawProps, "Input");
  const {
    id,
    label,
    required,
    value,
    defaultValue,
    errors,
    hideError,
    invalid,
    isFloatedLabel,
    disabled,
    helperText,
    localProps,
    onChange,
    leftAddon,
    rightAddon,
    // Prime-like numeric props
    locale,
    useGrouping,
    minFractionDigits,
    maxFractionDigits,
    mode,
    currency,
    prefix,
    suffix,
    min,
    max,
    ...rest
  } = props;
  const { inputRef, navProps } = useFormFieldKeyboardNav.useFormFieldKeyboardNav();
  const isControlled = value !== void 0;
  const [internalNumber, setInternalNumber] = React.useState(
    defaultValue ?? null
  );
  const [text, setText] = React.useState(() => {
    const n = isControlled ? value : internalNumber;
    return typeof n === "number" ? numberFormat.formatNumber(n, {
      locale,
      useGrouping,
      minFractionDigits,
      maxFractionDigits,
      mode,
      currency,
      prefix,
      suffix,
      min,
      max
    }) : "";
  });
  React.useEffect(() => {
    if (isControlled) {
      if (typeof value === "number") {
        setText(
          numberFormat.formatNumber(value, {
            locale,
            useGrouping,
            minFractionDigits,
            maxFractionDigits,
            mode,
            currency,
            prefix,
            suffix,
            min,
            max
          })
        );
      } else {
        setText("");
      }
    }
  }, [
    isControlled,
    value,
    locale,
    useGrouping,
    minFractionDigits,
    maxFractionDigits,
    mode,
    currency,
    prefix,
    suffix,
    min,
    max
  ]);
  const emitChange = (n) => {
    onChange?.({ value: n });
  };
  const onChangeText = (raw) => {
    setText(raw);
    const parsed = numberFormat.parseLooseNumber(raw);
    if (parsed == null) {
      if (!isControlled) setInternalNumber(null);
      emitChange(null);
      return;
    }
    const clamped = numberFormat.clampNumber(parsed, min, max);
    if (!isControlled) {
      setInternalNumber(clamped);
    }
    emitChange(clamped);
  };
  const onBlur = () => {
    const parsed = numberFormat.parseLooseNumber(text);
    if (parsed == null) return;
    const clamped = numberFormat.clampNumber(parsed, min, max);
    setText(
      numberFormat.formatNumber(clamped, {
        locale,
        useGrouping,
        minFractionDigits,
        maxFractionDigits,
        mode,
        currency,
        prefix,
        suffix,
        min,
        max
      })
    );
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      helperText,
      isFloatedLabel,
      errors,
      invalid,
      label,
      hideError,
      required,
      disabled,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index.Input,
        {
          ...localProps,
          isDisabled: !!disabled,
          isInvalid: !!invalid,
          ...rest,
          style: { width: "100%", ...themeStyle },
          children: /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsxRuntime.jsx(
            index.InputField,
            {
              ref: mergeRefs.mergeRefs(inputRef, ref),
              value: text,
              keyboardType: "numeric",
              onChangeText,
              onBlur,
              editable: !disabled,
              ...navProps
            }
          ) })
        }
      )
    }
  );
};

exports.default = KitsInputNumber;
//# sourceMappingURL=index.cjs.map
