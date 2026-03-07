import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { Switch as Switch$1 } from 'react-native';
import { createSwitch } from '@gluestack-ui/core/switch/creator';
import { withStyleContext, tva } from '@gluestack-ui/utils/nativewind-utils';

const UISwitch = createSwitch({
  Root: withStyleContext(Switch$1)
});
const switchStyle = tva({
  base: "data-[focus=true]:outline-0 data-[focus=true]:ring-2 data-[focus=true]:ring-indicator-primary web:cursor-pointer disabled:cursor-not-allowed data-[disabled=true]:opacity-40",
  variants: {
    size: {
      sm: "scale-75",
      md: "",
      lg: "scale-125"
    }
  }
});
const Switch = React.forwardRef(function Switch2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UISwitch,
    {
      ref,
      ...props,
      className: switchStyle({ size, class: className })
    }
  );
});
Switch.displayName = "Switch";

export { Switch };
//# sourceMappingURL=index.js.map
