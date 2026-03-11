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
const screenWidth = reactNative.Dimensions.get("window").width;
const screenHeight = reactNative.Dimensions.get("window").height;
const sizes = {
  sm: 0.25,
  md: 0.5,
  lg: 0.75,
  full: 1
};
const MotionView = motion.Motion.View;
const UIDrawer = creator.createModal({
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
const drawerStyle = nativewindUtils.tva({
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
const drawerBackdropStyle = nativewindUtils.tva({
  base: "absolute left-0 top-0 right-0 bottom-0 bg-background-dark web:cursor-default"
});
const drawerContentStyle = nativewindUtils.tva({
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
const drawerCloseButtonStyle = nativewindUtils.tva({
  base: "z-10 rounded data-[focus-visible=true]:web:bg-background-100 web:outline-0 cursor-pointer"
});
const drawerHeaderStyle = nativewindUtils.tva({
  base: "justify-between items-center flex-row"
});
const drawerBodyStyle = nativewindUtils.tva({
  base: "mt-4 mb-6 shrink-0"
});
const drawerFooterStyle = nativewindUtils.tva({
  base: "flex-row justify-end items-center"
});
const Drawer = React.forwardRef(function Drawer2({ className, size = "sm", anchor = "left", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  const { size: parentSize, anchor: parentAnchor } = nativewindUtils.useStyleContext(SCOPE);
  const drawerHeight = screenHeight * (sizes[parentSize] || sizes.md);
  const drawerWidth = screenWidth * (sizes[parentSize] || sizes.md);
  const isHorizontal = parentAnchor === "left" || parentAnchor === "right";
  const initialObj = isHorizontal ? { x: parentAnchor === "left" ? -drawerWidth : drawerWidth } : { y: parentAnchor === "top" ? -drawerHeight : drawerHeight };
  const animateObj = isHorizontal ? { x: 0 } : { y: 0 };
  const exitObj = isHorizontal ? { x: parentAnchor === "left" ? -drawerWidth : drawerWidth } : { y: parentAnchor === "top" ? -drawerHeight : drawerHeight };
  const customClass = isHorizontal ? `top-0 ${parentAnchor === "left" ? "left-0" : "right-0"}` : `left-0 ${parentAnchor === "top" ? "top-0" : "bottom-0"}`;
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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

exports.Drawer = Drawer;
exports.DrawerBackdrop = DrawerBackdrop;
exports.DrawerBody = DrawerBody;
exports.DrawerCloseButton = DrawerCloseButton;
exports.DrawerContent = DrawerContent;
exports.DrawerFooter = DrawerFooter;
exports.DrawerHeader = DrawerHeader;
//# sourceMappingURL=index.cjs.map
