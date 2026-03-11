'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var reactHookForm = require('react-hook-form');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
var index_native = require('../../../../../Molecules/Form/KitsFilePicker/index.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const FileUploader = ({
  element,
  control,
  getValues,
  fieldLogic
}) => {
  const { setError, clearErrors, getValues: getFormConfig } = reactHookForm.useFormContext();
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
    template
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
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
      template,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container
    }
  );
};

exports.FileUploader = FileUploader;
exports.default = FileUploader;
//# sourceMappingURL=index.cjs.map
