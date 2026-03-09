import { jsx, Fragment } from 'react/jsx-runtime';
import { isValidElement } from 'react';
import 'axios';
import '../../../../Contexts/DialogContext.js';
import '../../../Molecules/Form/KitsSelect/SelectContext.js';
import '../../../Molecules/UI/Flex/index.js';
import { Button } from '../../../Molecules/Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const SubmitButton = ({ isSubmitting, handleSubmit, submitButtonProps, formMethods }) => {
  if (typeof submitButtonProps === "function") {
    return /* @__PURE__ */ jsx(Fragment, { children: submitButtonProps(handleSubmit, isSubmitting, formMethods) });
  }
  if (isValidElement(submitButtonProps)) {
    return submitButtonProps;
  }
  const props = {
    label: "Submit",
    severity: "secondary",
    isLoadingText: "Please Wait...",
    ...submitButtonProps && typeof submitButtonProps === "object" ? submitButtonProps : {}
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      onClick: handleSubmit,
      loading: isSubmitting,
      disabled: isSubmitting
    }
  );
};

export { SubmitButton };
//# sourceMappingURL=SubmitButton.js.map
