import { jsx } from 'react/jsx-runtime';
import KitsInputPassword from '../../../../../Molecules/Form/KitsInput/InputPassword/index.js';
import 'react';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../../Hooks/useKeyboardNavigation.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
  return /* @__PURE__ */ jsx(
    KitsInputPassword,
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

export { Password, Password as default };
//# sourceMappingURL=index.js.map
