'use strict';

var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const baseStyle = nativewindUtils.isWeb ? "flex flex-col relative z-0 box-border border-0 list-none min-w-0 min-h-0 bg-transparent items-stretch m-0 p-0 text-decoration-none" : "";
const boxStyle = nativewindUtils.tva({
  base: baseStyle
});

exports.boxStyle = boxStyle;
//# sourceMappingURL=styles.cjs.map
