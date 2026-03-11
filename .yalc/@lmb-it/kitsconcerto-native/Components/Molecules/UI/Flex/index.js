import { jsx } from 'react/jsx-runtime';
import { Platform } from 'react-native';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';

const Flex = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator(props);
  const { scrollable, entering, exiting, ...restNativeProps } = nativeProps;
  const animProps = { entering, exiting };
  if (restNativeProps.onClick && typeof restNativeProps.onClick == "function" && Platform.OS != "web") {
    return /* @__PURE__ */ jsx(
      ResponsiveElement,
      {
        ref,
        scrollable,
        ...animProps,
        additionalStyles: {
          display: "flex",
          flexDirection: "row"
        },
        additionalClasses: className,
        cssProps,
        nativeProps: restNativeProps,
        children: /* @__PURE__ */ jsx(
          ResponsiveElement,
          {
            additionalStyles: {
              width: "100%",
              height: "100%",
              position: "relative"
            },
            as: "a",
            nativeProps: {
              onClick: restNativeProps.onClick
            },
            children,
            cssProps: {}
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      ref,
      scrollable,
      ...animProps,
      additionalStyles: {
        display: "flex",
        flexDirection: "row"
      },
      additionalClasses: className,
      cssProps,
      nativeProps: restNativeProps,
      children
    }
  );
};
Flex.displayName = "Flex";

export { Flex as default };
//# sourceMappingURL=index.js.map
