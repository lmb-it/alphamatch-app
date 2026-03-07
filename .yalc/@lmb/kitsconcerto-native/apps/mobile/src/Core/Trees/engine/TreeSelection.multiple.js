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

export { toggleMultipleSelection };
//# sourceMappingURL=TreeSelection.multiple.js.map
