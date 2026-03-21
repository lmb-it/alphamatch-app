'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../form/inputs/PhoneInput/index.cjs');
require('react');
require('axios');

const Phone = ({
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
    leftAddon,
    rightAddon,
    attached,
    style: elementStyle
  } = fieldLogic;
  const phoneElement = element;
  const {
    isWithCountryCode,
    defaultCountry,
    outputFormat,
    customCountriesCodesList,
    excludedCountries,
    includedCountries
  } = phoneElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id: element.id.toString(),
      excludedCountries,
      includedCountries,
      customCountriesCodesList,
      label,
      leftAddon,
      rightAddon,
      hideError: element.hideError,
      isWithCountryCode,
      defaultCountry,
      outputFormat,
      disabled: isDisabled,
      required: isRequired,
      errors: fieldState.error?.message,
      invalid: fieldState.invalid,
      attached,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      onChange: (value) => {
        field.onChange({ target: { value } });
      },
      value: field.value
    }
  );
};

exports.Phone = Phone;
exports.default = Phone;
//# sourceMappingURL=index.cjs.map
