'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var tooltip = require('primereact/tooltip');

const Tooltip = ({
  children,
  label,
  tooltipProps,
  ...props
}) => {
  const uniqueHash = Math.floor(Math.random() * 100);
  const className = `tooltip-order-${uniqueHash}`;
  return /* @__PURE__ */ jsxRuntime.jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(tooltip.Tooltip, { target: "." + className, ...props }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className, "data-pr-tooltip": label, ...tooltipProps, children })
  ] });
};

exports.default = Tooltip;
//# sourceMappingURL=index.cjs.map
