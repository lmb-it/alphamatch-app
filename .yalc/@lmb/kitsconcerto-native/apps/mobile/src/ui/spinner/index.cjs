'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var React = require('react');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var nativewind = require('nativewind');

nativewind.cssInterop(reactNative.ActivityIndicator, {
  className: { target: "style", nativeStyleToProp: { color: true } }
});
const spinnerStyle = nativewindUtils.tva({});
const Spinner = React.forwardRef(function Spinner2({
  className,
  color,
  focusable = false,
  "aria-label": ariaLabel = "loading",
  ...props
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.ActivityIndicator,
    {
      ref,
      focusable,
      "aria-label": ariaLabel,
      ...props,
      color,
      className: spinnerStyle({ class: className })
    }
  );
});
Spinner.displayName = "Spinner";

exports.Spinner = Spinner;
//# sourceMappingURL=index.cjs.map
