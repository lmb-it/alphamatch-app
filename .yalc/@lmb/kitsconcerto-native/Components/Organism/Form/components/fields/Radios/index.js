import { jsx } from 'react/jsx-runtime';
import 'react';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import KitsRadio from '../../../../../Molecules/Form/Buttons/RadioButton/radio.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import Flex from '../../../../../Molecules/UI/Flex/index.js';
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
    list
  } = fieldLogic;
  const checkboxElement = element;
  const { vertical } = checkboxElement;
  return /* @__PURE__ */ jsx(
    Flex,
    {
      alignSelf: "center",
      flexWrap: "wrap",
      gap: 2,
      flexDirection: vertical ? "column" : "row",
      children: /* @__PURE__ */ jsx(
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
          appearanceMode: vertical ? "vertical" : "horizontal"
        }
      )
    }
  );
};

export { Radios, Radios as default };
//# sourceMappingURL=index.js.map
