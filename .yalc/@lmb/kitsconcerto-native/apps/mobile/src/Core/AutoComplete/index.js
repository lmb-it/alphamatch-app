import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Keyboard, View, Text, Pressable, TextInput, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { resolveThemeTokenForNative } from '../../Factory/helpers/style.js';

const resolveLabel = (item, field) => {
  if (item == null) return "";
  if (!field) return String(item);
  return String(item[field] ?? "");
};
const t = resolveThemeTokenForNative;
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
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const blurTimeoutRef = useRef(null);
  const [query, setQuery] = useState("");
  const [panelVisible, setPanelVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onUnselectRef = useRef(onUnselect);
  onUnselectRef.current = onUnselect;
  const onShowRef = useRef(onShow);
  onShowRef.current = onShow;
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;
  const isFilled = variant === "filled";
  const isMultiple = !!multiple;
  const colors = useMemo(() => ({
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
  const selectedValues = useMemo(() => {
    if (!isMultiple) return [];
    if (Array.isArray(value)) return value;
    return [];
  }, [value, isMultiple]);
  const flatData = useMemo(() => {
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
  useEffect(() => {
    if (!isMultiple && value != null) {
      const label = resolveLabel(value, field);
      setQuery(label);
    } else if (!isMultiple && value == null) {
      setQuery("");
    }
  }, [value, field, isMultiple]);
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);
  useEffect(() => {
    if (autoHighlight && flatData.length > 0 && panelVisible) {
      const firstNonGroup = flatData.findIndex((d) => !d.__group);
      setHighlightedIndex(firstNonGroup >= 0 ? firstNonGroup : 0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [flatData, panelVisible, autoHighlight]);
  const showPanel = useCallback(() => {
    setPanelVisible((prev) => {
      if (!prev) onShowRef.current?.();
      return true;
    });
  }, []);
  const hidePanel = useCallback(() => {
    setPanelVisible((prev) => {
      if (prev) onHideRef.current?.();
      return false;
    });
  }, []);
  const triggerSearch = useCallback(
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
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);
  const onTextChange = useCallback(
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
  const selectItem = useCallback(
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
        Keyboard.dismiss();
      }
    },
    [isMultiple, selectedValues, selectionLimit, field, hidePanel]
  );
  const removeChip = useCallback(
    (item, index) => {
      const newValues = selectedValues.filter((_, i) => i !== index);
      onChangeRef.current?.({ originalEvent: void 0, value: newValues });
      onUnselectRef.current?.({ originalEvent: void 0, value: item });
    },
    [selectedValues]
  );
  const onDropdownPress = useCallback(() => {
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
  const handleFocus = useCallback(
    (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );
  const queryRef = useRef(query);
  queryRef.current = query;
  const suggestionsRef = useRef(suggestions);
  suggestionsRef.current = suggestions;
  const handleBlur = useCallback(
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
  const renderItem = useCallback(
    ({ item, index }) => {
      if (!item) return null;
      if (item.__group) {
        if (optionGroupTemplate) {
          return /* @__PURE__ */ jsx(Fragment, { children: optionGroupTemplate(item.group) });
        }
        return /* @__PURE__ */ jsx(View, { style: [styles.groupLabel, { backgroundColor: colors.groupBg }], children: /* @__PURE__ */ jsx(Text, { style: styles.groupLabelText, children: optionGroupLabel ? item.group?.[optionGroupLabel] : "" }) });
      }
      const isHighlighted = index === highlightedIndex;
      const isLast = index === flatData.length - 1;
      if (itemTemplate) {
        const rendered = itemTemplate(item, index);
        return rendered ? /* @__PURE__ */ jsx(Pressable, { onPress: () => {
          selectItem(item);
        }, children: rendered }) : null;
      }
      return /* @__PURE__ */ jsx(
        Pressable,
        {
          onPress: () => {
            selectItem(item);
          },
          style: [
            styles.option,
            !isLast && { borderBottomWidth: 1, borderBottomColor: colors.itemBorder },
            isHighlighted && { backgroundColor: colors.itemHighlight }
          ],
          children: /* @__PURE__ */ jsx(Text, { style: [styles.optionText, { color: colors.text }], children: resolveLabel(item, field) })
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
  return /* @__PURE__ */ jsxs(View, { style: [styles.container, style], testID, children: [
    /* @__PURE__ */ jsxs(
      View,
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
          isMultiple && selectedValues.length > 0 && /* @__PURE__ */ jsx(View, { style: styles.chipContainer, children: selectedValues.map(
            (item, i) => selectedItemTemplate ? /* @__PURE__ */ jsx(View, { children: selectedItemTemplate(item) }, i) : /* @__PURE__ */ jsxs(View, { style: [styles.chip, { backgroundColor: colors.chipBg }], children: [
              /* @__PURE__ */ jsx(Text, { style: [styles.chipText, { color: colors.chipText }], children: resolveLabel(item, field) }),
              !disabled && !readOnly && /* @__PURE__ */ jsx(
                Pressable,
                {
                  onPress: () => removeChip(item, i),
                  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
                  children: /* @__PURE__ */ jsx(Text, { style: [styles.chipRemove, { color: colors.chipRemove }], children: "\u2715" })
                }
              )
            ] }, i)
          ) }),
          /* @__PURE__ */ jsx(
            TextInput,
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
          loading && /* @__PURE__ */ jsx(
            ActivityIndicator,
            {
              size: "small",
              color: colors.primary,
              style: styles.loadingIndicator
            }
          ),
          dropdown && /* @__PURE__ */ jsx(
            Pressable,
            {
              onPress: onDropdownPress,
              style: styles.dropdownBtn,
              disabled: disabled || readOnly,
              children: /* @__PURE__ */ jsx(Text, { style: { color: colors.placeholder }, children: "\u25BE" })
            }
          )
        ]
      }
    ),
    showPanelContent && /* @__PURE__ */ jsxs(
      View,
      {
        style: [
          styles.panel,
          { borderColor: colors.border, backgroundColor: colors.bg, maxHeight: scrollHeight },
          panelStyle
        ],
        children: [
          flatData.length > 0 ? /* @__PURE__ */ jsx(
            FlatList,
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
          ) : /* @__PURE__ */ jsx(View, { style: styles.emptyContainer, children: /* @__PURE__ */ jsx(Text, { style: [styles.emptyText, { color: colors.emptyText }], children: emptyMessage }) }),
          panelFooterTemplate?.()
        ]
      }
    )
  ] });
}
const styles = StyleSheet.create({
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

export { AutoComplete as default };
//# sourceMappingURL=index.js.map
