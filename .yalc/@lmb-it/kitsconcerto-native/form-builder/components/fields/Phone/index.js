import { jsx } from 'react/jsx-runtime';
import KitsPhoneComponent from '../../../../form/inputs/PhoneInput/index.js';
import 'react';
import 'axios';

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
  return /* @__PURE__ */ jsx(
    KitsPhoneComponent,
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

export { Phone, Phone as default };
//# sourceMappingURL=index.js.map
