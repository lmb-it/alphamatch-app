'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const Svg = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      ref,
      additionalClasses: className,
      cssProps,
      additionalStyles: {
        // @ts-ignore
        display: "inline-block",
        lineHeight: "1rem",
        flexShrink: 0,
        verticalAlign: "middle",
        marginInline: "2px",
        width: "1.5rem",
        height: "1.5rem"
      },
      nativeProps,
      as: "Svg",
      children
    }
  );
};

exports.default = Svg;
//# sourceMappingURL=index.cjs.map
