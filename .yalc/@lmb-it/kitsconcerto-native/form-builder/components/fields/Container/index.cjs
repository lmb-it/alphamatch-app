'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var reactHookForm = require('react-hook-form');
var label_native = require('../../../../form/helpers/Label/label.cjs');
var index_native = require('../../../../primitives/Text/index.cjs');

const Container = ({
  element,
  control,
  groupField,
  getValues,
  parentPath = "",
  fieldLogic
}) => {
  const formContext = reactHookForm.useFormContext();
  const {
    field,
    label,
    helperText,
    watchedValues
  } = fieldLogic;
  const containerElement = element;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(label_native.default, { as: "h2", label, elementId: element.id }),
    helperText && typeof helperText != "function" && /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { fontSize: 10, as: "small", children: helperText }),
    typeof containerElement.children !== "function" ? containerElement.children : containerElement.children(field, formContext, groupField, watchedValues)
  ] });
};

exports.Container = Container;
exports.default = Container;
//# sourceMappingURL=index.cjs.map
