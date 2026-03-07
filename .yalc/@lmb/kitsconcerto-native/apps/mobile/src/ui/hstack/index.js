import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { View } from 'react-native';
import { hstackStyle } from './styles.js';

const HStack = React.forwardRef(
  function HStack2({ className, space, reversed, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      View,
      {
        className: hstackStyle({
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

export { HStack };
//# sourceMappingURL=index.js.map
