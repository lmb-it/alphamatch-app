'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var React = require('react');
var styles = require('./styles.cjs');

const Center = React.forwardRef(
  function Center2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        className: styles.centerStyle({ class: className }),
        ...props,
        ref
      }
    );
  }
);
Center.displayName = "Center";

exports.Center = Center;
//# sourceMappingURL=index.cjs.map
