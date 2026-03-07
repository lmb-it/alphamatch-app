'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var htmlElements = require('@expo/html-elements');
var styles = require('./styles.cjs');
var reactNative = require('react-native');

const TableHeaderContext = React.createContext({
  isHeaderRow: false
});
const TableFooterContext = React.createContext({
  isFooterRow: false
});
const Table = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    htmlElements.Table,
    {
      ref,
      className: styles.tableStyle({ class: className }),
      ...props
    }
  );
});
const TableHeader = React.forwardRef(function TableHeader2({ className, ...props }, ref) {
  const contextValue = React.useMemo(() => {
    return {
      isHeaderRow: true
    };
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(TableHeaderContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(
    htmlElements.THead,
    {
      ref,
      className: styles.tableHeaderStyle({ class: className }),
      ...props
    }
  ) });
});
const TableBody = React.forwardRef(function TableBody2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    htmlElements.TBody,
    {
      ref,
      className: styles.tableBodyStyle({ class: className }),
      ...props
    }
  );
});
const TableFooter = React.forwardRef(function TableFooter2({ className, ...props }, ref) {
  const contextValue = React.useMemo(() => {
    return {
      isFooterRow: true
    };
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(TableFooterContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(
    htmlElements.TFoot,
    {
      ref,
      className: styles.tableFooterStyle({ class: className }),
      ...props
    }
  ) });
});
const TableHead = React.forwardRef(function TableHead2({ useRNView = false, className, ...props }, ref) {
  if (useRNView) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ref,
        className: styles.tableHeadStyle({ class: className }),
        ...props
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Text,
      {
        ref,
        className: styles.tableHeadStyle({ class: className }),
        ...props
      }
    );
  }
});
const TableRow = React.forwardRef(function TableRow2({ className, ...props }, ref) {
  const { isHeaderRow } = React.useContext(TableHeaderContext);
  const { isFooterRow } = React.useContext(TableFooterContext);
  return /* @__PURE__ */ jsxRuntime.jsx(
    htmlElements.TR,
    {
      ref,
      className: styles.tableRowStyleStyle({
        isHeaderRow,
        isFooterRow,
        class: className
      }),
      ...props
    }
  );
});
const TableData = React.forwardRef(function TableData2({ useRNView = false, className, ...props }, ref) {
  if (useRNView) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        ref,
        className: styles.tableDataStyle({ class: className }),
        ...props
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Text,
      {
        ref,
        className: styles.tableDataStyle({ class: className }),
        ...props
      }
    );
  }
});
const TableCaption = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    htmlElements.Caption,
    {
      ref,
      className: styles.tableCaptionStyle({ class: className }),
      ...props
    }
  );
});
Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableFooter.displayName = "TableFooter";
TableHead.displayName = "TableHead";
TableRow.displayName = "TableRow";
TableData.displayName = "TableData";
TableCaption.displayName = "TableCaption";

exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableData = TableData;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
//# sourceMappingURL=index.cjs.map
