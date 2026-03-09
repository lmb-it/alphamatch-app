'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const HStack = (props) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const { space = "md", reversed = false, scrollable, children, entering, exiting, ...rest } = nativeProps;
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      ref: props.ref,
      as: "HStack",
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

exports.default = HStack;
//# sourceMappingURL=index.cjs.map
