'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index = require('../../../../../Molecules/Form/KitsInput/InputLocation/index.cjs');
require('react');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const Location = ({
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
    hideError,
    isRequired,
    helperText,
    attached
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
      onAddressClick,
      hideError,
      withFilter: true
    }
  );
};

exports.Location = Location;
exports.default = Location;
//# sourceMappingURL=index.cjs.map
