import { jsx, Fragment } from 'react/jsx-runtime';
import { isValidElement } from 'react';
import { Button } from '../../components/Button/Button.js';

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
