import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createAccordion } from '@gluestack-ui/core/accordion/creator';
import { View, Platform, Text, Pressable } from 'react-native';
import { tva, withStyleContext, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { H3 } from '@expo/html-elements';
import { cssInterop } from 'nativewind';
import { UIIcon, PrimitiveIcon } from '@gluestack-ui/core/icon/creator';

const SCOPE = "ACCORDION";
const accordionStyle = tva({
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
const accordionItemStyle = tva({
  base: "",
  parentVariants: {
    variant: {
      filled: "bg-background-0",
      unfilled: "bg-transparent"
    }
  }
});
const accordionTitleTextStyle = tva({
  base: "text-typography-900 font-bold flex-1 text-left",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  }
});
const accordionIconStyle = tva({
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
const accordionContentTextStyle = tva({
  base: "text-typography-700 font-normal",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  }
});
const accordionHeaderStyle = tva({
  base: "mx-0 my-0"
});
const accordionContentStyle = tva({
  base: "pt-1 pb-3 px-4"
});
const accordionTriggerStyle = tva({
  base: "w-full flex-row justify-between items-center web:outline-none focus:outline-none data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed data-[focus-visible=true]:bg-background-50 py-3 px-4"
});
const Root = withStyleContext(View, SCOPE);
const Header = Platform.OS === "web" ? H3 : View;
const UIAccordion = createAccordion({
  Root,
  Item: View,
  Header,
  Trigger: Pressable,
  Icon: UIIcon,
  TitleText: Text,
  ContentText: Text,
  Content: View
});
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
cssInterop(H3, {
  className: {
    target: "style"
  }
});
const Accordion = React.forwardRef(({ className, variant = "filled", size = "md", ...props }, ref) => {
  return /* @__PURE__ */ jsx(
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
  const { variant } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  const { size } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
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
  const { size: parentSize } = useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsx(
      UIAccordion.Icon,
      {
        ref,
        ...props,
        className: accordionIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsx(
      UIAccordion.Icon,
      {
        ref,
        ...props,
        className: accordionIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  const { size } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
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

export { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger };
//# sourceMappingURL=index.js.map
