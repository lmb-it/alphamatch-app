'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../../Molecules/Form/KitsInput/InputNumber/index.cjs');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

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
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
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

exports.InputNumber = InputNumber;
exports.default = InputNumber;
//# sourceMappingURL=index.cjs.map
