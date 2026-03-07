import { jsx, Fragment } from 'react/jsx-runtime';
import { Skeleton } from 'primereact/skeleton';

const SkeletonRows = ({
  rowsLength,
  isTable = false
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: Array.from(Array(rowsLength).keys()).map((key) => /* @__PURE__ */ jsx(
    Skeleton,
    {
      height: "51px",
      className: "mb-2",
      borderRadius: "10px"
    },
    key
  )) });
};

export { SkeletonRows as default };
//# sourceMappingURL=index.js.map
