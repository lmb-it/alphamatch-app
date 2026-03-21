import { useMemo } from 'react';
import { useKitsTheme } from '../contexts/Theme/KitsThemeProvider.js';

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
  const { resolveToken } = useKitsTheme();
  return useMemo(() => resolveStyleRecord(themeStyle, resolveToken), [themeStyle, resolveToken]);
}

export { useResolvedStyle as default, resolveStyleRecord };
//# sourceMappingURL=useResolvedStyle.js.map
