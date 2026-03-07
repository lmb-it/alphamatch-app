'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var creator = require('@gluestack-ui/core/switch/creator');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const UISwitch = creator.createSwitch({
  Root: nativewindUtils.withStyleContext(reactNative.Switch)
});
const switchStyle = nativewindUtils.tva({
  base: "data-[focus=true]:outline-0 data-[focus=true]:ring-2 data-[focus=true]:ring-indicator-primary web:cursor-pointer disabled:cursor-not-allowed data-[disabled=true]:opacity-40",
  variants: {
    size: {
      sm: "scale-75",
      md: "",
      lg: "scale-125"
    }
  }
});
const Switch = React.forwardRef(function Switch2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UISwitch,
    {
      ref,
      ...props,
      className: switchStyle({ size, class: className })
    }
  );
});
Switch.displayName = "Switch";

exports.Switch = Switch;
//# sourceMappingURL=index.cjs.map
