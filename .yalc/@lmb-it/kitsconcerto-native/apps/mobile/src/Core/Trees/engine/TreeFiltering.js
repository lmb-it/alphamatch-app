function filterTree(nodes, query, options) {
  if (!nodes || !query) {
    return nodes || [];
  }
  const filterBy = options?.filterBy?.split(",") || ["label"];
  const filterMode = options?.filterMode || "lenient";
  const lowerQuery = query.toLowerCase();
  function matches(node) {
    return filterBy.some((field) => {
      const value = resolveField(node, field);
      return typeof value === "string" && value.toLowerCase().includes(lowerQuery);
    });
  }
  function filterNode(node) {
    const nodeMatches = matches(node);
    if (nodeMatches && filterMode === "lenient") {
      return { ...node };
    }
    if (!node.children || node.children.length === 0) {
      return nodeMatches ? { ...node } : null;
    }
    const filteredChildren = node.children.map(filterNode).filter(Boolean);
    if (nodeMatches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren
      };
    }
    return null;
  }
  return nodes.map(filterNode).filter(Boolean);
}
function resolveField(node, path) {
  const parts = path.split(".");
  let value = node;
  for (const part of parts) {
    if (value == null) return null;
    value = value[part];
  }
  return value;
}

export { filterTree };
//# sourceMappingURL=TreeFiltering.js.map
