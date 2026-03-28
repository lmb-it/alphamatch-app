'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../../helpers/FormContainer/index.cjs');
require('../../../apps/mobile/src/ui/accordion/index.cjs');
require('../../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../../apps/mobile/src/ui/alert/index.cjs');
require('../../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../../apps/mobile/src/ui/avatar/index.cjs');
require('../../../apps/mobile/src/ui/badge/index.cjs');
require('../../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../../apps/mobile/src/ui/box/index.cjs');
require('../../../apps/mobile/src/ui/button/index.cjs');
require('../../../apps/mobile/src/ui/card/index.cjs');
require('../../../apps/mobile/src/ui/center/index.cjs');
require('../../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../apps/mobile/src/ui/fab/index.cjs');
require('react-native');
require('../../../apps/mobile/src/ui/form-control/index.cjs');
require('../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../../apps/mobile/src/ui/grid/index.cjs');
require('../../../apps/mobile/src/ui/heading/index.cjs');
require('../../../apps/mobile/src/ui/hstack/index.cjs');
require('../../../apps/mobile/src/ui/icon/index.cjs');
require('../../../apps/mobile/src/ui/image/index.cjs');
require('../../../apps/mobile/src/ui/image-background/index.cjs');
require('../../../apps/mobile/src/ui/input/index.cjs');
require('../../../apps/mobile/src/ui/link/index.cjs');
require('../../../apps/mobile/src/ui/menu/index.cjs');
require('../../../apps/mobile/src/ui/modal/index.cjs');
require('../../../apps/mobile/src/ui/popover/index.cjs');
require('../../../apps/mobile/src/ui/portal/index.cjs');
require('../../../apps/mobile/src/ui/pressable/index.cjs');
require('../../../apps/mobile/src/ui/progress/index.cjs');
require('../../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../../apps/mobile/src/ui/select/index.cjs');
require('../../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../../apps/mobile/src/ui/slider/index.cjs');
require('../../../apps/mobile/src/ui/spinner/index.cjs');
require('../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../apps/mobile/src/ui/table/index.cjs');
require('../../../apps/mobile/src/ui/text/index.cjs');
var index = require('../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../apps/mobile/src/ui/vstack/index.cjs');
require('react-native-reanimated');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../apps/mobile/src/Factory/DimensionsContext.cjs');
var useSeparator = require('../../../apps/mobile/src/Factory/useSeparator.cjs');
require('i18next');
require('react-i18next');
require('../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../apps/mobile/src/Core/RadioButton/index.cjs');
var keyFilter_native = require('../InputText/keyFilter.cjs');
var useFormFieldKeyboardNav_native = require('../../../hooks/useFormFieldKeyboardNav.cjs');
var mergeRefs = require('../../../utils/mergeRefs.cjs');
require('../../../contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../hooks/useComponentDefaults.cjs');
var useResolvedStyle = require('../../../hooks/useResolvedStyle.cjs');

const KitsInputTextarea = React.forwardRef((rawProps, ref) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults.default("Textarea", rawProps, "Input");
  const resolvedThemeStyle = useResolvedStyle.default(themeStyle);
  const resolvedRootStyle = useResolvedStyle.default(elementStyles?.root || {});
  const {
    id,
    label,
    value,
    defaultValue,
    onChange,
    keyFilter,
    errors,
    hideError,
    invalid,
    isFloatedLabel,
    disabled,
    helperText,
    inputSize,
    containerStyle,
    localProps,
    keyboardNavId,
    rows,
    autoResize,
    ...rest
  } = props;
  const LINE_HEIGHT = 20;
  const VERTICAL_PADDING = 16;
  const calculatedHeight = rows ? LINE_HEIGHT * rows + VERTICAL_PADDING : void 0;
  const { inputRef, navProps } = useFormFieldKeyboardNav_native.useFormFieldKeyboardNav(keyboardNavId ?? id);
  const isControlled = value !== void 0;
  const { cssProps, nativeProps } = useSeparator.default({
    ...rest,
    ...localProps
  });
  const fieldRef = React.useRef(null);
  const [internalValue, setInternalValue] = React.useState(
    () => String(defaultValue ?? "")
  );
  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(String(value ?? ""));
    }
  }, [isControlled, value]);
  React.useImperativeHandle(ref, () => ({
    focus: () => fieldRef.current?.focus?.(),
    blur: () => fieldRef.current?.blur?.(),
    clear: () => {
      if (!isControlled) setInternalValue("");
      onChange?.({ target: { value: "" } });
    }
  }));
  const handleChangeText = React.useCallback(
    (nextRaw) => {
      const prev = isControlled ? String(value ?? "") : internalValue;
      const filtered = keyFilter ? keyFilter_native.applyKeyFilter(prev, nextRaw, keyFilter) : nextRaw;
      if (!isControlled) {
        setInternalValue(filtered);
      }
      onChange?.({ target: { value: filtered } });
    },
    [keyFilter, onChange, isControlled, internalValue, value]
  );
  const displayValue = isControlled ? String(value ?? "") : internalValue;
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
      disabled,
      inputSize,
      containerStyle,
      elementStyles,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index.Textarea,
        {
          size: inputSize ?? "md",
          isDisabled: !!disabled,
          isInvalid: !!invalid,
          style: {
            ...resolvedRootStyle && Object.keys(resolvedRootStyle).length > 0 ? resolvedRootStyle : resolvedThemeStyle,
            ...cssProps,
            ...calculatedHeight ? { height: calculatedHeight, minHeight: calculatedHeight } : {}
          },
          ...nativeProps,
          children: /* @__PURE__ */ jsxRuntime.jsx(
            index.TextareaInput,
            {
              ref: mergeRefs.mergeRefs(inputRef, fieldRef),
              value: displayValue,
              onChangeText: handleChangeText,
              editable: !disabled,
              numberOfLines: rows ?? 4,
              textAlignVertical: "top",
              style: calculatedHeight ? { height: calculatedHeight - VERTICAL_PADDING } : void 0,
              ...navProps
            }
          )
        }
      )
    }
  );
});
KitsInputTextarea.displayName = "KitsInputTextarea";

exports.default = KitsInputTextarea;
//# sourceMappingURL=index.cjs.map
