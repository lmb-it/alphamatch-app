import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const Box = ({ children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator(props);
  const { scrollable, entering, exiting, ...restNativeProps } = nativeProps;
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      ref,
      as: "Box",
      scrollable,
      entering,
      exiting,
      additionalStyles: {
        display: "flex",
        flexDirection: "column"
      },
      cssProps,
      nativeProps: restNativeProps,
      children
    }
  );
};

export { Box as default };
//# sourceMappingURL=index.js.map
