import { createTreeEvent } from './TreeEvents.js';

function isLazyNode(node) {
  return node.leaf === false && node.children === void 0;
}
function createLazyExpandEvent(node, originalEvent) {
  return createTreeEvent(node, originalEvent);
}

export { createLazyExpandEvent, isLazyNode };
//# sourceMappingURL=TreeLazy.js.map
