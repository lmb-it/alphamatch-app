'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../../FormRenderer/index.cjs');
var index = require('../../../../layout/Flex/index.cjs');
var label_native = require('../../../../form/helpers/Label/label.cjs');
var index_native$1 = require('../../../../primitives/Text/index.cjs');

const ObjectElement = ({
  element,
  control,
  getValues,
  groupField,
  focusedField,
  setFocusedField,
  fieldLogic
}) => {
  const { isShown, label, elements, helperText } = fieldLogic;
  const objectElement = element;
  const { grid } = objectElement;
  const renderer = React.useMemo(() => {
    if (!elements) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      index_native.FormRenderer,
      {
        elements,
        control,
        getValues,
        groupField,
        parentPath: `${element.id.toString()}.`,
        focusedField,
        setFocusedField,
        grid
      }
    );
  }, [elements, focusedField, groupField, grid]);
  if (!isShown) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { id: element.id.toString(), w: "full", flexDirection: "column", gap: 10, mb: 6, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(label_native.default, { as: "h2", label, elementId: element.id }),
    helperText && typeof helperText != "function" && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { fontSize: 10, as: "small", children: helperText }),
    renderer
  ] });
};

exports.ObjectElement = ObjectElement;
exports.default = ObjectElement;
//# sourceMappingURL=index.cjs.map
