import { walkTree } from './TreeTraversal.js';

function toggleExpansion(expandedKeys, key) {
  const next = { ...expandedKeys || {} };
  if (next[key]) {
    delete next[key];
  } else {
    next[key] = true;
  }
  return next;
}
function expandAll(nodes) {
  const expanded = {};
  if (!nodes) return expanded;
  walkTree(nodes, (node) => {
    if (node.children && node.children.length) {
      expanded[node.key] = true;
    }
  });
  return expanded;
}
function collapseAll() {
  return {};
}

export { collapseAll, expandAll, toggleExpansion };
//# sourceMappingURL=TreeExpansion.js.map
