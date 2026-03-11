import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const HStack = (props) => {
  const { cssProps, nativeProps } = useSeparator(props);
  const { space = "md", reversed = false, scrollable, children, entering, exiting, ...rest } = nativeProps;
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
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

export { HStack as default };
//# sourceMappingURL=index.js.map
