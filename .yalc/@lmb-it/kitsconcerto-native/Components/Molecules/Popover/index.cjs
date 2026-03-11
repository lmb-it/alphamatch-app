'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
require('axios');
require('../../../Contexts/DialogContext.cjs');
require('../../../Hooks/useKeyboardNavigation.cjs');
require('../Form/KitsSelect/SelectContext.cjs');
var index = require('../UI/Flex/index.cjs');
var Button_native = require('../Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

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
