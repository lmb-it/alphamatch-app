import { jsx } from 'react/jsx-runtime';
import { useFormContext } from 'react-hook-form';
import FilePicker from '../../../../form/file-pickers/index.js';
import 'react';
import 'axios';
import '../../../../contexts/DialogContext.js';
import '../../../../form/selects/SelectContext.js';

const FileUploader = ({
  element,
  control,
  getValues,
  fieldLogic
}) => {
  const { setError, clearErrors, getValues: getFormConfig } = useFormContext();
  const outputFormat = getFormConfig().outputFormat || "Json";
  const {
    field,
    fieldState,
    label,
    isDisabled,
    isRequired,
    helperText,
    placeholder,
    attached,
    style: elementStyle
  } = fieldLogic;
  const fileElement = element;
  const {
    type,
    multiple,
    limit,
    acceptedTypes,
    maxFileSize,
    minFileSize,
    classicUploader,
    children
  } = fileElement;
  const handleOnChange = (files, base64Data) => {
    if (outputFormat === "FormData") {
      field.onChange(multiple ? files : files[0]);
    } else {
      field.onChange(multiple ? base64Data : base64Data[0]);
    }
  };
  const handleError = (errorMessage) => {
    if (errorMessage === "clear") {
      clearErrors(field.name);
    } else {
      setError(field.name, { type: "custom", message: errorMessage });
    }
  };
  return /* @__PURE__ */ jsx(
    FilePicker,
    {
      id: field.name,
      value: field.value,
      onChange: handleOnChange,
      onError: handleError,
      label,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      placeholder,
      attached,
      type,
      multiple,
      limit,
      acceptedTypes,
      maxFileSize,
      minFileSize,
      classicUploader,
      isJsonOutput: outputFormat === "Json",
      children,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container
    }
  );
};

export { FileUploader, FileUploader as default };
//# sourceMappingURL=index.js.map
