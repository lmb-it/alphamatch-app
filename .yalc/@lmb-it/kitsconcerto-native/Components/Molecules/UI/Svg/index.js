import { jsx } from 'react/jsx-runtime';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const Svg = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator(props);
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      ref,
      additionalClasses: className,
      cssProps,
      additionalStyles: {
        // @ts-ignore
        display: "inline-block",
        lineHeight: "1rem",
        flexShrink: 0,
        verticalAlign: "middle",
        marginInline: "2px",
        width: "1.5rem",
        height: "1.5rem"
      },
      nativeProps,
      as: "Svg",
      children
    }
  );
};

export { Svg as default };
//# sourceMappingURL=index.js.map
