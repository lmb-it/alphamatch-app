'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const mapAsToSize = {
  h1: "5xl",
  h2: "4xl",
  h3: "3xl",
  h4: "2xl",
  h5: "xl",
  h6: "lg"
};
const Heading = (props) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const {
    as = "h2",
    size,
    children,
    isTruncated,
    bold,
    underline,
    strikeThrough,
    sub,
    italic,
    highlight,
    color,
    ...rest
  } = nativeProps;
  const resolvedSize = size || mapAsToSize[as] || "md";
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      as: "Heading",
      cssProps,
      nativeProps: {
        ...rest,
        size: resolvedSize,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
        color
      },
      children
    }
  );
};

exports.default = Heading;
//# sourceMappingURL=index.cjs.map
