import { createTreeEvent } from './TreeEvents.js';
import { expandAll, toggleExpansion, collapseAll } from './TreeExpansion.js';
import { filterTree } from './TreeFiltering.js';
import { isLazyNode, createLazyExpandEvent } from './TreeLazy.js';
import { toggleMultipleSelection } from './TreeSelection.multiple.js';
import { toggleCheckboxSelection } from './TreeSelection.checkbox.js';

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
  const visibleNodes = filterValue ? filterTree(nodes, filterValue, { filterBy, filterMode }) : nodes;
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
          next = toggleMultipleSelection(
            _selection,
            { key });
        }
        if (selectionMode === "checkbox") {
          next = toggleCheckboxSelection(
            _selection,
            { key },
            nodes
          );
        }
        if (!selectionControlled) {
          _selection = next;
        }
        onSelectionChange?.(
          createTreeEvent(next, options?.originalEvent)
        );
      },
      // -----------------------------
      // Expansion
      // -----------------------------
      toggleNode(node, originalEvent) {
        const key = node.key;
        if (isLazyNode(node)) {
          onExpand?.(createLazyExpandEvent(node, originalEvent));
          return;
        }
        const next = toggleExpansion(
          expansionControlled ? expandedKeys : _expanded,
          key
        );
        if (!expansionControlled) {
          _expanded = next;
        }
        onToggle?.(createTreeEvent(next, originalEvent));
        if (next[key]) {
          onExpand?.(createTreeEvent(node, originalEvent));
        } else {
          onCollapse?.(createTreeEvent(node, originalEvent));
        }
      },
      expandAll(originalEvent) {
        const next = expandAll(nodes);
        if (!expansionControlled) {
          _expanded = next;
        }
        onToggle?.(createTreeEvent(next, originalEvent));
      },
      collapseAll(originalEvent) {
        const next = collapseAll();
        if (!expansionControlled) {
          _expanded = next;
        }
        onToggle?.(createTreeEvent(next, originalEvent));
      }
    }
  };
}

export { createTreeEngine };
//# sourceMappingURL=TreeEngine.js.map
