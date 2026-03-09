import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const VStack = (props) => {
  const { cssProps, nativeProps } = useSeparator(props);
  const { space = "md", reversed = false, scrollable, children, style, entering, exiting, ...rest } = nativeProps;
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
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

export { VStack as default };
//# sourceMappingURL=index.js.map
