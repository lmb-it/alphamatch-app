'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const Center = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const { entering, exiting, ...restNativeProps } = nativeProps;
  return /* @__PURE__ */ jsxRuntime.jsx(ResponsiveElement.default, { ref, as: "Center", entering, exiting, additionalStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, additionalClasses: className, cssProps, nativeProps: restNativeProps, children });
};

exports.default = Center;
//# sourceMappingURL=index.cjs.map
