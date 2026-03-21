'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../form/inputs/InputPassword/index.cjs');
require('react');
require('axios');

const Password = ({
  element,
  control,
  getValues,
  fieldLogic
}) => {
  const {
    field,
    fieldState,
    label,
    placeholder,
    isDisabled,
    isRequired,
    helperText,
    leftAddon,
    rightAddon,
    attached,
    style: elementStyle
  } = fieldLogic;
  const passwordElement = element;
  const { showStrengthProgress, toggleEye, localProps } = passwordElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      ...field,
      id: field.name,
      label,
      placeholder,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      leftAddon,
      rightAddon,
      attached,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      showStrengthProgress,
      toggleEye,
      ...localProps
    }
  );
};

exports.Password = Password;
exports.default = Password;
//# sourceMappingURL=index.cjs.map
