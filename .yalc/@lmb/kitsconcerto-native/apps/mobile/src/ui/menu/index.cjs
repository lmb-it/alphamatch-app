'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/menu/creator');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var nativewind = require('nativewind');
var reactNative = require('react-native');
var motion = require('@legendapp/motion');

const MotionView = motion.Motion.View;
const menuStyle = nativewindUtils.tva({
  base: "rounded-md bg-background-0 border border-outline-100 p-1 shadow-hard-5"
});
const menuItemStyle = nativewindUtils.tva({
  base: "min-w-[200px] p-3 flex-row items-center rounded data-[hover=true]:bg-background-50 data-[active=true]:bg-background-100 data-[focus=true]:bg-background-50 data-[focus=true]:web:outline-none data-[focus=true]:web:outline-0 data-[disabled=true]:opacity-40 data-[disabled=true]:web:cursor-not-allowed data-[focus-visible=true]:web:outline-2 data-[focus-visible=true]:web:outline-primary-700 data-[focus-visible=true]:web:outline data-[focus-visible=true]:web:cursor-pointer data-[disabled=true]:data-[focus=true]:bg-transparent"
});
const menuBackdropStyle = nativewindUtils.tva({
  base: "absolute top-0 bottom-0 left-0 right-0 web:cursor-default"
  // add this classnames if you want to give background color to backdrop
  // opacity-50 bg-background-500,
});
const menuSeparatorStyle = nativewindUtils.tva({
  base: "bg-background-200 h-px w-full"
});
const menuItemLabelStyle = nativewindUtils.tva({
  base: "text-typography-700 font-normal font-body",
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
const BackdropPressable = React.forwardRef(function BackdropPressable2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Pressable,
    {
      ref,
      className: menuBackdropStyle({
        class: className
      }),
      ...props
    }
  );
});
const Item = React.forwardRef(function Item2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.Pressable,
    {
      ref,
      className: menuItemStyle({
        class: className
      }),
      ...props
    }
  );
});
const Separator = React.forwardRef(function Separator2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.View,
    {
      ref,
      className: menuSeparatorStyle({ class: className }),
      ...props
    }
  );
});
const UIMenu = creator.createMenu({
  Root: MotionView,
  Item,
  Label: reactNative.Text,
  Backdrop: BackdropPressable,
  AnimatePresence: motion.AnimatePresence,
  Separator
});
nativewind.cssInterop(MotionView, { className: "style" });
const Menu = React.forwardRef(
  function Menu2({ className, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIMenu,
      {
        ref,
        initial: {
          opacity: 0,
          scale: 0.8
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        exit: {
          opacity: 0,
          scale: 0.8
        },
        transition: {
          type: "timing",
          duration: 100
        },
        className: menuStyle({
          class: className
        }),
        ...props
      }
    );
  }
);
const MenuItem = UIMenu.Item;
const MenuItemLabel = React.forwardRef(function MenuItemLabel2({
  className,
  isTruncated,
  bold,
  underline,
  strikeThrough,
  size = "md",
  sub,
  italic,
  highlight,
  ...props
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIMenu.ItemLabel,
    {
      ref,
      className: menuItemLabelStyle({
        isTruncated,
        bold,
        underline,
        strikeThrough,
        size,
        sub,
        italic,
        highlight,
        class: className
      }),
      ...props
    }
  );
});
const MenuSeparator = UIMenu.Separator;
Menu.displayName = "Menu";
MenuItem.displayName = "MenuItem";
MenuItemLabel.displayName = "MenuItemLabel";
MenuSeparator.displayName = "MenuSeparator";

exports.Menu = Menu;
exports.MenuItem = MenuItem;
exports.MenuItemLabel = MenuItemLabel;
exports.MenuSeparator = MenuSeparator;
exports.UIMenu = UIMenu;
//# sourceMappingURL=index.cjs.map
