import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createPressable } from '@gluestack-ui/core/pressable/creator';
import { Pressable as Pressable$1 } from 'react-native';
import { withStyleContext, tva } from '@gluestack-ui/utils/nativewind-utils';

const UIPressable = createPressable({
  Root: withStyleContext(Pressable$1)
});
const pressableStyle = tva({
  base: "data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-indicator-info data-[focus-visible=true]:ring-2 data-[disabled=true]:opacity-40"
});
const Pressable = React.forwardRef(function Pressable2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIPressable,
    {
      ...props,
      ref,
      className: pressableStyle({
        class: className
      })
    }
  );
});
Pressable.displayName = "Pressable";

export { Pressable };
//# sourceMappingURL=index.js.map
