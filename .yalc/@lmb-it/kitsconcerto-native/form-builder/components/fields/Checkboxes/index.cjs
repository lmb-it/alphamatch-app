'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index = require('../../../../layout/Flex/index.cjs');
var index$1 = require('../../../../form/controls/Checkbox/index.cjs');

const Checkboxes = ({
  element,
  control,
  getValues,
  fieldLogic
}) => {
  const {
    field,
    fieldState,
    label,
    isDisabled,
    isRequired,
    helperText,
    hideError,
    list,
    attached,
    style: elementStyle
  } = fieldLogic;
  getValues();
  const checkboxElement = element;
  const { vertical } = checkboxElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.default,
    {
      alignSelf: "center",
      flexWrap: "wrap",
      gap: 2,
      flexDirection: vertical ? "column" : "row",
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index$1.default,
        {
          ...field,
          onChange: (values) => {
            field.onChange({
              target: {
                value: values
              }
            });
          },
          id: field.name,
          label,
          disabled: isDisabled,
          required: isRequired,
          invalid: fieldState.invalid,
          hideError,
          errors: fieldState.error?.message,
          helperText,
          item: list,
          attached,
          style: elementStyle?.input,
          containerStyle: elementStyle?.container,
          appearanceMode: vertical ? "vertical" : "horizontal"
        }
      )
    }
  );
};

exports.Checkboxes = Checkboxes;
exports.default = Checkboxes;
//# sourceMappingURL=index.cjs.map
