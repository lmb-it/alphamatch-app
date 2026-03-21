'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var useSelectionController = require('../../../hooks/useSelectionController.cjs');
require('../../../contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../hooks/useComponentDefaults.cjs');
var checkbox_native = require('./checkbox.cjs');
var index = require('../../../layout/Flex/index.cjs');
var index_native = require('../../helpers/FormContainer/index.cjs');

const KitsCheckbox = ({
  ref,
  ...rawProps
}) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults.default("Checkbox", rawProps, "Input");
  const {
    id,
    label,
    required,
    errors,
    hideError,
    isFloatedLabel,
    helperText,
    item,
    value,
    checked,
    defaultValue,
    onChange,
    limit,
    appearanceMode = "vertical",
    disabled,
    invalid,
    attached,
    containerStyle
  } = props;
  const lastToggledIndex = React.useRef(null);
  const controller = useSelectionController.default(checked != void 0 ? {
    mode: "boolean",
    value: checked,
    defaultValue,
    onChange
  } : {
    mode: "multiple",
    value,
    defaultValue,
    onChange
  });
  const direction = appearanceMode === "horizontal" ? "row" : "column";
  const Element = /* @__PURE__ */ jsxRuntime.jsxs(index.default, { id, flexDirection: direction, gap: "1rem", children: [
    !Array.isArray(item) && /* @__PURE__ */ jsxRuntime.jsx(
      checkbox_native.default,
      {
        item,
        selected: !!checked,
        disabled,
        isInvalid: invalid,
        onToggle: () => {
          controller.onChange(item);
        }
      },
      String(item.value)
    ),
    Array.isArray(item) && item.map((it, index) => {
      return /* @__PURE__ */ jsxRuntime.jsx(
        checkbox_native.default,
        {
          item: it,
          selected: controller.isSelected(it),
          disabled,
          isInvalid: invalid,
          onToggle: () => {
            lastToggledIndex.current = index;
            controller.onChange(it);
          }
        },
        String(it.value)
      );
    })
  ] });
  if (attached) {
    return Element;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      helperText,
      isFloatedLabel,
      errors,
      invalid,
      label,
      hideError,
      required,
      disabled,
      containerStyle: { borderRadius: 0, overflow: "visible", borderWidth: 0, ...containerStyle },
      elementStyles,
      children: Element
    }
  );
};

exports.default = KitsCheckbox;
//# sourceMappingURL=index.cjs.map
