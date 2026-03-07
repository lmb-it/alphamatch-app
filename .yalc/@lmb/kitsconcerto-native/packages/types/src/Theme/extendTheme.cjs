'use strict';

var defaultTheme = require('./defaultTheme.cjs');

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = result[key];
    if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
      result[key] = deepMerge(tgtVal, srcVal);
    } else if (srcVal !== void 0) {
      result[key] = srcVal;
    }
  }
  return result;
}
function extendTheme(overrides) {
  return deepMerge(defaultTheme.defaultTheme, overrides);
}

exports.deepMerge = deepMerge;
exports.extendTheme = extendTheme;
//# sourceMappingURL=extendTheme.cjs.map
