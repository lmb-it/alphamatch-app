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
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      checked: !!field.value
    }
  );
};

export { Switch, Switch as default };
//# sourceMappingURL=index.js.map
