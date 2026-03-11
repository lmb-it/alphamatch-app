'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native$1 = require('../../../../../Molecules/Form/KitsInput/InputText/index.cjs');
var index_native = require('../../../../../Molecules/Form/KitsInput/InputMask/index.cjs');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const InputText = ({
  element,
  control,
  getValues,
  fieldLogic
}) => {
  const {
    field,
    placeholder,
    isRequired,
    isDisabled,
    fieldState,
    label,
    helperText,
    rightAddon,
    leftAddon,
    withMask,
    keyFilter,
    layout,
    hideError,
    attached,
    isShown,
    style: elementStyle,
    localProps = {}
  } = fieldLogic;
  if (withMask) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      index_native.default,
      {
        ...field,
        id: field.name,
        placeholder,
        required: isRequired,
        disabled: isDisabled,
        errors: fieldState.error?.message,
        invalid: fieldState.invalid,
        hideError,
        helperText,
        leftAddon,
        rightAddon,
        label,
        attached,
        style: elementStyle?.input,
        containerStyle: elementStyle?.container,
        ...localProps
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(
      index_native$1.default,
      {
        ...field,
        id: field.name,
        placeholder,
        required: isRequired,
        disabled: isDisabled,
        hideError,
        helperText,
        leftAddon,
        rightAddon,
        keyFilter,
        label,
        attached,
        errors: fieldState.error?.message,
        invalid: fieldState.invalid,
        style: elementStyle?.input,
        containerStyle: elementStyle?.container,
        ...localProps
      }
    );
  }
};

exports.InputText = InputText;
exports.default = InputText;
//# sourceMappingURL=index.cjs.map
