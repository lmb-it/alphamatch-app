'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../../Helpers/FormContainer/index.cjs');
var useSeparator = require('../../../../../apps/mobile/src/Factory/useSeparator.cjs');
require('react-native');
require('react-native-reanimated');
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
var lucideReactNative = require('lucide-react-native');
require('../../../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../../../apps/mobile/src/Core/RadioButton/index.cjs');
var index$1 = require('../../Helpers/Addons/index.cjs');
var useFormInputController_native = require('../../Helpers/useFormInputController/useFormInputController.cjs');
var Strengthen = require('./Strengthen.cjs');
require('../../../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../../../Hooks/useComponentDefaults.cjs');
var useFocusStyles_native = require('../../../../../Hooks/useFocusStyles.cjs');

const KitsInputPassword = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("InputPassword", rawProps, "Input");
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
  useSeparator.default(rest);
  const { value: internal, emitChange } = useFormInputController_native.useFormInputController({
    value,
    defaultValue,
    onChange
  });
  const [secure, setSecure] = React.useState(true);
  const toggleSecure = () => setSecure(!secure);
  const [isFocused, setFocused] = React.useState(false);
  const focusResolvedStyle = useFocusStyles_native.useFocusStyles(themeStyle, isFocused);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    index_native.default,
    {
      id,
      helperText,
      isFloatedLabel,
      rightAddon,
      leftAddon,
      hideError,
      required,
      errors,
      invalid,
      label,
      disabled,
      inputSize,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          index.Input,
          {
            ...rest,
            isDisabled: !!disabled,
            isInvalid: !!invalid,
            style: { width: "100%", ...focusResolvedStyle },
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(index$1.default, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsxRuntime.jsx(
                index.InputField,
                {
                  ref,
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
                  }
                }
              ) }),
              toggleEye && /* @__PURE__ */ jsxRuntime.jsx(index.InputSlot, { onPress: toggleSecure, style: { paddingHorizontal: 12 }, children: secure ? eyeIcon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReactNative.Eye, { size: 20, color: "#6B7280" }) : eyeSlashIcon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReactNative.EyeOff, { size: 20, color: "#6B7280" }) })
            ]
          }
        ),
        showStrengthProgress && schema && /* @__PURE__ */ jsxRuntime.jsx(
          Strengthen.default,
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

exports.default = KitsInputPassword;
//# sourceMappingURL=index.cjs.map
