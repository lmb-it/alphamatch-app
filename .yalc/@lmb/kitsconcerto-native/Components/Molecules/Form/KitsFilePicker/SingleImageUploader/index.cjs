'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../MainUploader/index.cjs');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
var index_native$2 = require('../../../UI/Image/index.cjs');
var index_native$1 = require('../../../UI/Text/index.cjs');
var index$1 = require('../../../UI/Box/index.cjs');
var Button_native = require('../../../Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const SingleImageUploader = () => {
  const { onPick, files, removeFile, disabled, isClassicUploader } = index_native.useUploader();
  const current = React.useMemo(() => files.length ? files[0] : null, [files]);
  const uri = current && typeof current.file === "object" && "uri" in current.file ? current.file.uri : null;
  if (isClassicUploader) {
    return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", gap: 2, flexDirection: "row", alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          label: "Choose image",
          w: "85%",
          onClick: onPick,
          disabled
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          icon: "pi pi-times",
          size: "md",
          w: 20,
          severity: "danger",
          onClick: removeFile(0),
          disabled: !current || disabled
        }
      ),
      !!current?.name && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { as: "span", children: current.name })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(index$1.default, { w: "full", gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", gap: 5, flexDirection: "row", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          label: uri ? "Change image" : "Choose image",
          w: "85%",
          onClick: onPick,
          disabled,
          flex: 75
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          icon: "pi pi-times",
          size: "md",
          w: 20,
          severity: "danger",
          onClick: removeFile(0),
          disabled,
          flex: 1
        }
      )
    ] }),
    uri ? /* @__PURE__ */ jsxRuntime.jsx(index.default, { position: "relative", w: "full", children: /* @__PURE__ */ jsxRuntime.jsx(index_native$2.default, { w: "full", aspectRatio: 1, objectFit: "contain", src: uri, alt: "Preview" }) }) : /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { as: "span", children: "Tap to pick an image" })
  ] });
};

exports.default = SingleImageUploader;
//# sourceMappingURL=index.cjs.map
