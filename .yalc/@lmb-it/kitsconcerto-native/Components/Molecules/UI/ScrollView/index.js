import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const KitsScrollView = ({ children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator(props);
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      ref,
      as: "ScrollView",
      cssProps,
      nativeProps,
      children
    }
  );
};

export { KitsScrollView as default };
//# sourceMappingURL=index.js.map
