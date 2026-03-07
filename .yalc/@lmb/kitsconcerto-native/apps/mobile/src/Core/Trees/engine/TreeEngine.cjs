'use strict';

var TreeEvents = require('./TreeEvents.cjs');
var TreeExpansion = require('./TreeExpansion.cjs');
var TreeFiltering = require('./TreeFiltering.cjs');
var TreeLazy = require('./TreeLazy.cjs');
var TreeSelection_multiple = require('./TreeSelection.multiple.cjs');
var TreeSelection_checkbox = require('./TreeSelection.checkbox.cjs');

function createTreeEngine(props) {
  const {
    nodes,
    selectionMode = "single",
    selectionKeys,
    expandedKeys,
    filterValue,
    filterBy,
    filterMode,
    onSelectionChange,
    onToggle,
    onExpand,
    onCollapse
  } = props;
  let _selection = selectionKeys ?? null;
  let _expanded = expandedKeys ?? {};
  const selectionControlled = selectionKeys !== void 0;
  const expansionControlled = expandedKeys !== void 0;
  const visibleNodes = filterValue ? TreeFiltering.filterTree(nodes, filterValue, { filterBy, filterMode }) : nodes;
  return {
    state: {
      get selection() {
        return selectionControlled ? selectionKeys : _selection;
      },
      get expandedKeys() {
        return expansionControlled ? expandedKeys : _expanded;
      },
      get nodes() {
        return visibleNodes;
      }
    },
    actions: {
      // -----------------------------
      // Selection
      // -----------------------------
      selectNode(key, options) {
        let next = _selection;
        if (selectionMode === "single") {
          next = key;
        }
        if (selectionMode === "multiple") {
          next = TreeSelection_multiple.toggleMultipleSelection(
            _selection,
            { key });
        }
        if (selectionMode === "checkbox") {
          next = TreeSelection_checkbox.toggleCheckboxSelection(
            _selection,
            { key },
            nodes
          );
        }
        if (!selectionControlled) {
          _selection = next;
        }
        onSelectionChange?.(
          TreeEvents.createTreeEvent(next, options?.originalEvent)
        );
      },
      // -----------------------------
      // Expansion
      // -----------------------------
      toggleNode(node, originalEvent) {
        const key = node.key;
        if (TreeLazy.isLazyNode(node)) {
          onExpand?.(TreeLazy.createLazyExpandEvent(node, originalEvent));
          return;
        }
        const next = TreeExpansion.toggleExpansion(
          expansionControlled ? expandedKeys : _expanded,
          key
        );
        if (!expansionControlled) {
          _expanded = next;
        }
        onToggle?.(TreeEvents.createTreeEvent(next, originalEvent));
        if (next[key]) {
          onExpand?.(TreeEvents.createTreeEvent(node, originalEvent));
        } else {
          onCollapse?.(TreeEvents.createTreeEvent(node, originalEvent));
        }
      },
      expandAll(originalEvent) {
        const next = TreeExpansion.expandAll(nodes);
        if (!expansionControlled) {
          _expanded = next;
        }
        onToggle?.(TreeEvents.createTreeEvent(next, originalEvent));
      },
      collapseAll(originalEvent) {
        const next = TreeExpansion.collapseAll();
        if (!expansionControlled) {
          _expanded = next;
        }
        onToggle?.(TreeEvents.createTreeEvent(next, originalEvent));
      }
    }
  };
}

exports.createTreeEngine = createTreeEngine;
//# sourceMappingURL=TreeEngine.cjs.map
