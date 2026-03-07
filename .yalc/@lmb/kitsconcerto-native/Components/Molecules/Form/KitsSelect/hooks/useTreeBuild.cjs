'use strict';

var React = require('react');
var utils = require('../../../../Organism/TreeView/utils.cjs');
var SelectContext = require('../SelectContext.cjs');

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
      list.map((item) => [item.value.toString(), item])
    );
    setNodesMapping(mapping);
  };
  React.useEffect(() => {
    build();
  }, [list]);
  React.useImperativeHandle(ref, () => ({}));
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

exports.useTreeBuild = useTreeBuild;
//# sourceMappingURL=useTreeBuild.cjs.map
