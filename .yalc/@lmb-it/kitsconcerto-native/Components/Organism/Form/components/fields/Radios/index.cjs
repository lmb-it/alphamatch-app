'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('react');
require('axios');
require('../../../../../../Contexts/DialogContext.cjs');
require('../../../../../../Hooks/useKeyboardNavigation.cjs');
var radio_native = require('../../../../../Molecules/Form/Buttons/RadioButton/radio.cjs');
require('../../../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const Radios = ({
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
    hideError,
    list,
    attached,
    style: elementStyle
  } = fieldLogic;
  const checkboxElement = element;
  const { vertical } = checkboxElement;
  return /* @__PURE__ */ jsxRuntime.jsx(
    radio_native.default,
    {
      ...field,
      onChange: (checked, event) => {
        field.onChange({
          target: {
            value: event.value
          }
        });
      },
      id: field.name,
      label,
      hideError,
      disabled: isDisabled,
      required: isRequired,
      invalid: fieldState.invalid,
      errors: fieldState.error?.message,
      helperText,
      item: list,
      attached,
      appearanceMode: vertical ? "vertical" : "horizontal",
      style: elementStyle?.input,
      containerStyle: elementStyle?.container
    }
  );
};

exports.Radios = Radios;
exports.default = Radios;
//# sourceMappingURL=index.cjs.map
