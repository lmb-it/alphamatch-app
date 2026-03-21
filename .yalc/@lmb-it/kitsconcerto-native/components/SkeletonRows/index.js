import { jsx, Fragment } from 'react/jsx-runtime';
import Skeleton from '../../primitives/Skeleton/index.js';

const SkeletonRows = ({ rowsLength }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: Array.from({ length: rowsLength }, (_, i) => /* @__PURE__ */ jsx(
    Skeleton,
    {
      className: "h-12 mb-2",
      container: { style: { borderRadius: 10 } }
    },
    i
  )) });
};

export { SkeletonRows as default };
//# sourceMappingURL=index.js.map
