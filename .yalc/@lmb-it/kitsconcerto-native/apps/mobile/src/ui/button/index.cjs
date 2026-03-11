'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/button/creator');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var nativewind = require('nativewind');
var reactNative = require('react-native');
var creator$1 = require('@gluestack-ui/core/icon/creator');

const SCOPE = "BUTTON";
const Root = nativewindUtils.withStyleContext(reactNative.Pressable, SCOPE);
const UIButton = creator.createButton({
  Root,
  Text: reactNative.Text,
  Group: reactNative.View,
  Spinner: reactNative.ActivityIndicator,
  Icon: creator$1.UIIcon
});
nativewind.cssInterop(creator$1.PrimitiveIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true
    }
  }
});
const buttonStyle = nativewindUtils.tva({
  base: "group/button rounded bg-primary-500 flex-row items-center justify-center data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[disabled=true]:opacity-40 gap-2",
  variants: {
    action: {
      primary: "bg-primary-500 data-[hover=true]:bg-primary-600 data-[active=true]:bg-primary-700 border-primary-300 data-[hover=true]:border-primary-400 data-[active=true]:border-primary-500 data-[focus-visible=true]:web:ring-indicator-info",
      secondary: "bg-secondary-500 border-secondary-300 data-[hover=true]:bg-secondary-600 data-[hover=true]:border-secondary-400 data-[active=true]:bg-secondary-700 data-[active=true]:border-secondary-700 data-[focus-visible=true]:web:ring-indicator-info",
      positive: "bg-success-500 border-success-300 data-[hover=true]:bg-success-600 data-[hover=true]:border-success-400 data-[active=true]:bg-success-700 data-[active=true]:border-success-500 data-[focus-visible=true]:web:ring-indicator-info",
      negative: "bg-error-500 border-error-300 data-[hover=true]:bg-error-600 data-[hover=true]:border-error-400 data-[active=true]:bg-error-700 data-[active=true]:border-error-500 data-[focus-visible=true]:web:ring-indicator-info",
      default: "bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent"
    },
    variant: {
      link: "px-0",
      outline: "bg-transparent border data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent",
      solid: ""
    },
    size: {
      xs: "px-3.5 h-8",
      sm: "px-4 h-9",
      md: "px-5 h-10",
      lg: "px-6 h-11",
      xl: "px-7 h-12"
    }
  },
  compoundVariants: [
    {
      action: "primary",
      variant: "link",
      class: "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent"
    },
    {
      action: "secondary",
      variant: "link",
      class: "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent"
    },
    {
      action: "positive",
      variant: "link",
      class: "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent"
    },
    {
      action: "negative",
      variant: "link",
      class: "px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent"
    },
    {
      action: "primary",
      variant: "outline",
      class: "bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent"
    },
    {
      action: "secondary",
      variant: "outline",
      class: "bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent"
    },
    {
      action: "positive",
      variant: "outline",
      class: "bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent"
    },
    {
      action: "negative",
      variant: "outline",
      class: "bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent"
    }
  ]
});
const buttonTextStyle = nativewindUtils.tva({
  base: "text-typography-0 font-semibold web:select-none",
  parentVariants: {
    action: {
      primary: "text-primary-600 data-[hover=true]:text-primary-600 data-[active=true]:text-primary-700",
      secondary: "text-typography-500 data-[hover=true]:text-typography-600 data-[active=true]:text-typography-700",
      positive: "text-success-600 data-[hover=true]:text-success-600 data-[active=true]:text-success-700",
      negative: "text-error-600 data-[hover=true]:text-error-600 data-[active=true]:text-error-700"
    },
    variant: {
      link: "data-[hover=true]:underline data-[active=true]:underline",
      outline: "",
      solid: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }
  },
  parentCompoundVariants: [
    {
      variant: "solid",
      action: "primary",
      class: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    },
    {
      variant: "solid",
      action: "secondary",
      class: "text-typography-800 data-[hover=true]:text-typography-800 data-[active=true]:text-typography-800"
    },
    {
      variant: "solid",
      action: "positive",
      class: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    },
    {
      variant: "solid",
      action: "negative",
      class: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    },
    {
      variant: "outline",
      action: "primary",
      class: "text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500"
    },
    {
      variant: "outline",
      action: "secondary",
      class: "text-typography-500 data-[hover=true]:text-primary-600 data-[active=true]:text-typography-700"
    },
    {
      variant: "outline",
      action: "positive",
      class: "text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500"
    },
    {
      variant: "outline",
      action: "negative",
      class: "text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500"
    }
  ]
});
const buttonIconStyle = nativewindUtils.tva({
  base: "fill-none",
  parentVariants: {
    variant: {
      link: "data-[hover=true]:underline data-[active=true]:underline",
      outline: "",
      solid: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    },
    size: {
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-[18px] w-[18px]",
      xl: "h-5 w-5"
    },
    action: {
      primary: "text-primary-600 data-[hover=true]:text-primary-600 data-[active=true]:text-primary-700",
      secondary: "text-typography-500 data-[hover=true]:text-typography-600 data-[active=true]:text-typography-700",
      positive: "text-success-600 data-[hover=true]:text-success-600 data-[active=true]:text-success-700",
      negative: "text-error-600 data-[hover=true]:text-error-600 data-[active=true]:text-error-700"
    }
  },
  parentCompoundVariants: [
    {
      variant: "solid",
      action: "primary",
      class: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    },
    {
      variant: "solid",
      action: "secondary",
      class: "text-typography-800 data-[hover=true]:text-typography-800 data-[active=true]:text-typography-800"
    },
    {
      variant: "solid",
      action: "positive",
      class: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    },
    {
      variant: "solid",
      action: "negative",
      class: "text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0"
    }
  ]
});
const buttonGroupStyle = nativewindUtils.tva({
  base: "",
  variants: {
    space: {
      "xs": "gap-1",
      "sm": "gap-2",
      "md": "gap-3",
      "lg": "gap-4",
      "xl": "gap-5",
      "2xl": "gap-6",
      "3xl": "gap-7",
      "4xl": "gap-8"
    },
    isAttached: {
      true: "gap-0"
    },
    flexDirection: {
      "row": "flex-row",
      "column": "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse"
    }
  }
});
const Button = React.forwardRef(
  ({ className, variant = "solid", size = "md", action = "primary", ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIButton,
      {
        ref,
        ...props,
        className: buttonStyle({ variant, size, action, class: className }),
        context: { variant, size, action }
      }
    );
  }
);
const ButtonText = React.forwardRef(({ className, variant, size, action, ...props }, ref) => {
  const {
    variant: parentVariant,
    size: parentSize,
    action: parentAction
  } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIButton.Text,
    {
      ref,
      ...props,
      className: buttonTextStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
          action: parentAction
        },
        variant,
        size,
        action,
        class: className
      })
    }
  );
});
const ButtonSpinner = UIButton.Spinner;
const ButtonIcon = React.forwardRef(({ className, size, ...props }, ref) => {
  const {
    variant: parentVariant,
    size: parentSize,
    action: parentAction
  } = nativewindUtils.useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIButton.Icon,
      {
        ref,
        ...props,
        className: buttonIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIButton.Icon,
      {
        ref,
        ...props,
        className: buttonIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIButton.Icon,
    {
      ...props,
      className: buttonIconStyle({
        parentVariants: {
          size: parentSize,
          variant: parentVariant,
          action: parentAction
        },
        size,
        class: className
      }),
      ref
    }
  );
});
const ButtonGroup = React.forwardRef(
  ({
    className,
    space = "md",
    isAttached = false,
    flexDirection = "column",
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIButton.Group,
      {
        className: buttonGroupStyle({
          class: className,
          space,
          isAttached,
          flexDirection
        }),
        ...props,
        ref
      }
    );
  }
);
Button.displayName = "Button";
ButtonText.displayName = "ButtonText";
ButtonSpinner.displayName = "ButtonSpinner";
ButtonIcon.displayName = "ButtonIcon";
ButtonGroup.displayName = "ButtonGroup";

exports.Button = Button;
exports.ButtonGroup = ButtonGroup;
exports.ButtonIcon = ButtonIcon;
exports.ButtonSpinner = ButtonSpinner;
exports.ButtonText = ButtonText;
//# sourceMappingURL=index.cjs.map
