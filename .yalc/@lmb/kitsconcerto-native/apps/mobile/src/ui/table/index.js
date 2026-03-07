import { jsx } from 'react/jsx-runtime';
import React, { createContext, useMemo, useContext } from 'react';
import { Table as Table$1, THead, TBody, TFoot, TR, Caption } from '@expo/html-elements';
import { tableStyle, tableHeaderStyle, tableBodyStyle, tableFooterStyle, tableHeadStyle, tableRowStyleStyle, tableDataStyle, tableCaptionStyle } from './styles.js';
import { View, Text } from 'react-native';

const TableHeaderContext = createContext({
  isHeaderRow: false
});
const TableFooterContext = createContext({
  isFooterRow: false
});
const Table = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    Table$1,
    {
      ref,
      className: tableStyle({ class: className }),
      ...props
    }
  );
});
const TableHeader = React.forwardRef(function TableHeader2({ className, ...props }, ref) {
  const contextValue = useMemo(() => {
    return {
      isHeaderRow: true
    };
  }, []);
  return /* @__PURE__ */ jsx(TableHeaderContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    THead,
    {
      ref,
      className: tableHeaderStyle({ class: className }),
      ...props
    }
  ) });
});
const TableBody = React.forwardRef(function TableBody2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    TBody,
    {
      ref,
      className: tableBodyStyle({ class: className }),
      ...props
    }
  );
});
const TableFooter = React.forwardRef(function TableFooter2({ className, ...props }, ref) {
  const contextValue = useMemo(() => {
    return {
      isFooterRow: true
    };
  }, []);
  return /* @__PURE__ */ jsx(TableFooterContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    TFoot,
    {
      ref,
      className: tableFooterStyle({ class: className }),
      ...props
    }
  ) });
});
const TableHead = React.forwardRef(function TableHead2({ useRNView = false, className, ...props }, ref) {
  if (useRNView) {
    return /* @__PURE__ */ jsx(
      View,
      {
        ref,
        className: tableHeadStyle({ class: className }),
        ...props
      }
    );
  } else {
    return /* @__PURE__ */ jsx(
      Text,
      {
        ref,
        className: tableHeadStyle({ class: className }),
        ...props
      }
    );
  }
});
const TableRow = React.forwardRef(function TableRow2({ className, ...props }, ref) {
  const { isHeaderRow } = useContext(TableHeaderContext);
  const { isFooterRow } = useContext(TableFooterContext);
  return /* @__PURE__ */ jsx(
    TR,
    {
      ref,
      className: tableRowStyleStyle({
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
    return /* @__PURE__ */ jsx(
      View,
      {
        ref,
        className: tableDataStyle({ class: className }),
        ...props
      }
    );
  } else {
    return /* @__PURE__ */ jsx(
      Text,
      {
        ref,
        className: tableDataStyle({ class: className }),
        ...props
      }
    );
  }
});
const TableCaption = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    Caption,
    {
      ref,
      className: tableCaptionStyle({ class: className }),
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

export { Table, TableBody, TableCaption, TableData, TableFooter, TableHead, TableHeader, TableRow };
//# sourceMappingURL=index.js.map
