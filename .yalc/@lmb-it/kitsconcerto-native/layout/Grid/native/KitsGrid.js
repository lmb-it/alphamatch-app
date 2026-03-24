import { jsx } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import GridContext, { arrangeIntoRows } from './GridContext.js';

const KitsGrid = ({
  columns = 12,
  columnGap = 0,
  rowGap = 0,
  children
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const registryRef = useRef(/* @__PURE__ */ new Map());
  const orderCounterRef = useRef(0);
  const [version, setVersion] = useState(0);
  const registerItem = useCallback((id, colSpan) => {
    const existing = registryRef.current.get(id);
    if (existing) {
      if (existing.colSpan !== colSpan) {
        existing.colSpan = colSpan;
        setVersion((v) => v + 1);
      }
    } else {
      registryRef.current.set(id, {
        colSpan,
        order: orderCounterRef.current++
      });
      setVersion((v) => v + 1);
    }
  }, []);
  const unregisterItem = useCallback((id) => {
    if (registryRef.current.has(id)) {
      registryRef.current.delete(id);
      setVersion((v) => v + 1);
    }
  }, []);
  const itemWidths = useMemo(() => {
    const widths = /* @__PURE__ */ new Map();
    if (containerWidth <= 0) return widths;
    const items = Array.from(registryRef.current.entries()).sort(
      (a, b) => a[1].order - b[1].order
    );
    if (items.length === 0) return widths;
    const ids = items.map(([id]) => id);
    const colSpans = items.map(
      ([_, data]) => Math.min(data.colSpan, columns)
    );
    const rows = arrangeIntoRows(colSpans, columns);
    for (const indices of Object.values(rows)) {
      const itemsInRow = indices.length;
      const totalGapWidth = columnGap * (itemsInRow - 1);
      const availableWidth = containerWidth - totalGapWidth;
      for (const idx of indices) {
        const width = Math.max(
          0,
          Math.floor(availableWidth * colSpans[idx] / columns)
        );
        widths.set(ids[idx], width);
      }
    }
    return widths;
  }, [containerWidth, version, columns, columnGap]);
  const getItemWidth = useCallback(
    (id) => itemWidths.get(id),
    [itemWidths]
  );
  const contextValue = useMemo(
    () => ({
      registerItem,
      unregisterItem,
      getItemWidth,
      containerWidth,
      numColumns: columns,
      columnGap,
      rowGap
    }),
    [registerItem, unregisterItem, getItemWidth, containerWidth, columns, columnGap, rowGap]
  );
  const handleLayout = useCallback((event) => {
    const width = Math.floor(event.nativeEvent.layout.width);
    setContainerWidth((prev) => prev !== width ? width : prev);
  }, []);
  return /* @__PURE__ */ jsx(GridContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    View,
    {
      style: [styles.container, { columnGap, rowGap }],
      onLayout: handleLayout,
      children
    }
  ) });
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  }
});

export { KitsGrid as default };
//# sourceMappingURL=KitsGrid.js.map
