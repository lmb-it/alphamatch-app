'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../primitives/Skeleton/index.cjs');

const SkeletonRows = ({ rowsLength }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from({ length: rowsLength }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      className: "h-12 mb-2",
      container: { style: { borderRadius: 10 } }
    },
    i
  )) });
};

exports.default = SkeletonRows;
//# sourceMappingURL=index.cjs.map
