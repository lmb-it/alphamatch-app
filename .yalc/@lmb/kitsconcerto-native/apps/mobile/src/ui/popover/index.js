import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { Pressable, View, ScrollView } from 'react-native';
import { createMotionAnimatedComponent, Motion, AnimatePresence } from '@legendapp/motion';
import { createPopover } from '@gluestack-ui/core/popover/creator';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

const AnimatedPressable = createMotionAnimatedComponent(
  Pressable
);
const SCOPE = "POPOVER";
const MotionView = Motion.View;
const UIPopover = createPopover({
  Root: withStyleContext(View, SCOPE),
  Arrow: MotionView,
  Backdrop: AnimatedPressable,
  Body: ScrollView,
  CloseButton: Pressable,
  Content: MotionView,
  Footer: View,
  Header: View,
  AnimatePresence
});
cssInterop(MotionView, { className: "style" });
cssInterop(AnimatedPressable, { className: "style" });
const popoverStyle = tva({
  base: "group/popover w-full h-full justify-center items-center web:pointer-events-none",
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
const popoverArrowStyle = tva({
  base: "bg-background-0 z-[1] border absolute overflow-hidden h-3.5 w-3.5 border-outline-100",
  variants: {
    placement: {
      "top left": "data-[flip=false]:border-t-0 data-[flip=false]:border-l-0 data-[flip=true]:border-b-0 data-[flip=true]:border-r-0",
      "top": "data-[flip=false]:border-t-0 data-[flip=false]:border-l-0 data-[flip=true]:border-b-0 data-[flip=true]:border-r-0",
      "top right": "data-[flip=false]:border-t-0 data-[flip=false]:border-l-0 data-[flip=true]:border-b-0 data-[flip=true]:border-r-0",
      "bottom": "data-[flip=false]:border-b-0 data-[flip=false]:border-r-0 data-[flip=true]:border-t-0 data-[flip=true]:border-l-0",
      "bottom left": "data-[flip=false]:border-b-0 data-[flip=false]:border-r-0 data-[flip=true]:border-t-0 data-[flip=true]:border-l-0",
      "bottom right": "data-[flip=false]:border-b-0 data-[flip=false]:border-r-0 data-[flip=true]:border-t-0 data-[flip=true]:border-l-0",
      "left": "data-[flip=false]:border-l-0 data-[flip=false]:border-b-0 data-[flip=true]:border-r-0 data-[flip=true]:border-t-0",
      "left top": "data-[flip=false]:border-l-0 data-[flip=false]:border-b-0 data-[flip=true]:border-r-0 data-[flip=true]:border-t-0",
      "left bottom": "data-[flip=false]:border-l-0 data-[flip=false]:border-b-0 data-[flip=true]:border-r-0 data-[flip=true]:border-t-0",
      "right": "data-[flip=false]:border-r-0 data-[flip=false]:border-t-0 data-[flip=true]:border-l-0 data-[flip=true]:border-b-0",
      "right top": "data-[flip=false]:border-r-0 data-[flip=false]:border-t-0 data-[flip=true]:border-l-0 data-[flip=true]:border-b-0",
      "right bottom": "data-[flip=false]:border-r-0 data-[flip=false]:border-t-0 data-[flip=true]:border-l-0 data-[flip=true]:border-b-0"
    }
  }
});
const popoverBackdropStyle = tva({
  base: "absolute left-0 top-0 right-0 bottom-0 web:cursor-default"
});
const popoverCloseButtonStyle = tva({
  base: "group/popover-close-button z-[1] rounded-sm data-[focus-visible=true]:web:bg-background-100 web:outline-0 web:cursor-pointer"
});
const popoverContentStyle = tva({
  base: "bg-background-0 rounded-lg overflow-hidden border border-outline-100 w-full",
  parentVariants: {
    size: {
      xs: "max-w-[360px] p-3.5",
      sm: "max-w-[420px] p-4",
      md: "max-w-[510px] p-[18px]",
      lg: "max-w-[640px] p-5",
      full: "p-6"
    }
  }
});
const popoverHeaderStyle = tva({
  base: "flex-row justify-between items-center"
});
const popoverBodyStyle = tva({
  base: ""
});
const popoverFooterStyle = tva({
  base: "flex-row justify-between items-center"
});
const Popover = React.forwardRef(function Popover2({ className, size = "md", placement = "bottom", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIPopover,
    {
      ref,
      placement,
      ...props,
      className: popoverStyle({ size, class: className }),
      context: { size, placement },
      pointerEvents: "box-none"
    }
  );
});
const PopoverContent = React.forwardRef(function PopoverContent2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIPopover.Content,
    {
      ref,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 250,
        mass: 0.9,
        opacity: {
          type: "timing",
          duration: 50,
          delay: 50
        }
      },
      ...props,
      className: popoverContentStyle({
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
const PopoverArrow = React.forwardRef(function PopoverArrow2({ className, ...props }, ref) {
  const { placement } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIPopover.Arrow,
    {
      ref,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 250,
        mass: 0.9,
        opacity: {
          type: "timing",
          duration: 50,
          delay: 50
        }
      },
      ...props,
      className: popoverArrowStyle({
        class: className,
        placement
      })
    }
  );
});
const PopoverBackdrop = React.forwardRef(function PopoverBackdrop2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIPopover.Backdrop,
    {
      ref,
      ...props,
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 0.1
      },
      exit: {
        opacity: 0
      },
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 450,
        mass: 0.9,
        opacity: {
          type: "timing",
          duration: 50,
          delay: 50
        }
      },
      className: popoverBackdropStyle({
        class: className
      })
    }
  );
});
const PopoverBody = React.forwardRef(function PopoverBody2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIPopover.Body,
    {
      ref,
      ...props,
      className: popoverBodyStyle({
        class: className
      })
    }
  );
});
const PopoverCloseButton = React.forwardRef(function PopoverCloseButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIPopover.CloseButton,
    {
      ref,
      ...props,
      className: popoverCloseButtonStyle({
        class: className
      })
    }
  );
});
const PopoverFooter = React.forwardRef(function PopoverFooter2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIPopover.Footer,
    {
      ref,
      ...props,
      className: popoverFooterStyle({
        class: className
      })
    }
  );
});
const PopoverHeader = React.forwardRef(function PopoverHeader2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIPopover.Header,
    {
      ref,
      ...props,
      className: popoverHeaderStyle({
        class: className
      })
    }
  );
});
Popover.displayName = "Popover";
PopoverArrow.displayName = "PopoverArrow";
PopoverBackdrop.displayName = "PopoverBackdrop";
PopoverContent.displayName = "PopoverContent";
PopoverHeader.displayName = "PopoverHeader";
PopoverFooter.displayName = "PopoverFooter";
PopoverBody.displayName = "PopoverBody";
PopoverCloseButton.displayName = "PopoverCloseButton";

export { Popover, PopoverArrow, PopoverBackdrop, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader };
//# sourceMappingURL=index.js.map
