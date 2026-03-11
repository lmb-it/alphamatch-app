import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const mapAsToSize = {
  h1: "5xl",
  h2: "4xl",
  h3: "3xl",
  h4: "2xl",
  h5: "xl",
  h6: "lg"
};
const Heading = (props) => {
  const { cssProps, nativeProps } = useSeparator(props);
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
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
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

export { Heading as default };
//# sourceMappingURL=index.js.map
