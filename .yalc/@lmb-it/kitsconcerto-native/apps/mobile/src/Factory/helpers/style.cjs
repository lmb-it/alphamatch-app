'use strict';

var reactNative = require('react-native');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
var index_native$1 = require('../../../../../packages/types/src/Css/map/index.cjs');
var index_native = require('../../../../../packages/types/src/Css/constants/breakpoints/index.cjs');
var resolvers = require('../../../../../packages/types/src/Theme/resolvers.cjs');
var cssVarMap = require('./cssVarMap.cjs');

let _activeColorMap = cssVarMap.CSS_VAR_MAP;
function setActiveColorMap(map) {
  _activeColorMap = map;
}
function resolveCssVar(value) {
  const varMatch = value.match(/^var\(\s*(--[^)]+)\s*\)$/);
  if (!varMatch) return value;
  const varName = varMatch[1];
  return _activeColorMap[varName] ?? cssVarMap.CSS_VAR_MAP[varName] ?? value;
}
function resolveThemeTokenForNative(value) {
  const dotMatch = value.match(/^([a-zA-Z]+)\.(\d+)$/);
  if (dotMatch) {
    const varName = `--kits-${dotMatch[1]}-${dotMatch[2]}`;
    return _activeColorMap[varName] ?? value;
  }
  if (value.startsWith("$")) {
    const dotIdx = value.indexOf(".");
    if (dotIdx > 1) {
      const category = value.substring(1, dotIdx);
      const key = value.substring(dotIdx + 1);
      switch (category) {
        case "spacing": {
          const varName = `--kits-space-${key}`;
          return _activeColorMap[varName] ?? value;
        }
        case "radii": {
          const varName = `--kits-radii-${key}`;
          return _activeColorMap[varName] ?? value;
        }
        case "shadows": {
          const varName = `--kits-shadow-${key}`;
          return _activeColorMap[varName] ?? value;
        }
        case "fontSizes": {
          const varName = `--kits-fontSize-${key}`;
          return _activeColorMap[varName] ?? value;
        }
        case "fonts": {
          const varName = `--kits-font-${key}`;
          return _activeColorMap[varName] ?? value;
        }
      }
    }
  }
  const semanticVarName = `--kits-${value}`;
  if (_activeColorMap[semanticVarName]) {
    return _activeColorMap[semanticVarName];
  }
  return value;
}
function createStyleContext() {
  const { width, height } = reactNative.Dimensions.get("window");
  const orientation = width > height ? "landscape" : "portrait";
  const device = Math.min(width, height) >= 768 ? "tablet" : "phone";
  return {
    platform: reactNative.Platform.OS,
    width,
    height,
    orientation,
    device,
    breakpoint: getCurrentBreakpoint(width)
  };
}
const getCurrentBreakpoint = (width) => {
  const entries = Object.entries(index_native.breakpoints).sort((a, b) => b[1] - a[1]);
  for (const [key, value] of entries) {
    if (width >= value) return key;
  }
  return "base";
};
const breakpointOrder = [
  "base",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
  "xxxl"
];
function toNativeValue(value) {
  if (typeof value !== "string") return value;
  if (value === "0") return 0;
  if (resolvers.isThemeToken(value)) {
    const resolved = resolveThemeTokenForNative(value);
    if (resolved !== value) return toNativeValue(resolved);
  }
  if (value.startsWith("var(")) {
    const resolved = resolveCssVar(value);
    return resolved !== value ? toNativeValue(resolved) : value;
  }
  const remMatch = value.match(/^(-?\d*\.?\d+)rem$/);
  if (remMatch) return parseFloat(remMatch[1]) * 16;
  const emMatch = value.match(/^(-?\d*\.?\d+)em$/);
  if (emMatch) return parseFloat(emMatch[1]) * 16;
  const pxMatch = value.match(/^(-?\d*\.?\d+)px$/);
  if (pxMatch) return parseFloat(pxMatch[1]);
  const pcMatch = value.match(/^(-?\d*\.?\d+)pc$/);
  if (pcMatch) return parseFloat(pcMatch[1]) * 16;
  const numMatch = value.match(/^(-?\d*\.?\d+)$/);
  if (numMatch) return parseFloat(numMatch[1]);
  return value;
}
const BORDER_STYLES = ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset"];
function extractBorderWidth(part) {
  const remMatch = part.match(/^(\d+(\.\d+)?)rem$/);
  if (remMatch) return parseFloat(remMatch[1]) * 16;
  const emMatch = part.match(/^(\d+(\.\d+)?)em$/);
  if (emMatch) return parseFloat(emMatch[1]) * 16;
  const match = part.match(/^(\d+(\.\d+)?)(px)?$/);
  if (!match) return void 0;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : void 0;
}
const parseBorder = (value) => {
  if (!value || typeof value !== "string") return {};
  const parts = value.trim().split(/\s+/);
  let borderWidth;
  let borderStyle;
  let borderColor;
  for (const part of parts) {
    if (!borderWidth && /^(\d+(\.\d+)?(px|em|rem|%)?)$/.test(part)) {
      const extracted = extractBorderWidth(part);
      if (extracted !== void 0) {
        borderWidth = extracted;
        continue;
      }
      continue;
    }
    if (!borderStyle && BORDER_STYLES.includes(part)) {
      borderStyle = part;
      continue;
    }
    if (!borderColor && (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(part) || /^rgb(a)?\(/.test(part) || /^hsl(a)?\(/.test(part) || /^[a-zA-Z]+$/.test(part))) {
      borderColor = part;
    }
  }
  return { borderWidth, borderStyle, borderColor };
};
const isPrimitive = (v) => typeof v === "number" || typeof v === "string";
function resolveResponsiveValue(input, ctx) {
  if (input == null || isPrimitive(input)) {
    return input;
  }
  if (Array.isArray(input)) {
    const index = breakpointOrder.indexOf(ctx.breakpoint);
    for (let i = index; i >= 0; i--) {
      const val = input[i];
      if (val !== null && val !== void 0) return val;
    }
    return void 0;
  }
  if (ctx.platform in input) {
    return resolveResponsiveValue(input[ctx.platform], ctx);
  }
  if (ctx.device in input) {
    return resolveResponsiveValue(input[ctx.device], ctx);
  }
  if (ctx.orientation in input) {
    return resolveResponsiveValue(input[ctx.orientation], ctx);
  }
  for (let i = breakpointOrder.indexOf(ctx.breakpoint); i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (bp && bp in input) return input[bp];
  }
  return void 0;
}
const resolveSizing = (value, key, ctx) => {
  if (value === "full") return "100%";
  if (value === "screen") {
    const isH = key === "h" || key === "height" || key === "minH" || key === "maxH";
    return isH ? ctx.height : ctx.width;
  }
  return toNativeValue(value);
};
const parseBorderSide = (resolved, side) => {
  const parsed = parseBorder(resolved);
  const styles = {};
  if (parsed.borderWidth !== void 0) styles[`${side}Width`] = parsed.borderWidth;
  if (parsed.borderColor) styles[`${side}Color`] = parsed.borderColor;
  if (parsed.borderStyle) styles[`${side}Style`] = parsed.borderStyle;
  return styles;
};
const style = (props, externalCtx) => {
  const ctx = externalCtx ?? createStyleContext();
  const finalStyles = {};
  const transforms = [];
  const apply = (key, value) => {
    const mapped = index_native$1.default[key];
    if (!mapped) return;
    const converted = toNativeValue(value);
    finalStyles[mapped] = converted;
  };
  Object.entries(props).forEach(([key, val]) => {
    if (val === void 0 || key.startsWith("_")) return;
    const resolved = resolveResponsiveValue(val, ctx);
    if (resolved === void 0) return;
    switch (key) {
      // Margin shorthands
      case "mx":
        finalStyles.marginLeft = toNativeValue(resolved);
        finalStyles.marginRight = toNativeValue(resolved);
        break;
      case "my":
        finalStyles.marginTop = toNativeValue(resolved);
        finalStyles.marginBottom = toNativeValue(resolved);
        break;
      // Padding shorthands
      case "px":
        finalStyles.paddingLeft = toNativeValue(resolved);
        finalStyles.paddingRight = toNativeValue(resolved);
        break;
      case "py":
        finalStyles.paddingTop = toNativeValue(resolved);
        finalStyles.paddingBottom = toNativeValue(resolved);
        break;
      // Sizing with "full"/"screen" support
      case "w":
      case "width":
        finalStyles.width = resolveSizing(resolved, key, ctx);
        break;
      case "h":
      case "height":
        finalStyles.height = resolveSizing(resolved, key, ctx);
        break;
      case "minW":
      case "minWidth":
        finalStyles.minWidth = resolveSizing(resolved, key, ctx);
        break;
      case "maxW":
      case "maxWidth":
        finalStyles.maxWidth = resolveSizing(resolved, key, ctx);
        break;
      case "minH":
      case "minHeight":
        finalStyles.minHeight = resolveSizing(resolved, key, ctx);
        break;
      case "maxH":
      case "maxHeight":
        finalStyles.maxHeight = resolveSizing(resolved, key, ctx);
        break;
      // Opacity normalization (0-100 -> 0-1)
      case "opacity":
        finalStyles.opacity = typeof resolved === "number" ? resolved / 100 : resolved;
        break;
      // Border shorthand
      case "border":
        if (typeof resolved === "string") {
          Object.assign(finalStyles, parseBorder(resolved));
        }
        break;
      // Border side-specific
      case "borderTop":
        if (typeof resolved === "string") {
          Object.assign(finalStyles, parseBorderSide(resolved, "borderTop"));
        }
        break;
      case "borderBottom":
        if (typeof resolved === "string") {
          Object.assign(finalStyles, parseBorderSide(resolved, "borderBottom"));
        }
        break;
      case "borderLeft":
        if (typeof resolved === "string") {
          Object.assign(finalStyles, parseBorderSide(resolved, "borderLeft"));
        }
        break;
      case "borderRight":
        if (typeof resolved === "string") {
          Object.assign(finalStyles, parseBorderSide(resolved, "borderRight"));
        }
        break;
      // Border X/Y shorthands
      case "borderX":
        if (typeof resolved === "string") {
          Object.assign(finalStyles, parseBorderSide(resolved, "borderLeft"));
          Object.assign(finalStyles, parseBorderSide(resolved, "borderRight"));
        }
        break;
      case "borderY":
        if (typeof resolved === "string") {
          Object.assign(finalStyles, parseBorderSide(resolved, "borderTop"));
          Object.assign(finalStyles, parseBorderSide(resolved, "borderBottom"));
        }
        break;
      // Border radius shorthands
      case "borderRadiusTop":
        finalStyles.borderTopLeftRadius = toNativeValue(resolved);
        finalStyles.borderTopRightRadius = toNativeValue(resolved);
        break;
      case "borderRadiusBottom":
        finalStyles.borderBottomLeftRadius = toNativeValue(resolved);
        finalStyles.borderBottomRightRadius = toNativeValue(resolved);
        break;
      case "borderRadiusLeft":
        finalStyles.borderTopLeftRadius = toNativeValue(resolved);
        finalStyles.borderBottomLeftRadius = toNativeValue(resolved);
        break;
      case "borderRadiusRight":
        finalStyles.borderTopRightRadius = toNativeValue(resolved);
        finalStyles.borderBottomRightRadius = toNativeValue(resolved);
        break;
      // Transform props -> RN transform array
      case "translateX":
        transforms.push({ translateX: typeof resolved === "string" ? parseFloat(resolved) || 0 : resolved });
        break;
      case "translateY":
        transforms.push({ translateY: typeof resolved === "string" ? parseFloat(resolved) || 0 : resolved });
        break;
      case "rotate":
        transforms.push({ rotate: typeof resolved === "number" ? `${resolved}deg` : resolved });
        break;
      default:
        apply(key, resolved);
        break;
    }
  });
  if (transforms.length > 0) {
    finalStyles.transform = transforms;
  }
  return finalStyles;
};

exports.createStyleContext = createStyleContext;
exports.getCurrentBreakpoint = getCurrentBreakpoint;
exports.resolveCssVar = resolveCssVar;
exports.resolveResponsiveValue = resolveResponsiveValue;
exports.resolveThemeTokenForNative = resolveThemeTokenForNative;
exports.setActiveColorMap = setActiveColorMap;
exports.style = style;
exports.toNativeValue = toNativeValue;
//# sourceMappingURL=style.cjs.map
