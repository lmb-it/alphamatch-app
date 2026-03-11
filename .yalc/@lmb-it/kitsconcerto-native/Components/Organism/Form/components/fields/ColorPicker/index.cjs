'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native = require('../../../../../Molecules/Form/KitsInput/ColorPicker/index.cjs');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const ColorPicker = ({
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
    attached,
    style: elementStyle
  } = fieldLogic;
  const colorPickerElement = element;
  const { colorFormat, inline } = colorPickerElement;
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
      attached,
      colorFormat,
      inline,
      style: elementStyle?.input,
      containerStyle: elementStyle?.container
    }
  );
};

exports.ColorPicker = ColorPicker;
exports.default = ColorPicker;
//# sourceMappingURL=index.cjs.map
