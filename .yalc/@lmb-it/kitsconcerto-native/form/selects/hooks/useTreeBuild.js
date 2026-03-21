import { useState, useRef, useEffect, useImperativeHandle, useCallback } from 'react';
import { buildTree } from '../../../data/TreeView/utils.js';
import { useSelect } from '../SelectContext.js';

const collectNonSelectableKeys = (nodes) => {
  const keys = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    if (node.selectable === false && node.key != null) {
      keys.add(String(node.key));
    }
    if (node.children?.length) {
      for (const k of collectNonSelectableKeys(node.children)) {
        keys.add(k);
      }
    }
  }
  return keys;
};
const useTreeBuild = (props) => {
  const { isStructured, ref } = props;
  const { list, onChange, selectedValue } = useSelect();
  const [nodes, setNodes] = useState([]);
  const [value, setValue] = useState(null);
  const nodesMapping = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    if (selectedValue != null) {
      setValue(selectedValue);
    }
  }, [selectedValue]);
  const expandNode = (node, _expandedKeys) => {
    if (node.children && node.children.length) {
      if (node.key) _expandedKeys[node.key] = true;
      for (const child of node.children) {
        expandNode(child, _expandedKeys);
      }
    }
  };
  const setNodesMapping = (newMap) => {
    nodesMapping.current = newMap;
    setNodes(buildTree(nodesMapping.current, true));
  };
  const build = () => {
    if (isStructured) {
      setNodes(list);
      return;
    }
    const mapping = new Map(
      list.filter((item) => item.value != null).map((item) => [String(item.value), item])
    );
    setNodesMapping(mapping);
  };
  useEffect(() => {
    build();
  }, [list]);
  useImperativeHandle(ref, () => ({}));
  const nonSelectableKeys = useCallback(() => collectNonSelectableKeys(nodes), [nodes]);
  const handleChange = (e) => {
    setValue(e.value);
    if (e.value && typeof e.value === "object" && !Array.isArray(e.value)) {
      const blocked = nonSelectableKeys();
      if (blocked.size > 0) {
        const filtered = Object.fromEntries(
          Object.entries(e.value).filter(([key]) => !blocked.has(key))
        );
        onChange && onChange({ ...e, value: filtered });
        return;
      }
    }
    onChange && onChange(e);
  };
  return {
    nodes,
    value,
    setValue,
    expandNode,
    handleChange,
    list,
    onChange,
    selectedValue
  };
};

export { useTreeBuild };
//# sourceMappingURL=useTreeBuild.js.map
