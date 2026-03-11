'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
require('axios');
require('../../../../Contexts/DialogContext.cjs');
require('../../../../Hooks/useKeyboardNavigation.cjs');
require('../../../Molecules/Form/KitsSelect/SelectContext.cjs');
require('../../../Molecules/UI/Flex/index.cjs');
var Button_native = require('../../../Molecules/Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const SubmitButton = ({ isSubmitting, handleSubmit, submitButtonProps, formMethods }) => {
  if (typeof submitButtonProps === "function") {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: submitButtonProps(handleSubmit, isSubmitting, formMethods) });
  }
  if (React.isValidElement(submitButtonProps)) {
    return submitButtonProps;
  }
  const props = {
    label: "Submit",
    severity: "secondary",
    isLoadingText: "Please Wait...",
    ...submitButtonProps && typeof submitButtonProps === "object" ? submitButtonProps : {}
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    Button_native.Button,
    {
      ...props,
      onClick: handleSubmit,
      loading: isSubmitting,
      disabled: isSubmitting
    }
  );
};

exports.SubmitButton = SubmitButton;
//# sourceMappingURL=SubmitButton.cjs.map
