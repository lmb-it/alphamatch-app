'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
require('axios');
require('../../../../Contexts/DialogContext.cjs');
require('../../../Molecules/Form/KitsSelect/SelectContext.cjs');
var index = require('../../../Molecules/UI/Flex/index.cjs');
var Button_native = require('../../../Molecules/Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

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
    return /* @__PURE__ */ jsxRuntime.jsx(index.default, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end" });
  }
  if (typeof submitButtonProps === "function") {
    return /* @__PURE__ */ jsxRuntime.jsx(index.default, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end", children: submitButtonProps(handleSubmit, isSubmitting, formMethods) });
  }
  if (React.isValidElement(submitButtonProps)) {
    return /* @__PURE__ */ jsxRuntime.jsx(index.default, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end", children: submitButtonProps });
  }
  if (typeof submitButtonProps === "object") {
    buttonProps = submitButtonProps;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(index.default, { w: "full", alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(
    Button_native.Button,
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

exports.SubmitButton = SubmitButton;
//# sourceMappingURL=SubmitButton.cjs.map
