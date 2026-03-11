import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createAlertDialog } from '@gluestack-ui/core/alert-dialog/creator';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { Motion, createMotionAnimatedComponent, AnimatePresence } from '@legendapp/motion';
import { View, Pressable, ScrollView } from 'react-native';

const SCOPE = "ALERT_DIALOG";
const RootComponent = withStyleContext(View, SCOPE);
const MotionView = Motion.View;
const AnimatedPressable = createMotionAnimatedComponent(
  Pressable
);
const UIAccessibleAlertDialog = createAlertDialog({
  Root: RootComponent,
  Body: ScrollView,
  Content: MotionView,
  CloseButton: Pressable,
  Header: View,
  Footer: View,
  Backdrop: AnimatedPressable,
  AnimatePresence
});
cssInterop(MotionView, { className: "style" });
cssInterop(AnimatedPressable, { className: "style" });
const alertDialogStyle = tva({
  base: "group/modal w-full h-full justify-center items-center web:pointer-events-none",
  parentVariants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      full: ""
    }
  }
});
const alertDialogContentStyle = tva({
  base: "bg-background-0 rounded-lg overflow-hidden border border-outline-100 p-6",
  parentVariants: {
    size: {
      xs: "w-[60%] max-w-[360px]",
      sm: "w-[70%] max-w-[420px]",
      md: "w-[80%] max-w-[510px]",
      lg: "w-[90%] max-w-[640px]",
      full: "w-full"
    }
  }
});
const alertDialogCloseButtonStyle = tva({
  base: "group/alert-dialog-close-button z-10 rounded-sm p-2 data-[focus-visible=true]:bg-background-100 web:cursor-pointer outline-0"
});
const alertDialogHeaderStyle = tva({
  base: "justify-between items-center flex-row"
});
const alertDialogFooterStyle = tva({
  base: "flex-row justify-end items-center gap-3"
});
const alertDialogBodyStyle = tva({ base: "" });
const alertDialogBackdropStyle = tva({
  base: "absolute left-0 top-0 right-0 bottom-0 bg-background-dark web:cursor-default"
});
const AlertDialog = React.forwardRef(function AlertDialog2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAccessibleAlertDialog,
    {
      ref,
      ...props,
      className: alertDialogStyle({ class: className }),
      context: { size },
      pointerEvents: "box-none"
    }
  );
});
const AlertDialogContent = React.forwardRef(function AlertDialogContent2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIAccessibleAlertDialog.Content,
    {
      pointerEvents: "auto",
      ref,
      initial: {
        scale: 0.9,
        opacity: 0
      },
      animate: {
        scale: 1,
        opacity: 1
      },
      exit: {
        scale: 0.9,
        opacity: 0
      },
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 250,
        opacity: {
          type: "timing",
          duration: 250
        }
      },
      ...props,
      className: alertDialogContentStyle({
        parentVariants: {
          size: parentSize
        },
        size,
        class: className
      })
    }
  );
});
const AlertDialogCloseButton = React.forwardRef(function AlertDialogCloseButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAccessibleAlertDialog.CloseButton,
    {
      ref,
      ...props,
      className: alertDialogCloseButtonStyle({
        class: className
      })
    }
  );
});
const AlertDialogHeader = React.forwardRef(function AlertDialogHeader2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAccessibleAlertDialog.Header,
    {
      ref,
      ...props,
      className: alertDialogHeaderStyle({
        class: className
      })
    }
  );
});
const AlertDialogFooter = React.forwardRef(function AlertDialogFooter2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAccessibleAlertDialog.Footer,
    {
      ref,
      ...props,
      className: alertDialogFooterStyle({
        class: className
      })
    }
  );
});
const AlertDialogBody = React.forwardRef(function AlertDialogBody2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAccessibleAlertDialog.Body,
    {
      ref,
      ...props,
      className: alertDialogBodyStyle({
        class: className
      })
    }
  );
});
const AlertDialogBackdrop = React.forwardRef(function AlertDialogBackdrop2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAccessibleAlertDialog.Backdrop,
    {
      ref,
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 0.5
      },
      exit: {
        opacity: 0
      },
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 250,
        opacity: {
          type: "timing",
          duration: 250
        }
      },
      ...props,
      className: alertDialogBackdropStyle({
        class: className
      })
    }
  );
});
AlertDialog.displayName = "AlertDialog";
AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogCloseButton.displayName = "AlertDialogCloseButton";
AlertDialogHeader.displayName = "AlertDialogHeader";
AlertDialogFooter.displayName = "AlertDialogFooter";
AlertDialogBody.displayName = "AlertDialogBody";
AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

export { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader };
//# sourceMappingURL=index.js.map
