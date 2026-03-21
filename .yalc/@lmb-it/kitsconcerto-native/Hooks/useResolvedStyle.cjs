'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var KitsThemeProvider_native = require('../contexts/Theme/KitsThemeProvider.cjs');

const CSS_PROP_MAP = {
  bg: "backgroundColor",
  bgColor: "backgroundColor",
  w: "width",
  h: "height",
  minW: "minWidth",
  maxW: "maxWidth",
  minH: "minHeight",
  maxH: "maxHeight",
  p: "padding",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",
  m: "margin",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",
  fontColor: "color",
  borderW: "borderWidth",
  shadow: "boxShadow",
  flexOrder: "order"
};
const EXPAND_MAP = {
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
  paddingHorizontal: ["paddingLeft", "paddingRight"],
  paddingVertical: ["paddingTop", "paddingBottom"],
  borderX: ["borderLeft", "borderRight"],
  borderY: ["borderTop", "borderBottom"]
};
function resolveStyleRecord(themeStyle, resolveToken) {
  if (!themeStyle || Object.keys(themeStyle).length === 0) return {};
  const resolved = {};
  for (const [key, value] of Object.entries(themeStyle)) {
    const resolvedValue = typeof value === "string" ? resolveToken(value) : value;
    if (key in EXPAND_MAP) {
      for (const cssKey of EXPAND_MAP[key]) {
        resolved[cssKey] = resolvedValue;
      }
      continue;
    }
    resolved[CSS_PROP_MAP[key] ?? key] = resolvedValue;
  }
  return resolved;
}
function useResolvedStyle(themeStyle) {
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  return React.useMemo(() => resolveStyleRecord(themeStyle, resolveToken), [themeStyle, resolveToken]);
}

exports.default = useResolvedStyle;
exports.resolveStyleRecord = resolveStyleRecord;
//# sourceMappingURL=useResolvedStyle.cjs.map
