import { jsxs, jsx } from 'react/jsx-runtime';
import React, { forwardRef, useMemo, useState, useRef, useCallback, useImperativeHandle } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Column } from './Column.js';

function isColumnElement(node) {
  return !!node && node.type === Column;
}
function getRowKey(dataKey, row, rowIndex) {
  if (!dataKey) return String(rowIndex);
  if (typeof dataKey === "function") {
    const v2 = dataKey(row);
    return v2 == null ? String(rowIndex) : String(v2);
  }
  const v = row?.[dataKey];
  return v == null ? String(rowIndex) : String(v);
}
function deepEquals(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return a === b;
  }
}
forwardRef(function DataTableInner(props, ref) {
  const {
    value,
    children,
    style,
    tableStyle,
    showHeaders = true,
    emptyMessage = "No results found",
    loading = false,
    // paging
    paginator = false,
    alwaysShowPaginator = true,
    rows: rowsProp,
    first: firstProp,
    // sorting
    sortMode = "single",
    sortField: sortFieldProp,
    sortOrder: sortOrderProp,
    multiSortMeta: multiSortMetaProp,
    // selection
    selectionMode,
    compareSelectionBy = "deepEquals",
    metaKeySelection = true,
    // web behavior; RN ignores metaKey but keeps prop.
    selectionPageOnly = false,
    onSelectionChange,
    onRowSelect,
    onRowUnselect,
    onSelectAllChange,
    showSelectAll,
    // callbacks
    onRowClick,
    onSort,
    onPage,
    onValueChange,
    // filters (present; minimal internal storage now)
    filters: filtersProp,
    totalRecords,
    dataKey,
    testID
  } = props;
  const columns = useMemo(() => {
    const cols = [];
    React.Children.forEach(children, (child) => {
      if (isColumnElement(child)) cols.push(child.props);
    });
    return cols.filter((c) => !c.hidden);
  }, [children]);
  const [firstState, setFirstState] = useState(firstProp ?? 0);
  const [rowsState, setRowsState] = useState(rowsProp ?? 10);
  const [sortFieldState, setSortFieldState] = useState(
    sortFieldProp
  );
  const [sortOrderState, setSortOrderState] = useState(
    sortOrderProp ?? null
  );
  const [multiSortMetaState, setMultiSortMetaState] = useState(multiSortMetaProp ?? null);
  const [filtersState, setFiltersState] = useState(
    filtersProp ?? void 0
  );
  const isRowsControlled = props.rows !== void 0;
  const first = firstProp ?? firstState;
  const rows = isRowsControlled ? rowsProp : rowsState;
  const sortField = sortFieldProp ?? sortFieldState;
  const sortOrder = sortOrderProp ?? sortOrderState;
  const multiSortMeta = multiSortMetaProp ?? multiSortMetaState;
  const filters = filtersProp ?? filtersState;
  const selectionRef = useRef(void 0);
  const compareFn = useMemo(() => compareSelectionBy === "equals" ? (a, b) => a === b : deepEquals, [compareSelectionBy]);
  const isSelected = useCallback(
    (row) => {
      const sel = selectionRef.current;
      if (selectionMode === "multiple" || selectionMode === "checkbox") {
        if (!Array.isArray(sel)) return false;
        return sel.some((x) => compareFn(x, row));
      }
      if (selectionMode === "single" || selectionMode === "radiobutton") {
        if (sel == null) return false;
        return compareFn(sel, row);
      }
      return false;
    },
    [selectionMode, compareFn]
  );
  const updateRows = useCallback((next) => {
    if (!isRowsControlled) {
      setRowsState(next);
    }
  }, [isRowsControlled]);
  const updateSelection = useCallback(
    (row, rowIndex) => {
      const originalEvent = void 0;
      if (selectionMode === "multiple" || selectionMode === "checkbox") {
        const prev = Array.isArray(selectionRef.current) ? selectionRef.current : [];
        const exists = prev.some((x) => compareFn(x, row));
        const next = exists ? prev.filter((x) => !compareFn(x, row)) : [...prev, row];
        selectionRef.current = next;
        onSelectionChange?.({
          originalEvent,
          value: next,
          type: exists ? "multiple" : "multiple"
        });
        if (!exists) onRowSelect?.({ originalEvent, data: row, type: "row" });
        else onRowUnselect?.({ originalEvent, data: row, type: "row" });
        return;
      }
      if (selectionMode === "single" || selectionMode === "radiobutton") {
        const prev = selectionRef.current;
        const exists = prev != null && compareFn(prev, row);
        const next = exists ? null : row;
        selectionRef.current = next;
        onSelectionChange?.({
          originalEvent,
          value: next,
          type: selectionMode === "radiobutton" ? "radio" : "single"
        });
        if (!exists && next != null) onRowSelect?.({ originalEvent, data: row, type: "row" });
        if (exists) onRowUnselect?.({ originalEvent, data: row, type: "row" });
        return;
      }
    },
    [selectionMode, compareFn, onSelectionChange, onRowSelect, onRowUnselect]
  );
  const rawArray = useMemo(() => value ?? [], [value]);
  const effectiveTotalRecords = totalRecords ?? rawArray.length;
  const sortedData = useMemo(() => {
    const data = [...rawArray];
    const sortByField = (field, order) => {
      if (!field || order === void 0 || order === 0) return;
      data.sort((a, b) => {
        const av = a?.[field];
        const bv = b?.[field];
        if (av == null && bv == null) return 0;
        if (av == null) return -1 * order;
        if (bv == null) return 1 * order;
        if (av < bv) return -1 * order;
        if (av > bv) return 1 * order;
        return 0;
      });
    };
    if (sortMode === "single") {
      if (sortField) sortByField(sortField, sortOrder);
      return data;
    }
    const meta = multiSortMeta ?? [];
    if (!meta || meta.length === 0) return data;
    data.sort((a, b) => {
      for (const m of meta) {
        const field = m.field;
        const order = m.order ?? 0;
        const av = a?.[field];
        const bv = b?.[field];
        if (av == null && bv == null) continue;
        if (av == null) return -1 * order;
        if (bv == null) return 1 * order;
        if (av < bv) return -1 * order;
        if (av > bv) return 1 * order;
      }
      return 0;
    });
    return data;
  }, [rawArray, sortMode, sortField, sortOrder, multiSortMeta]);
  const processedData = useMemo(() => {
    return sortedData;
  }, [sortedData]);
  const pageCount = useMemo(() => {
    if (!paginator) return 1;
    const r = rows || 1;
    return Math.max(1, Math.ceil(effectiveTotalRecords / r));
  }, [paginator, rows, effectiveTotalRecords]);
  const processedDataPage = useMemo(() => {
    if (!paginator) return processedData;
    const start = Math.max(0, first);
    const end = Math.max(0, start + (rows ?? 0));
    return processedData.slice(start, end);
  }, [processedData, paginator, first, rows]);
  const toggleSort = useCallback(
    (col) => {
      if (!col.sortable) return;
      const field = col.sortField ?? col.field;
      if (!field) return;
      if (sortMode === "single") {
        const isSame = sortField === field;
        const nextOrder = !isSame ? 1 : sortOrder === 1 ? -1 : sortOrder === -1 ? 0 : 1;
        setSortFieldState(field);
        setSortOrderState(nextOrder);
        onSort?.({
          first,
          rows: rows ?? 0,
          page: rows ? Math.floor(first / rows) : 0,
          pageCount,
          sortField: field,
          sortOrder: nextOrder,
          multiSortMeta: null,
          filters: filters ?? {}
        });
        return;
      }
      const prev = (multiSortMeta ?? []) || [];
      const idx = prev.findIndex((m) => m.field === field);
      let next = [];
      if (idx === -1) {
        next = [...prev, { field, order: 1 }];
      } else {
        const cur = prev[idx];
        const nextOrder = cur?.order === 1 ? -1 : cur?.order === -1 ? 0 : 1;
        if (nextOrder === void 0 || nextOrder === 0) {
          next = prev.filter((m) => m.field !== field);
        } else {
          next = prev.map((m) => m.field === field ? { ...m, order: nextOrder } : m);
        }
      }
      setMultiSortMetaState(next);
      onSort?.({
        first,
        rows: rows ?? 0,
        page: rows ? Math.floor(first / rows) : 0,
        pageCount,
        sortField: field,
        sortOrder: null,
        multiSortMeta: next,
        filters: filters ?? {}
      });
    },
    [filters, first, multiSortMeta, onSort, pageCount, rows, sortField, sortMode, sortOrder]
  );
  const goToPage = useCallback(
    (page) => {
      const p = Math.max(0, Math.min(page, pageCount - 1));
      const nextFirst = p * (rows ?? 0);
      setFirstState(nextFirst);
      rows && updateRows(rows);
      onPage?.({
        first: nextFirst,
        rows: rows ?? 0,
        page: p,
        pageCount,
        sortField: sortField ?? "",
        sortOrder,
        multiSortMeta: multiSortMeta ?? null,
        filters: filters ?? {}
      });
    },
    [filters, multiSortMeta, onPage, pageCount, rows, sortField, sortOrder, updateRows]
  );
  useImperativeHandle(
    ref,
    () => ({
      clearState: () => {
      },
      closeEditingCell: () => {
      },
      closeEditingRows: () => {
      },
      exportCSV: (_options) => {
      },
      filter: (v, field, mode) => {
        const next = { ...filters ?? {} };
        next[field] = { value: v, matchMode: mode };
        setFiltersState(next);
        props.onFilter?.({
          first,
          rows: rows ?? 0,
          page: rows ? Math.floor(first / rows) : 0,
          pageCount,
          sortField: sortField ?? "",
          sortOrder,
          multiSortMeta: multiSortMeta ?? null,
          filters: next
        });
      },
      getElement: () => null,
      getFilterMeta: () => filters,
      getProcessedData: () => processedData,
      getSortMeta: () => multiSortMeta ?? void 0,
      getTable: () => null,
      getVirtualScroller: () => null,
      reset: () => {
        setFirstState(0);
        setSortFieldState(void 0);
        setSortOrderState(null);
        setMultiSortMetaState(null);
        setFiltersState(void 0);
      },
      resetColumnOrder: () => {
      },
      resetResizeColumnsWidth: () => {
      },
      resetScroll: () => {
      },
      restoreColumnWidths: () => {
      },
      restoreState: () => {
      },
      restoreTableState: (_state) => {
      },
      saveState: () => {
      },
      setFilterMeta: (f) => setFiltersState(f),
      setSortMeta: (s) => setMultiSortMetaState(s)
    }),
    [
      filters,
      first,
      multiSortMeta,
      pageCount,
      processedData,
      props,
      rows,
      sortField,
      sortOrder
    ]
  );
  const lastValueRef = useRef(null);
  useMemo(() => {
    if (!onValueChange) return;
    if (lastValueRef.current !== processedDataPage) {
      lastValueRef.current = processedDataPage;
      onValueChange(processedDataPage);
    }
  }, [onValueChange, processedDataPage]);
  const renderHeaderCell = (col, index) => {
    const headerNode2 = typeof col.header === "function" ? col.header({ props: col }) : col.header;
    const label = headerNode2 == null ? String(col.field ?? "") : headerNode2;
    const isSortable = !!col.sortable && (col.field || col.sortField);
    return /* @__PURE__ */ jsx(
      Pressable,
      {
        onPress: () => toggleSort(col),
        disabled: !isSortable,
        style: [
          { paddingVertical: 10, paddingHorizontal: 8, flex: 1 },
          col.headerStyle
        ],
        children: React.isValidElement(label) ? label : /* @__PURE__ */ jsx(Text, { style: [{ fontWeight: "600" }, col.headerTextStyle], children: String(label) })
      },
      `h-${index}-${col.field ?? col.sortField ?? index}`
    );
  };
  const renderRow = ({ item, index }) => {
    const selected = isSelected(item);
    return /* @__PURE__ */ jsx(
      Pressable,
      {
        onPress: () => {
          onRowClick?.({ data: item, originalEvent: void 0, index });
          if (selectionMode) updateSelection(item, index);
        },
        style: [
          {
            flexDirection: "row",
            alignItems: "stretch",
            opacity: loading ? 0.6 : 1
          },
          selected ? { backgroundColor: "rgba(0,0,0,0.06)" } : null
        ],
        children: columns.map((col, cIndex) => {
          const content = typeof col.body === "function" ? col.body(item, { rowIndex: index, field: col.field }) : col.body;
          const fallback = col.field ? item?.[col.field] : void 0;
          return /* @__PURE__ */ jsx(
            View,
            {
              style: [
                { paddingVertical: 10, paddingHorizontal: 8, flex: 1 },
                col.bodyStyle
              ],
              children: content != null ? React.isValidElement(content) ? content : /* @__PURE__ */ jsx(Text, { style: col.bodyTextStyle, children: String(content) }) : /* @__PURE__ */ jsx(Text, { style: col.bodyTextStyle, children: fallback == null ? "" : String(fallback) })
            },
            `c-${index}-${cIndex}-${col.field ?? cIndex}`
          );
        })
      }
    );
  };
  const renderEmpty = () => {
    const msg = typeof emptyMessage === "function" ? emptyMessage(props) : emptyMessage;
    return /* @__PURE__ */ jsx(View, { style: { paddingVertical: 16, paddingHorizontal: 12 }, children: React.isValidElement(msg) ? msg : /* @__PURE__ */ jsx(Text, { style: { opacity: 0.7 }, children: String(msg) }) });
  };
  const renderPaginator = () => {
    if (!paginator) return null;
    if (!alwaysShowPaginator && pageCount <= 1) return null;
    const page = rows ? Math.floor(first / rows) : 0;
    return /* @__PURE__ */ jsxs(View, { style: { flexDirection: "row", justifyContent: "space-between", padding: 10 }, children: [
      /* @__PURE__ */ jsx(Pressable, { onPress: () => goToPage(page - 1), disabled: page <= 0, children: /* @__PURE__ */ jsx(Text, { style: { opacity: page <= 0 ? 0.4 : 1 }, children: "Prev" }) }),
      /* @__PURE__ */ jsxs(Text, { children: [
        page + 1,
        " / ",
        pageCount
      ] }),
      /* @__PURE__ */ jsx(Pressable, { onPress: () => goToPage(page + 1), disabled: page >= pageCount - 1, children: /* @__PURE__ */ jsx(Text, { style: { opacity: page >= pageCount - 1 ? 0.4 : 1 }, children: "Next" }) })
    ] });
  };
  const headerNode = typeof props.header === "function" ? props.header(props) : props.header;
  const footerNode = typeof props.footer === "function" ? props.footer(props) : props.footer;
  return /* @__PURE__ */ jsxs(View, { testID, style: [{ width: "100%" }, style], children: [
    headerNode ? /* @__PURE__ */ jsx(View, { style: { padding: 8 }, children: headerNode }) : null,
    showHeaders ? /* @__PURE__ */ jsx(View, { style: [{ flexDirection: "row" }, tableStyle], children: columns.map(renderHeaderCell) }) : null,
    loading ? /* @__PURE__ */ jsx(View, { style: { padding: 12 }, children: /* @__PURE__ */ jsx(Text, { children: "Loading..." }) }) : null,
    processedDataPage.length === 0 ? renderEmpty() : /* @__PURE__ */ jsx(
      FlatList,
      {
        data: processedDataPage,
        keyExtractor: (row, i) => getRowKey(dataKey, row, i),
        renderItem: renderRow
      }
    ),
    renderPaginator(),
    footerNode ? /* @__PURE__ */ jsx(View, { style: { padding: 8 }, children: footerNode }) : null
  ] });
});
//# sourceMappingURL=DataTable.js.map
