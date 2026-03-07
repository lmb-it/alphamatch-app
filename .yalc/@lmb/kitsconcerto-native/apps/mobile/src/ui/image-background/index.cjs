'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var React = require('react');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const imageBackgroundStyle = nativewindUtils.tva({});
const ImageBackground = React.forwardRef(function ImageBackground2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.ImageBackground,
    {
      className: imageBackgroundStyle({
        class: className
      }),
      ...props,
      ref
    }
  );
});
ImageBackground.displayName = "ImageBackground";

exports.ImageBackground = ImageBackground;
//# sourceMappingURL=index.cjs.map
