'use strict';

var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const baseStyle = nativewindUtils.isWeb ? "flex flex-col relative z-0" : "";
const cardStyle = nativewindUtils.tva({
  base: baseStyle,
  variants: {
    size: {
      sm: "p-3 rounded",
      md: "p-4 rounded-md",
      lg: "p-6 rounded-xl"
    },
    variant: {
      elevated: "bg-background-0",
      outline: "border border-outline-200 ",
      ghost: "rounded-none",
      filled: "bg-background-50"
    }
  }
});

exports.cardStyle = cardStyle;
//# sourceMappingURL=styles.cjs.map
