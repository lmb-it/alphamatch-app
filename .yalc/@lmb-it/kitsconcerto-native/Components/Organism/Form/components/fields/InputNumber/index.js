import { jsx } from 'react/jsx-runtime';
import KitsInputNumber from '../../../../../Molecules/Form/KitsInput/InputNumber/index.js';
import 'react';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../../Hooks/useKeyboardNavigation.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const InputNumber = ({
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
    keyFilter,
    // The hook can resolve this dynamic prop
    attached,
    style: elementStyle
  } = fieldLogic;
  const numberElement = element;
  const { localProps } = numberElement;
  const handleOnChange = (event) => {
    field.onChange(event.value);
  };
  return /* @__PURE__ */ jsx(
    KitsInputNumber,
    {
      id: field.name,
      name: field.name,
      value: field.value,
      onBlur: field.onBlur,
      ref: field.ref,
      onChange: handleOnChange,
      label,
      placeholder,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      attached,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      localProps
    }
  );
};

export { InputNumber, InputNumber as default };
//# sourceMappingURL=index.js.map
