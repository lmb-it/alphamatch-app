'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/overlay/creator');
var nativewind = require('nativewind');

nativewind.cssInterop(creator.Overlay, { className: "style" });
const Portal = React.forwardRef(function Portal2({ ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(creator.Overlay, { ...props, ref });
});
Portal.displayName = "Portal";

exports.Portal = Portal;
//# sourceMappingURL=index.cjs.map
