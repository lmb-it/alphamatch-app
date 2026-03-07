import { jsx } from 'react/jsx-runtime';
import { View } from 'react-native';
import React from 'react';
import { centerStyle } from './styles.js';

const Center = React.forwardRef(
  function Center2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      View,
      {
        className: centerStyle({ class: className }),
        ...props,
        ref
      }
    );
  }
);
Center.displayName = "Center";

export { Center };
//# sourceMappingURL=index.js.map
