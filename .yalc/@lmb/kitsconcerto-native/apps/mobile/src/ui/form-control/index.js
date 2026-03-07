import { jsx } from 'react/jsx-runtime';
import { Text, View } from 'react-native';
import React from 'react';
import { createFormControl } from '@gluestack-ui/core/form-control/creator';
import { useStyleContext, withStyleContext, tva } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { UIIcon, PrimitiveIcon } from '@gluestack-ui/core/icon/creator';

const SCOPE = "FORM_CONTROL";
const formControlStyle = tva({
  base: "flex flex-col",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  }
});
const formControlErrorIconStyle = tva({
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
const formControlErrorStyle = tva({
  base: "flex flex-row justify-start items-center mt-1 gap-1"
});
const formControlErrorTextStyle = tva({
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
const formControlHelperStyle = tva({
  base: "flex flex-row justify-start items-center mt-1"
});
const formControlHelperTextStyle = tva({
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
const formControlLabelStyle = tva({
  base: "flex flex-row justify-start items-center mb-1"
});
const formControlLabelTextStyle = tva({
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
const formControlLabelAstrickStyle = tva({
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
const FormControlLabelAstrick = React.forwardRef(function FormControlLabelAstrick2({ className, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    Text,
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
const UIFormControl = createFormControl({
  Root: withStyleContext(View, SCOPE),
  Error: View,
  ErrorText: Text,
  ErrorIcon: UIIcon,
  Label: View,
  LabelText: Text,
  LabelAstrick: FormControlLabelAstrick,
  Helper: View,
  HelperText: Text
});
cssInterop(PrimitiveIcon, {
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    UIFormControl.Error,
    {
      ref,
      className: formControlErrorStyle({ class: className }),
      ...props
    }
  );
});
const FormControlErrorText = React.forwardRef(function FormControlErrorText2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
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
  const { size: parentSize } = useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsx(
      UIFormControl.Error.Icon,
      {
        ref,
        ...props,
        className: formControlErrorIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsx(
      UIFormControl.Error.Icon,
      {
        ref,
        ...props,
        className: formControlErrorIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    UIFormControl.Label,
    {
      ref,
      className: formControlLabelStyle({ class: className }),
      ...props
    }
  );
});
const FormControlLabelText = React.forwardRef(function FormControlLabelText2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
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

export { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelAstrick, FormControlLabelText, UIFormControl };
//# sourceMappingURL=index.js.map
