'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
require('../../ui/accordion/index.cjs');
require('../../ui/actionsheet/index.cjs');
require('../../ui/alert/index.cjs');
require('../../ui/alert-dialog/index.cjs');
require('../../ui/avatar/index.cjs');
require('../../ui/badge/index.cjs');
require('../../ui/bottomsheet/index.cjs');
require('../../ui/box/index.cjs');
require('../../ui/button/index.cjs');
require('../../ui/card/index.cjs');
require('../../ui/center/index.cjs');
require('../../ui/checkbox/index.cjs');
require('../../ui/divider/index.cjs');
require('../../ui/drawer/index.cjs');
require('../../ui/fab/index.cjs');
require('../../ui/form-control/index.cjs');
require('../../ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../ui/grid/index.cjs');
require('../../ui/heading/index.cjs');
require('../../ui/hstack/index.cjs');
require('../../ui/icon/index.cjs');
require('../../ui/image/index.cjs');
require('../../ui/image-background/index.cjs');
var index = require('../../ui/input/index.cjs');
require('../../ui/link/index.cjs');
require('../../ui/menu/index.cjs');
require('../../ui/modal/index.cjs');
require('../../ui/popover/index.cjs');
require('../../ui/portal/index.cjs');
require('../../ui/pressable/index.cjs');
require('../../ui/progress/index.cjs');
require('../../ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../ui/select/index.cjs');
require('../../ui/skeleton/index.cjs');
require('../../ui/slider/index.cjs');
require('../../ui/spinner/index.cjs');
require('../../ui/switch/index.cjs');
require('../../ui/table/index.cjs');
require('../../ui/text/index.cjs');
require('../../ui/textarea/index.cjs');
require('../../ui/toast/index.cjs');
require('../../ui/tooltip/index.cjs');
require('../../ui/vstack/index.cjs');
require('react-native-reanimated');
var style = require('../../Factory/helpers/style.cjs');
require('../../Factory/DimensionsContext.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../../packages/types/src/Css/map/index.cjs');
require('i18next');
require('react-i18next');
require('../AutoComplete/index.cjs');
require('../MultiSelect/index.cjs');
require('../Trees/components/CoreTree.cjs');
require('../Trees/components/CoreTreeSelect.cjs');
require('../Trees/components/CoreToolbar.cjs');
require('../Paginator/index.cjs');
require('lucide-react-native');
require('../SelectButton/index.cjs');
require('../DataTable/DataTable.cjs');
require('../Tag/index.cjs');
require('../Badge/index.cjs');
require('../ProgressBar/index.cjs');
require('../Checkbox/index.cjs');
require('../RadioButton/index.cjs');

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
const t = style.resolveThemeTokenForNative;
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
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [filterQuery, setFilterQuery] = React.useState("");
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
  const selectedItem = React.useMemo(() => {
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
    reactNative.Keyboard.dismiss();
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
  const renderItem = React.useCallback(
    ({ item }) => {
      if (!item) {
        return null;
      }
      if (item.__group) {
        return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.groupLabel, { backgroundColor: colors.groupBg }], children: optionGroupLabel ? item.group?.[optionGroupLabel] : "" });
      }
      const selected = value != null && getValue(item, optionValue) === value;
      let content;
      if (itemTemplate) {
        const rendered = itemTemplate(item);
        content = React.isValidElement(rendered) ? rendered : /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { children: String(rendered ?? "") });
      } else {
        content = /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [{ color: colors.text }, externalTextStyle && { fontSize: externalTextStyle.fontSize }], children: getLabel(item, optionLabel) });
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(
        reactNative.Pressable,
        {
          onPress: () => selectItem(item),
          style: [
            styles.option,
            selected && highlightOnSelect && { backgroundColor: colors.optionSelected }
          ],
          children: [
            content,
            checkmark && selected && /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { children: "\u2713" })
          ]
        }
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
  const flatData = React.useMemo(() => {
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
  const filteredData = React.useMemo(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: styles.container, testID, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      reactNative.Pressable,
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
          editable ? /* @__PURE__ */ jsxRuntime.jsx(index.Input, { style: styles.input, children: /* @__PURE__ */ jsxRuntime.jsx(
            index.InputField,
            {
              ref: inputRef,
              value: inputText,
              onChangeText: setInputText,
              placeholder,
              editable: !disabled
            }
          ) }) : /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [
            displayValue ? { color: colors.text } : { color: colors.placeholder },
            externalTextStyle,
            !displayValue && { color: colors.placeholder }
          ], children: displayValue || placeholder }),
          /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [{ color: colors.text }, externalTextStyle], children: "\u25BE" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: [styles.panel, { borderColor: colors.border, backgroundColor: colors.bg }], children: [
      filter && /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [styles.filterContainer, { borderBottomColor: colors.filterBorder }], children: /* @__PURE__ */ jsxRuntime.jsx(
        reactNative.TextInput,
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
      /* @__PURE__ */ jsxRuntime.jsx(
        reactNative.FlatList,
        {
          data: filteredData,
          keyExtractor: (_, i) => String(i),
          renderItem,
          keyboardShouldPersistTaps: "handled",
          ListEmptyComponent: filterQuery ? /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: styles.emptyContainer, children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.emptyText, { color: colors.emptyText }], children: emptyFilterMessage }) }) : null,
          getItemLayout: virtualScrollerOptions ? (_, index) => ({
            length: virtualScrollerOptions.itemSize,
            offset: virtualScrollerOptions.itemSize * index,
            index
          }) : void 0
        }
      ),
      panelFooterTemplate?.()
    ] })
  ] });
}
const styles = reactNative.StyleSheet.create({
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

exports.default = Dropdown;
//# sourceMappingURL=index.cjs.map
