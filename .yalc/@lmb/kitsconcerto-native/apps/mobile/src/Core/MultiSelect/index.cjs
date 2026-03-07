'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var style = require('../../Factory/helpers/style.cjs');

const t = style.resolveThemeTokenForNative;
function MultiSelect(props) {
  const {
    value,
    onChange,
    options = [],
    optionLabel,
    optionValue,
    optionGroupLabel,
    optionGroupChildren,
    isModal = false,
    placeholder = "Select",
    disabled,
    loading,
    filter,
    emptyFilterMessage = "No results found",
    display = "chip",
    maxSelectedLabels = 10,
    itemTemplate,
    selectedItemTemplate
  } = props;
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const colors = {
    border: t("gray.300"),
    borderFocus: t("primary"),
    bg: "#fff",
    disabledBg: t("gray.100"),
    placeholder: t("gray.400"),
    text: t("gray.800"),
    textSecondary: t("gray.500"),
    chipBg: t("indigo.100"),
    chipText: t("indigo.700"),
    chipRemove: t("indigo.500"),
    chipMoreBg: t("gray.100"),
    headerBorder: t("gray.200"),
    groupBg: t("gray.50"),
    groupBorder: t("gray.200"),
    itemBorder: t("gray.100"),
    itemSelectedBg: t("indigo.50"),
    itemSelectedText: t("indigo.700"),
    checkboxBorder: t("gray.300"),
    checkboxChecked: t("primary"),
    invalidBorder: t("red.500"),
    searchBg: t("gray.50")
  };
  const getValue = (item, key) => key ? item[key] : item;
  const getLabel = (item, key) => String(key ? item[key] : item);
  const selectedValues = Array.isArray(value) ? value : [];
  const displayItems = React.useMemo(() => {
    if (optionGroupLabel && optionGroupChildren) {
      const result = [];
      options.forEach((group) => {
        result.push({ type: "group", data: group });
        const children = group[optionGroupChildren] ?? [];
        children.forEach((child) => result.push({ type: "item", data: child }));
      });
      return result;
    }
    return options.map((item) => ({ type: "item", data: item }));
  }, [options, optionGroupLabel, optionGroupChildren]);
  const filtered = React.useMemo(() => {
    if (!filter || !query) return displayItems;
    return displayItems.filter((entry) => {
      if (entry.type === "group") return true;
      return getLabel(entry.data, optionLabel).toLowerCase().includes(query.toLowerCase());
    });
  }, [query, displayItems]);
  const isSelected = (item) => selectedValues.some(
    (v) => getValue(v, optionValue) === getValue(item, optionValue)
  );
  const toggleItem = (item) => {
    const exists = isSelected(item);
    const next = exists ? selectedValues.filter(
      (v) => getValue(v, optionValue) !== getValue(item, optionValue)
    ) : [...selectedValues, item];
    const syntheticEvent = {
      target: { value: next }
    };
    onChange?.(syntheticEvent, next);
  };
  const removeItem = (item) => {
    const next = selectedValues.filter(
      (v) => getValue(v, optionValue) !== getValue(item, optionValue)
    );
    const syntheticEvent = {
      target: { value: next }
    };
    onChange?.(syntheticEvent, next);
  };
  const renderCheckbox = (checked) => /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.View,
    {
      style: [
        styles.checkbox,
        { borderColor: colors.checkboxBorder, backgroundColor: colors.bg },
        checked && { backgroundColor: colors.checkboxChecked, borderColor: colors.checkboxChecked }
      ],
      children: checked && /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: styles.checkmark, children: "\u2713" })
    }
  );
  const renderListContent = () => {
    if (loading) {
      return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: styles.loadingContainer, children: [
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.ActivityIndicator, { size: "small", color: colors.checkboxChecked }),
        /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.loadingText, { color: colors.placeholder }], children: "Loading..." })
      ] });
    }
    const itemsOnly = filtered.filter((e) => e.type === "item");
    if (itemsOnly.length === 0) {
      return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: styles.emptyContainer, children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.emptyText, { color: colors.placeholder }], children: emptyFilterMessage }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.FlatList,
      {
        data: filtered,
        keyExtractor: (entry, i) => entry.type === "group" ? `group-${i}` : `item-${i}`,
        keyboardShouldPersistTaps: "handled",
        renderItem: ({ item: entry }) => {
          if (entry.type === "group") {
            return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [styles.groupHeader, { backgroundColor: colors.groupBg, borderBottomColor: colors.groupBorder }], children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.groupHeaderText, { color: colors.textSecondary }], children: getLabel(entry.data, optionGroupLabel) }) });
          }
          const checked = isSelected(entry.data);
          return /* @__PURE__ */ jsxRuntime.jsxs(
            reactNative.TouchableOpacity,
            {
              onPress: () => toggleItem(entry.data),
              style: [
                styles.item,
                { borderBottomColor: colors.itemBorder },
                checked && { backgroundColor: colors.itemSelectedBg }
              ],
              activeOpacity: 0.7,
              children: [
                renderCheckbox(checked),
                itemTemplate ? itemTemplate(entry.data) : /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [
                  styles.itemText,
                  { color: colors.text },
                  checked && { color: colors.itemSelectedText, fontWeight: "500" }
                ], children: getLabel(entry.data, optionLabel) })
              ]
            }
          );
        }
      }
    );
  };
  const renderSelected = () => {
    if (!selectedValues.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.placeholder, { color: colors.placeholder }], children: placeholder });
    }
    if (display === "chip") {
      const visibleItems = selectedValues.slice(0, maxSelectedLabels);
      const remaining = selectedValues.length - maxSelectedLabels;
      return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: styles.chips, children: [
        visibleItems.map(
          (item, i) => selectedItemTemplate ? /* @__PURE__ */ jsxRuntime.jsx(React.Fragment, { children: selectedItemTemplate(item) }, i) : /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: [styles.chip, { backgroundColor: colors.chipBg }], children: [
            /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.chipText, { color: colors.chipText }], children: getLabel(item, optionLabel) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              reactNative.TouchableOpacity,
              {
                onPress: () => removeItem(item),
                hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
                children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.chipRemove, { color: colors.chipRemove }], children: "\u2715" })
              }
            )
          ] }, i)
        ),
        remaining > 0 && /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [styles.chipMore, { backgroundColor: colors.chipMoreBg }], children: /* @__PURE__ */ jsxRuntime.jsxs(reactNative.Text, { style: [styles.chipMoreText, { color: colors.textSecondary }], children: [
          "+",
          remaining
        ] }) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { numberOfLines: 1, style: [styles.commaText, { color: colors.text }], children: selectedValues.slice(0, maxSelectedLabels).map((v) => getLabel(v, optionLabel)).join(", ") });
  };
  const panelContent = /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: { flex: 1 }, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: [styles.panelHeader, { borderBottomColor: colors.headerBorder }], children: [
      /* @__PURE__ */ jsxRuntime.jsxs(reactNative.Text, { style: [styles.panelHeaderText, { color: colors.textSecondary }], children: [
        selectedValues.length,
        " item",
        selectedValues.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(reactNative.TouchableOpacity, { onPress: () => setOpen(false), children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.panelCloseText, { color: colors.placeholder }], children: "\u2715" }) })
    ] }),
    filter && /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: [styles.searchContainer, { borderColor: colors.border, backgroundColor: colors.searchBg }], children: [
      /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: styles.searchIcon, children: "\u{1F50D}" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactNative.TextInput,
        {
          value: query,
          onChangeText: setQuery,
          placeholder: "Search...",
          style: [styles.searchInput, { color: colors.text }],
          placeholderTextColor: colors.placeholder
        }
      )
    ] }),
    renderListContent()
  ] });
  return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: { width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      reactNative.TouchableOpacity,
      {
        activeOpacity: 0.8,
        disabled,
        onPress: () => setOpen((prev) => !prev),
        style: [
          styles.input,
          { borderColor: colors.border, backgroundColor: colors.bg },
          disabled && { backgroundColor: colors.disabledBg, opacity: 0.6 },
          open && { borderColor: colors.borderFocus }
        ],
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: styles.inputContent, children: renderSelected() }),
          /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.dropdownArrow, { color: colors.placeholder }], children: open ? "\u25B2" : "\u25BC" })
        ]
      }
    ),
    isModal && /* @__PURE__ */ jsxRuntime.jsx(reactNative.Modal, { visible: open, transparent: true, animationType: "fade", children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { style: styles.overlay, onPress: () => setOpen(false), children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { style: [styles.modalPanel, { backgroundColor: colors.bg }], onPress: () => {
    }, children: panelContent }) }) }),
    !isModal && open && /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: reactNative.StyleSheet.absoluteFill, pointerEvents: "box-none", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        reactNative.TouchableOpacity,
        {
          style: styles.inlineBackdrop,
          activeOpacity: 1,
          onPress: () => setOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [styles.inlinePanel, { backgroundColor: colors.bg, borderColor: colors.border }], children: panelContent })
    ] })
  ] });
}
const styles = reactNative.StyleSheet.create({
  // Input
  input: {
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center"
  },
  inputContent: {
    flex: 1
  },
  dropdownArrow: {
    fontSize: 10,
    marginLeft: 8
  },
  // Placeholder
  placeholder: { fontSize: 14 },
  commaText: { fontSize: 14 },
  // Chips display
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 6,
    paddingVertical: 3,
    borderRadius: 16,
    gap: 4
  },
  chipText: {
    fontSize: 13
  },
  chipRemove: {
    fontSize: 12,
    paddingHorizontal: 2
  },
  chipMore: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16
  },
  chipMoreText: {
    fontSize: 13
  },
  // Panel header
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1
  },
  panelHeaderText: {
    fontSize: 13
  },
  panelCloseText: {
    fontSize: 18,
    fontWeight: "600"
  },
  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    paddingHorizontal: 10,
    height: 36,
    borderWidth: 1,
    borderRadius: 6
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0
  },
  // Group header
  groupHeader: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: reactNative.StyleSheet.hairlineWidth
  },
  groupHeaderText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  // Items
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10,
    borderBottomWidth: reactNative.StyleSheet.hairlineWidth
  },
  itemText: {
    fontSize: 14,
    flex: 1
  },
  // Checkbox
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  checkmark: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700"
  },
  // Loading / Empty
  loadingContainer: {
    padding: 24,
    alignItems: "center",
    gap: 8
  },
  loadingText: {
    fontSize: 13
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center"
  },
  emptyText: {
    fontSize: 14
  },
  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },
  modalPanel: {
    margin: 24,
    maxHeight: "70%",
    borderRadius: 12,
    overflow: "hidden"
  },
  // Inline dropdown
  inlineBackdrop: {
    ...reactNative.StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 1
  },
  inlinePanel: {
    position: "absolute",
    top: 46,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 300,
    zIndex: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  }
});

exports.default = MultiSelect;
//# sourceMappingURL=index.cjs.map
