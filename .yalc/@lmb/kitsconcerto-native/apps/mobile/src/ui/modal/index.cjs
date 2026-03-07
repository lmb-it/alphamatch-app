'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/modal/creator');
var reactNative = require('react-native');
var motion = require('@legendapp/motion');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var nativewind = require('nativewind');

const AnimatedPressable = motion.createMotionAnimatedComponent(
  reactNative.Pressable
);
const SCOPE = "MODAL";
const MotionView = motion.Motion.View;
const UIModal = creator.createModal({
  Root: nativewindUtils.withStyleContext(reactNative.View, SCOPE),
  Backdrop: AnimatedPressable,
  Content: MotionView,
  Body: reactNative.ScrollView,
  CloseButton: reactNative.Pressable,
  Footer: reactNative.View,
  Header: reactNative.View,
  AnimatePresence: motion.AnimatePresence
});
nativewind.cssInterop(AnimatedPressable, { className: "style" });
nativewind.cssInterop(MotionView, { className: "style" });
const modalStyle = nativewindUtils.tva({
  base: "group/modal w-full h-full justify-center items-center web:pointer-events-none",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      full: ""
    }
  }
});
const modalBackdropStyle = nativewindUtils.tva({
  base: "absolute left-0 top-0 right-0 bottom-0 bg-background-dark web:cursor-default"
});
const modalContentStyle = nativewindUtils.tva({
  base: "bg-background-0 rounded-md overflow-hidden border border-outline-100 shadow-hard-2 p-6",
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
const modalBodyStyle = nativewindUtils.tva({
  base: "mt-2 mb-6"
});
const modalCloseButtonStyle = nativewindUtils.tva({
  base: "group/modal-close-button z-10 rounded data-[focus-visible=true]:web:bg-background-100 web:outline-0 cursor-pointer"
});
const modalHeaderStyle = nativewindUtils.tva({
  base: "justify-between items-center flex-row"
});
const modalFooterStyle = nativewindUtils.tva({
  base: "flex-row justify-end items-center gap-2"
});
const Modal = React.forwardRef(
  ({ className, size = "md", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    UIModal,
    {
      ref,
      ...props,
      pointerEvents: "box-none",
      className: modalStyle({ size, class: className }),
      context: { size }
    }
  )
);
const ModalBackdrop = React.forwardRef(function ModalBackdrop2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIModal.Backdrop,
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
      className: modalBackdropStyle({
        class: className
      })
    }
  );
});
const ModalContent = React.forwardRef(function ModalContent2({ className, size, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIModal.Content,
    {
      ref,
      initial: {
        opacity: 0,
        scale: 0.9
      },
      animate: {
        opacity: 1,
        scale: 1
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
      className: modalContentStyle({
        parentVariants: {
          size: parentSize
        },
        size,
        class: className
      }),
      pointerEvents: "auto"
    }
  );
});
const ModalHeader = React.forwardRef(function ModalHeader2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIModal.Header,
    {
      ref,
      ...props,
      className: modalHeaderStyle({
        class: className
      })
    }
  );
});
const ModalBody = React.forwardRef(function ModalBody2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIModal.Body,
    {
      ref,
      ...props,
      className: modalBodyStyle({
        class: className
      })
    }
  );
});
const ModalFooter = React.forwardRef(function ModalFooter2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIModal.Footer,
    {
      ref,
      ...props,
      className: modalFooterStyle({
        class: className
      })
    }
  );
});
const ModalCloseButton = React.forwardRef(function ModalCloseButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIModal.CloseButton,
    {
      ref,
      ...props,
      className: modalCloseButtonStyle({
        class: className
      })
    }
  );
});
Modal.displayName = "Modal";
ModalBackdrop.displayName = "ModalBackdrop";
ModalContent.displayName = "ModalContent";
ModalHeader.displayName = "ModalHeader";
ModalBody.displayName = "ModalBody";
ModalFooter.displayName = "ModalFooter";
ModalCloseButton.displayName = "ModalCloseButton";

exports.Modal = Modal;
exports.ModalBackdrop = ModalBackdrop;
exports.ModalBody = ModalBody;
exports.ModalCloseButton = ModalCloseButton;
exports.ModalContent = ModalContent;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
//# sourceMappingURL=index.cjs.map
