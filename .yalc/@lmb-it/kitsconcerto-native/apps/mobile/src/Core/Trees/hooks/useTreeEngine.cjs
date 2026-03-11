'use strict';

var React = require('react');
var TreeEngine = require('../engine/TreeEngine.cjs');

function useTreeEngine(props) {
  const engine = React.useMemo(
    () => TreeEngine.createTreeEngine({
      nodes: props.nodes,
      selectionMode: props.selectionMode,
      selectionKeys: props.selectionKeys,
      metaKeySelection: props.metaKeySelection,
      expandedKeys: props.expandedKeys,
      filterValue: props.filterValue,
      filterBy: props.filterBy,
      filterMode: props.filterMode,
      onSelectionChange: props.onSelectionChange,
      onToggle: props.onToggle,
      onExpand: props.onExpand,
      onCollapse: props.onCollapse
    }),
    [
      props.nodes,
      props.selectionMode,
      props.selectionKeys,
      props.metaKeySelection,
      props.expandedKeys,
      props.filterValue,
      props.filterBy,
      props.filterMode,
      props.onSelectionChange,
      props.onToggle,
      props.onExpand,
      props.onCollapse
    ]
  );
  return {
    state: engine.state,
    actions: engine.actions
  };
}

exports.useTreeEngine = useTreeEngine;
//# sourceMappingURL=useTreeEngine.cjs.map
