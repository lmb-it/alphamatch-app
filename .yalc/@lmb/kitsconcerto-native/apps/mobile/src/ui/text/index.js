import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { Text as Text$1 } from 'react-native';
import { textStyle } from './styles.js';

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
    return /* @__PURE__ */ jsx(
      Text$1,
      {
        className: textStyle({
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

export { Text };
//# sourceMappingURL=index.js.map
