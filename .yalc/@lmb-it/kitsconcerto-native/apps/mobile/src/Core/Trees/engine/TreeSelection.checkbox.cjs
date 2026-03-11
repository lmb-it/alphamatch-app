'use strict';

function buildNodeMaps(nodes) {
  const nodeMap = /* @__PURE__ */ new Map();
  const parentMap = /* @__PURE__ */ new Map();
  const walk = (list, parentKey) => {
    for (const node of list) {
      const key = String(node.key);
      nodeMap.set(key, node);
      if (parentKey !== void 0) {
        parentMap.set(key, parentKey);
      }
      if (node.children?.length) {
        walk(node.children, key);
      }
    }
  };
  walk(nodes);
  return { nodeMap, parentMap };
}
function propagateDown(node, checked, result) {
  if (node.children?.length) {
    for (const child of node.children) {
      const childKey = String(child.key);
      const isSelectable = child.selectable !== false && !child.disabled;
      if (isSelectable) {
        result[childKey] = { checked, partialChecked: false };
      }
      if (child.children?.length) {
        propagateDown(child, checked, result);
      }
      if (!isSelectable && child.children?.length) {
        updateParentState(child, result);
      }
    }
  }
}
function updateParentState(node, result) {
  if (!node.children?.length) return;
  let allChecked = true;
  let anyChecked = false;
  let hasSelectableChild = false;
  for (const child of node.children) {
    const childKey = String(child.key);
    const childState = result[childKey];
    const childIsSelectable = child.selectable !== false && !child.disabled;
    if (childIsSelectable) {
      hasSelectableChild = true;
      if (childState?.checked) {
        anyChecked = true;
      } else {
        allChecked = false;
      }
    } else if (child.children?.length) {
      if (childState?.checked) {
        anyChecked = true;
      } else if (childState?.partialChecked) {
        anyChecked = true;
        allChecked = false;
      } else {
        allChecked = false;
      }
    }
  }
  if (!hasSelectableChild && !anyChecked) {
    allChecked = false;
  }
  const key = String(node.key);
  const parentIsSelectable = node.selectable !== false && !node.disabled;
  if (allChecked && anyChecked) {
    result[key] = { checked: parentIsSelectable, partialChecked: !parentIsSelectable };
  } else if (anyChecked) {
    result[key] = { checked: false, partialChecked: true };
  } else {
    delete result[key];
  }
}
function propagateUp(nodeKey, parentMap, nodeMap, result) {
  let currentKey = nodeKey;
  while (parentMap.has(currentKey)) {
    const parentKey = parentMap.get(currentKey);
    const parentNode = nodeMap.get(parentKey);
    if (!parentNode) break;
    updateParentState(parentNode, result);
    currentKey = parentKey;
  }
}
function toggleCheckboxSelection(prev, node, allNodes) {
  const key = String(node.key);
  const next = { ...prev ?? {} };
  if (!allNodes?.length) {
    const wasChecked2 = !!next[key]?.checked;
    next[key] = { checked: !wasChecked2, partialChecked: false };
    return next;
  }
  const { nodeMap, parentMap } = buildNodeMaps(allNodes);
  const fullNode = nodeMap.get(key);
  if (!fullNode) {
    const wasChecked2 = !!next[key]?.checked;
    next[key] = { checked: !wasChecked2, partialChecked: false };
    return next;
  }
  const isSelectable = fullNode.selectable !== false && !fullNode.disabled;
  const wasChecked = !!next[key]?.checked;
  const newChecked = !wasChecked;
  if (isSelectable) {
    next[key] = { checked: newChecked, partialChecked: false };
  }
  if (fullNode.children?.length) {
    propagateDown(fullNode, newChecked, next);
  }
  if (!isSelectable && fullNode.children?.length) {
    updateParentState(fullNode, next);
  }
  propagateUp(key, parentMap, nodeMap, next);
  for (const k of Object.keys(next)) {
    if (!next[k].checked && !next[k].partialChecked) {
      delete next[k];
    }
  }
  return next;
}

exports.toggleCheckboxSelection = toggleCheckboxSelection;
//# sourceMappingURL=TreeSelection.checkbox.cjs.map
