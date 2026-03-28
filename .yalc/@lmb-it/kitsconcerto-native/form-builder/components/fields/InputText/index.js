import { jsx } from 'react/jsx-runtime';
import KitsInputMask from '../../../../form/inputs/InputMask/index.js';
import KitsInputText from '../../../../form/inputs/InputText/index.js';
import 'react';
import 'axios';

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
    return /* @__PURE__ */ jsx(
      KitsInputMask,
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
    const keyboardType = "keyboardType" in element ? element.keyboardType : void 0;
    return /* @__PURE__ */ jsx(
      KitsInputText,
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
        keyboardType,
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

export { InputText, InputText as default };
//# sourceMappingURL=index.js.map
