import { jsx } from 'react/jsx-runtime';
import KitsInputSwitch from '../../../../form/inputs/InputSwitch/index.js';
import 'react';
import 'axios';

const Switch = ({
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
    attached,
    style: elementStyle
  } = fieldLogic;
  const switchElement = element;
  return /* @__PURE__ */ jsx(
    KitsInputSwitch,
    {
      ...field,
      id: field.name,
      label,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      attached,
      displayAs: switchElement.displayAs,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      checked: !!field.value
    }
  );
};

export { Switch, Switch as default };
//# sourceMappingURL=index.js.map
