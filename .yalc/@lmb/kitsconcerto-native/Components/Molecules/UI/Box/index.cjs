'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const Box = ({ children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const { scrollable, entering, exiting, ...restNativeProps } = nativeProps;
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      ref,
      as: "Box",
      scrollable,
      entering,
      exiting,
      additionalStyles: {
        display: "flex",
        flexDirection: "column"
      },
      cssProps,
      nativeProps: restNativeProps,
      children
    }
  );
};

exports.default = Box;
//# sourceMappingURL=index.cjs.map
