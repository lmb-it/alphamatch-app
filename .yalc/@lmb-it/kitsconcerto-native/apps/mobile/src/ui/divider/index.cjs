'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var reactNative = require('react-native');

const dividerStyle = nativewindUtils.tva({
  base: "bg-background-200",
  variants: {
    orientation: {
      vertical: "w-px h-full",
      horizontal: "h-px w-full"
    }
  }
});
const Divider = React.forwardRef(function Divider2({ className, orientation = "horizontal", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.View,
    {
      ref,
      ...props,
      "aria-orientation": orientation,
      role: reactNative.Platform.OS === "web" ? "separator" : void 0,
      className: dividerStyle({
        orientation,
        class: className
      })
    }
  );
});
Divider.displayName = "Divider";

exports.Divider = Divider;
//# sourceMappingURL=index.cjs.map
