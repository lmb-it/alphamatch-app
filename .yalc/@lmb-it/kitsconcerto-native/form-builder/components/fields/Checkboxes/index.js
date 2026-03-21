import { jsx } from 'react/jsx-runtime';
import Flex from '../../../../layout/Flex/index.js';
import KitsCheckbox from '../../../../form/controls/Checkbox/index.js';

const Checkboxes = ({
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
  getValues();
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
        KitsCheckbox,
        {
          ...field,
          onChange: (values) => {
            field.onChange({
              target: {
                value: values
              }
            });
          },
          id: field.name,
          label,
          disabled: isDisabled,
          required: isRequired,
          invalid: fieldState.invalid,
          hideError,
          errors: fieldState.error?.message,
          helperText,
          item: list,
          attached,
          style: elementStyle?.input,
          containerStyle: elementStyle?.container,
          appearanceMode: vertical ? "vertical" : "horizontal"
        }
      )
    }
  );
};

export { Checkboxes, Checkboxes as default };
//# sourceMappingURL=index.js.map
