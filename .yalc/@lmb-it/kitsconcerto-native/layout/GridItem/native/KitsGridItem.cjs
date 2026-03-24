'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var GridContext = require('../../Grid/native/GridContext.cjs');

const KitsGridItem = ({ id: externalId, colSpan, children }) => {
  const autoId = React.useId();
  const id = externalId ?? autoId;
  const { registerItem, unregisterItem, getItemWidth, containerWidth } = GridContext.useGridContext();
  React.useEffect(() => {
    registerItem(id, colSpan);
  }, [id, colSpan, registerItem]);
  React.useEffect(() => {
    return () => {
      unregisterItem(id);
    };
  }, [id]);
  const width = getItemWidth(id);
  const measured = containerWidth > 0 && width != null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.View,
    {
      style: measured ? { width, flexShrink: 0, flexGrow: 0 } : styles.fallback,
      children
    }
  );
};
const styles = reactNative.StyleSheet.create({
  fallback: {
    width: "100%"
  }
});

exports.default = KitsGridItem;
//# sourceMappingURL=KitsGridItem.cjs.map
