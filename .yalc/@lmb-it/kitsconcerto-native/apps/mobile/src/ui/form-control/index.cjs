'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var React = require('react');
var creator = require('@gluestack-ui/core/form-control/creator');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var nativewind = require('nativewind');
var creator$1 = require('@gluestack-ui/core/icon/creator');

const SCOPE = "FORM_CONTROL";
const formControlStyle = nativewindUtils.tva({
  base: "flex flex-col",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  }
});
const formControlErrorIconStyle = nativewindUtils.tva({
  base: "text-error-700 fill-none",
  variants: {
    size: {
      "2xs": "h-3 w-3",
      "xs": "h-3.5 w-3.5",
      "sm": "h-4 w-4",
      "md": "h-[18px] w-[18px]",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    }
  }
});
const formControlErrorStyle = nativewindUtils.tva({
  base: "flex flex-row justify-start items-center mt-1 gap-1"
});
const formControlErrorTextStyle = nativewindUtils.tva({
  base: "text-error-700",
  variants: {
    isTruncated: {
      true: "web:truncate"
    },
    bold: {
      true: "font-bold"
    },
    underline: {
      true: "underline"
    },
    strikeThrough: {
      true: "line-through"
    },
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-sm",
      "md": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl"
    },
    sub: {
      true: "text-xs"
    },
    italic: {
      true: "italic"
    },
    highlight: {
      true: "bg-yellow-500"
    }
  }
});
const formControlHelperStyle = nativewindUtils.tva({
  base: "flex flex-row justify-start items-center mt-1"
});
const formControlHelperTextStyle = nativewindUtils.tva({
  base: "text-typography-500",
  variants: {
    isTruncated: {
      true: "web:truncate"
    },
    bold: {
      true: "font-bold"
    },
    underline: {
      true: "underline"
    },
    strikeThrough: {
      true: "line-through"
    },
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-xs",
      "md": "text-sm",
      "lg": "text-base",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl"
    },
    sub: {
      true: "text-xs"
    },
    italic: {
      true: "italic"
    },
    highlight: {
      true: "bg-yellow-500"
    }
  }
});
const formControlLabelStyle = nativewindUtils.tva({
  base: "flex flex-row justify-start items-center mb-1"
});
const formControlLabelTextStyle = nativewindUtils.tva({
  base: "font-medium text-typography-900",
  variants: {
    isTruncated: {
      true: "web:truncate"
    },
    bold: {
      true: "font-bold"
    },
    underline: {
      true: "underline"
    },
    strikeThrough: {
      true: "line-through"
    },
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-sm",
      "md": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl"
    },
    sub: {
      true: "text-xs"
    },
    italic: {
      true: "italic"
    },
    highlight: {
      true: "bg-yellow-500"
    }
  }
});
const formControlLabelAstrickStyle = nativewindUtils.tva({
  base: "font-medium text-error-700",
  variants: {
    isTruncated: {
      true: "web:truncate"
    },
    bold: {
      true: "font-bold"
    },
    underline: {
      true: "underline"
    },
    strikeThrough: {
      true: "line-through"
    },
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-sm",
      "md": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl"
    },
    sub: {
      true: "text-xs"
    },
    italic: {
      true: "italic"
    },
    highlight: {
      true: "bg-yellow-500"
    }
  }
});
const FormControlLabelAstrick = React.forwardRef(function FormControlLabelAstrick2({ className, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Text,
    {
      ref,
      className: formControlLabelAstrickStyle({
        parentVariants: { size: parentSize },
        class: className
      }),
      ...props
    }
  );
});
const UIFormControl = creator.createFormControl({
  Root: nativewindUtils.withStyleContext(reactNative.View, SCOPE),
  Error: reactNative.View,
  ErrorText: reactNative.Text,
  ErrorIcon: creator$1.UIIcon,
  Label: reactNative.View,
  LabelText: reactNative.Text,
  LabelAstrick: FormControlLabelAstrick,
  Helper: reactNative.View,
  HelperText: reactNative.Text
});
nativewind.cssInterop(creator$1.PrimitiveIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: true,
      stroke: true
    }
  }
});
const FormControl = React.forwardRef(function FormControl2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl,
    {
      ref,
      className: formControlStyle({ size, class: className }),
      ...props,
      context: { size }
    }
  );
});
const FormControlError = React.forwardRef(function FormControlError2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl.Error,
    {
      ref,
      className: formControlErrorStyle({ class: className }),
      ...props
    }
  );
});
const FormControlErrorText = React.forwardRef(function FormControlErrorText2({ className, size, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl.Error.Text,
    {
      className: formControlErrorTextStyle({
        parentVariants: { size: parentSize },
        size,
        class: className
      }),
      ref,
      ...props
    }
  );
});
const FormControlErrorIcon = React.forwardRef(function FormControlErrorIcon2({ className, size, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIFormControl.Error.Icon,
      {
        ref,
        ...props,
        className: formControlErrorIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIFormControl.Error.Icon,
      {
        ref,
        ...props,
        className: formControlErrorIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl.Error.Icon,
    {
      className: formControlErrorIconStyle({
        parentVariants: { size: parentSize },
        size,
        class: className
      }),
      ...props
    }
  );
});
const FormControlLabel = React.forwardRef(function FormControlLabel2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl.Label,
    {
      ref,
      className: formControlLabelStyle({ class: className }),
      ...props
    }
  );
});
const FormControlLabelText = React.forwardRef(function FormControlLabelText2({ className, size, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl.Label.Text,
    {
      className: formControlLabelTextStyle({
        parentVariants: { size: parentSize },
        size,
        class: className
      }),
      ref,
      ...props
    }
  );
});
const FormControlHelper = React.forwardRef(function FormControlHelper2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl.Helper,
    {
      ref,
      className: formControlHelperStyle({
        class: className
      }),
      ...props
    }
  );
});
const FormControlHelperText = React.forwardRef(function FormControlHelperText2({ className, size, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIFormControl.Helper.Text,
    {
      className: formControlHelperTextStyle({
        parentVariants: { size: parentSize },
        size,
        class: className
      }),
      ref,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
FormControlError.displayName = "FormControlError";
FormControlErrorText.displayName = "FormControlErrorText";
FormControlErrorIcon.displayName = "FormControlErrorIcon";
FormControlLabel.displayName = "FormControlLabel";
FormControlLabelText.displayName = "FormControlLabelText";
FormControlLabelAstrick.displayName = "FormControlLabelAstrick";
FormControlHelper.displayName = "FormControlHelper";
FormControlHelperText.displayName = "FormControlHelperText";

exports.FormControl = FormControl;
exports.FormControlError = FormControlError;
exports.FormControlErrorIcon = FormControlErrorIcon;
exports.FormControlErrorText = FormControlErrorText;
exports.FormControlHelper = FormControlHelper;
exports.FormControlHelperText = FormControlHelperText;
exports.FormControlLabel = FormControlLabel;
exports.FormControlLabelAstrick = FormControlLabelAstrick;
exports.FormControlLabelText = FormControlLabelText;
exports.UIFormControl = UIFormControl;
//# sourceMappingURL=index.cjs.map
