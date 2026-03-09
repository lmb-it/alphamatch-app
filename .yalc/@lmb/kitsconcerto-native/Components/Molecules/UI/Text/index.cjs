'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const mapAsToSize = {
  small: "sm",
  label: "sm",
  span: "md",
  p: "md"
};
const mapTextOverflowProps = (props) => {
  let numberOfLines;
  let ellipsizeMode;
  if (props.whiteSpace === "nowrap") {
    numberOfLines = 1;
  }
  if (props.textOverflow === "ellipsis") {
    ellipsizeMode = "tail";
  }
  if (props.textOverflow === "clip") {
    ellipsizeMode = "clip";
  }
  return { numberOfLines, ellipsizeMode };
};
const Text = (props) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const {
    as = "p",
    size,
    children,
    isTruncated,
    bold,
    underline,
    strikeThrough,
    sub,
    italic,
    highlight,
    ...rest
  } = nativeProps;
  const resolvedSize = size || mapAsToSize[as] || "md";
  const overflowProps = mapTextOverflowProps(props);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      as: "Text",
      cssProps: { ...cssProps },
      additionalStyles: {
        padding: 0
      },
      nativeProps: {
        ...rest,
        as,
        size: resolvedSize,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
        ...overflowProps
      },
      children
    }
  );
};

exports.default = Text;
//# sourceMappingURL=index.cjs.map
