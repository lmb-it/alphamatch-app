const buildTree = (data, allowIndependentItems = false, parentKey = null) => {
  const fetchedData = Array.from(data.values());
  const categorized = fetchedData.filter(({ parentId }) => parentId === parentKey).map((item, index) => {
    return {
      key: item.value.toString(),
      label: item.label,
      data: item,
      id: item.value.toString(),
      leaf: true,
      className: `node-${item.value.toString().split(".").join("_")}`,
      icon: item.isItem && !item?.data?.icon ? "pi pi-objects-column" : "",
      ...item.selectable !== void 0 && { selectable: item.selectable },
      children: buildTree(data, allowIndependentItems, item.value)
    };
  });
  if (parentKey === null && !allowIndependentItems) {
    const uncategorized = fetchedData.filter((item) => item.isItem && !item.parentId).map((item, index) => {
      return {
        key: `uncategorized-${index}`,
        label: item.label,
        data: item,
        id: item.value.toString(),
        className: item.value.toString(),
        children: []
      };
    });
    if (uncategorized.length > 0) {
      categorized.push({
        key: "uncategorized",
        label: "Uncategorized",
        children: uncategorized
      });
    }
  }
  return categorized;
};
function markAncestors(nodeId, nodes, selections) {
  const node = nodes.get(nodeId.toString());
  if (!node) {
    return;
  }
  const parentId = node.parentId;
  if (parentId === null || parentId === void 0) {
    return;
  }
  const parent = nodes.get(parentId.toString());
  if (!parent) {
    return;
  }
  if (!selections) {
    return;
  }
  const siblings = Array.from(nodes.values()).filter(
    (el) => el.parentId === parentId
  );
  const allSiblingsChecked = siblings.every(
    // @ts-ignore
    (sibling) => selections[sibling.value]?.checked || false
  );
  selections[parentId] = { checked: allSiblingsChecked, partialChecked: true };
  markAncestors(parentId, nodes, selections);
}

export { buildTree, markAncestors };
//# sourceMappingURL=utils.js.map
