'use strict';

var TreeTraversal = require('./TreeTraversal.cjs');

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
  TreeTraversal.walkTree(nodes, (node) => {
    if (node.children && node.children.length) {
      expanded[node.key] = true;
    }
  });
  return expanded;
}
function collapseAll() {
  return {};
}

exports.collapseAll = collapseAll;
exports.expandAll = expandAll;
exports.toggleExpansion = toggleExpansion;
//# sourceMappingURL=TreeExpansion.cjs.map
