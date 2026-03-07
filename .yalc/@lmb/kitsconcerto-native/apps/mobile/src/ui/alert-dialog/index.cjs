'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/alert-dialog/creator');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var nativewind = require('nativewind');
var motion = require('@legendapp/motion');
var reactNative = require('react-native');

const SCOPE = "ALERT_DIALOG";
const RootComponent = nativewindUtils.withStyleContext(reactNative.View, SCOPE);
const MotionView = motion.Motion.View;
const AnimatedPressable = motion.createMotionAnimatedComponent(
  reactNative.Pressable
);
const UIAccessibleAlertDialog = creator.createAlertDialog({
  Root: RootComponent,
  Body: reactNative.ScrollView,
  Content: MotionView,
  CloseButton: reactNative.Pressable,
  Header: reactNative.View,
  Footer: reactNative.View,
  Backdrop: AnimatedPressable,
  AnimatePresence: motion.AnimatePresence
});
nativewind.cssInterop(MotionView, { className: "style" });
nativewind.cssInterop(AnimatedPressable, { className: "style" });
const alertDialogStyle = nativewindUtils.tva({
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
const alertDialogContentStyle = nativewindUtils.tva({
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
const alertDialogCloseButtonStyle = nativewindUtils.tva({
  base: "group/alert-dialog-close-button z-10 rounded-sm p-2 data-[focus-visible=true]:bg-background-100 web:cursor-pointer outline-0"
});
const alertDialogHeaderStyle = nativewindUtils.tva({
  base: "justify-between items-center flex-row"
});
const alertDialogFooterStyle = nativewindUtils.tva({
  base: "flex-row justify-end items-center gap-3"
});
const alertDialogBodyStyle = nativewindUtils.tva({ base: "" });
const alertDialogBackdropStyle = nativewindUtils.tva({
  base: "absolute left-0 top-0 right-0 bottom-0 bg-background-dark web:cursor-default"
});
const AlertDialog = React.forwardRef(function AlertDialog2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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

exports.AlertDialog = AlertDialog;
exports.AlertDialogBackdrop = AlertDialogBackdrop;
exports.AlertDialogBody = AlertDialogBody;
exports.AlertDialogCloseButton = AlertDialogCloseButton;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
//# sourceMappingURL=index.cjs.map
