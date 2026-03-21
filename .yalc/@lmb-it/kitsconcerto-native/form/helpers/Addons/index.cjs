'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index = require('../../../layout/Flex/index.cjs');
var index_native = require('../../../primitives/Text/index.cjs');

const Addons = ({ rightAddon, leftAddon, children, additionalClassName }) => {
  const renderAddon = (addon) => {
    if (!addon) return null;
    if (typeof addon === "string") {
      return /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { fontSize: 14, children: addon });
    }
    if (React.isValidElement(addon)) {
      return addon;
    }
    return null;
  };
  const mergedClassName = additionalClassName ?? "";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    index.default,
    {
      flexDirection: "row",
      w: "full",
      alignItems: "stretch",
      className: mergedClassName,
      children: [
        leftAddon && /* @__PURE__ */ jsxRuntime.jsx(
          index.default,
          {
            px: 8,
            py: 6,
            alignItems: "center",
            justifyContent: "center",
            bgColor: "var(--surface-200)",
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            children: renderAddon(leftAddon)
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(index.default, { flex: 1, children }),
        rightAddon && /* @__PURE__ */ jsxRuntime.jsx(
          index.default,
          {
            px: 8,
            py: 6,
            alignItems: "center",
            justifyContent: "center",
            bgColor: "var(--surface-200)",
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            children: renderAddon(rightAddon)
          }
        )
      ]
    }
  );
};

exports.default = Addons;
//# sourceMappingURL=index.cjs.map
