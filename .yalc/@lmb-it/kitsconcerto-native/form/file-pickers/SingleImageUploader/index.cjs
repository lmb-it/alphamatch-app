'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../MainUploader/index.cjs');
var index$1 = require('../../../primitives/Box/index.cjs');
var index_native$1 = require('../../../primitives/Text/index.cjs');
var index_native$2 = require('../../../primitives/Image/index.cjs');
var index_native$3 = require('../../../primitives/Icon/index.cjs');
var reactNative = require('react-native');
var index = require('../../../layout/Flex/index.cjs');
var Button_native = require('../../../components/Button/Button.cjs');
var locale = require('../../../hooks/locale.cjs');

const SingleImageUploader = () => {
  const { onPick, files, removeFile, disabled, isClassicUploader } = index_native.useUploader();
  const { t } = locale.useLanguage();
  const current = React.useMemo(() => files.length ? files[0] : null, [files]);
  const uri = current && typeof current.file === "object" && "uri" in current.file ? current.file.uri : null;
  if (isClassicUploader) {
    return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", gap: 8, flexDirection: "row", alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          label: uri ? t("changeImage") : t("chooseImage"),
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
          onClick: removeFile(0),
          disabled: !current || disabled
        }
      ),
      !!current?.name && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { as: "span", fontSize: 13, color: "text-secondary", children: current.name })
    ] });
  }
  if (uri) {
    return /* @__PURE__ */ jsxRuntime.jsxs(index$1.default, { w: "full", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(index.default, { position: "relative", w: "full", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          index_native$2.default,
          {
            w: "full",
            aspectRatio: 1.5,
            objectFit: "contain",
            src: uri,
            alt: "Preview",
            borderRadiusLeft: "lg",
            borderRadiusRight: "lg"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Button_native.Button,
          {
            icon: "pi pi-times",
            size: "sm",
            width: 40,
            height: 40,
            severity: "danger",
            position: "absolute",
            right: 0,
            top: 0,
            onClick: removeFile(0),
            disabled
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          label: t("changeImage"),
          severity: "secondary",
          outlined: true,
          w: "full",
          mt: 8,
          onClick: onPick,
          disabled
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(reactNative.TouchableOpacity, { activeOpacity: 0.7, onPress: onPick, style: { width: "100%" }, children: /* @__PURE__ */ jsxRuntime.jsxs(
    index.default,
    {
      w: "full",
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: "brand.500",
      borderRadiusLeft: "lg",
      borderRadiusRight: "lg",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: 200,
      py: 32,
      px: 16,
      gap: 8,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(index_native$3.Icon, { name: "cloud-upload", size: "lg", color: "brand.500" }),
        /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { fontSize: 14, color: "text-secondary", textAlign: "center", children: t("tapToUpload") })
      ]
    }
  ) });
};

exports.default = SingleImageUploader;
//# sourceMappingURL=index.cjs.map
