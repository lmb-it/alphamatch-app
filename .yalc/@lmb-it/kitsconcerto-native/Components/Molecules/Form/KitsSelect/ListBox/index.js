import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useCallback, useMemo } from 'react';
import { TextInput, ScrollView, Pressable } from 'react-native';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';
import '../../../../../Hooks/useKeyboardNavigation.js';
import '../SelectContext.js';
import '../../../UI/Flex/index.js';
import Text from '../../../UI/Text/index.js';
import Box from '../../../UI/Box/index.js';
import VStack from '../../../UI/VStack/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import { useSelectBase } from '../hooks/useSelectBase.js';
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
import 'react-native-reanimated';
import { resolveThemeTokenForNative } from '../../../../../apps/mobile/src/Factory/helpers/style.js';
import '../../../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../../packages/types/src/Css/map/index.js';
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

const KitsListBox = (rawProps) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults("ListBox", rawProps, "Select");
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
  const { list, labelKey, valueKey, childrenKey, onChange, selectedValue } = useSelectBase();
  const [filterText, setFilterText] = useState("");
  const t = resolveThemeTokenForNative;
  const primaryBg = t("primary.100") || "#E8EAF6";
  const primaryText = t("primary.700") || "#303F9F";
  const borderClr = invalid ? t("red.500") || "#EF4444" : t("gray.300") || "#D1D5DB";
  const textColor = t("gray.800") || "#1F2937";
  const placeholderColor = t("gray.400") || "#9CA3AF";
  const groupBg = t("gray.50") || "#F9FAFB";
  const isSelected = useCallback((val) => {
    if (isMultiple && Array.isArray(selectedValue)) {
      return selectedValue.includes(val);
    }
    return selectedValue === val;
  }, [isMultiple, selectedValue]);
  const onSelect = useCallback((val, item) => {
    if (isMultiple && Array.isArray(selectedValue)) {
      const newVals = selectedValue.includes(val) ? selectedValue.filter((v) => v !== val) : [...selectedValue, val];
      onChange({ target: { value: newVals } }, newVals);
    } else {
      onChange({ target: { value: val } }, item);
    }
  }, [isMultiple, selectedValue, onChange]);
  const filteredList = useMemo(() => {
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
    return /* @__PURE__ */ jsx(
      Pressable,
      {
        style: {
          padding: 10,
          backgroundColor: selected ? primaryBg : "transparent"
        },
        onPress: () => !disabled && onSelect(val, item),
        children: /* @__PURE__ */ jsx(
          Text,
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
      return /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx(Box, { style: { backgroundColor: groupBg, paddingHorizontal: 12, paddingVertical: 8 }, children: /* @__PURE__ */ jsx(Text, { fontWeight: "600", color: textColor, size: inputSize, children: group[labelKey] }) }),
        children.map((item, ci) => renderItem(item, ci))
      ] }, `group-${gi}`);
    });
  };
  return /* @__PURE__ */ jsx(
    KitsContainer,
    {
      id,
      label,
      invalid: !!invalid,
      hideError,
      helperText,
      errors,
      children: /* @__PURE__ */ jsxs(
        Box,
        {
          borderWidth: 1,
          borderColor: borderClr,
          borderRadius: "$sm",
          height: 250,
          opacity: disabled ? 0.5 : 1,
          style: Object.keys(themeStyle).length ? themeStyle : void 0,
          children: [
            withFilter && /* @__PURE__ */ jsx(
              TextInput,
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
            /* @__PURE__ */ jsx(ScrollView, { children: /* @__PURE__ */ jsx(VStack, { children: childrenKey ? renderGroupedItems() : filteredList.map((item, i) => renderItem(item, i)) }) })
          ]
        }
      )
    }
  );
};

export { KitsListBox as default };
//# sourceMappingURL=index.js.map
