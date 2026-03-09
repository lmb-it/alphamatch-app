'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
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
var index = require('../../../../../apps/mobile/src/Core/MultiSelect/index.cjs');
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
var index_native = require('../../Helpers/FormContainer/index.cjs');
var Functions = require('../../Helpers/Functions.cjs');
var helper = require('../helper.cjs');
var useSelectBase = require('../hooks/useSelectBase.cjs');
require('../../../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../../../Hooks/useComponentDefaults.cjs');

const KitsMultiSelect = ({ className, ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("MultiSelect", rawProps, "Select");
  const {
    id,
    disabled,
    isFloatedLabel,
    rightAddon,
    leftAddon,
    required,
    errors,
    invalid,
    placeholder,
    virtualScroll,
    label,
    inputSize,
    helperText,
    emptyFilterMessage,
    selectionLimit,
    localProps,
    hideError,
    withFilter,
    loading,
    showClear,
    valueMode
  } = props;
  const { list, keys, onChange, selectedValue, childrenKey, labelKey, valueKey } = useSelectBase.useSelectBase();
  React.useEffect(() => {
    helper.checkKeys(list, labelKey, !childrenKey ? valueKey : void 0);
  }, [list]);
  const ClState = Functions.ClHelper({
    inputSize: inputSize ?? "",
    isChecked: false,
    isInvalid: !!invalid,
    isDisabled: !!disabled
  });
  const handleChange = React.useCallback((e, items) => {
    if (selectionLimit && Array.isArray(e?.target?.value) && e.target.value.length > selectionLimit) {
      return;
    }
    onChange && onChange(e, items);
  }, [selectionLimit, onChange]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      inputSize,
      isFloatedLabel,
      rightAddon,
      leftAddon,
      required,
      hideError,
      errors,
      helperText,
      invalid,
      label,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index.default,
        {
          emptyFilterMessage,
          value: selectedValue,
          onChange: handleChange,
          disabled,
          loading,
          showClear,
          options: typeof list !== "function" ? list : [],
          placeholder,
          ...keys,
          filter: withFilter !== false,
          selectionLimit,
          display: valueMode === "comma" ? "comma" : localProps?.maxSelectedLabels ? void 0 : "chip",
          maxSelectedLabels: selectionLimit ?? localProps?.maxSelectedLabels ?? 10,
          className: `w-full ${ClState}`,
          style: Object.keys(themeStyle).length ? themeStyle : void 0,
          ...localProps ? localProps : {}
        }
      )
    }
  );
};
KitsMultiSelect.displayName = "MultiSelect";

exports.default = KitsMultiSelect;
//# sourceMappingURL=index.cjs.map
