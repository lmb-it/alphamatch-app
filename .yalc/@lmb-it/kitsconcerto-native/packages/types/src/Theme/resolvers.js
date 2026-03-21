const SEMANTIC_KEYS = /* @__PURE__ */ new Set([
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "text",
  "text-secondary",
  "bg",
  "bg-subtle",
  "border",
  "surface-ground",
  "surface-card",
  "surface-overlay",
  "surface-hover"
]);
const DOT_NOTATION_RE = /^([a-zA-Z]+)\.(\d+)$/;
const DASH_NOTATION_RE = /^([a-zA-Z]+)-(\d+)$/;
function resolveTokenValue(theme, colorMode, token, platform = "web") {
  if (typeof token !== "string") return token;
  if (token.startsWith("#") || token.startsWith("rgb") || token.startsWith("hsl") || token === "transparent" || token === "inherit" || token === "currentColor") {
    return token;
  }
  const semantics = theme.semanticTokens[colorMode];
  if (semantics && token in semantics) {
    const resolved = semantics[token];
    return resolveTokenValue(theme, colorMode, resolved, platform);
  }
  const dotMatch = token.match(DOT_NOTATION_RE);
  if (dotMatch) {
    const [, family, shade] = dotMatch;
    const scale = theme.colors[family];
    if (scale && shade in scale) {
      const hex = scale[shade];
      return platform === "web" ? `var(--kits-${family}-${shade})` : hex;
    }
  }
  if (token.startsWith("$")) {
    const dotIdx = token.indexOf(".");
    if (dotIdx > 1) {
      const category = token.substring(1, dotIdx);
      const key = token.substring(dotIdx + 1);
      switch (category) {
        case "spacing":
          if (key in theme.spacing) {
            return platform === "web" ? `var(--kits-space-${key})` : theme.spacing[key];
          }
          break;
        case "radii":
          if (key in theme.radii) {
            return platform === "web" ? `var(--kits-radii-${key})` : theme.radii[key];
          }
          break;
        case "shadows":
          if (key in theme.shadows) {
            return platform === "web" ? `var(--kits-shadow-${key})` : theme.shadows[key];
          }
          break;
        case "fontSizes":
          if (key in theme.fontSizes) {
            return platform === "web" ? `var(--kits-fontSize-${key})` : theme.fontSizes[key];
          }
          break;
        case "fonts":
          if (key in theme.fonts) {
            return platform === "web" ? `var(--kits-font-${key})` : theme.fonts[key];
          }
          break;
      }
    }
  }
  if (token.startsWith("var(")) {
    return token;
  }
  const dashMatch = token.match(DASH_NOTATION_RE);
  if (dashMatch) {
    const [, family, shade] = dashMatch;
    const scale = theme.colors[family];
    if (scale && shade in scale) {
      const hex = scale[shade];
      return platform === "web" ? `var(--kits-${family}-${shade})` : hex;
    }
  }
  return token;
}
function isThemeToken(value) {
  if (typeof value !== "string") return false;
  if (DOT_NOTATION_RE.test(value)) return true;
  if (value.startsWith("$")) return true;
  if (SEMANTIC_KEYS.has(value)) return true;
  return false;
}

export { isThemeToken, resolveTokenValue };
//# sourceMappingURL=resolvers.js.map
