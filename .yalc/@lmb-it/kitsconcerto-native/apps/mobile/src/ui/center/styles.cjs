'use strict';

var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const baseStyle = nativewindUtils.isWeb ? "flex flex-col relative z-0" : "";
const centerStyle = nativewindUtils.tva({
  base: `justify-center items-center ${baseStyle}`
});

exports.centerStyle = centerStyle;
//# sourceMappingURL=styles.cjs.map
