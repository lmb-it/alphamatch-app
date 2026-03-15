import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Text, Pressable, View, TextInput, ScrollView, Keyboard, StyleSheet } from 'react-native';
import '../../ui/accordion/index.js';
import '../../ui/actionsheet/index.js';
import '../../ui/alert/index.js';
import '../../ui/alert-dialog/index.js';
import '../../ui/avatar/index.js';
import '../../ui/badge/index.js';
import '../../ui/bottomsheet/index.js';
import '../../ui/box/index.js';
import '../../ui/button/index.js';
import '../../ui/card/index.js';
import '../../ui/center/index.js';
import '../../ui/checkbox/index.js';
import '../../ui/divider/index.js';
import '../../ui/drawer/index.js';
import '../../ui/fab/index.js';
import '../../ui/form-control/index.js';
import '../../ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../ui/grid/index.js';
import '../../ui/heading/index.js';
import '../../ui/hstack/index.js';
import '../../ui/icon/index.js';
import '../../ui/image/index.js';
import '../../ui/image-background/index.js';
import { Input, InputField } from '../../ui/input/index.js';
import '../../ui/link/index.js';
import '../../ui/menu/index.js';
import '../../ui/modal/index.js';
import '../../ui/popover/index.js';
import '../../ui/portal/index.js';
import '../../ui/pressable/index.js';
import '../../ui/progress/index.js';
import '../../ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../ui/select/index.js';
import '../../ui/skeleton/index.js';
import '../../ui/slider/index.js';
import '../../ui/spinner/index.js';
import '../../ui/switch/index.js';
import '../../ui/table/index.js';
import '../../ui/text/index.js';
import '../../ui/textarea/index.js';
import '../../ui/toast/index.js';
import '../../ui/tooltip/index.js';
import '../../ui/vstack/index.js';
import 'react-native-reanimated';
import { resolveThemeTokenForNative } from '../../Factory/helpers/style.js';
import '../../Factory/DimensionsContext.js';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../../packages/types/src/Css/map/index.js';
import 'i18next';
import 'react-i18next';
import '../AutoComplete/index.js';
import '../MultiSelect/index.js';
import '../Trees/components/CoreTree.js';
import '../Trees/components/CoreTreeSelect.js';
import '../Trees/components/CoreToolbar.js';
import '../Paginator/index.js';
import 'lucide-react-native';
import '../SelectButton/index.js';
import '../DataTable/DataTable.js';
import '../Tag/index.js';
import '../Badge/index.js';
import '../ProgressBar/index.js';
import '../Checkbox/index.js';
import '../RadioButton/index.js';

