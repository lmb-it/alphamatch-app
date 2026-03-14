'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var index_native = require('../../Helpers/FormContainer/index.cjs');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../../../Hooks/useComponentDefaults.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../SelectContext.cjs');
require('../../../UI/Flex/index.cjs');
var index_native$2 = require('../../../UI/Text/index.cjs');
var index = require('../../../UI/Box/index.cjs');
var index_native$1 = require('../../../UI/VStack/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
var useSelectBase = require('../hooks/useSelectBase.cjs');
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
require('react-native-reanimated');
var style = require('../../../../../apps/mobile/src/Factory/helpers/style.cjs');
require('../../../../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../../packages/types/src/Css/map/index.cjs');
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

const KitsListBox = (rawProps) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("ListBox", rawProps, "Select");
  const {
    id,
    label,
    disabled,
    invalid,
    errors,
    helperText,
    inputSize = "md",
    isMultiple,
    withFilter,
    filterBy,
    hideError
  } = props;
  const { list, labelKey, valueKey, childrenKey, onChange, selectedValue } = useSelectBase.useSelectBase();
  const [filterText, setFilterText] = React.useState("");
  const t = style.resolveThemeTokenForNative;
  const primaryBg = t("highlight-bg") || t("primary.100") || "#E8EAF6";
  const primaryText = t("primary.700") || "#303F9F";
  const borderClr = invalid ? t("danger") || "#EF4444" : t("border") || "#D1D5DB";
  const textColor = t("text") || "#1F2937";
  const placeholderColor = t("text-secondary") || "#9CA3AF";
  const groupBg = t("surface-ground") || "#F9FAFB";
  const isSelected = React.useCallback((val) => {
    if (isMultiple && Array.isArray(selectedValue)) {
      return selectedValue.includes(val);
    }
    return selectedValue === val;
  }, [isMultiple, selectedValue]);
  const onSelect = React.useCallback((val, item) => {
    if (isMultiple && Array.isArray(selectedValue)) {
      const newVals = selectedValue.includes(val) ? selectedValue.filter((v) => v !== val) : [...selectedValue, val];
      onChange({ target: { value: newVals } }, newVals);
    } else {
      onChange({ target: { value: val } }, item);
    }
  }, [isMultiple, selectedValue, onChange]);
  const filteredList = React.useMemo(() => {
    if (!withFilter || !filterText.trim()) return list;
    const query = filterText.toLowerCase();
    const searchKey = filterBy || labelKey;
    if (childrenKey) {
      return list.reduce((acc, group) => {
        const children = group[childrenKey];
        if (Array.isArray(children)) {
          const matched = children.filter(
            (item) => String(item[searchKey] ?? "").toLowerCase().includes(query)
          );
          if (matched.length > 0) {
            acc.push({ ...group, [childrenKey]: matched });
          }
        }
        return acc;
      }, []);
    }
    return list.filter(
      (item) => String(item[searchKey] ?? "").toLowerCase().includes(query)
    );
  }, [list, filterText, withFilter, filterBy, labelKey, childrenKey]);
  const renderItem = (item, index) => {
    const val = item[valueKey];
    const selected = isSelected(val);
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Pressable,
      {
        style: {
          padding: 10,
          backgroundColor: selected ? primaryBg : "transparent"
        },
        onPress: () => !disabled && onSelect(val, item),
        children: /* @__PURE__ */ jsxRuntime.jsx(
          index_native$2.default,
          {
            color: selected ? primaryText : textColor,
            fontWeight: selected ? "bold" : "normal",
            size: inputSize,
            children: item[labelKey]
          }
        )
      },
      `${val}-${index}`
    );
  };
  const renderGroupedItems = () => {
    return filteredList.map((group, gi) => {
      const children = group[childrenKey];
      if (!Array.isArray(children)) {
        return renderItem(group, gi);
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(index.default, { style: { backgroundColor: groupBg, paddingHorizontal: 12, paddingVertical: 8 }, children: /* @__PURE__ */ jsxRuntime.jsx(index_native$2.default, { fontWeight: "600", color: textColor, size: inputSize, children: group[labelKey] }) }),
        children.map((item, ci) => renderItem(item, ci))
      ] }, `group-${gi}`);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      label,
      invalid: !!invalid,
      hideError,
      helperText,
      errors,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        index.default,
        {
          borderWidth: 1,
          borderColor: borderClr,
          borderRadius: "$sm",
          height: 250,
          opacity: disabled ? 0.5 : 1,
          style: Object.keys(themeStyle).length ? themeStyle : void 0,
          children: [
            withFilter && /* @__PURE__ */ jsxRuntime.jsx(
              reactNative.TextInput,
              {
                value: filterText,
                onChangeText: setFilterText,
                placeholder: "Search...",
                placeholderTextColor: placeholderColor,
                style: {
                  borderBottomWidth: 1,
                  borderBottomColor: borderClr,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  fontSize: 14,
                  color: textColor
                }
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(reactNative.ScrollView, { children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { children: childrenKey ? renderGroupedItems() : filteredList.map((item, i) => renderItem(item, i)) }) })
          ]
        }
      )
    }
  );
};

exports.default = KitsListBox;
//# sourceMappingURL=index.cjs.map
