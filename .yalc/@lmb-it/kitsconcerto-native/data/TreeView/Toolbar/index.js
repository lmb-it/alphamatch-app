import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useWindowDimensions, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useKitsTheme } from '../../../contexts/Theme/KitsThemeProvider.js';
import { IconMap } from '../../../assets/Icons/index.js';

const Icon = ({ name, color = "#333", size = 16 }) => {
  const cleanName = name.replace("pi pi-", "");
  const C = IconMap[cleanName];
  if (!C) return null;
  return /* @__PURE__ */ jsx(C, { size, color });
};
const ActionButton = ({
  icon,
  onPress,
  disabled,
  variant = "primary",
  hideDisabledButton
}) => {
  const { resolveToken } = useKitsTheme();
  if (disabled && hideDisabledButton) return null;
  const bgColor = variant === "danger" ? resolveToken("red.50") : variant === "secondary" ? resolveToken("bg-subtle") : resolveToken("blue.50");
  const iconColor = variant === "danger" ? resolveToken("danger") : variant === "secondary" ? resolveToken("text-secondary") : resolveToken("primary");
  return /* @__PURE__ */ jsx(
    TouchableOpacity,
    {
      onPress,
      disabled,
      style: [
        styles.button,
        { backgroundColor: disabled ? resolveToken("bg-subtle") : bgColor, opacity: disabled ? 0.5 : 1 }
      ],
      children: /* @__PURE__ */ jsx(Icon, { name: icon, color: disabled ? resolveToken("gray.400") : iconColor })
    }
  );
};
const TreeViewToolbar = ({
  props,
  filterValue,
  setFilterValue,
  treeRef,
  selectedNode,
  expandAll,
  collapseAll,
  onAddNode,
  onAddNodeItem,
  onDeleteNode,
  onEditNode,
  build
}) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const { resolveToken } = useKitsTheme();
  const toolbarBg = resolveToken("bg-subtle");
  const toolbarBorder = resolveToken("border");
  const searchBg = resolveToken("surface-card");
  const searchBorder = resolveToken("border");
  const searchTextColor = resolveToken("text");
  const searchPlaceholderColor = resolveToken("text-secondary");
  const {
    expendableControls,
    serverSide,
    text,
    rules,
    hideDisabledButton
  } = props;
  const itemButton = rules?.allowIndependentItem && rules?.addItem || rules?.addItem && !!selectedNode && !selectedNode.data?.isItem;
  const categoryButton = rules?.addCategory && !selectedNode || rules?.addSubCategory && !!selectedNode && !selectedNode.data?.isItem;
  const deleteButton = !!selectedNode && (rules?.deleteCategory && !selectedNode.data?.isItem && !selectedNode.data?.parentId || rules?.deleteSubCategory && !selectedNode.data?.isItem && !!selectedNode.data?.parentId || rules?.deleteItem && !!selectedNode.data?.isItem);
  const editButton = !!selectedNode && (rules?.updateCategory && !selectedNode.data?.isItem && !selectedNode.data?.parentId || rules?.updateSubCategory && !selectedNode.data?.isItem && !!selectedNode.data?.parentId || rules?.updateItem && !!selectedNode.data?.isItem);
  const SearchBox = /* @__PURE__ */ jsxs(View, { style: [styles.searchBox, { backgroundColor: searchBg, borderColor: searchBorder }], children: [
    /* @__PURE__ */ jsx(Icon, { name: "pi pi-search", color: searchPlaceholderColor }),
    /* @__PURE__ */ jsx(
      TextInput,
      {
        style: [styles.searchInput, { color: searchTextColor }],
        value: filterValue,
        placeholder: "Search...",
        placeholderTextColor: searchPlaceholderColor,
        onChangeText: (val) => {
          setFilterValue(val);
          treeRef?.filter?.(val);
        }
      }
    )
  ] });
  const ExpandButtons = /* @__PURE__ */ jsxs(View, { style: styles.btnGroup, children: [
    !!expendableControls && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ActionButton, { icon: "pi pi-angle-double-down", onPress: expandAll, variant: "secondary" }),
      /* @__PURE__ */ jsx(ActionButton, { icon: "pi pi-angle-double-up", onPress: collapseAll, variant: "secondary" })
    ] }),
    !!serverSide?.listFetcher && /* @__PURE__ */ jsx(ActionButton, { icon: "pi pi-refresh", onPress: build, variant: "secondary" })
  ] });
  const CrudButtons = /* @__PURE__ */ jsxs(View, { style: styles.btnGroup, children: [
    (!hideDisabledButton && !categoryButton || categoryButton) && /* @__PURE__ */ jsx(ActionButton, { icon: "pi pi-plus", onPress: () => onAddNode(selectedNode?.key), disabled: !categoryButton, hideDisabledButton }),
    (!hideDisabledButton && !itemButton || itemButton) && /* @__PURE__ */ jsx(ActionButton, { icon: "pi pi-plus", onPress: () => onAddNodeItem(selectedNode?.key), disabled: !itemButton, variant: "secondary", hideDisabledButton }),
    (!hideDisabledButton && !deleteButton || deleteButton) && /* @__PURE__ */ jsx(ActionButton, { icon: "pi pi-trash", onPress: () => onDeleteNode(selectedNode?.key), disabled: !deleteButton, variant: "danger", hideDisabledButton }),
    (!hideDisabledButton && !editButton || editButton) && /* @__PURE__ */ jsx(ActionButton, { icon: "pi pi-pencil", onPress: () => onEditNode(selectedNode?.key), disabled: !editButton, variant: "secondary", hideDisabledButton })
  ] });
  if (isWide) {
    return /* @__PURE__ */ jsxs(View, { style: [styles.toolbarRow, { backgroundColor: toolbarBg, borderColor: toolbarBorder }], children: [
      /* @__PURE__ */ jsx(View, { style: styles.searchSection, children: SearchBox }),
      ExpandButtons,
      CrudButtons
    ] });
  }
  return /* @__PURE__ */ jsxs(View, { style: [styles.toolbarColumn, { backgroundColor: toolbarBg, borderColor: toolbarBorder }], children: [
    SearchBox,
    /* @__PURE__ */ jsxs(View, { style: styles.buttonsRow, children: [
      ExpandButtons,
      CrudButtons
    ] })
  ] });
};
const styles = StyleSheet.create({
  // Wide layout (iPad landscape)
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12
  },
  searchSection: {
    flex: 1,
    minWidth: 0
  },
  // Narrow layout (phone)
  toolbarColumn: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  // Search input
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    paddingVertical: 0
  },
  // Button groups
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { TreeViewToolbar as default };
//# sourceMappingURL=index.js.map
