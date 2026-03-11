'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var styles = require('./styles.cjs');

const VStack = React.forwardRef(
  function VStack2({ className, space, reversed, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        className: styles.vstackStyle({
          space,
          reversed,
          class: className
        }),
        ...props,
        ref
      }
    );
  }
);
VStack.displayName = "VStack";

exports.VStack = VStack;
//# sourceMappingURL=index.cjs.map
