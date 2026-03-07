'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var style = require('../../Factory/helpers/style.cjs');

const resolveLabel = (item, field) => {
  if (item == null) return "";
  if (!field) return String(item);
  return String(item[field] ?? "");
};
const t = style.resolveThemeTokenForNative;
function AutoComplete({
  value,
  suggestions = [],
  completeMethod,
  onChange,
  onSelect,
  onUnselect,
  onClear,
  onBlur,
  onFocus,
  onShow,
  onHide,
  onDropdownClick,
  placeholder,
  disabled,
  readOnly,
  autoFocus,
  invalid,
  loading,
  variant = "outlined",
  dropdown,
  dropdownMode = "blank",
  field,
  multiple,
  selectionLimit,
  forceSelection,
  delay = 300,
  minLength = 1,
  emptyMessage = "No results found",
  showEmptyMessage = false,
  scrollHeight = 200,
  autoHighlight,
  itemTemplate,
  selectedItemTemplate,
  panelFooterTemplate,
  optionGroupLabel,
  optionGroupChildren,
  optionGroupTemplate,
  virtualScrollerOptions,
  style,
  inputStyle,
  panelStyle,
  testID
}) {
  const inputRef = React.useRef(null);
  const debounceRef = React.useRef(null);
  const blurTimeoutRef = React.useRef(null);
  const [query, setQuery] = React.useState("");
  const [panelVisible, setPanelVisible] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const onSelectRef = React.useRef(onSelect);
  onSelectRef.current = onSelect;
  const onUnselectRef = React.useRef(onUnselect);
  onUnselectRef.current = onUnselect;
  const onShowRef = React.useRef(onShow);
  onShowRef.current = onShow;
  const onHideRef = React.useRef(onHide);
  onHideRef.current = onHide;
  const isFilled = variant === "filled";
  const isMultiple = !!multiple;
  const colors = React.useMemo(() => ({
    border: t("gray.300"),
    borderFocus: t("primary"),
    borderInvalid: t("red.500"),
    bg: isFilled ? t("gray.100") : t("surface-card") || "#fff",
    text: t("gray.800"),
    placeholder: t("gray.400"),
    itemBorder: t("gray.200"),
    itemHighlight: t("gray.100"),
    chipBg: t("indigo.100"),
    chipText: t("indigo.700"),
    chipRemove: t("indigo.500"),
    primary: t("primary"),
    emptyText: t("gray.400"),
    groupBg: t("gray.50")
  }), [isFilled]);
  const selectedValues = React.useMemo(() => {
    if (!isMultiple) return [];
    if (Array.isArray(value)) return value;
    return [];
  }, [value, isMultiple]);
  const flatData = React.useMemo(() => {
    if (!optionGroupLabel || !optionGroupChildren) return suggestions;
    const out = [];
    suggestions.forEach((group) => {
      out.push({ __group: true, group });
      const children = group[optionGroupChildren];
      if (Array.isArray(children)) {
        children.forEach((child) => out.push(child));
      }
    });
    return out;
  }, [suggestions, optionGroupLabel, optionGroupChildren]);
  React.useEffect(() => {
    if (!isMultiple && value != null) {
      const label = resolveLabel(value, field);
      setQuery(label);
    } else if (!isMultiple && value == null) {
      setQuery("");
    }
  }, [value, field, isMultiple]);
  React.useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);
  React.useEffect(() => {
    if (autoHighlight && flatData.length > 0 && panelVisible) {
      const firstNonGroup = flatData.findIndex((d) => !d.__group);
      setHighlightedIndex(firstNonGroup >= 0 ? firstNonGroup : 0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [flatData, panelVisible, autoHighlight]);
  const showPanel = React.useCallback(() => {
    setPanelVisible((prev) => {
      if (!prev) onShowRef.current?.();
      return true;
    });
  }, []);
  const hidePanel = React.useCallback(() => {
    setPanelVisible((prev) => {
      if (prev) onHideRef.current?.();
      return false;
    });
  }, []);
  const triggerSearch = React.useCallback(
    (text, event) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (text.length < minLength) {
        return;
      }
      debounceRef.current = setTimeout(() => {
        completeMethod?.({ originalEvent: event, query: text });
        showPanel();
      }, delay);
    },
    [completeMethod, delay, minLength, showPanel]
  );
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);
  const onTextChange = React.useCallback(
    (text) => {
      setQuery(text);
      if (text.length === 0) {
        hidePanel();
        if (!isMultiple) {
          onChangeRef.current?.({ originalEvent: void 0, value: null });
          onClear?.({ originalEvent: void 0 });
        }
        return;
      }
      triggerSearch(text);
    },
    [hidePanel, isMultiple, onClear, triggerSearch]
  );
  const selectItem = React.useCallback(
    (item) => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
      if (isMultiple) {
        if (selectionLimit && selectedValues.length >= selectionLimit) {
          return;
        }
        const isDuplicate = selectedValues.some(
          (v) => resolveLabel(v, field) === resolveLabel(item, field)
        );
        if (isDuplicate) {
          return;
        }
        const newValue = [...selectedValues, item];
        onChangeRef.current?.({ originalEvent: void 0, value: newValue });
        onSelectRef.current?.({ originalEvent: void 0, value: item });
        setQuery("");
      } else {
        const label = resolveLabel(item, field);
        onChangeRef.current?.({ originalEvent: void 0, value: item });
        onSelectRef.current?.({ originalEvent: void 0, value: item });
        setQuery(label);
        hidePanel();
        reactNative.Keyboard.dismiss();
      }
    },
    [isMultiple, selectedValues, selectionLimit, field, hidePanel]
  );
  const removeChip = React.useCallback(
    (item, index) => {
      const newValues = selectedValues.filter((_, i) => i !== index);
      onChangeRef.current?.({ originalEvent: void 0, value: newValues });
      onUnselectRef.current?.({ originalEvent: void 0, value: item });
    },
    [selectedValues]
  );
  const onDropdownPress = React.useCallback(() => {
    if (disabled || readOnly) return;
    const q = dropdownMode === "current" ? query : "";
    onDropdownClick?.({ originalEvent: void 0, query: q });
    completeMethod?.({ originalEvent: void 0, query: q });
    setPanelVisible((prev) => {
      if (prev) {
        onHideRef.current?.();
        return false;
      }
      onShowRef.current?.();
      return true;
    });
    inputRef.current?.focus();
  }, [disabled, readOnly, dropdownMode, query, onDropdownClick, completeMethod]);
  const handleFocus = React.useCallback(
    (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );
  const queryRef = React.useRef(query);
  queryRef.current = query;
  const suggestionsRef = React.useRef(suggestions);
  suggestionsRef.current = suggestions;
  const handleBlur = React.useCallback(
    (e) => {
      setFocused(false);
      blurTimeoutRef.current = setTimeout(() => {
        if (forceSelection && queryRef.current && !isMultiple) {
          const match = suggestionsRef.current.some(
            (s) => resolveLabel(s, field).toLowerCase() === queryRef.current.toLowerCase()
          );
          if (!match) {
            setQuery("");
            onChangeRef.current?.({ originalEvent: e, value: null });
          }
        }
        hidePanel();
        onBlur?.(e);
      }, 200);
    },
    [forceSelection, isMultiple, field, hidePanel, onBlur]
  );
  const renderItem = React.useCallback(
    ({ item, index }) => {
      if (!item) return null;
      if (item.__group) {
        if (optionGroupTemplate) {
          return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: optionGroupTemplate(item.group) });
        }
        return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: [styles.groupLabel, { backgroundColor: colors.groupBg }], children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: styles.groupLabelText, children: optionGroupLabel ? item.group?.[optionGroupLabel] : "" }) });
      }
      const isHighlighted = index === highlightedIndex;
      const isLast = index === flatData.length - 1;
      if (itemTemplate) {
        const rendered = itemTemplate(item, index);
        return rendered ? /* @__PURE__ */ jsxRuntime.jsx(reactNative.Pressable, { onPress: () => {
          selectItem(item);
        }, children: rendered }) : null;
      }
      return /* @__PURE__ */ jsxRuntime.jsx(
        reactNative.Pressable,
        {
          onPress: () => {
            selectItem(item);
          },
          style: [
            styles.option,
            !isLast && { borderBottomWidth: 1, borderBottomColor: colors.itemBorder },
            isHighlighted && { backgroundColor: colors.itemHighlight }
          ],
          children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.optionText, { color: colors.text }], children: resolveLabel(item, field) })
        }
      );
    },
    [
      flatData.length,
      highlightedIndex,
      itemTemplate,
      optionGroupTemplate,
      optionGroupLabel,
      field,
      selectItem,
      colors
    ]
  );
  const borderColor = invalid ? colors.borderInvalid : focused ? colors.borderFocus : colors.border;
  const showPanelContent = panelVisible && (flatData.length > 0 || showEmptyMessage || !!emptyMessage);
  return /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: [styles.container, style], testID, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      reactNative.View,
      {
        style: [
          styles.inputWrapper,
          {
            borderColor,
            backgroundColor: colors.bg,
            borderWidth: isFilled ? 0 : 1
          },
          isMultiple && styles.inputWrapperMultiple,
          disabled && styles.disabled,
          inputStyle
        ],
        children: [
          isMultiple && selectedValues.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: styles.chipContainer, children: selectedValues.map(
            (item, i) => selectedItemTemplate ? /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { children: selectedItemTemplate(item) }, i) : /* @__PURE__ */ jsxRuntime.jsxs(reactNative.View, { style: [styles.chip, { backgroundColor: colors.chipBg }], children: [
              /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.chipText, { color: colors.chipText }], children: resolveLabel(item, field) }),
              !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx(
                reactNative.Pressable,
                {
                  onPress: () => removeChip(item, i),
                  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
                  children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.chipRemove, { color: colors.chipRemove }], children: "\u2715" })
                }
              )
            ] }, i)
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactNative.TextInput,
            {
              ref: inputRef,
              editable: !disabled && !readOnly,
              value: query,
              placeholder,
              placeholderTextColor: colors.placeholder,
              onChangeText: onTextChange,
              onFocus: handleFocus,
              onBlur: handleBlur,
              style: [styles.inputField, { color: colors.text }]
            }
          ),
          loading && /* @__PURE__ */ jsxRuntime.jsx(
            reactNative.ActivityIndicator,
            {
              size: "small",
              color: colors.primary,
              style: styles.loadingIndicator
            }
          ),
          dropdown && /* @__PURE__ */ jsxRuntime.jsx(
            reactNative.Pressable,
            {
              onPress: onDropdownPress,
              style: styles.dropdownBtn,
              disabled: disabled || readOnly,
              children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: { color: colors.placeholder }, children: "\u25BE" })
            }
          )
        ]
      }
    ),
    showPanelContent && /* @__PURE__ */ jsxRuntime.jsxs(
      reactNative.View,
      {
        style: [
          styles.panel,
          { borderColor: colors.border, backgroundColor: colors.bg, maxHeight: scrollHeight },
          panelStyle
        ],
        children: [
          flatData.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(
            reactNative.FlatList,
            {
              data: flatData,
              keyExtractor: (_, i) => String(i),
              renderItem,
              extraData: selectItem,
              keyboardShouldPersistTaps: "handled",
              getItemLayout: virtualScrollerOptions ? (_, index) => ({
                length: virtualScrollerOptions.itemSize,
                offset: virtualScrollerOptions.itemSize * index,
                index
              }) : void 0
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: styles.emptyContainer, children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: [styles.emptyText, { color: colors.emptyText }], children: emptyMessage }) }),
          panelFooterTemplate?.()
        ]
      }
    )
  ] });
}
const styles = reactNative.StyleSheet.create({
  container: {
    width: "100%",
    position: "relative"
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 8,
    minHeight: 42
  },
  inputWrapperMultiple: {
    flexWrap: "wrap",
    paddingVertical: 4
  },
  disabled: {
    opacity: 0.5
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    minWidth: 80
  },
  loadingIndicator: {
    marginRight: 8
  },
  dropdownBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginRight: 4
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
  panel: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 6,
    zIndex: 1e3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden"
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  optionText: {
    fontSize: 14
  },
  groupLabel: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  groupLabelText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center"
  },
  emptyText: {
    fontSize: 14
  }
});

exports.default = AutoComplete;
//# sourceMappingURL=index.cjs.map
