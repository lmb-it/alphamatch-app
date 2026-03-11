import { jsx } from 'react/jsx-runtime';
import { useImperativeHandle, useMemo } from 'react';
import useSeparator from '../../../../../apps/mobile/src/Factory/useSeparator.js';
import { View } from 'react-native';
import 'react-native-reanimated';
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
import '../../../../../apps/mobile/src/ui/textarea/index.js';
import '../../../../../apps/mobile/src/ui/toast/index.js';
import '../../../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../../../apps/mobile/src/ui/vstack/index.js';
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
import { usePhoneInput } from './usePhoneInput.js';
import { SvgUri } from 'react-native-svg';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';
import '../../../../../Hooks/useKeyboardNavigation.js';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import KitsInputText from '../InputText/index.js';
import 'axios';
import '../../../UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import '../../KitsSelect/SelectContext.js';
import { Icon } from '../../../../Atoms/Icon/index.js';

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
  const { mergedProps: _mergedProps, themeStyle } = useComponentDefaults("PhoneInput", props, "Input");
  useSeparator(props);
  const {
    displayValue,
    e164Value,
    objectValue,
    countryFlagUrl,
    countryISO,
    handleChange
  } = usePhoneInput({
    value,
    onChange,
    outputFormat,
    isWithCountryCode,
    defaultCountry,
    includedCountries,
    excludedCountries
  });
  useImperativeHandle(ref, () => ({
    value: outputFormat === "object" ? objectValue ?? e164Value : e164Value,
    setValue: (v) => handleChange(typeof v === "string" ? v : "")
  }));
  const flagAddon = useMemo(() => {
    if (!isWithCountryCode) return leftAddon;
    if (countryFlagUrl) {
      return /* @__PURE__ */ jsx(View, { style: { width: 20, height: 20, overflow: "hidden", borderRadius: 2 }, children: /* @__PURE__ */ jsx(
        SvgUri,
        {
          uri: countryFlagUrl,
          width: 20,
          height: 20
        }
      ) });
    }
    return /* @__PURE__ */ jsx(Icon, { name: "phone", size: "2xs" });
  }, [isWithCountryCode, countryFlagUrl, countryISO, leftAddon]);
  return /* @__PURE__ */ jsx(
    KitsContainer,
    {
      id,
      inputSize,
      isFloatedLabel,
      errors,
      required,
      hideError,
      label,
      children: /* @__PURE__ */ jsx(
        KitsInputText,
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

export { KitsPhoneComponent as default };
//# sourceMappingURL=index.js.map
