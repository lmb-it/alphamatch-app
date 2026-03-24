'use strict';

var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const gridBaseStyle = nativewindUtils.isWeb ? "grid grid-cols-12" : "box-border flex-row flex-wrap justify-start";
const gridItemBaseStyle = nativewindUtils.isWeb ? "w-auto col-span-1" : "";
const gridStyle = nativewindUtils.tva({
  base: `w-full ${gridBaseStyle}`
});
const gridItemStyle = nativewindUtils.tva({
  base: `w-full ${gridItemBaseStyle}`
});

exports.gridItemStyle = gridItemStyle;
exports.gridStyle = gridStyle;
//# sourceMappingURL=styles.cjs.map
