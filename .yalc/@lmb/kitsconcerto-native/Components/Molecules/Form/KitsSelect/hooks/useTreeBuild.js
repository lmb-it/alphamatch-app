import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { buildTree } from '../../../../Organism/TreeView/utils.js';
import { useSelect } from '../SelectContext.js';

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
      list.map((item) => [item.value.toString(), item])
    );
    setNodesMapping(mapping);
  };
  useEffect(() => {
    build();
  }, [list]);
  useImperativeHandle(ref, () => ({}));
  const handleChange = (e) => {
    setValue(e.value);
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
