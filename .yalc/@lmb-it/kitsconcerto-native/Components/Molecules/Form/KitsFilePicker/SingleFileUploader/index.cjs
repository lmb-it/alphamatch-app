'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../MainUploader/index.cjs');
require('axios');
var locale = require('../../../../../Hooks/locale.cjs');
require('../../../../../Contexts/DialogContext.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
var Button_native = require('../../../Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const SingleFileUploader = () => {
  const { onPick, files, removeFile, disabled, placeholder } = index_native.useUploader();
  const { t } = locale.useLanguage();
  const currentFileName = React.useMemo(() => {
    if (files.length > 0) return files[0]?.shortName;
    return null;
  }, [files]);
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", gap: 8, flexDirection: "row", alignItems: "center", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Button_native.Button,
      {
        label: currentFileName ?? placeholder ?? t("chooseFile"),
        severity: "secondary",
        outlined: true,
        w: "85%",
        onClick: onPick,
        disabled
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      Button_native.Button,
      {
        icon: "pi pi-times",
        size: "sm",
        severity: "danger",
        outlined: true,
        onClick: (e) => {
          e?.stopPropagation?.();
          if (files.length) removeFile(0)();
        },
        disabled: !currentFileName || disabled
      }
    )
  ] });
};

exports.default = SingleFileUploader;
//# sourceMappingURL=index.cjs.map
