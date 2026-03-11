'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var styles = require('./styles.cjs');

const HStack = React.forwardRef(
  function HStack2({ className, space, reversed, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        className: styles.hstackStyle({
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
HStack.displayName = "HStack";

exports.HStack = HStack;
//# sourceMappingURL=index.cjs.map
