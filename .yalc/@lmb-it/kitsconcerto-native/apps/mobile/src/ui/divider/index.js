import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { View, Platform } from 'react-native';

const dividerStyle = tva({
  base: "bg-background-200",
  variants: {
    orientation: {
      vertical: "w-px h-full",
      horizontal: "h-px w-full"
    }
  }
});
const Divider = React.forwardRef(function Divider2({ className, orientation = "horizontal", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    View,
    {
      ref,
      ...props,
      "aria-orientation": orientation,
      role: Platform.OS === "web" ? "separator" : void 0,
      className: dividerStyle({
        orientation,
        class: className
      })
    }
  );
});
Divider.displayName = "Divider";

export { Divider };
//# sourceMappingURL=index.js.map
