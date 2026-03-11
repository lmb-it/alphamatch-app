import { jsx } from 'react/jsx-runtime';
import KitsInputLocation from '../../../../../Molecules/Form/KitsInput/InputLocation/index.js';
import 'react';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../../Hooks/useKeyboardNavigation.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
  return /* @__PURE__ */ jsx(
    KitsInputLocation,
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
      withFilter: true,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container
    }
  );
};

export { Location, Location as default };
//# sourceMappingURL=index.js.map
