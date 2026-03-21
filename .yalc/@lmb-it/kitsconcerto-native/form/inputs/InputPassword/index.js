import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import KitsContainer from '../../helpers/FormContainer/index.js';
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
import 'react-native';
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
import { Input, InputField, InputSlot } from '../../../apps/mobile/src/ui/input/index.js';
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
import useSeparator from '../../../apps/mobile/src/Factory/useSeparator.js';
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
import { useFormInputController } from '../../helpers/useFormInputController/useFormInputController.js';
import Auth0PasswordStrength from './Strengthen.js';
import '../../../contexts/DialogContext.js';
import useComponentDefaults from '../../../hooks/useComponentDefaults.js';
import useResolvedStyle from '../../../hooks/useResolvedStyle.js';
import { useFocusStyles } from '../../../hooks/useFocusStyles.js';
import { useFormFieldKeyboardNav } from '../../../hooks/useFormFieldKeyboardNav.js';
import { mergeRefs } from '../../../utils/mergeRefs.js';
import { Icon } from '../../../primitives/Icon/index.js';

const KitsInputPassword = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("InputPassword", rawProps, "Input");
  const resolvedThemeStyle = useResolvedStyle(themeStyle);
  const resolvedRootStyle = useResolvedStyle(elementStyles?.root || {});
  const {
    id,
    label,
    helperText,
    errors,
    invalid,
    required,
    hideError,
    leftAddon,
    rightAddon,
    isFloatedLabel,
    disabled,
    promptLabel,
    weakLabel,
    mediumLabel,
    strongLabel,
    header,
    footer,
    feedback,
    toggleEye,
    showStrengthProgress,
    value,
    defaultValue,
    onChange,
    schema,
    eyeIcon,
    eyeSlashIcon,
    inputSize,
    ...rest
  } = props;
  const { inputRef, navProps } = useFormFieldKeyboardNav(id);
  useSeparator(rest);
  const { value: internal, emitChange } = useFormInputController({
    value,
    defaultValue,
    onChange
  });
  const [secure, setSecure] = useState(true);
  const toggleSecure = () => setSecure(!secure);
  const [isFocused, setFocused] = useState(false);
  const rootStyle = resolvedRootStyle && Object.keys(resolvedRootStyle).length > 0 ? resolvedRootStyle : resolvedThemeStyle;
  const focusResolvedStyle = useFocusStyles(rootStyle, isFocused);
  return /* @__PURE__ */ jsxs(
    KitsContainer,
    {
      id,
      helperText,
      isFloatedLabel,
      hideError,
      required,
      leftAddon,
      rightAddon,
      errors,
      invalid,
      label,
      disabled,
      inputSize,
      elementStyles,
      children: [
        /* @__PURE__ */ jsxs(
          Input,
          {
            ...rest,
            isDisabled: !!disabled,
            isInvalid: !!invalid,
            style: { width: "100%", ...focusResolvedStyle },
            children: [
              /* @__PURE__ */ jsx(
                InputField,
                {
                  ref: mergeRefs(inputRef, ref),
                  value: internal ?? "",
                  onChangeText: (txt) => emitChange(txt),
                  secureTextEntry: secure,
                  editable: !disabled,
                  placeholder: promptLabel,
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
              ),
              toggleEye && /* @__PURE__ */ jsx(InputSlot, { onPress: toggleSecure, style: { paddingHorizontal: 12 }, children: secure ? eyeIcon ?? /* @__PURE__ */ jsx(Icon, { name: "eye" }) : eyeSlashIcon ?? /* @__PURE__ */ jsx(Icon, { name: "eye-slash" }) })
            ]
          }
        ),
        showStrengthProgress && schema && /* @__PURE__ */ jsx(
          Auth0PasswordStrength,
          {
            value: internal ?? "",
            show: false,
            schema
          }
        )
      ]
    }
  );
};

export { KitsInputPassword as default };
//# sourceMappingURL=index.js.map
