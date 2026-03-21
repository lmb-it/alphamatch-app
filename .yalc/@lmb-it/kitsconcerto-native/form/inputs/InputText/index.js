import { jsx } from 'react/jsx-runtime';
import React from 'react';
import KitsContainer from '../../helpers/FormContainer/index.js';
import { applyKeyFilterKeepPrev } from '../../helpers/native/keyfilter.js';
import { FloatLabelNative } from '../../helpers/native/FloatLabel.js';
import '../../../apps/mobile/src/ui/accordion/index.js';
import '../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../apps/mobile/src/ui/alert/index.js';
import '../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../apps/mobile/src/ui/avatar/index.js';
import '../../../apps/mobile/src/ui/badge/index.js';
import '../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../apps/mobile/src/ui/box/index.js';
import '../../../apps/mobile/src/ui/button/index.js';
import '../../../apps/mobile/src/ui/card/index.js';
import '../../../apps/mobile/src/ui/center/index.js';
import '../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../apps/mobile/src/ui/divider/index.js';
import '../../../apps/mobile/src/ui/drawer/index.js';
import '../../../apps/mobile/src/ui/fab/index.js';
import { View } from 'react-native';
import '../../../apps/mobile/src/ui/form-control/index.js';
import '../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../apps/mobile/src/ui/grid/index.js';
import '../../../apps/mobile/src/ui/heading/index.js';
import '../../../apps/mobile/src/ui/hstack/index.js';
import '../../../apps/mobile/src/ui/icon/index.js';
import '../../../apps/mobile/src/ui/image/index.js';
import '../../../apps/mobile/src/ui/image-background/index.js';
import { Input, InputField } from '../../../apps/mobile/src/ui/input/index.js';
import '../../../apps/mobile/src/ui/link/index.js';
import '../../../apps/mobile/src/ui/menu/index.js';
import '../../../apps/mobile/src/ui/modal/index.js';
import '../../../apps/mobile/src/ui/popover/index.js';
import '../../../apps/mobile/src/ui/portal/index.js';
import '../../../apps/mobile/src/ui/pressable/index.js';
import '../../../apps/mobile/src/ui/progress/index.js';
import '../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../apps/mobile/src/ui/select/index.js';
import '../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../apps/mobile/src/ui/slider/index.js';
import '../../../apps/mobile/src/ui/spinner/index.js';
import '../../../apps/mobile/src/ui/switch/index.js';
import '../../../apps/mobile/src/ui/table/index.js';
import '../../../apps/mobile/src/ui/text/index.js';
import '../../../apps/mobile/src/ui/textarea/index.js';
import '../../../apps/mobile/src/ui/toast/index.js';
import '../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../apps/mobile/src/Core/Tag/index.js';
import '../../../apps/mobile/src/Core/Badge/index.js';
import '../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../apps/mobile/src/Core/RadioButton/index.js';
import Addons from '../../helpers/Addons/index.js';
import '../../../contexts/DialogContext.js';
import useComponentDefaults from '../../../hooks/useComponentDefaults.js';
import useResolvedStyle from '../../../hooks/useResolvedStyle.js';
import { useFocusStyles } from '../../../hooks/useFocusStyles.js';
import { useFormFieldKeyboardNav } from '../../../hooks/useFormFieldKeyboardNav.js';
import { mergeRefs } from '../../../utils/mergeRefs.js';

const KitsInputText = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("InputText", rawProps, "Input");
  const resolvedThemeStyle = useResolvedStyle(themeStyle);
  const resolvedRootStyle = useResolvedStyle(elementStyles?.root || {});
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
  const { inputRef, navProps } = useFormFieldKeyboardNav(keyboardNavId ?? id);
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? "")
  );
  const [isFocused, setFocused] = React.useState(false);
  const rootStyle = resolvedRootStyle && Object.keys(resolvedRootStyle).length > 0 ? resolvedRootStyle : resolvedThemeStyle;
  const focusResolvedStyle = useFocusStyles(rootStyle, isFocused);
  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(String(value ?? ""));
    }
  }, [isControlled, value]);
  const handleChangeText = (nextRaw) => {
    const prev = isControlled ? String(value ?? "") : internalValue;
    const filtered = keyFilter ? applyKeyFilterKeepPrev(prev, nextRaw, keyFilter) : nextRaw;
    if (!isControlled) {
      setInternalValue(filtered);
    }
    onChange?.({
      target: { value: filtered }
    });
  };
  const displayValue = isControlled ? String(value ?? "") : internalValue;
  const inputEl = /* @__PURE__ */ jsx(
    Input,
    {
      ...localProps,
      isDisabled: !!disabled,
      isInvalid: !!invalid,
      style: { width: "100%", ...focusResolvedStyle },
      ...rest,
      children: /* @__PURE__ */ jsx(
        InputField,
        {
          ref: mergeRefs(inputRef, ref),
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
    const attachedEl = leftAddon || rightAddon ? /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, invalid: !!invalid, children: inputEl }) : inputEl;
    return isFloatedLabel ? /* @__PURE__ */ jsx(
      FloatLabelNative,
      {
        label: typeof label === "string" ? label : label?.text ?? "",
        value: displayValue,
        isFocused,
        disabled,
        onFocusRequest: () => setFocused(true),
        children: /* @__PURE__ */ jsx(View, { style: { width: "100%" }, children: attachedEl })
      }
    ) : attachedEl;
  }
  return /* @__PURE__ */ jsx(
    KitsContainer,
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
      elementStyles,
      children: isFloatedLabel ? /* @__PURE__ */ jsx(
        FloatLabelNative,
        {
          label: typeof label === "string" ? label : label?.text ?? "",
          value: displayValue,
          isFocused,
          disabled,
          onFocusRequest: () => setFocused(true),
          children: /* @__PURE__ */ jsx(View, { style: { width: "100%" }, children: inputEl })
        }
      ) : inputEl
    }
  );
};

export { KitsInputText as default };
//# sourceMappingURL=index.js.map
