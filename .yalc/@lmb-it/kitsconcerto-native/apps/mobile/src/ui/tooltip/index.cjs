'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/tooltip/creator');
var reactNative = require('react-native');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var motion = require('@legendapp/motion');
var nativewind = require('nativewind');

const MotionView = motion.Motion.View;
const UITooltip = creator.createTooltip({
  Root: nativewindUtils.withStyleContext(reactNative.View),
  Content: MotionView,
  Text: reactNative.Text,
  AnimatePresence: motion.AnimatePresence
});
nativewind.cssInterop(MotionView, { className: "style" });
const tooltipStyle = nativewindUtils.tva({
  base: "w-full h-full web:pointer-events-none"
});
const tooltipContentStyle = nativewindUtils.tva({
  base: "py-1 px-3 rounded-sm bg-background-900 web:pointer-events-auto"
});
const tooltipTextStyle = nativewindUtils.tva({
  base: "font-normal tracking-normal web:select-none text-xs text-typography-50",
  variants: {
    isTruncated: {
      true: "line-clamp-1 truncate"
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
const Tooltip = React.forwardRef(function Tooltip2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UITooltip,
    {
      ref,
      className: tooltipStyle({ class: className }),
      ...props
    }
  );
});
const TooltipContent = React.forwardRef(function TooltipContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UITooltip.Content,
    {
      ref,
      ...props,
      className: tooltipContentStyle({
        class: className
      }),
      pointerEvents: "auto"
    }
  );
});
const TooltipText = React.forwardRef(function TooltipText2({ size, className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UITooltip.Text,
    {
      ref,
      className: tooltipTextStyle({ size, class: className }),
      ...props
    }
  );
});
Tooltip.displayName = "Tooltip";
TooltipContent.displayName = "TooltipContent";
TooltipText.displayName = "TooltipText";

exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipText = TooltipText;
exports.UITooltip = UITooltip;
//# sourceMappingURL=index.cjs.map
