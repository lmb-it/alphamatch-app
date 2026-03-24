import { createContext, useContext } from 'react';
import 'react-native';

const GridContext = createContext({
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
const useGridContext = () => useContext(GridContext);
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

export { arrangeIntoRows, GridContext as default, useGridContext };
//# sourceMappingURL=GridContext.js.map
