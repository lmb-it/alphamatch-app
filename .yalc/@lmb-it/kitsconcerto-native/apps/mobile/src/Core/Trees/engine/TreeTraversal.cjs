'use strict';

function walkTree(nodes, callback, parent = null) {
  if (!nodes) return;
  for (const node of nodes) {
    callback(node, parent);
    if (node.children && node.children.length) {
      walkTree(node.children, callback, node);
    }
  }
}

exports.walkTree = walkTree;
//# sourceMappingURL=TreeTraversal.cjs.map
