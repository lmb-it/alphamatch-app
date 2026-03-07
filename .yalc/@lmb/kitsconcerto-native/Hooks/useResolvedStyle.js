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
  ml: "marginLeft"
};
function useResolvedStyle(themeStyle) {
  const { resolveToken } = useKitsTheme();
  return useMemo(() => {
    if (!themeStyle || Object.keys(themeStyle).length === 0) return {};
    const resolved = {};
    for (const [key, value] of Object.entries(themeStyle)) {
      const cssKey = CSS_PROP_MAP[key] || key;
      resolved[cssKey] = typeof value === "string" ? resolveToken(value) : value;
    }
    return resolved;
  }, [themeStyle, resolveToken]);
}

export { useResolvedStyle as default };
//# sourceMappingURL=useResolvedStyle.js.map
