import { jsx } from 'react/jsx-runtime';
import React from 'react';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import { formatNumber, parseLooseNumber, clampNumber } from '../../Helpers/native/numberFormat.js';
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
import { Input, InputField } from '../../../../../apps/mobile/src/ui/input/index.js';
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
import '../../../../../apps/mobile/src/ui/textarea/index.js';
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
import '../../../../../apps/mobile/src/Factory/DimensionsContext.js';
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
import Addons from '../../Helpers/Addons/index.js';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';

const KitsInputNumber = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults("InputNumber", rawProps, "Input");
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
  const isControlled = value !== void 0;
  const [internalNumber, setInternalNumber] = React.useState(
    defaultValue ?? null
  );
  const [text, setText] = React.useState(() => {
    const n = isControlled ? value : internalNumber;
    return typeof n === "number" ? formatNumber(n, {
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
          formatNumber(value, {
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
    const parsed = parseLooseNumber(raw);
    if (parsed == null) {
      if (!isControlled) setInternalNumber(null);
      emitChange(null);
      return;
    }
    const clamped = clampNumber(parsed, min, max);
    if (!isControlled) {
      setInternalNumber(clamped);
    }
    emitChange(clamped);
  };
  const onBlur = () => {
    const parsed = parseLooseNumber(text);
    if (parsed == null) return;
    const clamped = clampNumber(parsed, min, max);
    setText(
      formatNumber(clamped, {
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
      required,
      disabled,
      children: /* @__PURE__ */ jsx(
        Input,
        {
          ...localProps,
          isDisabled: !!disabled,
          isInvalid: !!invalid,
          ...rest,
          style: { width: "100%", ...themeStyle },
          children: /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsx(
            InputField,
            {
              ref,
              value: text,
              keyboardType: "numeric",
              onChangeText,
              onBlur,
              editable: !disabled
            }
          ) })
        }
      )
    }
  );
};

export { KitsInputNumber as default };
//# sourceMappingURL=index.js.map
