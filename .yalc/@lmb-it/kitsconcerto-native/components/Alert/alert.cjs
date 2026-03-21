'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var lucideReactNative = require('lucide-react-native');
var index_native = require('../../primitives/Text/index.cjs');
var KitsThemeProvider_native = require('../../contexts/Theme/KitsThemeProvider.cjs');
var index_native$1 = require('../../primitives/Icon/index.cjs');
var index = require('../../layout/Flex/index.cjs');

const icons = {
  error: lucideReactNative.CircleX,
  success: lucideReactNative.CheckCircle2,
  warning: lucideReactNative.AlertTriangle,
  info: lucideReactNative.Info
};
const Alert = ({
  status = "info",
  variant = "subtle",
  children,
  className,
  ...props
}) => {
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  const primary = resolveToken("primary");
  const statusColors = {
    error: resolveToken("red.500"),
    success: resolveToken("green.500"),
    warning: resolveToken("yellow.500"),
    info: resolveToken("blue.500"),
    brand: primary
  };
  const color = statusColors[status];
  let bg = "transparent";
  let border = void 0;
  if (variant === "subtle") bg = `${color}22`;
  if (variant === "solid") bg = color;
  if (variant === "left-accent") border = { borderLeftWidth: 4, borderLeftColor: color };
  if (variant === "top-accent") border = { borderTopWidth: 4, borderTopColor: color };
  const textColor = variant === "solid" ? "#FFFFFF" : color;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.default,
    {
      className,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      style: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: bg,
        alignSelf: "flex-start",
        ...border ?? {}
      },
      ...props,
      children: typeof children === "string" ? /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { style: { color: textColor }, children }) : children
    }
  );
};
const AlertIcon = ({ status = "info" }) => {
  const { resolveToken, theme } = KitsThemeProvider_native.useKitsTheme();
  const primary = resolveToken("primary");
  if (status === "brand" && theme.config.logo) return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: theme.config.logo });
  const statusColors = {
    error: resolveToken("red.500"),
    success: resolveToken("green.500"),
    warning: resolveToken("yellow.500"),
    info: resolveToken("blue.500"),
    brand: primary
  };
  const IconComponent = icons[status];
  const color = statusColors[status];
  return /* @__PURE__ */ jsxRuntime.jsx(index_native$1.Icon, { name: IconComponent, color, size: "lg" });
};
const AlertTitle = ({ children, color }) => /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { fontWeight: "bold", style: color ? { color } : void 0, children });
const AlertDescription = ({ children, color }) => /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { size: "sm", style: color ? { color } : void 0, children });

exports.AlertDescription = AlertDescription;
exports.AlertIcon = AlertIcon;
exports.AlertTitle = AlertTitle;
exports.default = Alert;
//# sourceMappingURL=alert.cjs.map
