'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var alert_native = require('./alert.cjs');
var KitsThemeProvider_native = require('../../contexts/Theme/KitsThemeProvider.cjs');

const Alert = ({ status = "info", variant = "subtle", className, withIcon, children, title, description }) => {
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
  const textColor = variant === "solid" ? "#FFFFFF" : color;
  return /* @__PURE__ */ jsxRuntime.jsxs(alert_native.default, { status, className, variant, children: [
    withIcon && /* @__PURE__ */ jsxRuntime.jsx(alert_native.AlertIcon, { status }),
    title && /* @__PURE__ */ jsxRuntime.jsx(alert_native.AlertTitle, { color: textColor, children: title }),
    description && /* @__PURE__ */ jsxRuntime.jsx(alert_native.AlertDescription, { color: textColor, children: description }),
    typeof children == "string" && /* @__PURE__ */ jsxRuntime.jsx(alert_native.AlertTitle, { color: textColor, children }),
    React.isValidElement(children) && children
  ] });
};

exports.AlertDescription = alert_native.AlertDescription;
exports.AlertIcon = alert_native.AlertIcon;
exports.AlertTitle = alert_native.AlertTitle;
exports.default = Alert;
//# sourceMappingURL=index.cjs.map
