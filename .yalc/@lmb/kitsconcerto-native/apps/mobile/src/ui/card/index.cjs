'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var styles = require('./styles.cjs');

const Card = React.forwardRef(
  function Card2({ className, size = "md", variant = "elevated", ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.View,
      {
        className: styles.cardStyle({ size, variant, class: className }),
        ...props,
        ref
      }
    );
  }
);
Card.displayName = "Card";

exports.Card = Card;
//# sourceMappingURL=index.cjs.map
