'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('react');
require('axios');
var index_native = require('../../../../../Molecules/Form/KitsInput/InputSwitch/index.cjs');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

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
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
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

exports.Switch = Switch;
exports.default = Switch;
//# sourceMappingURL=index.cjs.map
