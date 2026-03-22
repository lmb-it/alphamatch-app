'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index = require('../../../../form/inputs/InputLocation/index.cjs');

const Location = ({
  element,
  control,
  getValues,
  fieldLogic,
  groupField
}) => {
  const {
    field,
    fieldState,
    label,
    placeholder,
    isDisabled,
    hideError,
    isRequired,
    helperText,
    attached,
    style: elementStyle
  } = fieldLogic;
  const locationElement = element;
  const {
    apiKey,
    provider,
    countryISO,
    forceSelection = true,
    // Default to true as in the original
    onAddressClick
  } = locationElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.default,
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
      attached,
      list: [],
      api_key: apiKey,
      provider,
      countryISO,
      forceSelection,
      onAddressClick: (address) => onAddressClick(address, groupField),
      hideError,
      withFilter: true,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container
    }
  );
};

exports.Location = Location;
exports.default = Location;
//# sourceMappingURL=index.cjs.map
