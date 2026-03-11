'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../MainUploader/index.cjs');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
require('../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
var Button_native = require('../../../Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const SingleFileUploader = () => {
  const { onPick, files, removeFile, disabled, placeholder } = index_native.useUploader();
  const currentFileName = React.useMemo(() => {
    if (files.length > 0) return files[0]?.shortName;
    return null;
  }, [files]);
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", gap: 2, flexDirection: "row", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Button_native.Button,
      {
        label: currentFileName ? currentFileName : placeholder ?? "Choose file",
        onClick: onPick,
        w: "85%",
        disabled
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      Button_native.Button,
      {
        severity: "danger",
        icon: "pi pi-times",
        size: "md",
        w: 20,
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
