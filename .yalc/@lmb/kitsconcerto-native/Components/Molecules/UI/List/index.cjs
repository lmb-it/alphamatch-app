'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const List = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      ref,
      additionalClasses: className,
      cssProps,
      nativeProps,
      as: "List",
      children
    }
  );
};

exports.default = List;
//# sourceMappingURL=index.cjs.map
