import { jsx } from 'react/jsx-runtime';
import { isValidElement } from 'react';
import 'axios';
import '../../../../Contexts/DialogContext.js';
import '../../../Molecules/Form/KitsSelect/SelectContext.js';
import Flex from '../../../Molecules/UI/Flex/index.js';
import { Button } from '../../../Molecules/Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const SubmitButton = ({
  isSubmitting,
  handleSubmit,
  submitButtonProps,
  formMethods
}) => {
  let buttonProps = {
    label: "Submit",
    isLoadingText: "Please Wait..."
  };
  if (submitButtonProps === "none") {
    return /* @__PURE__ */ jsx(Flex, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end" });
  }
  if (typeof submitButtonProps === "function") {
    return /* @__PURE__ */ jsx(Flex, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end", children: submitButtonProps(handleSubmit, isSubmitting, formMethods) });
  }
  if (isValidElement(submitButtonProps)) {
    return /* @__PURE__ */ jsx(Flex, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end", children: submitButtonProps });
  }
  if (typeof submitButtonProps === "object") {
    buttonProps = submitButtonProps;
  }
  return /* @__PURE__ */ jsx(Flex, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end", children: /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      outlined: true,
      className: "default-submit-button",
      style: {
        borderRadius: "md",
        fontWeight: "light",
        w: ["full", "full", "full", "5rem", "7rem"]
      },
      size: "sm",
      label: "Submit",
      onClick: handleSubmit,
      loading: isSubmitting,
      disabled: isSubmitting,
      ...buttonProps
    }
  ) });
};

export { SubmitButton };
//# sourceMappingURL=SubmitButton.js.map
