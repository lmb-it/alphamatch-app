'use strict';

var TreeEvents = require('./TreeEvents.cjs');

function isLazyNode(node) {
  return node.leaf === false && node.children === void 0;
}
function createLazyExpandEvent(node, originalEvent) {
  return TreeEvents.createTreeEvent(node, originalEvent);
}

exports.createLazyExpandEvent = createLazyExpandEvent;
exports.isLazyNode = isLazyNode;
//# sourceMappingURL=TreeLazy.cjs.map
