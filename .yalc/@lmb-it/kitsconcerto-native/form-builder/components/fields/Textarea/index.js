import { jsx } from 'react/jsx-runtime';
import KitsInputTextarea from '../../../../form/inputs/InputTextarea/index.js';

const Textarea = ({
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
    hideError,
    helperText,
    keyFilter,
    // The hook resolves this dynamic prop
    attached,
    style: elementStyle
  } = fieldLogic;
  const textareaElement = element;
  const { rows, cols, autoResize } = textareaElement;
  return /* @__PURE__ */ jsx(
    KitsInputTextarea,
    {
      ...field,
      id: field.name,
      label,
      placeholder,
      disabled: isDisabled,
      hideError,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      keyFilter,
      attached,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      rows,
      cols,
      autoResize
    }
  );
};

export { Textarea, Textarea as default };
//# sourceMappingURL=index.js.map
