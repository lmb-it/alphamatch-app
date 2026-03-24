'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../form/inputs/InputSwitch/index.cjs');
require('react');
require('axios');

const Switch = ({
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
    attached,
    style: elementStyle
  } = fieldLogic;
  const switchElement = element;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      ...field,
      id: field.name,
      label,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      attached,
      displayAs: switchElement.displayAs,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      checked: !!field.value
    }
  );
};

exports.Switch = Switch;
exports.default = Switch;
//# sourceMappingURL=index.cjs.map
