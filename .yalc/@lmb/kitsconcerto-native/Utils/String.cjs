'use strict';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const getURLParams = (getKey) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(getKey);
};

exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.getURLParams = getURLParams;
//# sourceMappingURL=String.cjs.map
