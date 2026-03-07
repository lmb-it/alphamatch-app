import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { View } from 'react-native';
import { cardStyle } from './styles.js';

const Card = React.forwardRef(
  function Card2({ className, size = "md", variant = "elevated", ...props }, ref) {
    return /* @__PURE__ */ jsx(
      View,
      {
        className: cardStyle({ size, variant, class: className }),
        ...props,
        ref
      }
    );
  }
);
Card.displayName = "Card";

export { Card };
//# sourceMappingURL=index.js.map
