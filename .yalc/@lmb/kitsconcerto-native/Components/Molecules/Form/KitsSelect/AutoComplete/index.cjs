'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../Helpers/FormContainer/index.cjs');
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
require('react');
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
require('i18next');
require('react-i18next');
var index = require('../../../../../apps/mobile/src/Core/AutoComplete/index.cjs');
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
var useAutoCompleteLogic = require('../hooks/useAutoCompleteLogic.cjs');

const KitsAutoComplete = ({ ref, ...props }) => {
  const {
    id,
    rightAddon,
    leftAddon,
    errors,
    invalid,
    label,
    hideError,
    disabled,
    required,
    isFloatedLabel,
    inputSize = "md",
    forceSelection,
    completeMethod,
    helperText,
    withArrow,
    placeholder,
    isMultiple,
    localProps,
    delay,
    minLength,
    selectionLimit,
    showEmptyMessage
  } = props;
  const {
    inputValue,
    setInputValue,
    filteredList,
    search,
    handleOnChange,
    list,
    childrenKey,
    labelKey
  } = useAutoCompleteLogic.useAutoCompleteLogic({ isMultiple, forceSelection, completeMethod, ref });
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      inputSize,
      isFloatedLabel,
      hideError,
      rightAddon,
      leftAddon,
      required,
      helperText,
      errors,
      invalid,
      label,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index.default,
        {
          disabled,
          placeholder,
          value: inputValue,
          forceSelection,
          suggestions: Array.isArray(filteredList) ? filteredList : list,
          completeMethod: search,
          dropdown: withArrow,
          multiple: isMultiple,
          field: labelKey,
          invalid: !!invalid,
          emptyMessage: "No results found",
          ...delay != null ? { delay } : {},
          ...minLength != null ? { minLength } : {},
          ...selectionLimit != null ? { selectionLimit } : {},
          showEmptyMessage: showEmptyMessage ?? true,
          optionGroupChildren: childrenKey ?? void 0,
          optionGroupLabel: childrenKey ? labelKey : void 0,
          onChange: (event) => {
            setInputValue(event.value);
            handleOnChange(event);
          },
          onSelect: (event) => {
            handleOnChange(
              { originalEvent: event.originalEvent, value: event.value }
            );
          },
          ...localProps ?? {}
        }
      )
    }
  );
};

exports.default = KitsAutoComplete;
//# sourceMappingURL=index.cjs.map
