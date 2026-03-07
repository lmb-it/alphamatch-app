'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var skeleton = require('primereact/skeleton');

const SkeletonRows = ({
  rowsLength,
  isTable = false
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from(Array(rowsLength).keys()).map((key) => /* @__PURE__ */ jsxRuntime.jsx(
    skeleton.Skeleton,
    {
      height: "51px",
      className: "mb-2",
      borderRadius: "10px"
    },
    key
  )) });
};

exports.default = SkeletonRows;
//# sourceMappingURL=index.cjs.map
