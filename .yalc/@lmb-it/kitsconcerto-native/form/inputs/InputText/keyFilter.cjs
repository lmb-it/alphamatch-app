'use strict';

const regexForFilter = (filter) => {
  if (!filter) return null;
  if (filter instanceof RegExp) return filter;
  switch (filter) {
    case "int":
      return /^-?\d*$/;
    case "pint":
      return /^\d*$/;
    case "num":
      return /^-?\d*(\.\d*)?$/;
    case "pnum":
      return /^\d*(\.\d*)?$/;
    case "money":
      return /^\d*(\.\d{0,2})?$/;
    case "email":
      return /^[^ \t\r\n@]*@?[^ \t\r\n@]*\.?[^ \t\r\n@]*$/;
    case "alpha":
      return /^[A-Za-z]*$/;
    case "alphanum":
      return /^[A-Za-z0-9]*$/;
    default:
      return null;
  }
};
const applyKeyFilter = (prev, next, filter) => {
  const r = regexForFilter(filter);
  if (!r) return next;
  return r.test(next) ? next : prev;
};

exports.applyKeyFilter = applyKeyFilter;
//# sourceMappingURL=keyFilter.cjs.map
