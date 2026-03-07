import { jsxs, jsx } from 'react/jsx-runtime';
import React from 'react';
import { Tooltip as Tooltip$1 } from 'primereact/tooltip';

const Tooltip = ({
  children,
  label,
  tooltipProps,
  ...props
}) => {
  const uniqueHash = Math.floor(Math.random() * 100);
  const className = `tooltip-order-${uniqueHash}`;
  return /* @__PURE__ */ jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsx(Tooltip$1, { target: "." + className, ...props }),
    /* @__PURE__ */ jsx("div", { className, "data-pr-tooltip": label, ...tooltipProps, children })
  ] });
};

export { Tooltip as default };
//# sourceMappingURL=index.js.map
