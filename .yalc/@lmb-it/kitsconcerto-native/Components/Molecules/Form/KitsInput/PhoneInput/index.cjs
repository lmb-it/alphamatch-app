'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var useSeparator = require('../../../../../apps/mobile/src/Factory/useSeparator.cjs');
var reactNative = require('react-native');
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
require('../../../../../apps/mobile/src/ui/input/index.cjs');
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
require('lucide-react-native');
require('../../../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../../../apps/mobile/src/Core/RadioButton/index.cjs');
var usePhoneInput = require('./usePhoneInput.cjs');
var Svg = require('react-native-svg');
require('../../../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../../../Hooks/useComponentDefaults.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
var index_native$1 = require('../../Helpers/FormContainer/index.cjs');
var index_native$2 = require('../InputText/index.cjs');
require('axios');
require('../../../UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
require('../../KitsSelect/SelectContext.cjs');
var index_native = require('../../../../Atoms/Icon/index.cjs');

const KitsPhoneComponent = ({
  ref,
  isWithCountryCode,
  label,
  value,
  placeholder,
  onChange,
  invalid,
  disabled,
  required,
  errors,
  hideError,
  id,
  defaultCountry,
  inputSize,
  isFloatedLabel,
  leftAddon,
  rightAddon,
  includedCountries,
  excludedCountries,
  outputFormat = "string",
  ...props
}) => {
  const { mergedProps: _mergedProps, themeStyle } = useComponentDefaults.default("PhoneInput", props, "Input");
  useSeparator.default(props);
  const {
    displayValue,
    e164Value,
    objectValue,
    countryFlagUrl,
    countryISO,
    handleChange
  } = usePhoneInput.usePhoneInput({
    value,
    onChange,
    outputFormat,
    isWithCountryCode,
    defaultCountry,
    includedCountries,
    excludedCountries
  });
  React.useImperativeHandle(ref, () => ({
    value: outputFormat === "object" ? objectValue ?? e164Value : e164Value,
    setValue: (v) => handleChange(typeof v === "string" ? v : "")
  }));
  const flagAddon = React.useMemo(() => {
    if (!isWithCountryCode) return leftAddon;
    if (countryFlagUrl) {
      return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { width: 20, height: 20, overflow: "hidden", borderRadius: 2 }, children: /* @__PURE__ */ jsxRuntime.jsx(
        Svg.SvgUri,
        {
          uri: countryFlagUrl,
          width: 20,
          height: 20
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(index_native.Icon, { name: "phone", size: "2xs" });
  }, [isWithCountryCode, countryFlagUrl, countryISO, leftAddon]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native$1.default,
    {
      id,
      inputSize,
      isFloatedLabel,
      errors,
      required,
      hideError,
      label,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index_native$2.default,
        {
          id: `${id}-phone`,
          keyboardNavId: id,
          value: displayValue,
          rightAddon,
          leftAddon: flagAddon,
          onChange: (e) => handleChange(e.target.value),
          invalid,
          disabled,
          placeholder: placeholder ?? (isWithCountryCode ? "+1 (555) 123-4567" : ""),
          localProps: Object.keys(themeStyle).length ? { style: { width: "100%", ...themeStyle } } : void 0
        }
      )
    }
  );
};

exports.default = KitsPhoneComponent;
//# sourceMappingURL=index.cjs.map
