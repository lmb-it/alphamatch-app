'use strict';

var React = require('react');
var utils = require('../../../data/TreeView/utils.cjs');
var SelectContext = require('../SelectContext.cjs');

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
  const { list, onChange, selectedValue } = SelectContext.useSelect();
  const [nodes, setNodes] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const nodesMapping = React.useRef(/* @__PURE__ */ new Map());
  React.useEffect(() => {
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
    setNodes(utils.buildTree(nodesMapping.current, true));
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
  React.useEffect(() => {
    build();
  }, [list]);
  React.useImperativeHandle(ref, () => ({}));
  const nonSelectableKeys = React.useCallback(() => collectNonSelectableKeys(nodes), [nodes]);
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

exports.useTreeBuild = useTreeBuild;
//# sourceMappingURL=useTreeBuild.cjs.map
