'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/pressable/creator');
var reactNative = require('react-native');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const UIPressable = creator.createPressable({
  Root: nativewindUtils.withStyleContext(reactNative.Pressable)
});
const pressableStyle = nativewindUtils.tva({
  base: "data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-indicator-info data-[focus-visible=true]:ring-2 data-[disabled=true]:opacity-40"
});
const Pressable = React.forwardRef(function Pressable2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIPressable,
    {
      ...props,
      ref,
      className: pressableStyle({
        class: className
      })
    }
  );
});
Pressable.displayName = "Pressable";

exports.Pressable = Pressable;
//# sourceMappingURL=index.cjs.map
