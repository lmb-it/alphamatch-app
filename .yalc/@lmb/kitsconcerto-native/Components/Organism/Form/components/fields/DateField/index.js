import { jsx } from 'react/jsx-runtime';
import 'react';
import 'axios';
import KitsInputCalendar from '../../../../../Molecules/Form/KitsInput/Datepicker/index.js';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
    rightAddon
    // The hook now resolves addons
  } = fieldLogic;
  const dateElement = element;
  const { localProps } = dateElement;
  return /* @__PURE__ */ jsx(
    KitsInputCalendar,
    {
      id: field.name,
      label,
      value: field.value,
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
      localProps: {
        ...localProps
      }
    }
  );
};

export { DateField, DateField as default };
//# sourceMappingURL=index.js.map
