import { jsx } from 'react/jsx-runtime';
import { useId, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useGridContext } from '../../Grid/native/GridContext.js';

const KitsGridItem = ({ id: externalId, colSpan, children }) => {
  const autoId = useId();
  const id = externalId ?? autoId;
  const { registerItem, unregisterItem, getItemWidth, containerWidth } = useGridContext();
  useEffect(() => {
    registerItem(id, colSpan);
  }, [id, colSpan, registerItem]);
  useEffect(() => {
    return () => {
      unregisterItem(id);
    };
  }, [id]);
  const width = getItemWidth(id);
  const measured = containerWidth > 0 && width != null;
  return /* @__PURE__ */ jsx(
    View,
    {
      style: measured ? { width, flexShrink: 0, flexGrow: 0 } : styles.fallback,
      children
    }
  );
};
const styles = StyleSheet.create({
  fallback: {
    width: "100%"
  }
});

export { KitsGridItem as default };
//# sourceMappingURL=KitsGridItem.js.map
