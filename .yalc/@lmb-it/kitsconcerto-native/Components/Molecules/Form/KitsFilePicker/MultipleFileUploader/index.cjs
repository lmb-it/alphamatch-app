'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../MainUploader/index.cjs');
var index_native$1 = require('../../../../Atoms/Icon/index.cjs');
require('react');
require('axios');
var locale = require('../../../../../Hooks/locale.cjs');
require('../../../../../Contexts/DialogContext.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
var index_native$2 = require('../../../UI/Text/index.cjs');
var Button_native = require('../../../Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const MultipleFileUploader = () => {
  const { onPick, files, removeFile, disabled, limit, placeholder, isClassicUploader } = index_native.useUploader();
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
    files.map((f, idx) => /* @__PURE__ */ jsxRuntime.jsxs(
      index.default,
      {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            index_native$2.default,
            {
              as: "span",
              fontSize: 13,
              color: "text-secondary",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              children: f.shortName
            }
          ),
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
    )),
    /* @__PURE__ */ jsxRuntime.jsx(
      Button_native.Button,
      {
        label: placeholder ?? t("chooseFile"),
        severity: "secondary",
        outlined: true,
        w: "full",
        onClick: onPick,
        disabled: disabled || files.length >= limit
      }
    )
  ] });
};

exports.default = MultipleFileUploader;
//# sourceMappingURL=index.cjs.map
