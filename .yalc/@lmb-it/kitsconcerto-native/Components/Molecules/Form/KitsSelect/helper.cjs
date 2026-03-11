'use strict';

const arrayType = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const first = arr[0];
  if (Array.isArray(first)) return 1;
  if (arr.every((i) => typeof i === "string")) return 2;
  if (arr.every((i) => typeof i === "number")) return 3;
  if (arr.every((i) => typeof i === "object" && !Array.isArray(i) && i !== null)) {
    return 4;
  }
  return 5;
};
const checkKeys = (list, labelKey, valueKey) => {
  if (list.length > 0 && typeof list[0] === "object" && !Array.isArray(list[0]) && list[0] !== null) {
    if (!(labelKey in list[0])) {
      if (labelKey !== "label") throw Error(`Label Key "${labelKey}" missing in list.`);
    }
    if (valueKey && !(valueKey in list[0])) {
      if (valueKey !== "value") throw Error(`Value Key "${valueKey}" missing in list.`);
    }
  }
};
const reMapping = (arr, level = 0, labelKey, valueKey, childrenKey = "children") => {
  return arr.map((item, index) => {
    if (Array.isArray(item)) {
      return {
        [labelKey]: `Group${index + 1}`,
        [childrenKey]: reMapping(item, level + 1, labelKey, valueKey, childrenKey)
      };
    } else if (typeof item === "object" && item !== null) {
      if (item[childrenKey] && Array.isArray(item[childrenKey])) {
        return {
          ...item,
          [childrenKey]: reMapping(item[childrenKey], 0, labelKey, valueKey, childrenKey)
        };
      }
      return item;
    } else {
      return { [labelKey]: item, [valueKey]: item };
    }
  });
};

exports.arrayType = arrayType;
exports.checkKeys = checkKeys;
exports.reMapping = reMapping;
//# sourceMappingURL=helper.cjs.map
