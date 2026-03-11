import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useImperativeHandle } from 'react';
import { View, ActivityIndicator, TextInput, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronDown, ChevronRight, Check, Minus } from 'lucide-react-native';
import { useTreeEngine } from '../hooks/useTreeEngine.js';
import { resolveThemeTokenForNative } from '../../../Factory/helpers/style.js';

const t = resolveThemeTokenForNative;
const CoreTree = (props) => {
  const colors = {
    primary: t("primary"),
    primaryDark: t("blue.600"),
    primaryLight: t("blue.50"),
    text: t("gray.700"),
    textSecondary: t("gray.500"),
    border: t("gray.300"),
    surface: "#ffffff",
    disabled: t("gray.400")
  };
  const [internalFilterValue, setInternalFilterValue] = useState("");
  useImperativeHandle(props.ref, () => ({
    filter: (value) => setInternalFilterValue(String(value ?? ""))
  }));
  const resolvedFilterValue = props.filterValue ?? internalFilterValue;
  const [internalExpandedKeys, setInternalExpandedKeys] = useState({});
  const resolvedExpandedKeys = props.expandedKeys !== void 0 ? props.expandedKeys : internalExpandedKeys;
  const { state, actions } = useTreeEngine({
    nodes: props.value,
    selectionMode: props.selectionMode,
    selectionKeys: props.selectionKeys,
    metaKeySelection: props.metaKeySelection,
    expandedKeys: props.expandedKeys,
    filterValue: resolvedFilterValue,
    filterBy: props.filterBy,
    filterMode: props.filterMode,
    onSelectionChange: props.onSelectionChange,
    onToggle: props.onToggle,
    onExpand: props.onExpand,
    onCollapse: props.onCollapse
  });
  const handleToggle = (node, originalEvent) => {
    const key = node.key;
    if (!key) return;
    const nextExpandedKeys = { ...resolvedExpandedKeys };
    if (nextExpandedKeys[key]) {
      delete nextExpandedKeys[key];
    } else {
      nextExpandedKeys[key] = true;
    }
    if (props.expandedKeys === void 0) {
      setInternalExpandedKeys(nextExpandedKeys);
    }
    props.onToggle?.({
      originalEvent,
      value: nextExpandedKeys
    });
    if (nextExpandedKeys[key]) {
      props.onExpand?.({ originalEvent, node });
    } else {
      props.onCollapse?.({ originalEvent, node });
    }
  };
  const isNodeSelected = (node) => {
    if (!props.selectionMode || !props.selectionKeys) return false;
    if (props.selectionMode === "single") return props.selectionKeys === node.key;
    if (props.selectionMode === "multiple") return !!props.selectionKeys?.[node.key];
    if (props.selectionMode === "checkbox") return !!props.selectionKeys?.[node.key]?.checked;
    return false;
  };
  const isNodePartialChecked = (node) => {
    if (props.selectionMode !== "checkbox" || !props.selectionKeys) return false;
    const entry = props.selectionKeys?.[node.key];
    return !!entry?.partialChecked && !entry?.checked;
  };
  const renderCheckbox = (node) => {
    const checked = isNodeSelected(node);
    const partial = isNodePartialChecked(node);
    return /* @__PURE__ */ jsxs(
      Pressable,
      {
        onPress: (e) => {
          if (node.selectable !== false && !node.disabled) {
            actions.selectNode(node.key, { originalEvent: e });
          }
        },
        style: [
          styles.checkbox,
          { borderColor: colors.border, backgroundColor: "#fff" },
          checked && { backgroundColor: colors.primary, borderColor: colors.primary },
          partial && { backgroundColor: colors.primary, borderColor: colors.primary },
          node.disabled && styles.checkboxDisabled
        ],
        children: [
          checked && /* @__PURE__ */ jsx(Check, { size: 12, color: "#fff", strokeWidth: 3 }),
          partial && !checked && /* @__PURE__ */ jsx(Minus, { size: 12, color: "#fff", strokeWidth: 3 })
        ]
      }
    );
  };
  const renderToggler = (node, expanded) => {
    if (props.togglerTemplate) {
      return props.togglerTemplate(node, { expanded });
    }
    return /* @__PURE__ */ jsx(
      Pressable,
      {
        onPress: (e) => handleToggle(node, e),
        hitSlop: 6,
        style: styles.toggler,
        children: expanded ? /* @__PURE__ */ jsx(ChevronDown, { size: 16, color: colors.textSecondary }) : /* @__PURE__ */ jsx(ChevronRight, { size: 16, color: colors.textSecondary })
      }
    );
  };
  const renderNode = (node, level = 0) => {
    if (props.onlyParentsWithChildren && (!node.children || node.children.length === 0)) {
      return null;
    }
    const expanded = !!resolvedExpandedKeys?.[node.key];
    const hasChildren = !!node.children?.length || node.leaf === false;
    const isSelected = isNodeSelected(node);
    const isSelectable = node.selectable !== false && !node.disabled;
    return /* @__PURE__ */ jsxs(View, { style: { paddingLeft: level * 20 }, children: [
      /* @__PURE__ */ jsxs(
        Pressable,
        {
          disabled: node.disabled,
          onPress: (e) => {
            props.onNodeClick?.({
              originalEvent: e,
              node
            });
            if (props.selectionMode && props.selectionMode !== "checkbox" && isSelectable) {
              actions.selectNode(node.key, { originalEvent: e });
            }
          },
          style: [
            styles.nodeContent,
            isSelected && { backgroundColor: colors.primaryLight },
            node.disabled && styles.nodeContentDisabled
          ],
          children: [
            hasChildren ? renderToggler(node, expanded) : /* @__PURE__ */ jsx(View, { style: styles.togglerPlaceholder }),
            props.selectionMode === "checkbox" && /* @__PURE__ */ jsx(View, { style: styles.checkboxWrapper, children: renderCheckbox(node) }),
            /* @__PURE__ */ jsx(View, { style: styles.nodeLabel, children: props.nodeTemplate ? props.nodeTemplate(node, { expanded, level, selected: isSelected }) : /* @__PURE__ */ jsx(
              Text,
              {
                style: [
                  styles.nodeLabelText,
                  { color: colors.text },
                  isSelected && { color: colors.primaryDark, fontWeight: "600" },
                  node.disabled && { color: colors.disabled }
                ],
                numberOfLines: 1,
                children: node.label
              }
            ) })
          ]
        }
      ),
      expanded && node.children?.map((child) => renderNode(child, level + 1))
    ] }, node.key);
  };
  if (props.loading) {
    return /* @__PURE__ */ jsx(View, { style: [styles.container, { backgroundColor: colors.surface, borderColor: colors.border }, props.style], children: /* @__PURE__ */ jsx(View, { style: styles.loadingContainer, children: /* @__PURE__ */ jsx(ActivityIndicator, { size: "small", color: colors.primary }) }) });
  }
  return /* @__PURE__ */ jsxs(View, { style: [styles.container, { backgroundColor: colors.surface, borderColor: colors.border }, props.style], children: [
    props.filter && /* @__PURE__ */ jsx(View, { style: [styles.filterContainer, { borderBottomColor: colors.border }], children: /* @__PURE__ */ jsx(
      TextInput,
      {
        value: resolvedFilterValue,
        onChangeText: (text) => {
          setInternalFilterValue(text);
        },
        placeholder: props.filterPlaceholder ?? "Search",
        placeholderTextColor: colors.textSecondary,
        style: [styles.filterInput, {
          borderColor: colors.border,
          color: colors.text,
          backgroundColor: colors.surface
        }]
      }
    ) }),
    /* @__PURE__ */ jsxs(ScrollView, { style: styles.scrollContainer, children: [
      state.nodes?.map((node) => renderNode(node)),
      (!state.nodes || state.nodes.length === 0) && /* @__PURE__ */ jsx(View, { style: styles.emptyContainer, children: /* @__PURE__ */ jsx(Text, { style: [styles.emptyText, { color: colors.textSecondary }], children: props.emptyMessage ?? "No records found" }) })
    ] })
  ] });
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden"
  },
  scrollContainer: {
    padding: 4
  },
  // Filter
  filterContainer: {
    padding: 8,
    borderBottomWidth: 1
  },
  filterInput: {
    height: 36,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14
  },
  // Node
  nodeContent: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 38,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4
  },
  nodeContentDisabled: {
    opacity: 0.5
  },
  // Toggler
  toggler: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  togglerPlaceholder: {
    width: 28
  },
  // Checkbox
  checkboxWrapper: {
    marginRight: 4
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxDisabled: {
    opacity: 0.5
  },
  // Label
  nodeLabel: {
    flex: 1,
    paddingLeft: 4
  },
  nodeLabelText: {
    fontSize: 14
  },
  // Loading
  loadingContainer: {
    padding: 24,
    alignItems: "center"
  },
  // Empty
  emptyContainer: {
    padding: 16,
    alignItems: "center"
  },
  emptyText: {
    fontSize: 14
  }
});

export { CoreTree as default };
//# sourceMappingURL=CoreTree.js.map
