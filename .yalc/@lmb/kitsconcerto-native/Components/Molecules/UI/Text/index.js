import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

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
  const { cssProps, nativeProps } = useSeparator(props);
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
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
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

export { Text as default };
//# sourceMappingURL=index.js.map
