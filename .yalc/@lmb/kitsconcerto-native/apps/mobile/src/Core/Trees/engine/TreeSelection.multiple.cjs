'use strict';

function toggleMultipleSelection(prev, node, metaKeySelection) {
  const key = node.key;
  const next = { ...prev ?? {} };
  const exists = !!next[key];
  if (exists) {
    delete next[key];
  } else {
    next[key] = true;
  }
  return next;
}

exports.toggleMultipleSelection = toggleMultipleSelection;
//# sourceMappingURL=TreeSelection.multiple.cjs.map
