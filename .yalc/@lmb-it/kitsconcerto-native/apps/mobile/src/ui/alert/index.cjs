'use strict';

var jsxRuntime = require('react/jsx-runtime');
var creator = require('@gluestack-ui/core/alert/creator');
var reactNative = require('react-native');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var React = require('react');
var nativewind = require('nativewind');
var creator$1 = require('@gluestack-ui/core/icon/creator');

const SCOPE = "ALERT";
const alertStyle = nativewindUtils.tva({
  base: "items-center py-3 px-4 rounded-md flex-row gap-2 border-outline-100",
  variants: {
    action: {
      error: "bg-background-error",
      warning: "bg-background-warning",
      success: "bg-background-success",
      info: "bg-background-info",
      muted: "bg-background-muted"
    },
    variant: {
      solid: "",
      outline: "border bg-background-0"
    }
  }
});
const alertTextStyle = nativewindUtils.tva({
  base: "font-normal font-body",
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
  },
  parentVariants: {
    action: {
      error: "text-error-800",
      warning: "text-warning-800",
      success: "text-success-800",
      info: "text-info-800",
      muted: "text-background-800"
    }
  }
});
const alertIconStyle = nativewindUtils.tva({
  base: "fill-none",
  variants: {
    size: {
      "2xs": "h-3 w-3",
      "xs": "h-3.5 w-3.5",
      "sm": "h-4 w-4",
      "md": "h-[18px] w-[18px]",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    }
  },
  parentVariants: {
    action: {
      error: "text-error-800",
      warning: "text-warning-800",
      success: "text-success-800",
      info: "text-info-800",
      muted: "text-background-800"
    }
  }
});
const UIAlert = creator.createAlert({
  Root: nativewindUtils.withStyleContext(reactNative.View, SCOPE),
  Text: reactNative.Text,
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
const Alert = React.forwardRef(
  function Alert2({ className, variant = "solid", action = "muted", ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIAlert,
      {
        className: alertStyle({ action, variant, class: className }),
        context: { variant, action },
        ref,
        ...props
      }
    );
  }
);
const AlertText = React.forwardRef(function AlertText2({
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
  const { action: parentAction } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAlert.Text,
    {
      className: alertTextStyle({
        isTruncated,
        bold,
        underline,
        strikeThrough,
        size,
        sub,
        italic,
        highlight,
        class: className,
        parentVariants: {
          action: parentAction
        }
      }),
      ...props,
      ref
    }
  );
});
const AlertIcon = React.forwardRef(function AlertIcon2({ className, size = "md", ...props }, ref) {
  const { action: parentAction } = nativewindUtils.useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIAlert.Icon,
      {
        ref,
        ...props,
        className: alertIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIAlert.Icon,
      {
        ref,
        ...props,
        className: alertIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAlert.Icon,
    {
      className: alertIconStyle({
        parentVariants: {
          action: parentAction
        },
        size,
        class: className
      }),
      ...props,
      ref
    }
  );
});
Alert.displayName = "Alert";
AlertText.displayName = "AlertText";
AlertIcon.displayName = "AlertIcon";

exports.Alert = Alert;
exports.AlertIcon = AlertIcon;
exports.AlertText = AlertText;
exports.UIAlert = UIAlert;
//# sourceMappingURL=index.cjs.map
