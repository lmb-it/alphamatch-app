'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/accordion/creator');
var reactNative = require('react-native');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var htmlElements = require('@expo/html-elements');
var nativewind = require('nativewind');
var creator$1 = require('@gluestack-ui/core/icon/creator');

const SCOPE = "ACCORDION";
const accordionStyle = nativewindUtils.tva({
  base: "w-full",
  variants: {
    variant: {
      filled: "bg-white shadow-hard-2",
      unfilled: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  }
});
const accordionItemStyle = nativewindUtils.tva({
  base: "",
  parentVariants: {
    variant: {
      filled: "bg-background-0",
      unfilled: "bg-transparent"
    }
  }
});
const accordionTitleTextStyle = nativewindUtils.tva({
  base: "text-typography-900 font-bold flex-1 text-left",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  }
});
const accordionIconStyle = nativewindUtils.tva({
  base: "text-typography-900 fill-none",
  parentVariants: {
    size: {
      "2xs": "h-3 w-3",
      "xs": "h-3.5 w-3.5",
      "sm": "h-4 w-4",
      "md": "h-[18px] w-[18px]",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    }
  }
});
const accordionContentTextStyle = nativewindUtils.tva({
  base: "text-typography-700 font-normal",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  }
});
const accordionHeaderStyle = nativewindUtils.tva({
  base: "mx-0 my-0"
});
const accordionContentStyle = nativewindUtils.tva({
  base: "pt-1 pb-3 px-4"
});
const accordionTriggerStyle = nativewindUtils.tva({
  base: "w-full flex-row justify-between items-center web:outline-none focus:outline-none data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed data-[focus-visible=true]:bg-background-50 py-3 px-4"
});
const Root = nativewindUtils.withStyleContext(reactNative.View, SCOPE);
const Header = reactNative.Platform.OS === "web" ? htmlElements.H3 : reactNative.View;
const UIAccordion = creator.createAccordion({
  Root,
  Item: reactNative.View,
  Header,
  Trigger: reactNative.Pressable,
  Icon: creator$1.UIIcon,
  TitleText: reactNative.Text,
  ContentText: reactNative.Text,
  Content: reactNative.View
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
nativewind.cssInterop(htmlElements.H3, {
  className: {
    target: "style"
  }
});
const Accordion = React.forwardRef(({ className, variant = "filled", size = "md", ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion,
    {
      ref,
      ...props,
      className: accordionStyle({ variant, class: className }),
      context: { variant, size }
    }
  );
});
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => {
  const { variant } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion.Item,
    {
      ref,
      ...props,
      className: accordionItemStyle({
        parentVariants: { variant },
        class: className
      })
    }
  );
});
const AccordionContent = React.forwardRef(function AccordionContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion.Content,
    {
      ref,
      ...props,
      className: accordionContentStyle({
        class: className
      })
    }
  );
});
const AccordionContentText = React.forwardRef(function AccordionContentText2({ className, ...props }, ref) {
  const { size } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion.ContentText,
    {
      ref,
      ...props,
      className: accordionContentTextStyle({
        parentVariants: { size },
        class: className
      })
    }
  );
});
const AccordionIcon = React.forwardRef(function AccordionIcon2({ size, className, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIAccordion.Icon,
      {
        ref,
        ...props,
        className: accordionIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIAccordion.Icon,
      {
        ref,
        ...props,
        className: accordionIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion.Icon,
    {
      ref,
      ...props,
      className: accordionIconStyle({
        size,
        class: className,
        parentVariants: { size: parentSize }
      })
    }
  );
});
const AccordionHeader = React.forwardRef(function AccordionHeader2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion.Header,
    {
      ref,
      ...props,
      className: accordionHeaderStyle({
        class: className
      })
    }
  );
});
const AccordionTrigger = React.forwardRef(function AccordionTrigger2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion.Trigger,
    {
      ref,
      ...props,
      className: accordionTriggerStyle({
        class: className
      })
    }
  );
});
const AccordionTitleText = React.forwardRef(function AccordionTitleText2({ className, ...props }, ref) {
  const { size } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIAccordion.TitleText,
    {
      ref,
      ...props,
      className: accordionTitleTextStyle({
        parentVariants: { size },
        class: className
      })
    }
  );
});
Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionHeader.displayName = "AccordionHeader";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionTitleText.displayName = "AccordionTitleText";
AccordionContentText.displayName = "AccordionContentText";
AccordionIcon.displayName = "AccordionIcon";
AccordionContent.displayName = "AccordionContent";

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionContentText = AccordionContentText;
exports.AccordionHeader = AccordionHeader;
exports.AccordionIcon = AccordionIcon;
exports.AccordionItem = AccordionItem;
exports.AccordionTitleText = AccordionTitleText;
exports.AccordionTrigger = AccordionTrigger;
//# sourceMappingURL=index.cjs.map
