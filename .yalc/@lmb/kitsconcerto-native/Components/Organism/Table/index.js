import { createContext, useContext } from 'react';

const TableContext = createContext(
  {}
);
function useTable() {
  return useContext(TableContext);
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

export { TableContext, Datatable as default, fontSizeMapping, sizeMapping, useTable };
//# sourceMappingURL=index.js.map
