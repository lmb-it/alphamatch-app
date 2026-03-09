'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const Flex = ({ className, children, ref, ...props }) => {
  const { cssProps, nativeProps } = useSeparator.default(props);
  const { scrollable, entering, exiting, ...restNativeProps } = nativeProps;
  const animProps = { entering, exiting };
  if (restNativeProps.onClick && typeof restNativeProps.onClick == "function" && reactNative.Platform.OS != "web") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ResponsiveElement.default,
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
        children: /* @__PURE__ */ jsxRuntime.jsx(
          ResponsiveElement.default,
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
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

exports.default = Flex;
//# sourceMappingURL=index.cjs.map
