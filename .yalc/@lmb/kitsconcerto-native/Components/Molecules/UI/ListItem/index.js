import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const ListItem = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator(props);
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      ref,
      additionalClasses: className,
      cssProps,
      nativeProps,
      as: "ListItem",
      children
    }
  );
};

export { ListItem as default };
//# sourceMappingURL=index.js.map
