'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../../Molecules/Form/KitsInput/PhoneInput/index.cjs');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

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
    rightAddon
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
