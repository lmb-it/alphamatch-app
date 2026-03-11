import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createModal } from '@gluestack-ui/core/modal/creator';
import { Pressable, Dimensions, View, ScrollView } from 'react-native';
import { createMotionAnimatedComponent, Motion, AnimatePresence } from '@legendapp/motion';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

const AnimatedPressable = createMotionAnimatedComponent(
  Pressable
);
const SCOPE = "MODAL";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const sizes = {
  sm: 0.25,
  md: 0.5,
  lg: 0.75,
  full: 1
};
const MotionView = Motion.View;
const UIDrawer = createModal({
  Root: withStyleContext(View, SCOPE),
  Backdrop: AnimatedPressable,
  Content: MotionView,
  Body: ScrollView,
  CloseButton: Pressable,
  Footer: View,
  Header: View,
  AnimatePresence
});
cssInterop(AnimatedPressable, { className: "style" });
cssInterop(MotionView, { className: "style" });
const drawerStyle = tva({
  base: "w-full h-full web:pointer-events-none relative",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
      full: ""
    },
    anchor: {
      left: "items-start",
      right: "items-end",
      top: "justify-start",
      bottom: "justify-end"
    }
  }
});
const drawerBackdropStyle = tva({
  base: "absolute left-0 top-0 right-0 bottom-0 bg-background-dark web:cursor-default"
});
const drawerContentStyle = tva({
  base: "bg-background-0 overflow-scroll border-outline-100 p-6 absolute",
  parentVariants: {
    size: {
      sm: "w-1/4",
      md: "w-1/2",
      lg: "w-3/4",
      full: "w-full"
    },
    anchor: {
      left: "h-full border-r",
      right: "h-full border-l",
      top: "w-full border-b",
      bottom: "w-full border-t"
    }
  },
  parentCompoundVariants: [
    {
      anchor: "top",
      size: "sm",
      class: "h-1/4"
    },
    {
      anchor: "top",
      size: "md",
      class: "h-1/2"
    },
    {
      anchor: "top",
      size: "lg",
      class: "h-3/4"
    },
    {
      anchor: "top",
      size: "full",
      class: "h-full"
    },
    {
      anchor: "bottom",
      size: "sm",
      class: "h-1/4"
    },
    {
      anchor: "bottom",
      size: "md",
      class: "h-1/2"
    },
    {
      anchor: "bottom",
      size: "lg",
      class: "h-3/4"
    },
    {
      anchor: "bottom",
      size: "full",
      class: "h-full"
    }
  ]
});
const drawerCloseButtonStyle = tva({
  base: "z-10 rounded data-[focus-visible=true]:web:bg-background-100 web:outline-0 cursor-pointer"
});
const drawerHeaderStyle = tva({
  base: "justify-between items-center flex-row"
});
const drawerBodyStyle = tva({
  base: "mt-4 mb-6 shrink-0"
});
const drawerFooterStyle = tva({
  base: "flex-row justify-end items-center"
});
const Drawer = React.forwardRef(function Drawer2({ className, size = "sm", anchor = "left", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIDrawer,
    {
      ref,
      ...props,
      pointerEvents: "box-none",
      className: drawerStyle({ size, anchor, class: className }),
      context: { size, anchor }
    }
  );
});
const DrawerBackdrop = React.forwardRef(function DrawerBackdrop2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIDrawer.Backdrop,
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
      className: drawerBackdropStyle({
        class: className
      })
    }
  );
});
const DrawerContent = React.forwardRef(function DrawerContent2({ className, ...props }, ref) {
  const { size: parentSize, anchor: parentAnchor } = useStyleContext(SCOPE);
  const drawerHeight = screenHeight * (sizes[parentSize] || sizes.md);
  const drawerWidth = screenWidth * (sizes[parentSize] || sizes.md);
  const isHorizontal = parentAnchor === "left" || parentAnchor === "right";
  const initialObj = isHorizontal ? { x: parentAnchor === "left" ? -drawerWidth : drawerWidth } : { y: parentAnchor === "top" ? -drawerHeight : drawerHeight };
  const animateObj = isHorizontal ? { x: 0 } : { y: 0 };
  const exitObj = isHorizontal ? { x: parentAnchor === "left" ? -drawerWidth : drawerWidth } : { y: parentAnchor === "top" ? -drawerHeight : drawerHeight };
  const customClass = isHorizontal ? `top-0 ${parentAnchor === "left" ? "left-0" : "right-0"}` : `left-0 ${parentAnchor === "top" ? "top-0" : "bottom-0"}`;
  return /* @__PURE__ */ jsx(
    UIDrawer.Content,
    {
      ref,
      initial: initialObj,
      animate: animateObj,
      exit: exitObj,
      transition: {
        type: "timing",
        duration: 300
      },
      ...props,
      className: drawerContentStyle({
        parentVariants: {
          size: parentSize,
          anchor: parentAnchor
        },
        class: `${className} ${customClass}`
      }),
      pointerEvents: "auto"
    }
  );
});
const DrawerHeader = React.forwardRef(function DrawerHeader2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIDrawer.Header,
    {
      ref,
      ...props,
      className: drawerHeaderStyle({
        class: className
      })
    }
  );
});
const DrawerBody = React.forwardRef(function DrawerBody2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIDrawer.Body,
    {
      ref,
      ...props,
      className: drawerBodyStyle({
        class: className
      })
    }
  );
});
const DrawerFooter = React.forwardRef(function DrawerFooter2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIDrawer.Footer,
    {
      ref,
      ...props,
      className: drawerFooterStyle({
        class: className
      })
    }
  );
});
const DrawerCloseButton = React.forwardRef(function DrawerCloseButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIDrawer.CloseButton,
    {
      ref,
      ...props,
      className: drawerCloseButtonStyle({
        class: className
      })
    }
  );
});
Drawer.displayName = "Drawer";
DrawerBackdrop.displayName = "DrawerBackdrop";
DrawerContent.displayName = "DrawerContent";
DrawerHeader.displayName = "DrawerHeader";
DrawerBody.displayName = "DrawerBody";
DrawerFooter.displayName = "DrawerFooter";
DrawerCloseButton.displayName = "DrawerCloseButton";

export { Drawer, DrawerBackdrop, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader };
//# sourceMappingURL=index.js.map
