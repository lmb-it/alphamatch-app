'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var styles = require('./styles.cjs');

const Text = React.forwardRef(
  function Text2({
    className,
    isTruncated,
    bold,
    underline,
    strikeThrough,
    size = "md",
    sub,
    italic,
    highlight,
    ...props
  }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactNative.Text,
      {
        className: styles.textStyle({
          isTruncated,
          bold,
          underline,
          strikeThrough,
          size,
          sub,
          italic,
          highlight,
          class: className
        }),
        ...props,
        ref
      }
    );
  }
);
Text.displayName = "Text";

exports.Text = Text;
//# sourceMappingURL=index.cjs.map
