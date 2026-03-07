import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { View } from 'react-native';
import { boxStyle } from './styles.js';

const Box = React.forwardRef(
  function Box2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsx(View, { ref, ...props, className: boxStyle({ class: className }) });
  }
);
Box.displayName = "Box";

export { Box };
//# sourceMappingURL=index.js.map
