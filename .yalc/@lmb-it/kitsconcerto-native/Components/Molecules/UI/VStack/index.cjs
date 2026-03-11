'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const VStack = (props) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const { space = "md", reversed = false, scrollable, children, style, entering, exiting, ...rest } = nativeProps;
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      ref: props.ref,
      as: "VStack",
      scrollable,
      entering,
      exiting,
      cssProps,
      nativeProps: {
        ...rest,
        space,
        reversed
      },
      children
    }
  );
};

exports.default = VStack;
//# sourceMappingURL=index.cjs.map