const getLabel = (item, optionLabel) => {
  if (!item) return "";
  if (!optionLabel) return String(item);
  return String(item[optionLabel]);
};
const getValue = (item, optionValue) => {
  if (!item) return null;
  if (!optionValue) return item;
  return item[optionValue];
};
const t = resolveThemeTokenForNative;
const TEXT_STYLE_KEYS = /* @__PURE__ */ new Set([
  "fontSize",
  "fontFamily",
  "fontWeight",
  "fontStyle",
  "color",
  "letterSpacing",
  "lineHeight",
  "textAlign",
  "textDecorationLine",
  "textTransform"
]);
function splitStyle(combined) {
  if (!combined) return {};
  const view = {};
  const text = {};
  for (const [k, v] of Object.entries(combined)) {
    if (TEXT_STYLE_KEYS.has(k)) text[k] = v;
    else view[k] = v;
  }
  return {
    viewStyle: Object.keys(view).length ? view : void 0,
    textStyle: Object.keys(text).length ? text : void 0
  };
}
function Dropdown({
  value,
  options = [],
  onChange,
  optionLabel,
  optionValue,
  placeholder,
  disabled,
  editable,
  checkmark,
  highlightOnSelect = true,
  filter,
  filterBy,
  emptyFilterMessage = "No results found",
  itemTemplate,
  valueTemplate,
  panelFooterTemplate,
  optionGroupLabel,
  optionGroupChildren,
  optionGroupTemplate,
  virtualScrollerOptions,
  invalid,
  testID,
  style: externalStyle
}) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const { viewStyle: externalViewStyle, textStyle: externalTextStyle } = splitStyle(externalStyle);
  const colors = {
    border: t("border") || t("gray.300"),
    borderInvalid: t("danger") || t("red.500"),
    bg: t("surface-card") || "#fff",
    text: t("text") || t("gray.800"),
    placeholder: t("text-secondary") || t("gray.400"),
    optionSelected: t("highlight-bg") || t("gray.100"),
    groupBg: t("surface-ground") || t("gray.50"),
    filterBorder: t("border") || t("gray.200"),
    filterBg: t("surface-ground") || t("gray.50"),
    filterText: t("text") || t("gray.800"),
    emptyText: t("text-secondary") || t("gray.400"),
    primary: t("primary")
  };
  const selectedItem = useMemo(() => {
    if (value == null) return null;
    if (optionGroupChildren) {
      for (const group of options) {
        const children = group[optionGroupChildren];
        if (Array.isArray(children)) {
          const found = children.find((c) => getValue(c, optionValue) === value);
          if (found) return found;
        }
      }
      return null;
    }
    return options.find(
      (o) => getValue(o, optionValue) === value
    ) ?? null;
  }, [value, options, optionValue, optionGroupChildren]);
  const toggle = () => {
    if (disabled) return;
    setOpen((o) => {
      if (!o) setFilterQuery("");
      return !o;
    });
    Keyboard.dismiss();
  };
  const selectItem = (item) => {
    const newValue = getValue(item, optionValue);
    if (!onChange) return;
    const syntheticEvent = {
      target: {
        value: newValue
      }
    };
    onChange(syntheticEvent, item);
    setOpen(false);
  };
  const renderItem = useCallback(
    (item, index) => {
      if (!item) {
        return null;
      }
      if (item.__group) {
        return /* @__PURE__ */ jsx(Text, { style: [styles.groupLabel, { backgroundColor: colors.groupBg }], children: optionGroupLabel ? item.group?.[optionGroupLabel] : "" }, `group-${index}`);
      }
      const selected = value != null && getValue(item, optionValue) === value;
      let content;
      if (itemTemplate) {
        const rendered = itemTemplate(item);
        content = React.isValidElement(rendered) ? rendered : /* @__PURE__ */ jsx(Text, { children: String(rendered ?? "") });
      } else {
        content = /* @__PURE__ */ jsx(Text, { style: [{ color: colors.text }, externalTextStyle && { fontSize: externalTextStyle.fontSize }], children: getLabel(item, optionLabel) });
      }
      return /* @__PURE__ */ jsxs(
        Pressable,
        {
          onPress: () => selectItem(item),
          style: [
            styles.option,
            selected && highlightOnSelect && { backgroundColor: colors.optionSelected }
          ],
          children: [
            content,
            checkmark && selected && /* @__PURE__ */ jsx(Text, { children: "\u2713" })
          ]
        },
        `item-${index}`
      );
    },
    [
      value,
      optionValue,
      optionLabel,
      itemTemplate,
      optionGroupLabel,
      checkmark,
      highlightOnSelect
    ]
  );
  const flatData = useMemo(() => {
    if (!optionGroupLabel || !optionGroupChildren) {
      return options;
    }
    const out = [];
    options.forEach((g) => {
      out.push({ __group: true, group: g });
      g[optionGroupChildren]?.forEach((c) => out.push(c));
    });
    return out;
  }, [options]);
  const filteredData = useMemo(() => {
    if (!filter || !filterQuery) return flatData;
    const q = filterQuery.toLowerCase();
    const key = filterBy || optionLabel;
    return flatData.filter((entry) => {
      if (entry.__group) return true;
      const label = getLabel(entry, key);
      return label.toLowerCase().includes(q);
    });
  }, [flatData, filter, filterQuery, filterBy, optionLabel]);
  const displayValue = valueTemplate ? valueTemplate(selectedItem) : selectedItem ? getLabel(selectedItem, optionLabel) : "";
  return /* @__PURE__ */ jsxs(View, { style: styles.container, testID, children: [
    /* @__PURE__ */ jsxs(
      Pressable,
      {
        style: [
          styles.control,
          { borderColor: colors.border, backgroundColor: colors.bg },
          invalid && { borderColor: colors.borderInvalid },
          disabled && styles.disabled,
          externalViewStyle
        ],
        onPress: toggle,
        children: [
          editable ? /* @__PURE__ */ jsx(Input, { style: styles.input, children: /* @__PURE__ */ jsx(
            InputField,
            {
              ref: inputRef,
              value: inputText,
              onChangeText: setInputText,
              placeholder,
              editable: !disabled
            }
          ) }) : /* @__PURE__ */ jsx(Text, { style: [
            displayValue ? { color: colors.text } : { color: colors.placeholder },
            externalTextStyle,
            !displayValue && { color: colors.placeholder }
          ], children: displayValue || placeholder }),
          /* @__PURE__ */ jsx(Text, { style: [{ color: colors.text }, externalTextStyle], children: "\u25BE" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs(View, { style: [styles.panel, { borderColor: colors.border, backgroundColor: colors.bg }], children: [
      filter && /* @__PURE__ */ jsx(View, { style: [styles.filterContainer, { borderBottomColor: colors.filterBorder }], children: /* @__PURE__ */ jsx(
        TextInput,
        {
          value: filterQuery,
          onChangeText: setFilterQuery,
          placeholder: "Search...",
          placeholderTextColor: colors.placeholder,
          style: [styles.filterInput, {
            borderColor: colors.filterBorder,
            backgroundColor: colors.filterBg,
            color: colors.filterText
          }],
          autoFocus: true
        }
      ) }),
      /* @__PURE__ */ jsx(
        ScrollView,
        {
          keyboardShouldPersistTaps: "handled",
          nestedScrollEnabled: true,
          children: filteredData.length > 0 ? filteredData.map((item, i) => renderItem(item, i)) : filterQuery ? /* @__PURE__ */ jsx(View, { style: styles.emptyContainer, children: /* @__PURE__ */ jsx(Text, { style: [styles.emptyText, { color: colors.emptyText }], children: emptyFilterMessage }) }) : null
        }
      ),
      panelFooterTemplate?.()
    ] })
  ] });
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative"
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  disabled: {
    opacity: 0.5
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  groupLabel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontWeight: "600"
  },
  input: {
    flex: 1
  },
  panel: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 6,
    maxHeight: 260,
    zIndex: 9999
  },
  filterContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1
  },
  filterInput: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center"
  },
  emptyText: {
    fontSize: 14
  }
});

export { Dropdown as default };
//# sourceMappingURL=index.js.map
