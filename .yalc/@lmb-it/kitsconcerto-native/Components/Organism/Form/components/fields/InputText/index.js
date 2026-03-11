import { jsx } from 'react/jsx-runtime';
import KitsInputText from '../../../../../Molecules/Form/KitsInput/InputText/index.js';
import KitsInputMask from '../../../../../Molecules/Form/KitsInput/InputMask/index.js';
import 'react';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../../Hooks/useKeyboardNavigation.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
