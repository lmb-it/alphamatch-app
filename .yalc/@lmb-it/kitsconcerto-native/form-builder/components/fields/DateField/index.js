import { jsx } from 'react/jsx-runtime';
import KitsInputCalendar from '../../../../form/inputs/Datepicker/index.js';
import 'react';
import 'axios';

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
    attached,
    style: elementStyle
  } = fieldLogic;
  const dateElement = element;
  const { localProps } = dateElement;
  return /* @__PURE__ */ jsx(
    KitsInputCalendar,
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
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      localProps: {
        ...localProps
      }
    }
  );
};

export { DateField, DateField as default };
//# sourceMappingURL=index.js.map
