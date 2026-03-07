import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef, useState, useEffect, useImperativeHandle, useCallback } from 'react';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import '../../../../../apps/mobile/src/ui/accordion/index.js';
import '../../../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../../../apps/mobile/src/ui/alert/index.js';
import '../../../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../../../apps/mobile/src/ui/avatar/index.js';
import '../../../../../apps/mobile/src/ui/badge/index.js';
import '../../../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../../../apps/mobile/src/ui/box/index.js';
import '../../../../../apps/mobile/src/ui/button/index.js';
import '../../../../../apps/mobile/src/ui/card/index.js';
import '../../../../../apps/mobile/src/ui/center/index.js';
import '../../../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../../../apps/mobile/src/ui/divider/index.js';
import '../../../../../apps/mobile/src/ui/drawer/index.js';
import '../../../../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../../../../apps/mobile/src/ui/form-control/index.js';
import '../../../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../../../apps/mobile/src/ui/grid/index.js';
import '../../../../../apps/mobile/src/ui/heading/index.js';
import '../../../../../apps/mobile/src/ui/hstack/index.js';
import '../../../../../apps/mobile/src/ui/icon/index.js';
import '../../../../../apps/mobile/src/ui/image/index.js';
import '../../../../../apps/mobile/src/ui/image-background/index.js';
import '../../../../../apps/mobile/src/ui/input/index.js';
import '../../../../../apps/mobile/src/ui/link/index.js';
import '../../../../../apps/mobile/src/ui/menu/index.js';
import '../../../../../apps/mobile/src/ui/modal/index.js';
import '../../../../../apps/mobile/src/ui/popover/index.js';
import '../../../../../apps/mobile/src/ui/portal/index.js';
import '../../../../../apps/mobile/src/ui/pressable/index.js';
import '../../../../../apps/mobile/src/ui/progress/index.js';
import '../../../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../../../apps/mobile/src/ui/select/index.js';
import '../../../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../../../apps/mobile/src/ui/slider/index.js';
import '../../../../../apps/mobile/src/ui/spinner/index.js';
import '../../../../../apps/mobile/src/ui/switch/index.js';
import '../../../../../apps/mobile/src/ui/table/index.js';
import '../../../../../apps/mobile/src/ui/text/index.js';
import { Textarea, TextareaInput } from '../../../../../apps/mobile/src/ui/textarea/index.js';
import '../../../../../apps/mobile/src/ui/toast/index.js';
import '../../../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../../packages/types/src/Css/map/index.js';
import useSeparator from '../../../../../apps/mobile/src/Factory/useSeparator.js';
import 'i18next';
import 'react-i18next';
import '../../../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../../../apps/mobile/src/Core/Tag/index.js';
import '../../../../../apps/mobile/src/Core/Badge/index.js';
import '../../../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../../../apps/mobile/src/Core/RadioButton/index.js';
import { applyKeyFilter } from '../InputText/keyFilter.js';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';

const KitsInputTextarea = forwardRef((rawProps, ref) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults("Textarea", rawProps);
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
    ...rest
  } = props;
  const isControlled = value !== void 0;
  const { cssProps, nativeProps } = useSeparator({
    ...rest,
    ...localProps
  });
  const fieldRef = useRef(null);
  const [internalValue, setInternalValue] = useState(
    () => String(defaultValue ?? "")
  );
  useEffect(() => {
    if (isControlled) {
      setInternalValue(String(value ?? ""));
    }
  }, [isControlled, value]);
  useImperativeHandle(ref, () => ({
    focus: () => fieldRef.current?.focus?.(),
    blur: () => fieldRef.current?.blur?.(),
    clear: () => {
      if (!isControlled) setInternalValue("");
      onChange?.({ target: { value: "" } });
    }
  }));
  const handleChangeText = useCallback(
    (nextRaw) => {
      const prev = isControlled ? String(value ?? "") : internalValue;
      const filtered = keyFilter ? applyKeyFilter(prev, nextRaw, keyFilter) : nextRaw;
      if (!isControlled) {
        setInternalValue(filtered);
      }
      onChange?.({ target: { value: filtered } });
    },
    [keyFilter, onChange, isControlled, internalValue, value]
  );
  const displayValue = isControlled ? String(value ?? "") : internalValue;
  return /* @__PURE__ */ jsx(
    KitsContainer,
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
      children: /* @__PURE__ */ jsx(
        Textarea,
        {
          size: inputSize ?? "md",
          isDisabled: !!disabled,
          isInvalid: !!invalid,
          style: { ...themeStyle, ...cssProps },
          ...nativeProps,
          children: /* @__PURE__ */ jsx(
            TextareaInput,
            {
              ref: fieldRef,
              value: displayValue,
              onChangeText: handleChangeText,
              editable: !disabled
            }
          )
        }
      )
    }
  );
});
KitsInputTextarea.displayName = "KitsInputTextarea";

export { KitsInputTextarea as default };
//# sourceMappingURL=index.js.map
