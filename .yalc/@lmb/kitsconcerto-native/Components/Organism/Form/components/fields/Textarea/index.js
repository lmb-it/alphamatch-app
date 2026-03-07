import { jsx } from 'react/jsx-runtime';
import KitsInputTextarea from '../../../../../Molecules/Form/KitsInput/InputTextarea/index.js';
import 'react';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
    keyFilter
    // The hook resolves this dynamic prop
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
      rows,
      cols,
      autoResize
    }
  );
};

export { Textarea, Textarea as default };
//# sourceMappingURL=index.js.map
