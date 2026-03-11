'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../MainUploader/index.cjs');
require('react');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
var index_native$1 = require('../../../UI/Image/index.cjs');
var index_native$2 = require('../../../UI/Text/index.cjs');
var Button_native = require('../../../Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const MultipleImageUploader = () => {
  const { onPick, files, removeFile, disabled, limit, isClassicUploader } = index_native.useUploader();
  if (!isClassicUploader) {
    return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(Button_native.Button, { label: "Upload", onClick: onPick, disabled }),
      /* @__PURE__ */ jsxRuntime.jsx(Button_native.Button, { label: `${files.length}/${limit} Selected`, outlined: true, disabled: true })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", gap: 2, children: [
    files.map((f, idx) => {
      const uri = typeof f.file === "object" && "uri" in f.file ? f.file.uri : null;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        index.default,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs(index.default, { flexDirection: "row", alignItems: "center", gap: 2, children: [
              uri ? /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { src: uri, alt: f.name }) : null,
              /* @__PURE__ */ jsxRuntime.jsx(index_native$2.default, { as: "span", textOverflow: "ellipsis", whiteSpace: "nowrap", children: f.shortName })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Button_native.Button,
              {
                icon: "pi pi-times",
                size: "md",
                w: 20,
                severity: "danger",
                onClick: removeFile(idx),
                disabled
              }
            )
          ]
        },
        `${f.name}-${idx}`
      );
    }),
    /* @__PURE__ */ jsxRuntime.jsx(
      Button_native.Button,
      {
        label: "Add images",
        onClick: onPick,
        disabled: disabled || files.length >= limit
      }
    )
  ] });
};

exports.default = MultipleImageUploader;
//# sourceMappingURL=index.cjs.map
