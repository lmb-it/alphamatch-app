'use strict';

var React = require('react');
var reactNative = require('react-native');
var utils = require('./utils.cjs');
var DialogContext = require('../../contexts/DialogContext.cjs');

const platformPrompt = (title, defaultValue) => {
  if (reactNative.Platform.OS === "web") {
    return Promise.resolve(window.prompt(title, defaultValue));
  }
  return new Promise((resolve) => {
    if (reactNative.Platform.OS === "ios") {
      reactNative.Alert.prompt(title, void 0, [
        { text: "Cancel", onPress: () => resolve(null), style: "cancel" },
        { text: "OK", onPress: (text) => resolve(text || null) }
      ], "plain-text", defaultValue);
    } else {
      reactNative.Alert.alert(title, `Confirm to add "${defaultValue || "New Item"}"`, [
        { text: "Cancel", onPress: () => resolve(null), style: "cancel" },
        { text: "OK", onPress: () => resolve(defaultValue || title) }
      ]);
    }
  });
};
const platformConfirm = (message) => {
  if (reactNative.Platform.OS === "web") {
    return Promise.resolve(window.confirm(message));
  }
  return new Promise((resolve) => {
    reactNative.Alert.alert("Confirm", message, [
      { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
      { text: "OK", onPress: () => resolve(true) }
    ]);
  });
};
const useTreeViewController = (props) => {
  const {
    tree: incomingTree,
    beforeAddCategory,
    beforeAddItem,
    beforeDeleteCategory,
    beforeUpdateCategory,
    beforeUpdateItem,
    beforeDeleteItem,
    beforeSortItem,
    onSelectItem,
    onAddCategory,
    onAddItem,
    onDeleteCategory,
    onTreeChange,
    onDeleteItem,
    onUpdateCategory,
    onSortItem,
    onUpdateItem,
    serverSide,
    preselectList,
    checkbox,
    expendableControls,
    isExpended,
    sortable
  } = props;
  const { toast } = DialogContext.useDialog();
  const [treeValue, setTreeValue] = React.useState([]);
  const [expandedKeys, setExpandedKeys] = React.useState({});
  const [selectedKeys, setSelectedKeys] = React.useState(null);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [filterValue, setFilterValue] = React.useState("");
  const nodesMapping = React.useRef(/* @__PURE__ */ new Map());
  const newNodes = React.useRef(/* @__PURE__ */ new Map());
  const newItems = React.useRef(/* @__PURE__ */ new Map());
  const editedNodes = React.useRef(/* @__PURE__ */ new Map());
  const editedItems = React.useRef(/* @__PURE__ */ new Map());
  const deletedNodes = React.useRef(/* @__PURE__ */ new Map());
  const deletedItems = React.useRef(/* @__PURE__ */ new Map());
  const nodesCategoriesChecked = React.useRef([]);
  const nodesItemsChecked = React.useRef([]);
  const nodesCategoriesUnChecked = React.useRef([]);
  const nodesItemsUnChecked = React.useRef([]);
  const setNodesMapping = (newMap) => {
    nodesMapping.current = newMap;
    setTreeValue(utils.buildTree(nodesMapping.current, !!props.rules?.allowIndependentItem));
  };
  const setNodeState = (newNode) => {
    nodesMapping.current.set(newNode.value.toString(), newNode);
    setNodesMapping(nodesMapping.current);
  };
  const clear = (specify = "all") => {
    switch (specify) {
      case "checkedCategories":
        nodesCategoriesChecked.current = [];
        break;
      case "checkedItems":
        nodesItemsChecked.current = [];
        break;
      case "unCheckedCategories":
        nodesCategoriesUnChecked.current = [];
        break;
      case "unCheckedItems":
        nodesItemsUnChecked.current = [];
        break;
      case "newItems":
        newItems.current = /* @__PURE__ */ new Map();
        break;
      case "newCategories":
        newNodes.current = /* @__PURE__ */ new Map();
        break;
      case "editedItems":
        editedItems.current = /* @__PURE__ */ new Map();
        break;
      case "editedCategories":
        editedNodes.current = /* @__PURE__ */ new Map();
        break;
      case "deletedItems":
        deletedItems.current = /* @__PURE__ */ new Map();
        break;
      case "deletedCategories":
        deletedNodes.current = /* @__PURE__ */ new Map();
        break;
      case "all":
      default:
        nodesCategoriesChecked.current = [];
        nodesItemsChecked.current = [];
        nodesCategoriesUnChecked.current = [];
        nodesItemsUnChecked.current = [];
        newItems.current = /* @__PURE__ */ new Map();
        newNodes.current = /* @__PURE__ */ new Map();
        editedItems.current = /* @__PURE__ */ new Map();
        editedNodes.current = /* @__PURE__ */ new Map();
        deletedItems.current = /* @__PURE__ */ new Map();
        deletedNodes.current = /* @__PURE__ */ new Map();
        break;
    }
  };
  const fireOnChange = () => {
    onTreeChange && onTreeChange(
      {
        checkedCategories: nodesCategoriesChecked.current,
        checkedItems: nodesItemsChecked.current,
        unCheckedCategories: nodesCategoriesUnChecked.current,
        unCheckedItems: nodesItemsUnChecked.current,
        newItems: Array.from(newItems.current.values()),
        newCategories: Array.from(newNodes.current.values()),
        editedItems: Array.from(editedItems.current.values()),
        editedCategories: Array.from(editedNodes.current.values()),
        deletedItems: Array.from(deletedItems.current.values()),
        deletedCategories: Array.from(deletedNodes.current.values())
      },
      clear
    );
  };
  const setNodesChecked = (checkedCategories, checkedItems, unCheckedCategories, unCheckedItems) => {
    nodesCategoriesChecked.current = checkedCategories;
    nodesItemsChecked.current = checkedItems;
    nodesItemsUnChecked.current = unCheckedItems;
    nodesCategoriesUnChecked.current = unCheckedCategories;
    fireOnChange();
  };
  const build = () => {
    if (serverSide?.listFetcher) {
      serverSide.listFetcher().then((res) => {
        if (res.success && res.data) {
          const mapping = new Map(res.data?.map((item) => [item.value.toString(), item]));
          setNodesMapping(mapping);
        }
      });
    } else {
      if (incomingTree) {
        const mapping = new Map(incomingTree.map((item) => [item.value.toString(), item]));
        setNodesMapping(mapping);
      }
    }
  };
  React.useEffect(() => {
    build();
  }, [incomingTree]);
  React.useEffect(() => {
    if (preselectList && nodesMapping.current.size > 0) {
      const ps = {};
      const itemsMap = nodesMapping.current;
      preselectList.forEach((item) => {
        const node = itemsMap.get(item.toString());
        if (node) {
          ps[item] = { checked: true, partialChecked: false };
          utils.markAncestors(node.value, itemsMap, ps);
        }
      });
      setSelectedKeys(ps);
    }
  }, [preselectList, treeValue]);
  const expandNode = (node, _expandedKeys) => {
    if (node.children && node.children.length && node.key) {
      _expandedKeys[node.key] = true;
      for (const child of node.children) {
        expandNode(child, _expandedKeys);
      }
    }
  };
  const expandAll = () => {
    const _expandedKeys = {};
    for (const node of treeValue) {
      expandNode(node, _expandedKeys);
    }
    setExpandedKeys(_expandedKeys);
  };
  const collapseAll = () => {
    setExpandedKeys({});
  };
  React.useEffect(() => {
    if (treeValue.length > 0 && isExpended) {
      expandAll();
    }
  }, [treeValue, isExpended]);
  const addNode = React.useCallback(async (item = null, parentItemValue = null, isItem = false) => {
    const promptValue = item ? item : await platformPrompt(
      !isItem ? props.text?.addNode ?? "Add Category" : props.text?.addItem ?? "Add Item"
    );
    if (promptValue) {
      const newNode = typeof promptValue == "object" ? promptValue : {
        value: promptValue,
        label: promptValue,
        parentId: parentItemValue,
        isItem,
        data: {}
      };
      const func = () => {
        if (isItem) {
          onAddItem && onAddItem(newNode);
          newItems.current.set(newNode.value.toString(), newNode);
        } else {
          onAddCategory && onAddCategory(newNode);
          newNodes.current.set(newNode.value.toString(), newNode);
        }
        fireOnChange();
      };
      if (serverSide?.onAddItem && isItem || serverSide?.onAddCategory && !isItem) {
        if (serverSide?.onAddItem && isItem) {
          serverSide.onAddItem(newNode)?.then((res) => {
            if (res.success) {
              setNodeState(newNode);
              func();
              build();
              toast("success", res?.message ?? "Category has been added successfully");
            }
          });
        } else if (serverSide?.onAddCategory && !isItem) {
          serverSide.onAddCategory(newNode)?.then((res) => {
            if (res.success) {
              setNodeState(newNode);
              func();
              build();
              toast("success", res.message ?? "Category has been added successfully");
            }
          });
        }
      } else {
        setNodeState(newNode);
        func();
      }
    }
  }, [nodesMapping]);
  const deleteNode = React.useCallback(async (item, deleted = null) => {
    const promptValue = deleted != null ? deleted : await platformConfirm(
      item.isItem ? props.text?.deleteItem ?? "Delete Item" : props.text?.deleteNode ?? "Delete Category"
    );
    if (promptValue) {
      const func = () => {
        if (item.isItem) {
          onDeleteItem && onDeleteItem(item);
          if (newItems.current.has(item.value.toString())) {
            newItems.current.delete(item.value.toString());
          } else {
            if (editedItems.current.has(item.value.toString())) {
              editedItems.current.delete(item.value.toString());
            }
            deletedItems.current.set(item.value.toString(), item);
          }
        } else {
          onDeleteCategory && onDeleteCategory(item);
          if (newNodes.current.has(item.value.toString())) {
            newNodes.current.delete(item.value.toString());
          } else {
            if (editedNodes.current.has(item.value.toString())) {
              editedNodes.current.delete(item.value.toString());
            }
            deletedNodes.current.set(item.value.toString(), item);
          }
        }
        fireOnChange();
      };
      if (serverSide?.onDeleteItem && item.isItem || serverSide?.onDeleteCategory && !item.isItem) {
        if (serverSide?.onDeleteItem && item.isItem) {
          serverSide.onDeleteItem(item)?.then((res) => {
            if (res.success) {
              nodesMapping.current.delete(item.value.toString());
              setNodesMapping(nodesMapping.current);
              func();
              build();
              toast("success", res.message ?? "Item has been deleted successfully");
            }
          });
        } else if (serverSide?.onDeleteCategory && !item.isItem) {
          serverSide.onDeleteCategory(item)?.then((res) => {
            if (res.success) {
              nodesMapping.current.delete(item.value.toString());
              setNodesMapping(nodesMapping.current);
              func();
              build();
              toast("success", res.message ?? "Category has been deleted successfully");
            }
          });
        }
      } else {
        nodesMapping.current.delete(item.value.toString());
        setNodesMapping(nodesMapping.current);
        func();
      }
    }
  }, [nodesMapping]);
  const updateNode = React.useCallback(async (item, updated = false) => {
    const promptValue = updated ? item : await platformPrompt(
      !item?.isItem ? props.text?.editNode ?? "Edit Category" : props.text?.editItem ?? "Edit Item",
      item.label
    );
    if (promptValue) {
      const newNode = typeof promptValue == "object" ? promptValue : {
        value: item.value,
        label: promptValue,
        parentId: item.parentId,
        isItem: !!item?.isItem,
        data: {}
      };
      const func = () => {
        if (item?.isItem) {
          onUpdateItem && onUpdateItem(newNode);
          editedItems.current.set(newNode.value.toString(), newNode);
        } else {
          onUpdateCategory && onUpdateCategory(newNode);
          editedNodes.current.set(newNode.value.toString(), newNode);
        }
        fireOnChange();
      };
      if (serverSide?.onUpdateItem && item?.isItem || serverSide?.onUpdateCategory && !item?.isItem) {
        if (serverSide?.onUpdateItem && item?.isItem) {
          serverSide.onUpdateItem(newNode)?.then((res) => {
            if (res.success) {
              setNodeState(newNode);
              func();
              build();
              toast("success", res.message ?? "Item has been updated successfully");
            }
          });
        } else if (serverSide?.onUpdateCategory && !item?.isItem) {
          serverSide.onUpdateCategory(newNode)?.then((res) => {
            if (res.success) {
              setNodeState(newNode);
              func();
              build();
              toast("success", res.message ?? "Category has been updated successfully");
            }
          });
        }
      } else {
        setNodeState(newNode);
        func();
      }
    }
  }, [nodesMapping]);
  const onAddNode = React.useCallback((parentItemValue = null) => {
    if (beforeAddCategory) {
      const findParent = nodesMapping.current.get(parentItemValue?.toString() ?? "") ?? null;
      beforeAddCategory(findParent).then(([added, item]) => {
        if (added) addNode(item);
      });
    } else {
      addNode(null, parentItemValue);
    }
  }, [nodesMapping, addNode]);
  const onAddNodeItem = React.useCallback((parentItemValue) => {
    if (beforeAddItem) {
      const findParent = nodesMapping.current.get(parentItemValue?.toString() ?? "") ?? null;
      beforeAddItem(findParent).then(([added, item]) => {
        if (added) addNode(item, parentItemValue, true);
      });
    } else {
      addNode(null, parentItemValue, true);
    }
  }, [nodesMapping, addNode]);
  const onDeleteNodeWrapper = React.useCallback((itemValue) => {
    const find = nodesMapping.current.get(itemValue.toString());
    if (!find) return;
    if (!find.isItem && beforeDeleteCategory) {
      beforeDeleteCategory(find).then(([deleted]) => {
        if (deleted) deleteNode(find, deleted);
      });
    } else if (find.isItem && beforeDeleteItem) {
      beforeDeleteItem(find).then(([deleted]) => {
        if (deleted) deleteNode(find, deleted);
      });
    } else {
      deleteNode(find);
    }
  }, [nodesMapping, deleteNode]);
  const onEditNodeWrapper = React.useCallback((itemValue) => {
    const find = nodesMapping.current.get(itemValue.toString());
    if (!find) return;
    if (!find.isItem && beforeUpdateCategory) {
      beforeUpdateCategory(find).then(([updated, item]) => {
        if (updated) updateNode(item ?? find, updated);
      });
    } else if (find.isItem && beforeUpdateItem) {
      beforeUpdateItem(find).then(([updated, item]) => {
        if (updated) updateNode(item ?? find, updated);
      });
    } else {
      updateNode(find);
    }
  }, [nodesMapping, updateNode]);
  const onDragDrop = ({ dropNode, dragNode }) => {
    const node = dragNode.data?.data;
    const toNode = dropNode?.data?.data ? dropNode.data.data : null;
    const newNode = { ...node, parentId: toNode?.value };
    const func = () => {
      onSortItem && onSortItem(node, toNode);
      if (node.isItem) {
        editedItems.current.set(newNode.value.toString(), newNode);
      } else {
        editedNodes.current.set(newNode.value.toString(), newNode);
      }
      fireOnChange();
    };
    const f = () => {
      if (serverSide?.onSortItem) {
        serverSide.onSortItem(node, toNode)?.then((res) => {
          if (res.success) {
            setNodeState(newNode);
            func();
            build();
            toast("success", res.message ?? "Item has been updated successfully");
          }
        });
      } else {
        setNodeState(newNode);
        func();
      }
    };
    if (beforeSortItem) {
      beforeSortItem(node, toNode).then(([sort]) => {
        if (sort) f();
      });
    } else {
      f();
    }
  };
  const handleSelectionChange = (e) => {
    const v = e.value;
    if (v && typeof v == "object" && Object.keys(v).filter((k) => k.includes("uncategorized")).length == 0) {
      const checked = Object.entries(v);
      const categoriesChecked = [];
      const itemsChecked = [];
      const itemsMap = nodesMapping.current;
      const unchecked = preselectList?.filter(
        (item) => !checked.map(([key]) => key).includes(item.toString())
      ) ?? [];
      const categoriesUnChecked = unchecked.filter((i) => !itemsMap.get(i.toString())?.isItem);
      const itemsUnChecked = unchecked.filter((i) => !!itemsMap.get(i.toString())?.isItem);
      checked.forEach(([key]) => {
        if (itemsMap.get(key.toString())?.isItem) {
          itemsChecked.push(key);
        } else {
          categoriesChecked.push(key);
        }
      });
      setNodesChecked(categoriesChecked, itemsChecked, categoriesUnChecked, itemsUnChecked);
      setSelectedKeys(v);
    }
  };
  const onNodeClick = (event) => {
    if (event.node.key !== "uncategorized") {
      if (event.node.key == selectedNode?.key) {
        setSelectedNode(null);
      } else {
        onSelectItem?.(event.node);
        setSelectedNode(event.node);
      }
    }
  };
  return {
    // Data
    treeValue,
    selectedNode,
    filterValue,
    // Actions
    build,
    setFilterValue,
    expandAll,
    collapseAll,
    // CRUD Actions
    operations: {
      onAddNode,
      onAddNodeItem,
      onDeleteNode: onDeleteNodeWrapper,
      onEditNode: onEditNodeWrapper
    },
    // Component Props
    treeProps: {
      value: treeValue,
      expandedKeys: expendableControls || isExpended ? expandedKeys : void 0,
      onToggle: expendableControls || isExpended ? (e) => setExpandedKeys(e.value) : void 0,
      selectionMode: checkbox ? "checkbox" : void 0,
      selectionKeys: checkbox ? selectedKeys : void 0,
      onSelectionChange: checkbox ? handleSelectionChange : void 0,
      dragdropScope: sortable ? "demo" : void 0,
      onDragDrop: sortable ? onDragDrop : void 0,
      onNodeClick
    }
  };
};

exports.useTreeViewController = useTreeViewController;
//# sourceMappingURL=useTreeViewController.cjs.map
