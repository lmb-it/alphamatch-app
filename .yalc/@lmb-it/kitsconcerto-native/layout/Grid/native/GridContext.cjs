'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('react-native');

const GridContext = React.createContext({
  registerItem: () => {
  },
  unregisterItem: () => {
  },
  getItemWidth: () => void 0,
  containerWidth: 0,
  numColumns: 12,
  columnGap: 0,
  rowGap: 0
});
const useGridContext = () => React.useContext(GridContext);
function arrangeIntoRows(colSpans, numColumns) {
  let currentRow = 1;
  let currentRowTotal = 0;
  const rows = {};
  for (let i = 0; i < colSpans.length; i++) {
    const colSpan = colSpans[i];
    if (currentRowTotal + colSpan > numColumns) {
      currentRow++;
      currentRowTotal = colSpan;
    } else {
      currentRowTotal += colSpan;
    }
    if (!rows[currentRow]) {
      rows[currentRow] = [];
    }
    rows[currentRow].push(i);
  }
  return rows;
}

exports.arrangeIntoRows = arrangeIntoRows;
exports.default = GridContext;
exports.useGridContext = useGridContext;
//# sourceMappingURL=GridContext.cjs.map
