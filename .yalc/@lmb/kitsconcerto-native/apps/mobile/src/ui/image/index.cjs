'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/image/creator');
var reactNative = require('react-native');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const imageStyle = nativewindUtils.tva({
  base: "max-w-full",
  variants: {
    size: {
      "2xs": "h-6 w-6",
      "xs": "h-10 w-10",
      "sm": "h-16 w-16",
      "md": "h-20 w-20",
      "lg": "h-24 w-24",
      "xl": "h-32 w-32",
      "2xl": "h-64 w-64",
      "full": "h-full w-full",
      "none": ""
    }
  }
});
const UIImage = creator.createImage({ Root: reactNative.Image });
const Image = React.forwardRef(function Image2({ size = "md", className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIImage,
    {
      className: imageStyle({ size, class: className }),
      ref,
      style: reactNative.Platform.OS === "web" ? { height: "revert-layer", width: "revert-layer" } : void 0,
      ...props
    }
  );
});
Image.displayName = "Image";

exports.Image = Image;
//# sourceMappingURL=index.cjs.map
