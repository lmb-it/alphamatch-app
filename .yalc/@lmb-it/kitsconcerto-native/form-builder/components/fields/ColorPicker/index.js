import { jsx } from 'react/jsx-runtime';
import KitsInputColorPicker from '../../../../form/inputs/ColorPicker/index.js';
import 'react';
import 'axios';

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
  return /* @__PURE__ */ jsx(
    KitsInputColorPicker,
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

export { ColorPicker, ColorPicker as default };
//# sourceMappingURL=index.js.map
