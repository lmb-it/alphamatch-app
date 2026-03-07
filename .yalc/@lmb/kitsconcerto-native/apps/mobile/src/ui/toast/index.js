import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createToastHook } from '@gluestack-ui/core/toast/creator';
import { View, AccessibilityInfo, Text } from 'react-native';
import { tva, withStyleContext, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { Motion, AnimatePresence } from '@legendapp/motion';

const MotionView = Motion.View;
createToastHook(MotionView, AnimatePresence);
const SCOPE = "TOAST";
cssInterop(MotionView, { className: "style" });
const toastStyle = tva({
  base: "p-4 m-1 rounded-md gap-1 web:pointer-events-auto shadow-hard-5 border-outline-100",
  variants: {
    action: {
      error: "bg-error-800",
      warning: "bg-warning-700",
      success: "bg-success-700",
      info: "bg-info-700",
      muted: "bg-background-800"
    },
    variant: {
      solid: "",
      outline: "border bg-background-0"
    }
  }
});
const toastTitleStyle = tva({
  base: "text-typography-0 font-medium font-body tracking-md text-left",
  variants: {
    isTruncated: {
      true: ""
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
    }
  },
  parentVariants: {
    variant: {
      solid: "",
      outline: ""
    },
    action: {
      error: "",
      warning: "",
      success: "",
      info: "",
      muted: ""
    }
  },
  parentCompoundVariants: [
    {
      variant: "outline",
      action: "error",
      class: "text-error-800"
    },
    {
      variant: "outline",
      action: "warning",
      class: "text-warning-800"
    },
    {
      variant: "outline",
      action: "success",
      class: "text-success-800"
    },
    {
      variant: "outline",
      action: "info",
      class: "text-info-800"
    },
    {
      variant: "outline",
      action: "muted",
      class: "text-background-800"
    }
  ]
});
const toastDescriptionStyle = tva({
  base: "font-normal font-body tracking-md text-left",
  variants: {
    isTruncated: {
      true: ""
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
    }
  },
  parentVariants: {
    variant: {
      solid: "text-typography-50",
      outline: "text-typography-900"
    }
  }
});
const Root = withStyleContext(View, SCOPE);
const Toast = React.forwardRef(
  function Toast2({ className, variant = "solid", action = "muted", ...props }, ref) {
    return /* @__PURE__ */ jsx(
      Root,
      {
        ref,
        className: toastStyle({ variant, action, class: className }),
        context: { variant, action },
        ...props
      }
    );
  }
);
const ToastTitle = React.forwardRef(function ToastTitle2({ className, size = "md", children, ...props }, ref) {
  const { variant: parentVariant, action: parentAction } = useStyleContext(SCOPE);
  React.useEffect(() => {
    AccessibilityInfo.announceForAccessibility(children);
  }, [children]);
  return /* @__PURE__ */ jsx(
    Text,
    {
      ...props,
      ref,
      "aria-live": "assertive",
      "aria-atomic": "true",
      role: "alert",
      className: toastTitleStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant,
          action: parentAction
        }
      }),
      children
    }
  );
});
const ToastDescription = React.forwardRef(function ToastDescription2({ className, size = "md", ...props }, ref) {
  const { variant: parentVariant } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    Text,
    {
      ref,
      ...props,
      className: toastDescriptionStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant
        }
      })
    }
  );
});
Toast.displayName = "Toast";
ToastTitle.displayName = "ToastTitle";
ToastDescription.displayName = "ToastDescription";

export { Toast, ToastDescription, ToastTitle };
//# sourceMappingURL=index.js.map
