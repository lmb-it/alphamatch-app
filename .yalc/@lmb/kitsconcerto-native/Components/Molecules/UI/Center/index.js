import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const Center = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator(props);
  const { entering, exiting, ...restNativeProps } = nativeProps;
  return /* @__PURE__ */ jsx(ResponsiveElement, { ref, as: "Center", entering, exiting, additionalStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, additionalClasses: className, cssProps, nativeProps: restNativeProps, children });
};

export { Center as default };
//# sourceMappingURL=index.js.map
