'use strict';

var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const baseStyle = nativewindUtils.isWeb ? "flex flex-col relative z-0 box-border border-0 list-none min-w-0 min-h-0 bg-transparent items-stretch m-0 p-0 text-decoration-none" : "";
const vstackStyle = nativewindUtils.tva({
  base: `flex-col ${baseStyle}`,
  variants: {
    space: {
      "xs": "gap-1",
      "sm": "gap-2",
      "md": "gap-3",
      "lg": "gap-4",
      "xl": "gap-5",
      "2xl": "gap-6",
      "3xl": "gap-7",
      "4xl": "gap-8"
    },
    reversed: {
      true: "flex-col-reverse"
    }
  }
});

exports.vstackStyle = vstackStyle;
//# sourceMappingURL=styles.cjs.map
