'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../MainUploader/index.cjs');
var index_native$2 = require('../../../primitives/Text/index.cjs');
var index_native$3 = require('../../../primitives/Image/index.cjs');
var index_native$1 = require('../../../primitives/Icon/index.cjs');
var index = require('../../../layout/Flex/index.cjs');
var Button_native = require('../../../components/Button/Button.cjs');
require('react');
var locale = require('../../../hooks/locale.cjs');

const MultipleImageUploader = () => {
  const { onPick, files, removeFile, disabled, limit, isClassicUploader } = index_native.useUploader();
  const { t } = locale.useLanguage();
  if (!isClassicUploader) {
    return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", flexDirection: "column", gap: 8, opacity: disabled ? 0.5 : 1, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        index.default,
        {
          w: "full",
          borderW: 2,
          borderStyle: "dashed",
          borderColor: "primary",
          borderRadiusLeft: "lg",
          borderRadiusRight: "lg",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 32,
          px: 16,
          gap: 8,
          onClick: onPick,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(index_native$1.Icon, { name: "cloud-upload", size: "lg", color: "primary" }),
            /* @__PURE__ */ jsxRuntime.jsx(index_native$2.default, { fontSize: 14, color: "text-secondary", textAlign: "center", children: t("tapToUpload") })
          ]
        }
      ),
      files.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(index_native$2.default, { fontSize: 13, color: "text-secondary", textAlign: "center", children: [
        t("filesSelected", files.length),
        " / ",
        limit
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", flexDirection: "column", gap: 8, children: [
    files.map((f, idx) => {
      const uri = typeof f.file === "object" && "uri" in f.file ? f.file.uri : null;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        index.default,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs(index.default, { flexDirection: "row", alignItems: "center", gap: 8, flex: 1, children: [
              uri ? /* @__PURE__ */ jsxRuntime.jsx(
                index_native$3.default,
                {
                  src: uri,
                  alt: f.name,
                  w: 48,
                  h: 48,
                  objectFit: "cover",
                  borderRadiusLeft: "md",
                  borderRadiusRight: "md"
                }
              ) : null,
              /* @__PURE__ */ jsxRuntime.jsx(
                index_native$2.default,
                {
                  as: "span",
                  fontSize: 13,
                  color: "text-secondary",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  children: f.shortName
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Button_native.Button,
              {
                icon: "pi pi-times",
                size: "sm",
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
        label: t("addImages"),
        severity: "secondary",
        outlined: true,
        w: "full",
        onClick: onPick,
        disabled: disabled || files.length >= limit
      }
    )
  ] });
};

exports.default = MultipleImageUploader;
//# sourceMappingURL=index.cjs.map
