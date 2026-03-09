'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('react');
require('axios');
var index_native = require('../../../../../Molecules/Form/KitsInput/Datepicker/index.cjs');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const DateField = ({
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
    // The hook now resolves addons
    attached
  } = fieldLogic;
  const dateElement = element;
  const { localProps } = dateElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id: field.name,
      label,
      value: field.value,
      onChange: field.onChange,
      onBlur: field.onBlur,
      placeholder,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      hideError: element.hideError,
      leftAddon,
      rightAddon,
      attached,
      localProps: {
        ...localProps
      }
    }
  );
};

exports.DateField = DateField;
exports.default = DateField;
//# sourceMappingURL=index.cjs.map
