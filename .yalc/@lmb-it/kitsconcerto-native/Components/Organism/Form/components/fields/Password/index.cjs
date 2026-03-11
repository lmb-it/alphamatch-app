'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../../Molecules/Form/KitsInput/InputPassword/index.cjs');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const Password = ({
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
    leftAddon,
    rightAddon,
    attached,
    style: elementStyle
  } = fieldLogic;
  const passwordElement = element;
  const { showStrengthProgress, toggleEye, localProps } = passwordElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      ...field,
      id: field.name,
      label,
      placeholder,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      leftAddon,
      rightAddon,
      attached,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container,
      showStrengthProgress,
      toggleEye,
      ...localProps
    }
  );
};

exports.Password = Password;
exports.default = Password;
//# sourceMappingURL=index.cjs.map
