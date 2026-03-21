'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var Button_native = require('../Button/Button.cjs');
var index = require('../../layout/Flex/index.cjs');

const CustomPopover = ({
  children,
  label,
  onPopoverClosed,
  onPopoverOpened,
  closeButton = false
}) => {
  const op = React.useRef(null);
  const toggle = (event) => {
    op.current?.toggle(event);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    typeof label == "string" && /* @__PURE__ */ jsxRuntime.jsx(Button_native.Button, { onClick: toggle, children: label }),
    typeof label != "string" && /* @__PURE__ */ jsxRuntime.jsx(index.default, { onClick: toggle, children: label })
  ] });
};

exports.default = CustomPopover;
//# sourceMappingURL=index.cjs.map
