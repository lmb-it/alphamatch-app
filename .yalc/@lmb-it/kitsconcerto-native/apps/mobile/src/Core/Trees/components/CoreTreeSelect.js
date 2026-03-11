import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { View, ScrollView, Pressable, Modal, Text, StyleSheet } from 'react-native';
import { X, ChevronDown } from 'lucide-react-native';
import CoreTree from './CoreTree.js';
import { resolveThemeTokenForNative } from '../../../Factory/helpers/style.js';

const t = resolveThemeTokenForNative;
const CoreTreeSelect = (props) => {
  const {
    value,
    options,
    onChange,
    selectionMode = "single",
    metaKeySelection,
    display = "comma",
    placeholder = "Select",
    showClear,
    filter,
    filterBy,
    filterMode,
    filterPlaceholder,
    resetFilterOnHide,
    expandedKeys,
    onToggle,
    disabled,
    invalid,
    variant = "outlined",
    isModal = true,
    panelHeaderTemplate,
    panelFooterTemplate,
    nodeTemplate,
    emptyMessage,
    scrollHeight,
    onShow,
    onHide,
    onlyParentsWithChildren,
    className,
    style
  } = props;
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [internalFilterValue, setInternalFilterValue] = useState("");
  const colors = {
    primary: t("primary"),
    primaryDark: t("blue.600"),
    primaryLight: t("blue.50"),
    text: t("gray.700"),
    textSecondary: t("gray.500"),
    placeholder: t("gray.500"),
    border: t("gray.300"),
    borderFocus: t("primary"),
    surface: "#ffffff",
    hover: t("gray.200"),
    invalid: t("red.500"),
    chip: t("gray.300"),
    chipText: t("gray.700"),
    overlay: "rgba(0, 0, 0, 0.4)"
  };
  const handleOpen = () => {
    setOpen(true);
    setFocused(true);
    onShow?.();
  };
  const handleClose = () => {
    setOpen(false);
    setFocused(false);
    if (resetFilterOnHide) setInternalFilterValue("");
    onHide?.();
  };
  const nodeMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    const walk = (nodes) => {
      nodes?.forEach((n) => {
        map.set(n.key, n);
        walk(n.children);
      });
    };
    walk(options);
    return map;
  }, [options]);
  const selectedLabels = useMemo(() => {
    if (!value || !options) return [];
    if (typeof value === "string") {
      const node = nodeMap.get(value);
      return node?.label ? [node.label] : [];
    }
    if (value && typeof value === "object") {
      return Object.keys(value).filter((k) => {
        const v = value[k];
        if (!(v === true || v?.checked)) return false;
        if (v?.partialChecked && !v?.checked) return false;
        const node = nodeMap.get(k);
        if (node && node.selectable === false) return false;
        return true;
      }).map((k) => nodeMap.get(k)?.label).filter(Boolean);
    }
    return [];
  }, [value, options, nodeMap]);
  const hasValue = selectedLabels.length > 0;
  const handleChange = (next, originalEvent) => {
    const event = {
      originalEvent,
      value: next
    };
    onChange?.(event);
  };
  const clearSelection = () => {
    handleChange(selectionMode === "single" ? null : null);
  };
  const renderDisplayValue = () => {
    if (!hasValue) {
      return /* @__PURE__ */ jsx(Text, { style: [styles.placeholder, { color: colors.placeholder }], children: placeholder });
    }
    if (display === "chip") {
      return /* @__PURE__ */ jsx(View, { style: styles.chipContainer, children: selectedLabels.map((label, i) => /* @__PURE__ */ jsx(View, { style: [styles.chip, { backgroundColor: colors.chip }], children: /* @__PURE__ */ jsx(Text, { style: [styles.chipText, { color: colors.chipText }], numberOfLines: 1, children: label }) }, i)) });
    }
    return /* @__PURE__ */ jsx(Text, { style: [styles.valueText, { color: colors.text }], numberOfLines: 1, children: selectedLabels.join(", ") });
  };
  const Panel = /* @__PURE__ */ jsxs(View, { style: styles.panel, children: [
    panelHeaderTemplate && /* @__PURE__ */ jsx(View, { style: [styles.panelHeader, { borderBottomColor: colors.border }], children: typeof panelHeaderTemplate === "function" ? panelHeaderTemplate() : panelHeaderTemplate }),
    /* @__PURE__ */ jsx(
      ScrollView,
      {
        style: { maxHeight: scrollHeight ?? 350 },
        nestedScrollEnabled: true,
        children: /* @__PURE__ */ jsx(
          CoreTree,
          {
            value: options,
            selectionMode,
            selectionKeys: value,
            metaKeySelection,
            expandedKeys,
            onToggle,
            filter,
            filterValue: internalFilterValue,
            filterBy,
            filterMode,
            filterPlaceholder,
            nodeTemplate,
            emptyMessage,
            onlyParentsWithChildren,
            onSelectionChange: (e) => {
              handleChange(e.value, e.originalEvent);
              if (!selectionMode || selectionMode === "single") {
                handleClose();
              }
            },
            style: { borderWidth: 0, borderRadius: 0 }
          }
        )
      }
    ),
    panelFooterTemplate && /* @__PURE__ */ jsx(View, { style: [styles.panelFooter, { borderTopColor: colors.border }], children: typeof panelFooterTemplate === "function" ? panelFooterTemplate() : panelFooterTemplate })
  ] });
  return /* @__PURE__ */ jsxs(View, { style: [{ width: "100%" }, style], className, children: [
    /* @__PURE__ */ jsxs(
      Pressable,
      {
        disabled,
        onPress: handleOpen,
        style: [
          styles.input,
          { borderColor: colors.border, backgroundColor: colors.surface },
          variant === "filled" && { backgroundColor: "#f8f9fa", borderColor: "transparent", borderBottomColor: colors.border, borderRadius: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
          focused && { borderColor: colors.borderFocus },
          invalid && { borderColor: colors.invalid },
          disabled && { opacity: 0.6, backgroundColor: t("gray.200") }
        ],
        children: [
          /* @__PURE__ */ jsx(View, { style: styles.inputValueContainer, children: renderDisplayValue() }),
          /* @__PURE__ */ jsxs(View, { style: styles.inputIcons, children: [
            showClear && hasValue && !disabled && /* @__PURE__ */ jsx(
              Pressable,
              {
                onPress: (e) => {
                  e.stopPropagation?.();
                  clearSelection();
                },
                hitSlop: 8,
                style: styles.clearButton,
                children: /* @__PURE__ */ jsx(X, { size: 14, color: colors.textSecondary })
              }
            ),
            /* @__PURE__ */ jsx(View, { style: styles.dropdownIcon, children: /* @__PURE__ */ jsx(ChevronDown, { size: 16, color: colors.textSecondary }) })
          ] })
        ]
      }
    ),
    isModal ? /* @__PURE__ */ jsx(
      Modal,
      {
        visible: open,
        transparent: true,
        animationType: "fade",
        onRequestClose: handleClose,
        children: /* @__PURE__ */ jsx(
          Pressable,
          {
            style: [styles.overlay, { backgroundColor: colors.overlay }],
            onPress: handleClose,
            children: /* @__PURE__ */ jsxs(
              Pressable,
              {
                onPress: () => {
                },
                style: [styles.modalPanel, { backgroundColor: colors.surface }],
                children: [
                  /* @__PURE__ */ jsxs(View, { style: [styles.modalHeader, { borderBottomColor: colors.border }], children: [
                    /* @__PURE__ */ jsx(Text, { style: [styles.modalHeaderText, { color: colors.text }], children: placeholder }),
                    /* @__PURE__ */ jsx(
                      Pressable,
                      {
                        onPress: handleClose,
                        hitSlop: 8,
                        children: /* @__PURE__ */ jsx(X, { size: 20, color: colors.textSecondary })
                      }
                    )
                  ] }),
                  Panel
                ]
              }
            )
          }
        )
      }
    ) : open && /* @__PURE__ */ jsxs(View, { style: StyleSheet.absoluteFill, pointerEvents: "box-none", children: [
      /* @__PURE__ */ jsx(
        Pressable,
        {
          style: styles.inlineBackdrop,
          onPress: handleClose
        }
      ),
      /* @__PURE__ */ jsx(View, { style: [styles.inlinePanel, { backgroundColor: colors.surface, borderColor: colors.border }], children: Panel })
    ] })
  ] });
};
const styles = StyleSheet.create({
  // Input
  input: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 4
  },
  inputValueContainer: {
    flex: 1,
    marginRight: 4
  },
  inputIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  // Placeholder / value
  placeholder: {
    fontSize: 14
  },
  valueText: {
    fontSize: 14
  },
  // Chips
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16
  },
  chipText: {
    fontSize: 13
  },
  // Clear / dropdown icons
  clearButton: {
    padding: 4
  },
  dropdownIcon: {
    padding: 4
  },
  // Overlay (modal)
  overlay: {
    flex: 1,
    justifyContent: "center"
  },
  modalPanel: {
    marginHorizontal: 20,
    borderRadius: 8,
    maxHeight: "70%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1
  },
  modalHeaderText: {
    fontSize: 16,
    fontWeight: "600"
  },
  // Panel
  panel: {
    flex: 1
  },
  panelHeader: {
    borderBottomWidth: 1,
    padding: 8
  },
  panelFooter: {
    borderTopWidth: 1,
    padding: 8
  },
  // Inline dropdown
  inlineBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 1
  },
  inlinePanel: {
    position: "absolute",
    top: 46,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 6,
    zIndex: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  }
});

export { CoreTreeSelect as default };
//# sourceMappingURL=CoreTreeSelect.js.map
