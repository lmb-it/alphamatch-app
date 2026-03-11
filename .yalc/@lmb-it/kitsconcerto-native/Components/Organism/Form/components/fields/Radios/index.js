import { jsx } from 'react/jsx-runtime';
import 'react';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../../Hooks/useKeyboardNavigation.js';
import KitsRadio from '../../../../../Molecules/Form/Buttons/RadioButton/radio.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
