'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var styles = require('./styles.cjs');

const Box = React.forwardRef(
  function Box2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { ref, ...props, className: styles.boxStyle({ class: className }) });
  }
);
Box.displayName = "Box";

exports.Box = Box;
//# sourceMappingURL=index.cjs.map
