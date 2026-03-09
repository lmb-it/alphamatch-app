'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../../Molecules/Form/KitsInput/InputTextarea/index.cjs');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

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
    attached
  } = fieldLogic;
  const textareaElement = element;
  const { rows, cols, autoResize } = textareaElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
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
      rows,
      cols,
      autoResize
    }
  );
};

exports.Textarea = Textarea;
exports.default = Textarea;
//# sourceMappingURL=index.cjs.map
