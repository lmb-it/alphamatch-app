'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var alert_native = require('./alert.cjs');

const Alert = ({ status, variant, className, withIcon, children, title, description }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(alert_native.default, { status, className, variant, children: [
    withIcon && /* @__PURE__ */ jsxRuntime.jsx(alert_native.AlertIcon, { status }),
    title && /* @__PURE__ */ jsxRuntime.jsx(alert_native.AlertTitle, { children: title }),
    description && /* @__PURE__ */ jsxRuntime.jsx(alert_native.AlertDescription, { children: description }),
    children
  ] });
};

exports.default = Alert;
//# sourceMappingURL=index.cjs.map
