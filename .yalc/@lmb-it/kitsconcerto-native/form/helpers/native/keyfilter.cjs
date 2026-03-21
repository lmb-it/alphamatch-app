'use strict';

const patterns = {
  int: /^-?\d*$/,
  pint: /^\d*$/,
  num: /^-?\d*(\.\d*)?$/,
  pnum: /^\d*(\.\d*)?$/,
  money: /^\d*(\.\d{0,2})?$/,
  hex: /^[0-9a-fA-F]*$/,
  alpha: /^[A-Za-z]*$/,
  alphanum: /^[A-Za-z0-9]*$/,
  // “email” in Prime keyfilter is not full email validation; keep it permissive for typing.
  email: /^[A-Za-z0-9@._+-]*$/
};
function applyKeyFilterKeepPrev(prev, next, keyFilter) {
  if (!keyFilter) return next;
  const re = keyFilter instanceof RegExp ? keyFilter : patterns[keyFilter];
  if (!re) return next;
  return re.test(next) ? next : prev;
}

exports.applyKeyFilterKeepPrev = applyKeyFilterKeepPrev;
//# sourceMappingURL=keyfilter.cjs.map
