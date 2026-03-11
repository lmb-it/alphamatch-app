import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { View } from 'react-native';
import { vstackStyle } from './styles.js';

const VStack = React.forwardRef(
  function VStack2({ className, space, reversed, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      View,
      {
        className: vstackStyle({
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

export { VStack };
//# sourceMappingURL=index.js.map
