'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
var index_native = require('../../../../packages/types/src/Css/map/index.cjs');

const split = (props) => {
  const cssProps = {};
  const nativeProps = {};
  for (const key in props) {
    if (key in index_native.default) {
      cssProps[key] = props[key];
    } else {
      nativeProps[key] = props[key];
    }
  }
  return { cssProps, nativeProps };
};
const useSeparator = (props) => {
  return split(props);
};

exports.default = useSeparator;
exports.split = split;
exports.useSeparator = useSeparator;
//# sourceMappingURL=useSeparator.cjs.map
