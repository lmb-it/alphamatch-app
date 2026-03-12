import { useMemo } from 'react';
import { useKitsTheme } from '../Contexts/Theme/KitsThemeProvider.js';

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
function useResolvedStyle(themeStyle) {
  const { resolveToken } = useKitsTheme();
  return useMemo(() => {
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
  }, [themeStyle, resolveToken]);
}

export { useResolvedStyle as default };
//# sourceMappingURL=useResolvedStyle.js.map
