import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { View, Text } from 'react-native';
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/core/icon/creator';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

const SCOPE = "BADGE";
const badgeStyle = tva({
  base: "flex-row items-center rounded-sm data-[disabled=true]:opacity-50 px-2 py-1",
  variants: {
    action: {
      error: "bg-background-error border-error-300",
      warning: "bg-background-warning border-warning-300",
      success: "bg-background-success border-success-300",
      info: "bg-background-info border-info-300",
      muted: "bg-background-muted border-background-300"
    },
    variant: {
      solid: "",
      outline: "border"
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  }
});
const badgeTextStyle = tva({
  base: "text-typography-700 font-body font-normal tracking-normal uppercase",
  parentVariants: {
    action: {
      error: "text-error-600",
      warning: "text-warning-600",
      success: "text-success-600",
      info: "text-info-600",
      muted: "text-background-800"
    },
    size: {
      sm: "text-2xs",
      md: "text-xs",
      lg: "text-sm"
    }
  },
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
const badgeIconStyle = tva({
  base: "fill-none",
  parentVariants: {
    action: {
      error: "text-error-600",
      warning: "text-warning-600",
      success: "text-success-600",
      info: "text-info-600",
      muted: "text-background-800"
    },
    size: {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    }
  }
});
const ContextView = withStyleContext(View, SCOPE);
cssInterop(PrimitiveIcon, {
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
function Badge({
  children,
  action = "muted",
  variant = "solid",
  size = "md",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ContextView,
    {
      className: badgeStyle({ action, variant, class: className }),
      ...props,
      context: {
        action,
        variant,
        size
      },
      children
    }
  );
}
const BadgeText = React.forwardRef(function BadgeText2({ children, className, size, ...props }, ref) {
  const { size: parentSize, action: parentAction } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    Text,
    {
      ref,
      className: badgeTextStyle({
        parentVariants: {
          size: parentSize,
          action: parentAction
        },
        size,
        class: className
      }),
      ...props,
      children
    }
  );
});
const BadgeIcon = React.forwardRef(function BadgeIcon2({ className, size, ...props }, ref) {
  const { size: parentSize, action: parentAction } = useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsx(
      UIIcon,
      {
        ref,
        ...props,
        className: badgeIconStyle({ class: className }),
        size
      }
    );
  } else if ((props?.height !== void 0 || props?.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsx(
      UIIcon,
      {
        ref,
        ...props,
        className: badgeIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    UIIcon,
    {
      className: badgeIconStyle({
        parentVariants: {
          size: parentSize,
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
Badge.displayName = "Badge";
BadgeText.displayName = "BadgeText";
BadgeIcon.displayName = "BadgeIcon";

export { Badge, BadgeIcon, BadgeText };
//# sourceMappingURL=index.js.map
