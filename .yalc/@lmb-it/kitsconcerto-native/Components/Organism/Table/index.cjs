'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const TableContext = React.createContext(
  {}
);
function useTable() {
  return React.useContext(TableContext);
}
const sizeMapping = {
  small: "5px",
  normal: "10px",
  large: "15px"
};
const fontSizeMapping = {
  small: "13px",
  normal: "16px",
  large: "20px"
};
const Datatable = (_props) => {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.warn(
      "[GoTable] The Table component is not available on React Native. It is a web-only component. A native implementation is planned for a future release."
    );
  }
  return null;
};

exports.TableContext = TableContext;
exports.default = Datatable;
exports.fontSizeMapping = fontSizeMapping;
exports.sizeMapping = sizeMapping;
exports.useTable = useTable;
//# sourceMappingURL=index.cjs.map
