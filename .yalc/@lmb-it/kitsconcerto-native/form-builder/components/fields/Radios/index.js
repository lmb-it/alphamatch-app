import { jsx } from 'react/jsx-runtime';
import KitsRadio from '../../../../form/controls/RadioButton/radio.js';
import 'react';
import '../../../../contexts/DialogContext.js';

const Radios = ({
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
    list,
    attached,
    style: elementStyle
  } = fieldLogic;
  const checkboxElement = element;
  const { vertical } = checkboxElement;
  return /* @__PURE__ */ jsx(
    KitsRadio,
    {
      ...field,
      onChange: (checked, event) => {
        field.onChange({
          target: {
            value: event.value
          }
        });
      },
      id: field.name,
      label,
      hideError,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      item: list,
      attached,
      appearanceMode: vertical ? "vertical" : "horizontal",
      style: elementStyle?.input,
      containerStyle: elementStyle?.container
    }
  );
};

export { Radios, Radios as default };
//# sourceMappingURL=index.js.map
