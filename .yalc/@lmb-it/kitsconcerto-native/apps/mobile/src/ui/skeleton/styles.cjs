'use strict';

var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const skeletonStyle = nativewindUtils.tva({
  base: "w-full h-full",
  variants: {
    variant: {
      sharp: "rounded-none",
      circular: "rounded-full",
      rounded: "rounded-md"
    },
    speed: {
      1: "duration-75",
      2: "duration-100",
      3: "duration-150",
      4: "duration-200"
    }
  }
});
const skeletonTextStyle = nativewindUtils.tva({
  base: "rounded-sm w-full",
  variants: {
    speed: {
      1: "duration-75",
      2: "duration-100",
      3: "duration-150",
      4: "duration-200"
    },
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4"
    }
  }
});

exports.skeletonStyle = skeletonStyle;
exports.skeletonTextStyle = skeletonTextStyle;
//# sourceMappingURL=styles.cjs.map
